/* eslint-disable no-underscore-dangle */
/* eslint-disable array-callback-return */
import React, { useState, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Helmet from 'react-helmet';
import { toast } from 'react-toastify';

import { routes } from 'constants/routes';
import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
  getTranslate,
  getVideo,
} from 'utils';
import {
  searchIngredients,
  createRecipe,
  getIngredient,
  getUserSettings,
} from 'api';
import FormValidator from 'utils/FormValidator';

// Components
import Button from 'components/common/Forms/Button';
import InputField from 'components/common/Forms/InputField';
import SelectInput from 'components/common/Forms/SelectInput';
import CustomCheckbox from 'components/common/Forms/CustomCheckbox';
import WithTranslate from 'components/hoc/WithTranslate';
import DonutChart from 'components/common/charts/DonutChart';
import ImagesFileInput from 'components/common/Forms/ImagesFileInput';
import Breadcrumb from 'components/Breadcrumb';
import CustomSwitch from 'components/common/Forms/CustomSwitch';

import './CreateRecipeView.sass';

// Icons
import { ReactComponent as ClockIcon } from 'assets/img/icons/clock-icon.svg';
import { ReactComponent as ArrowLeft } from 'assets/img/icons/arrow-left-gray-icon.svg';
import { ReactComponent as ArrowRight } from 'assets/img/icons/arrow-right-gray-icon.svg';
import { ReactComponent as TrashIcon } from 'assets/img/icons/trash-icon.svg';

import {
  colourStylesSelect,
  servingOptions,
  costCategoryOptions,
} from './selectsDatas';

