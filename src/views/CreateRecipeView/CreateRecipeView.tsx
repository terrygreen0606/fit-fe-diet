/* eslint-disable @typescript-eslint/indent */
/* eslint-disable array-callback-return */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import AsyncSelect from 'react-select/async';
import classnames from 'classnames';
import Helmet from 'react-helmet';

import { routes, MAIN, RECIPES } from 'constants/routes';
import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
  getTranslate,
  getOz,
} from 'utils';
import { searchIngredients, createRecipe, getIngredient } from 'api';
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
  const t = (code: string) => getTranslate(props.localePhrases, code);

  const [unit, setUnit] = useState(t('common.gr'));

  const maxCalories: number = 500;

  const [createRecipeForm, setCreateRecipeForm] = useState({
    recipeName: '',
    recipePreparation: '',
    ingredients: [],
    measurement: 'si',
    cuisine: [],
    image_ids: [],
    servings_cnt: null,
    time: null,
    totalWeight: 0,
    costLevel: null,
  });

  const [composition] = useState([
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

  const [calories, setCalories] = useState(0);

  const [createRecipeErrors, setCreateRecipeErrors] = useState([]);

  const calcComposition = (ingredientsList: Array<any>) => {
    composition.map((item) => {
      item.value = 0;
      switch (item.name) {
        case 'fat':
          ingredientsList.map((indgredientItem) => {
            const countedValue: string = (
              indgredientItem.fat.toFixed(4) * indgredientItem.weight
            ).toFixed(4);
            item.value = +countedValue;
          });
          break;
        case 'carbohydrate':
          ingredientsList.map((indgredientItem) => {
            const countedValue: string = (
              indgredientItem.carbohydrate.toFixed(4) * indgredientItem.weight
            ).toFixed(4);
            item.value = +countedValue;
          });
          break;
        case 'protein':
          ingredientsList.map((indgredientItem) => {
            const countedValue: string = (
              indgredientItem.protein.toFixed(4) * indgredientItem.weight
            ).toFixed(4);
            item.value = +countedValue;
          });
          break;
        case 'sugar':
          ingredientsList.map((indgredientItem) => {
            const countedValue: string = (
              indgredientItem.sugar.toFixed(4) * indgredientItem.weight
            ).toFixed(4);
            item.value = +countedValue;
          });
          break;
        case 'salt':
          ingredientsList.map((indgredientItem) => {
            const countedValue: string = (
              indgredientItem.salt.toFixed(4) * indgredientItem.weight
            ).toFixed(4);
            item.value = +countedValue;
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
      const filteredData = {
        ingredient_id: data._id,
        costLevel: data.cost_level,
        name: data.name_i18n,
        weight: '0',
        is_opt: false,
        calorie: data.calorie / 10000,
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

    setCalories(
      calories -
        +updatedListOfIngredients[index].calorie.toFixed(2) *
          updatedListOfIngredients[index].weight,
    );

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
      for (const prop in listOfIngredients) {
        filteredListOfIngredients.push({
          value: prop,
          label: listOfIngredients[prop],
        });
      }
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
    const inputs = [...form.elements].filter((i) =>
      ['INPUT', 'SELECT', 'TEXTAREA'].includes(i.nodeName),
    );

    const { errors, hasError } = FormValidator.bulkValidate(inputs);

    setCreateRecipeErrors([...errors]);

    if (!hasError) {
      createRecipe(
        createRecipeForm.recipeName,
        createRecipeForm.recipePreparation,
        createRecipeForm.ingredients,
        createRecipeForm.measurement,
        createRecipeForm.cuisine,
        createRecipeForm.image_ids,
        createRecipeForm.servings_cnt,
        createRecipeForm.time,
        createRecipeForm.totalWeight,
      ).then((response) => response.data.data);
    }
  };

  const getPercent = (value: number) => (value / maxCalories) * 100;

  const [files, setFiles] = React.useState([]);

  const handleChangeFiles = React.useCallback((ids: any[]) => {
    setFiles(ids);
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('app.title.recipe_create')}</title>
      </Helmet>
      <div className='container-fluid recipe_container'>
        <Breadcrumb
          routes={[
            {
              url: routes[MAIN],
              name: MAIN,
            },
            {
              url: routes[RECIPES],
              name: RECIPES,
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

          <div className='row recipe__input-data'>
            <div className='col-12 mb-xl-5'>
              <div className='recipe__input-container'>
                <InputField
                  block
                  name='recipeName'
                  data-validate='["required"]'
                  errors={getFieldErrors('recipeName')}
                  value={createRecipeForm.recipeName}
                  onChange={(e) =>
                    validateOnChange('recipeName', e.target.value, e)
                  }
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
                          option.value === createRecipeForm.servings_cnt,
                      )}
                      options={servingOptions}
                      onChange={(option, e) =>
                        validateOnChange('servings_cnt', option.value, e)
                      }
                      placeholder={t('recipe.serving')}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='col-xl-3'>
              <div className='recipe__input-container'>
                <div className='recipe__label'>
                  <span className='recipe__label-description'>$$$</span>
                  <div className='recipe__label-select'>
                    <SelectInput
                      value={costCategoryOptions.find(
                        (option) => option.value === createRecipeForm.costLevel,
                      )}
                      options={costCategoryOptions}
                      onChange={(option, e) =>
                        validateOnChange('costLevel', option.value, e)
                      }
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
                  name='minTime'
                  data-param='1,4320'
                  data-validate='["min-max"]'
                  value={createRecipeForm.time}
                  onChange={(e) => validateOnChange('time', e.target.value, e)}
                  className='recipe__label-input'
                  min={1}
                  max={4320}
                  border='light'
                />
                <span className='recipe__label-description ml-3'>min</span>
              </label>
            </div>
          </div>
          <div className='recipe__switch'>
            <button
              type='button'
              onClick={() => {
                setCreateRecipeForm({
                  ...createRecipeForm,
                  measurement: 'si',
                });
                return setUnit(t('common.gr'));
              }}
              className={classnames('recipe__switch-button', {
                'recipe__switch-button_active': unit === t('common.gr'),
              })}
            >
              <span>{t('common.gr')}</span>
            </button>
            <button
              type='button'
              onClick={() => {
                setCreateRecipeForm({
                  ...createRecipeForm,
                  measurement: 'us',
                });
                return setUnit(t('common.oz'));
              }}
              className={classnames('recipe__switch-button', {
                'recipe__switch-button_active': unit === t('common.oz'),
              })}
            >
              <span>{t('common.oz')}</span>
            </button>
          </div>
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
                    percent={getPercent(item.value)}
                  />
                </div>
              ))}
              <div className='recipe__chart-progress-value'>
                {calories}
                {t('common.kcal')} /{maxCalories} {t('common.kcal')}
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
                        width: `${getPercent(item.value)}%`,
                        backgroundColor: item.background,
                      }}
                    />
                  </div>
                  <div className='recipe__chart-lines-item-description'>
                    {unit === t('common.gr') ? item.value : getOz(item.value)}{' '}
                    {unit}
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
              <AsyncSelect
                cacheOptions
                loadOptions={inputValueIngredient}
                placeholder={t('recipe.create.name')}
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
                      <span>{ingredientItem.name}</span>
                    </div>

                    <div className='recipe__item-counting'>
                      {composition.map((item) => (
                        <div key={item.id}>
                          {item.namePlural} :{' '}
                          {unit === t('common.gr')
                            ? item.value
                            : getOz(item.value)}{' '}
                          {unit}
                        </div>
                      ))}
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

                            const currentWeight =
                              updatedIngredients[ingredientIndex].weight;

                            let countTotalWeight = 0;

                            if (currentWeight === 0) {
                              return;
                            }
                            if (currentWeight === 1) {
                              updatedIngredients[ingredientIndex].weight = 0;
                            } else {
                              updatedIngredients[ingredientIndex].weight--;
                            }

                            calcComposition(updatedIngredients);

                            const updatedCalories = (
                              calories -
                              createRecipeForm.ingredients[ingredientIndex]
                                .calorie
                            ).toFixed(2);

                            setCalories(+updatedCalories);

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
                          value={
                            unit === t('common.gr')
                              ? createRecipeForm.ingredients[ingredientIndex]
                                  .weight
                              : getOz(
                                  createRecipeForm.ingredients[ingredientIndex]
                                    .weight,
                                )
                          }
                          step={1}
                          onChange={(e) => {
                            const updatedIngredients = [
                              ...createRecipeForm.ingredients,
                            ];
                            // const prevIngredient =
                            //   updatedIngredients[ingredientIndex];
                            let countTotalWeight = 0;

                            updatedIngredients[ingredientIndex].weight =
                              e.target.value;

                            calcComposition(updatedIngredients);

                            // setCalories({
                            //   ...calories,
                            //   value: calories.value += Math.round(
                            //     (updatedIngredients[ingredientIndex].calorie /
                            //       100) *
                            //       updatedIngredients[ingredientIndex].weight -
                            //       (updatedIngredients[ingredientIndex].calorie /
                            //         100) *
                            //         prevIngredient.weight,
                            //   ),
                            // });

                            validateOnChange(
                              'ingredients',
                              updatedIngredients,
                              e,
                            );

                            updatedIngredients.forEach((item) => {
                              countTotalWeight += item.weight;
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

                            updatedIngredients[ingredientIndex].weight++;

                            calcComposition(updatedIngredients);

                            const updatedCalories = (
                              calories +
                              createRecipeForm.ingredients[ingredientIndex]
                                .calorie
                            ).toFixed(2);

                            setCalories(+updatedCalories);

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
                      {ingredientItem.weight} {unit}
                    </div>
                  </div>
                  <div className='recipe__item-opt'>
                    <CustomCheckbox
                      label='Optional'
                      className='recipe__item-opt-checkbox'
                      onChange={(e) => {
                        createRecipeForm.ingredients[ingredientIndex].is_opt =
                          e.target.checked;
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
              step={1}
              value={
                unit === t('common.gr')
                  ? createRecipeForm.totalWeight
                  : getOz(createRecipeForm.totalWeight)
              }
              onChange={(e) =>
                validateOnChange('totalWeight', e.target.value, e)
              }
              min={0}
              height='md'
              label={t('recipe.create.total_weight')}
              border='light'
            />
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
              onChange={(e) =>
                validateOnChange('recipePreparation', e.target.value, e)
              }
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
