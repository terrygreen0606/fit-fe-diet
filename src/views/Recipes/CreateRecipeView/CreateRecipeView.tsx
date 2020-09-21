/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-return-assign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable array-callback-return */
import React, { useState, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Helmet from 'react-helmet';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

import { routes } from 'constants/routes';
import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
  getTranslate,
  getVideo,
  getMealIcon,
} from 'utils';
import {
  searchIngredients,
  createRecipe,
  getIngredient,
  getMealTimes,
  userUpdateMeasurement,
  getRecipeData,
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
import Modal from 'components/common/Modal/Modal';

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
  const { localePhrases, settings } = props;

  const t = (code: string, placeholders?: any) => getTranslate(localePhrases, code, placeholders);

  const history = useHistory();

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
    mealtimes: [],
  });

  const [mealTimes, setMealTimes] = useState<Array<any>>([]);

  const [files, setFiles] = useState<Array<any>>([]);

  const [videoLinkIframe, setVideoLinkIframe] = useState<string>('');

  const [composition, setComposition] = useState<Array<any>>([
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

  const calcComposition = (ingredientsList: Array<any>) => {
    const updatedComposition: Array<any> = [...composition];
    updatedComposition.map((item) => {
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
    setComposition([...updatedComposition]);
  };

  useEffect(() => {
    let cleanComponent: boolean = false;
    setCreateRecipeForm({ ...createRecipeForm, measurement: settings.measurement });
    getMealTimes().then((response) => {
      if (!cleanComponent) {
        setMealTimes(response.data.data.list);
      }
    });

    return () => cleanComponent = true;
  }, []);

  useEffect(() => {
    let cleanComponent: boolean = false;
    if (props.location.propsRecipeId && !cleanComponent) {
      getRecipeData(props.location.propsRecipeId, false, false, false, true)
        .then((response) => {
          const { data } = response.data;

          const updatedImages: Array<any> = [];

          const pushedIdsImages: Array<any> = [];

          data.images.forEach((imageItem) => {
            pushedIdsImages.push(imageItem.image_id);

            updatedImages.push({
              id: imageItem.id,
              image_id: imageItem.id,
              url: imageItem.url,
              isFailed: false,
              isLoaded: true,
            });
          });

          setFiles(updatedImages);

          if (data.video_url) {
            setVideoLinkIframe(getVideo(data.video_url));
          }

          const updatedIngredients: Array<any> = [...data.ingredients];

          updatedIngredients.map((ingredientItem) => {
            ingredientItem.isFullBlock = true;
          });

          if (mealTimes.length > 0) {
            data.mealtime_codes.map((mealItem) => {
              mealTimes.find((findItem) => mealItem.i18n_code === findItem.i18n_code).isActive = true;
            });
          }
          setCreateRecipeForm({
            ...createRecipeForm,
            recipeName: data.name_i18n,
            recipePreparation: data.preparation_i18n,
            ingredients: updatedIngredients,
            measurement: settings.measurement,
            cuisine: data.cuisine_ids,
            imageIds: pushedIdsImages,
            servingsCnt: data.servings_cnt,
            time: data.time,
            totalWeight: data.weight,
            costLevel: data.cost_level,
            videoUrl: data.video_url,
            mealtimes: data.mealtime_codes,
          });
        });
    }

    return () => cleanComponent = true;
  }, [mealTimes]);

  useEffect(() => {
    calcComposition(createRecipeForm.ingredients);
  }, [createRecipeForm.ingredients]);

  const [createRecipeErrors, setCreateRecipeErrors] = useState<Array<any>>([]);

  const [isActiveDeleteIngrModal, setActiveDeleteIngrModal] = useState<boolean>(false);

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

  const addIndgredient = (e: any) => {
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
        cost_level: data.cost_level,
        name_i18n: data.name_i18n,
        weight: null,
        is_opt: false,
        calorie: data.calorie / 100,
        fat: data.fat / 100,
        carbohydrate: data.carbohydrate / 100,
        protein: data.protein / 100,
        sugar: data.sugar / 100,
        salt: data.salt / 100,
        isFullBlock: true,
        image_url: data.image_url,
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

    countTotalWeight -= createRecipeForm.ingredients[index].weight;

    setCreateRecipeForm({
      ...createRecipeForm,
      ingredients: updatedListOfIngredients,
      totalWeight: countTotalWeight,
    });
  };

  const filterIngredients = async (inputValue: string) => {
    if (inputValue.length < 2) return;
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

  const getCreateRecipePayload = () => ({
    name_i18n: createRecipeForm.recipeName,
    preparation_i18n: createRecipeForm.recipePreparation,
    ingredients: createRecipeForm.ingredients,
    measurement: createRecipeForm.measurement,
    servings_cnt: createRecipeForm.servingsCnt,
    cuisine_ids: createRecipeForm.cuisine,
    image_ids: createRecipeForm.imageIds,
    time: createRecipeForm.time,
    weight: createRecipeForm.totalWeight,
    cost_level: createRecipeForm.costLevel,
    video_url: createRecipeForm.videoUrl,
    mealtimes: createRecipeForm.mealtimes,
  });

  const createRecipeSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const inputs: Array<any> = [...form.elements].filter((i) => ['INPUT', 'SELECT', 'TEXTAREA'].includes(i.nodeName));

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

    const checkIngredientsWeight: Array<any> = createRecipeForm.ingredients.filter(
      (ingredientItem) => !ingredientItem.weight,
    );

    if (checkIngredientsWeight.length > 0) {
      toast.error(t('recipe.create.ingredient_weight_error'), {
        autoClose: 3000,
      });

      const ingredientsBlock = document.querySelector('.recipe__add-ingredients');
      ingredientsBlock.scrollIntoView({ behavior: 'smooth', block: 'center' });

      return;
    }

    if (!hasError) {
      createRecipe(getCreateRecipePayload())
        .then((response) => {
          toast.success(t('recipe.create.success'), {
            autoClose: 3000,
          });

          history.push(`/recipe/${response.data.data._id}`);
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

  const checkingMeasurement = (measurement: string) => (measurement === 'si' ? 'us' : 'si');

  return (
    <>
      <Helmet>
        <title>{t('app.title.recipe_create')}</title>
      </Helmet>
      <div className='container-fluid recipe_container'>
        <Breadcrumb
          routes={[
            {
              url: routes.main,
              name: t('breadcrumb.main'),
            },
            {
              url: routes.recipes,
              name: t('app.title.recipes'),
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
              initFiles={files || []}
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
                <>
                  <iframe
                    title='video'
                    width='100%'
                    height='100%'
                    src={videoLinkIframe}
                    allowFullScreen
                  />
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
                </>
              ) : t('recipe.create.preview')}
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
                <span className='recipe__label-description ml-xl-3'>
                  {t('common.min_label')}
                </span>
              </label>
            </div>
          </div>
          <div className='recipe__meal-time'>
            <div className='recipe__meal-time-title'>
              {t('recipe.choose_meal_plan')}
            </div>
            <div className='recipe__meal-time-list'>
              {mealTimes.map((mealTime, mealTimeIndex) => (
                <button
                  key={mealTime.code}
                  type='button'
                  className={classnames('recipe__meal-time-btn card-bg', {
                    active: mealTime.isActive,
                  })}
                  onClick={() => {
                    const updatedMealTimes = [...mealTimes];
                    if (!mealTime.isActive) {
                      updatedMealTimes[mealTimeIndex].isActive = true;
                      setMealTimes([...updatedMealTimes]);
                      createRecipeForm.mealtimes.push(mealTime.code);
                    } else {
                      updatedMealTimes[mealTimeIndex].isActive = false;
                      setMealTimes([...updatedMealTimes]);
                      createRecipeForm.mealtimes.find((item, itemIndex) => {
                        if (item === mealTime.code) {
                          createRecipeForm.mealtimes.splice(itemIndex, 1);
                        }
                      });
                    }
                  }}
                >
                  <div className='recipe__meal-time-btn-media'>
                    {getMealIcon(mealTime.code)}
                  </div>
                  <div className='recipe__meal-time-btn-text'>
                    {t(mealTime.i18n_code)}
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className='recipe__switch-wrap'>
            <CustomSwitch
              label1={t('common.gr_label')}
              label2={t('common.oz_label')}
              checked={createRecipeForm.measurement === 'us'}
              onChange={() => {
                if (createRecipeForm.ingredients.length > 0) {
                  setActiveDeleteIngrModal(true);
                } else {
                  const newMeasurement = checkingMeasurement(createRecipeForm.measurement);

                  setCreateRecipeForm({
                    ...createRecipeForm,
                    measurement: newMeasurement,
                  });

                  userUpdateMeasurement(newMeasurement).catch(() => {
                    setCreateRecipeForm({
                      ...createRecipeForm,
                      measurement: checkingMeasurement(newMeasurement),
                    });
                  });
                }
              }}
              className='recipe__switch'
            />
          </div>
          {isActiveDeleteIngrModal && (
            <Modal
              withCloseBtn
              shouldCloseOnOverlayClick
              onClose={() => setActiveDeleteIngrModal(false)}
              className='recipe__delete-ingr-modal'
            >
              <div className='recipe__delete-ingr-modal-title'>
                {t('recipe.delete_ingr.desc')}
              </div>
              <div className='recipe__delete-ingr-modal-btn-wrap'>
                <Button
                  color='primary'
                  onClick={() => {
                    const newMeasurement = checkingMeasurement(createRecipeForm.measurement);

                    const prevIngredients = createRecipeForm.ingredients;

                    const prevTotalWeight = createRecipeForm.totalWeight;

                    setCreateRecipeForm({
                      ...createRecipeForm,
                      ingredients: [],
                      measurement: newMeasurement,
                      totalWeight: 0,
                    });

                    userUpdateMeasurement(newMeasurement).catch(() => {
                      setCreateRecipeForm({
                        ...createRecipeForm,
                        ingredients: prevIngredients,
                        measurement: checkingMeasurement(newMeasurement),
                        totalWeight: prevTotalWeight,
                      });

                      toast.error(t('recipe.update_measurement.error', {
                        autoClose: 3000,
                      }));
                    });

                    setActiveDeleteIngrModal(false);
                  }}
                >
                  {t('recipe.delete_ingr.confirm')}
                </Button>
              </div>
            </Modal>
          )}
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
                {createRecipeForm.measurement === 'si'
                  ? t('common.gr', { number: createRecipeForm.totalWeight })
                  : t('common.oz', { number: createRecipeForm.totalWeight })}
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
                    {createRecipeForm.measurement === 'si'
                      ? t('common.gr', { number: item.value })
                      : t('common.oz', { number: item.value })}
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
                    'recipe__item_full-info': ingredientItem?.isFullBlock,
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
                        {`${ingredientItem.name_i18n} ${costCategoryOptions.find(
                          (item) => item.value === ingredientItem.cost_level,
                        )?.label}`}
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

                    <div className='recipe__item-media'>
                      <img src={ingredientItem.image_url} alt='' />
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

                            if (currentWeight - 1 < 0) {
                              updatedIngredients[ingredientIndex].weight = 0;
                            } else {
                              updatedIngredients[ingredientIndex].weight = +(updatedIngredients[ingredientIndex].weight
                                - 1).toFixed(2);
                            }

                            updatedIngredients.forEach((item) => {
                              countTotalWeight += item.weight;
                            });

                            countTotalWeight = +countTotalWeight.toFixed(2);

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
                          step={0.01}
                          onChange={(e) => {
                            const updatedIngredients = [
                              ...createRecipeForm.ingredients,
                            ];
                            let countTotalWeight = 0;

                            updatedIngredients[ingredientIndex].weight = e.target.value;

                            validateOnChange('ingredients', updatedIngredients, e);

                            updatedIngredients.forEach((item) => {
                              countTotalWeight += +item.weight;
                            });

                            countTotalWeight = +countTotalWeight.toFixed(2);

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

                            updatedIngredients[ingredientIndex].weight = +(+updatedIngredients[ingredientIndex].weight
                              + 1).toFixed(2);

                            updatedIngredients.forEach((item) => {
                              countTotalWeight += item.weight;
                            });

                            countTotalWeight = +countTotalWeight.toFixed(2);

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
                          {createRecipeForm.measurement === 'si' ? t('common.gr_label') : t('common.oz_label')}
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
                      {`${!ingredientItem.weight ? 0 : ingredientItem.weight}
                      ${createRecipeForm.measurement === 'si' ? t('common.gr_label') : t('common.oz_label')}`}
                    </div>
                  </div>
                  <div className='recipe__item-opt'>
                    <CustomCheckbox
                      label={t('recipe.create.optional')}
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
              step={0.01}
              value={createRecipeForm.totalWeight}
              onChange={(e) => validateOnChange('totalWeight', e.target.value, e)}
              min={0}
              height='md'
              label={t('recipe.create.total_weight')}
              border='light'
            />
            <div className='recipe__total-weight-unit'>
              {createRecipeForm.measurement === 'si' ? t('common.gr_label') : t('common.oz_label')}
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

export default WithTranslate(
  connect(
    (state: any) => ({
      settings: state.settings,
    }),
  )(CreateRecipeView),
);