const CreateRecipeView = (props: any) => {
  const t = (code: string, placeholders?: any) => getTranslate(props.localePhrases, code, placeholders);

  const [unit, setUnit] = useState(t('common.gr'));

  const [createRecipeForm, setCreateRecipeForm] = useState({
    recipeName: '',
    recipePreparation: '',
    ingredients: [],
    measurement: null,
    cuisine: [],
    imageIds: [],
    servingsCnt: null,
    time: 1,
    totalWeight: 0,
    costLevel: null,
    videoUrl: '',
  });

  useEffect(() => {
    getUserSettings().then((response) => {
      setCreateRecipeForm({ ...createRecipeForm, measurement: response.data.data.measurement });
    });
  }, []);

  const [composition, setComposition] = useState([
    {
      name: 'fat',
      namePlural: t('common.fats'),
      value: 0,
      id: 0,
      firstColorGradient: '#03792B',
      lastColorGradient: '#D5FFBB',
      background: '#279A40',
    },
    {
      name: 'carbohydrate',
      namePlural: t('common.carbohydrates'),
      value: 0,
      id: 1,
      firstColorGradient: '#FF8F6F',
      lastColorGradient: '#FAEC45',
      background: '#FFB56E',
    },
    {
      name: 'protein',
      namePlural: t('common.proteins'),
      value: 0,
      id: 2,
      firstColorGradient: '#1F39FE',
      lastColorGradient: '#EFD4FF',
      background: '#3070F2',
    },
    {
      name: 'sugar',
      namePlural: t('common.sugar'),
      value: 0,
      id: 3,
      firstColorGradient: '#CCFFCF',
      lastColorGradient: '#ADEFBC',
      background: '#90E0AB',
    },
    {
      name: 'salt',
      namePlural: t('common.salt'),
      value: 0,
      id: 4,
      firstColorGradient: '#F391AA',
      lastColorGradient: '#F391AA',
      background: '#F391AA',
    },
  ]);

  const [createRecipeErrors, setCreateRecipeErrors] = useState([]);

  const [videoLinkIframe, setVideoLinkIframe] = useState('');

  const [files, setFiles] = useState([]);

  const calcComposition = (ingredientsList: Array<any>) => {
    composition.map((item) => {
      item.value = 0;
      switch (item.name) {
        case 'fat':
          ingredientsList.map((indgredientItem) => {
            const countedValue: string = (indgredientItem.fat * indgredientItem.weight).toFixed(2);
            const updatedValue = +(item.value + +countedValue).toFixed(2);
            item.value = updatedValue;
          });
          break;
        case 'carbohydrate':
          ingredientsList.map((indgredientItem) => {
            const countedValue: string = (indgredientItem.carbohydrate * indgredientItem.weight).toFixed(2);
            const updatedValue = +(item.value + +countedValue).toFixed(2);
            item.value = updatedValue;
          });
          break;
        case 'protein':
          ingredientsList.map((indgredientItem) => {
            const countedValue: string = (indgredientItem.protein * indgredientItem.weight).toFixed(2);
            const updatedValue = +(item.value + +countedValue).toFixed(2);
            item.value = updatedValue;
          });
          break;
        case 'sugar':
          ingredientsList.map((indgredientItem) => {
            const countedValue: string = (indgredientItem.sugar * indgredientItem.weight).toFixed(2);
            const updatedValue = +(item.value + +countedValue).toFixed(2);
            item.value = updatedValue;
          });
          break;
        case 'salt':
          ingredientsList.map((indgredientItem) => {
            const countedValue: string = (indgredientItem.salt * indgredientItem.weight).toFixed(2);
            const updatedValue = +(item.value + +countedValue).toFixed(2);
            item.value = updatedValue;
          });
          break;
        default:
          return null;
      }
    });
  };

  const validateOnChange = (name: string, value: any, event, element?) => {
    validateFieldOnChange(
      name,
      value,
      event,
      createRecipeForm,
      setCreateRecipeForm,
      createRecipeErrors,
      setCreateRecipeErrors,
      element,
    );
  };

  const getFieldErrors = (field: string) =>
    getFieldErrorsUtil(field, createRecipeErrors);

  const addIndgredient = (e) => {
    getIngredient(e.value).then((response) => {
      const { data } = response.data;
      if (
        createRecipeForm.ingredients.find(
          (item) => item.ingredient_id === data._id,
        )
      ) {
        toast.error(t('recipe.create.duplication_error'), {
          autoClose: 3000,
        });
        return;
      }
      const filteredData = {
        ingredient_id: data._id,
        costLevel: data.cost_level,
        name: data.name_i18n,
        weight: null,
        is_opt: false,
        calorie: data.calorie / 100000,
        fat: data.fat / 100,
        carbohydrate: data.carbohydrate / 100,
        protein: data.protein / 100,
        sugar: data.sugar / 100,
        salt: data.salt / 100,
        isFullBlock: true,
      };

      setCreateRecipeForm({
        ...createRecipeForm,
        ingredients: [...createRecipeForm.ingredients, filteredData],
      });
    });
  };

  const deleteIngredient = (index: number) => {
    const updatedListOfIngredients: Array<any> = [
      ...createRecipeForm.ingredients,
    ];
    let countTotalWeight: number = createRecipeForm.totalWeight;

    updatedListOfIngredients.splice(index, 1);

    calcComposition(updatedListOfIngredients);

    countTotalWeight -= createRecipeForm.ingredients[index].weight;

    setCreateRecipeForm({
      ...createRecipeForm,
      ingredients: updatedListOfIngredients,
      totalWeight: countTotalWeight,
    });
  };

  const filterIngredients = async (inputValue: string) => {
    const filteredListOfIngredients: Array<any> = [];
    try {
      const response = await searchIngredients(inputValue);
      const listOfIngredients = response.data.data;
      Object.entries(listOfIngredients).forEach((prop) => {
        filteredListOfIngredients.push({
          value: prop[0],
          label: prop[1],
        });
      });
      return filteredListOfIngredients;
    } catch {
      return filteredListOfIngredients;
    }
  };

  const inputValueIngredient = (inputValue: string) =>
    new Promise((resolve) => {
      resolve(filterIngredients(inputValue));
    });

  const createRecipeSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const inputs = [...form.elements].filter((i) => ['INPUT', 'SELECT', 'TEXTAREA'].includes(i.nodeName));

    const { errors, hasError } = FormValidator.bulkValidate(inputs);

    setCreateRecipeErrors([...errors]);

    if (errors.length > 0) {
      const itemWithError = document.querySelector(`[name='${errors[0].field}']`);
      itemWithError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    if (createRecipeForm.ingredients.length === 0) {
      toast.error(t('recipe.create.ingredients_error'), {
        autoClose: 3000,
      });

      const ingredientsBlock = document.querySelector('.recipe__add-ingredients');
      ingredientsBlock.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    if (!hasError) {
      createRecipe(
        createRecipeForm.recipeName,
        createRecipeForm.recipePreparation,
        createRecipeForm.ingredients,
        createRecipeForm.measurement,
        createRecipeForm.servingsCnt,
        createRecipeForm.cuisine,
        createRecipeForm.imageIds,
        createRecipeForm.time,
        createRecipeForm.totalWeight,
        createRecipeForm.costLevel,
        createRecipeForm.videoUrl,
      )
        .then((response) => {
          toast.success(t('recipe.create.success'), {
            autoClose: 3000,
          });

          setCreateRecipeForm({
            ...createRecipeForm,
            recipeName: '',
            recipePreparation: '',
            ingredients: [],
            measurement: 'si',
            cuisine: [],
            imageIds: [],
            servingsCnt: null,
            time: 1,
            totalWeight: 0,
            costLevel: null,
            videoUrl: '',
          });

          setFiles([]);

          setVideoLinkIframe('');

          const updatedComposition = composition;

          updatedComposition.map((item) => {
            item.value = 0;
          });

          setComposition([...updatedComposition]);

          setUnit(t('common.gr'));

          return response.data.data;
        })
        .catch(() => {
          toast.error(t('recipe.create.error'), {
            autoClose: 3000,
          });
        });
    }
  };

  const getChartPercent = (value: number) => {
    if (value === 0) return 0;
    return (value / createRecipeForm.totalWeight) * 100;
  };

  const handleChangeFiles = useCallback((ids: any[]) => {
    const pushedIds = [];
    setFiles(ids);
    ids.forEach((item) => pushedIds.push(item.image_id));
    setCreateRecipeForm({ ...createRecipeForm, imageIds: pushedIds });
  }, [createRecipeForm]);

  return (
    <>
      <Helmet>
        <title>{t('app.title.recipe_create')}</title>
      </Helmet>
      <div className='container-fluid recipe_container'>
        <Breadcrumb
          routes={[
            {
              url: routes.main.url,
              name: routes.main.title,
            },
            {
              url: routes.recipes.url,
              name: routes.recipes.title,
            },
          ]}
          currentPage={t('app.title.recipe_create')}
        />
        <h1 className='recipe__title'>{t('recipe.create.title')}</h1>
        <form
          className='recipe_wrap card-bg'
          onSubmit={(e) => createRecipeSubmit(e)}
        >
          <div className='recipe__add-photo-list'>
            <ImagesFileInput
              dropElement={document.querySelector('#root')}
              filesOut={files}
              onLoadFiles={handleChangeFiles}
              initFiles={[]}
              additionalFiles={[]}
              classes='recipe__add-photo'
              phrase={t('common.add_photos')}
            >
              {({ isDisabled }) => {
                if (isDisabled) {
                  return null;
                }
              }}
            </ImagesFileInput>
          </div>

          <div className='recipe__add-video'>
            <div className='recipe__add-video-preview'>
              {videoLinkIframe ? (
                <iframe
                  title='video'
                  width='100%'
                  height='100%'
                  src={videoLinkIframe}
                  allowFullScreen
                />
              ) : t('recipe.create.preview')}
              <button
                type='button'
                onClick={() => {
                  setVideoLinkIframe('');
                  setCreateRecipeForm({ ...createRecipeForm, videoUrl: '' });
                }}
                className='recipe__add-video-preview-btn'
              >
                <TrashIcon />
              </button>
            </div>
            <div className='recipe__add-video-desc'>
              <div className='recipe__add-video-desc-title'>
                {t('recipe.create.upload_video')}
              </div>
              <div className='recipe__add-video-desc-container'>
                <div className='recipe__add-video-desc-input-wrap'>
                  <InputField
                    block
                    name='videoUrl'
                    data-validate='["url"]'
                    errors={getFieldErrors('videoUrl')}
                    value={createRecipeForm.videoUrl}
                    onChange={(e) => validateOnChange('videoUrl', e.target.value, e)}
                    placeholder={t('recipe.create.paste_link')}
                    border='light'
                    className='recipe__add-video-desc-input'
                  />
                </div>
                <Button
                  color='primary'
                  onClick={() => setVideoLinkIframe(getVideo(createRecipeForm.videoUrl))}
                  className='recipe__add-video-desc-btn'
                >
                  {t('recipe.create.upload')}
                </Button>
              </div>
            </div>
          </div>

          <div className='row recipe__input-data'>
            <div className='col-12 mb-xl-5'>
              <div className='recipe__input-container'>
                <InputField
                  block
                  name='recipeName'
                  data-validate='["required"]'
                  errors={getFieldErrors('recipeName')}
                  value={createRecipeForm.recipeName}
                  onChange={(e) => validateOnChange('recipeName', e.target.value, e)}
                  label={t('recipe.name')}
                  border='light'
                />
              </div>
            </div>
            <div className='col-xl-3'>
              <div className='recipe__input-container'>
                <div className='recipe__label'>
                  <span className='recipe__label-description'>
                    {t('recipe.serving')}
                  </span>
                  <div className='recipe__label-select'>
                    <SelectInput
                      value={servingOptions.find(
                        (option) =>
                          option.value === createRecipeForm.servingsCnt,
                      )}
                      options={servingOptions}
                      onChange={(option, e) => validateOnChange('servingsCnt', option.value, e)}
                      placeholder={t('recipe.serving')}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='col-xl-3'>
              <div className='recipe__input-container'>
                <div className='recipe__label'>
                  <span className='recipe__label-description'>
                    {t('recipe.create.price_level')}
                  </span>
                  <div className='recipe__label-select'>
                    <SelectInput
                      value={costCategoryOptions.find(
                        (option) => option.value === createRecipeForm.costLevel,
                      )}
                      options={costCategoryOptions}
                      onChange={(option, e) => validateOnChange('costLevel', option.value, e)}
                      placeholder={t('recipe.cost_level')}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='col-xl-3'>
              <label className='recipe__label'>
                <span className='recipe__label-description recipe__label-description_media'>
                  <ClockIcon />
                </span>
                <InputField
                  block
                  type='number'
                  name='time'
                  data-param='1,4320'
                  data-validate='["min-max"]'
                  errors={getFieldErrors('time')}
                  value={createRecipeForm.time}
                  onChange={(e) => validateOnChange('time', e.target.value, e)}
                  className='recipe__label-input'
                  min={1}
                  max={4320}
                  border='light'
                />
                <span className='recipe__label-description ml-xl-3'>min</span>
              </label>
            </div>
          </div>
          <CustomSwitch
            label1={t('common.gr')}
            label2={t('common.oz')}
            checked={createRecipeForm.measurement === 'us'}
            onChange={() => {
              setCreateRecipeForm({
                ...createRecipeForm,
                measurement: createRecipeForm.measurement === 'si' ? 'us' : 'si',
              });

              setUnit(unit === t('common.gr') ? t('common.oz') : t('common.gr'));
            }}
            className='recipe__switch'
          />
          <div className='recipe__chart'>
            <div className='recipe__chart-progress'>
              {composition.map((item) => (
                <div
                  className={`recipe__chart-progress-item recipe__chart-progress-item_${item.name}`}
                  key={item.id}
                >
                  <DonutChart
                    firstColor={item.firstColorGradient}
                    lastColor={item.lastColorGradient}
                    percent={getChartPercent(item.value)}
                  />
                </div>
              ))}
              <div className='recipe__chart-progress-value'>
                {t('common.grams', { number: createRecipeForm.totalWeight })}
              </div>
            </div>
            <div className='recipe__chart-lines'>
              {composition.map((item) => (
                <div className='recipe__chart-lines-item' key={item.id}>
                  <div className='recipe__chart-lines-item-description'>
                    {item.name}
                  </div>
                  <div className='recipe__chart-lines-item-line'>
                    <div
                      className='recipe__chart-lines-item-line-paint'
                      style={{
                        width: `${getChartPercent(item.value)}%`,
                        backgroundColor: item.background,
                      }}
                    />
                  </div>
                  <div className='recipe__chart-lines-item-description'>
                    {`${item.value} ${unit}`}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='recipe__add-ingredients'>
            <div className='recipe__add-ingredients-description'>
              <h2 className='recipe__add-ingredients-description-title'>
                {t('ingr.label')}
              </h2>
            </div>
            <div className='recipe__add-ingredients-field'>
              <SelectInput
                async
                value=''
                loadOptions={inputValueIngredient}
                placeholder={t('recipe.create.ingredient_search')}
                onChange={addIndgredient}
                styles={colourStylesSelect}
              />
            </div>
          </div>
          <div className='recipe__list'>
            {createRecipeForm.ingredients.map(
              (ingredientItem, ingredientIndex) => (
                <div
                  className={classnames('recipe__item', {
                    'recipe__item_full-info': ingredientItem.isFullBlock,
                  })}
                  key={ingredientItem.ingredient_id}
                >
                  <div className='recipe__item-content'>
                    <div
                      className='recipe__item-bg'
                      role='presentation'
                      onClick={() => {
                        const updatedlist = [...createRecipeForm.ingredients];
                        updatedlist[ingredientIndex].isFullBlock = !updatedlist[
                          ingredientIndex
                        ].isFullBlock;
                        setCreateRecipeForm({
                          ...createRecipeForm,
                          ingredients: updatedlist,
                        });
                      }}
                    />

                    <div className='recipe__item-name'>
                      <span>
                        {`${ingredientItem.name} ${
                          costCategoryOptions.find(
                            (item) => item.value === ingredientItem.costLevel,
                          ).label}`}
                      </span>
                    </div>

                    <div className='recipe__item-counting'>
                      <div>
                        {`${t('common.fats')}: ${(ingredientItem.fat * ingredientItem.weight).toFixed(2)}`}
                      </div>
                      <div>
                        {`${t('common.carbohydrates')}: 
                          ${(ingredientItem.carbohydrate * ingredientItem.weight).toFixed(2)}`}
                      </div>
                      <div>
                        {`${t('common.proteins')}: ${(ingredientItem.protein * ingredientItem.weight).toFixed(2)}`}
                      </div>
                    </div>

                    <div className='recipe__item-quantity'>
                      <div className='recipe__item-quantity-counter'>
                        <button
                          className='recipe__item-quantity-counter-arrow'
                          type='button'
                          onClick={() => {
                            const updatedIngredients = [
                              ...createRecipeForm.ingredients,
                            ];

                            const currentWeight = updatedIngredients[ingredientIndex].weight;

                            let countTotalWeight = 0;

                            if (currentWeight === 0) {
                              return;
                            }
                            if (currentWeight === 1) {
                              updatedIngredients[ingredientIndex].weight = null;
                            } else {
                              updatedIngredients[ingredientIndex].weight -= 1;
                            }

                            calcComposition(updatedIngredients);

                            updatedIngredients.forEach((item) => {
                              countTotalWeight += item.weight;
                            });

                            setCreateRecipeForm({
                              ...createRecipeForm,
                              ingredients: updatedIngredients,
                              totalWeight: countTotalWeight,
                            });
                          }}
                        >
                          <ArrowLeft />
                        </button>

                        <InputField
                          type='number'
                          name={`indredients[${ingredientIndex}].weight`}
                          value={createRecipeForm.ingredients[ingredientIndex].weight}
                          step={0.1}
                          onChange={(e) => {
                            if (e.target.value === '0') {
                              e.target.value = null;
                            }

                            const updatedIngredients = [
                              ...createRecipeForm.ingredients,
                            ];
                            let countTotalWeight = 0;

                            updatedIngredients[ingredientIndex].weight = e.target.value;

                            calcComposition(updatedIngredients);

                            validateOnChange(
                              'ingredients',
                              updatedIngredients,
                              e,
                            );

                            updatedIngredients.forEach((item) => {
                              countTotalWeight += +item.weight;
                            });

                            setCreateRecipeForm({
                              ...createRecipeForm,
                              ingredients: updatedIngredients,
                              totalWeight: countTotalWeight,
                            });
                          }}
                          height='xs'
                          className='recipe__item-quantity-counter-input'
                          min={0}
                          border='light'
                        />

                        <button
                          type='button'
                          className='recipe__item-quantity-counter-arrow'
                          onClick={() => {
                            const updatedIngredients = [
                              ...createRecipeForm.ingredients,
                            ];

                            let countTotalWeight = 0;

                            updatedIngredients[ingredientIndex].weight += 1;

                            calcComposition(updatedIngredients);

                            updatedIngredients.forEach((item) => {
                              countTotalWeight += item.weight;
                            });

                            setCreateRecipeForm({
                              ...createRecipeForm,
                              ingredients: updatedIngredients,
                              totalWeight: countTotalWeight,
                            });
                          }}
                        >
                          <ArrowRight />
                        </button>
                        <div className='recipe__item-quantity-counter-unit'>
                          {unit}
                        </div>
                      </div>
                      <div className='recipe__item-quantity-counter-total'>
                        <span>
                          {`${(
                            ingredientItem.calorie * ingredientItem.weight
                          ).toFixed(2)} ${t('common.kcal')}`}
                        </span>
                      </div>
                    </div>
                    <button
                      type='button'
                      className='recipe__item-delete'
                      onClick={() => deleteIngredient(ingredientIndex)}
                    >
                      <div className='recipe__item-delete-media'>
                        <TrashIcon />
                      </div>
                    </button>
                    <div className='recipe__item-weight'>
                      {`${!ingredientItem.weight ? 0 : ingredientItem.weight} ${unit}`}
                    </div>
                  </div>
                  <div className='recipe__item-opt'>
                    <CustomCheckbox
                      label='Optional'
                      className='recipe__item-opt-checkbox'
                      onChange={(e) => {
                        createRecipeForm.ingredients[ingredientIndex].is_opt = e.target.checked;
                      }}
                    />
                  </div>
                </div>
              ),
            )}
          </div>
          <div className='recipe__total-weight'>
            <InputField
              block
              type='number'
              name='totalWeight'
              step={0.1}
              value={createRecipeForm.totalWeight}
              onChange={(e) => validateOnChange('totalWeight', e.target.value, e)}
              min={0}
              height='md'
              label={t('recipe.create.total_weight')}
              border='light'
            />
            <div className='recipe__total-weight-unit'>
              {unit}
            </div>
          </div>
          <div className='instructions'>
            <h2 className='instructions__title'>{t('recipe.preparation')}</h2>
            <InputField
              block
              type='textarea'
              name='recipePreparation'
              data-validate='["required"]'
              errors={getFieldErrors('recipePreparation')}
              value={createRecipeForm.recipePreparation}
              onChange={(e) => validateOnChange('recipePreparation', e.target.value, e)}
              rows={16}
              className='instructions__field'
              border='light'
            />
            <div className='instructions__button-wrap'>
              <Button
                type='submit'
                color='primary'
                className='instructions__button'
              >
                {t('recipe.add')}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default WithTranslate(connect(null)(CreateRecipeView));
