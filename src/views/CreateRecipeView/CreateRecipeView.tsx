/* eslint-disable array-callback-return */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import classnames from 'classnames';

import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
  getTranslate,
} from 'utils';
import { searchIngredients, createRecipe, getIngredient } from 'api';
import FormValidator from 'utils/FormValidator';

import { getOz } from 'utils/getOz';

// Components
import Button from 'components/common/Forms/Button';
import InputField from 'components/common/Forms/InputField';
import CustomCheckbox from 'components/common/Forms/CustomCheckbox';
import WithTranslate from 'components/hoc/WithTranslate';
import DonutChart from 'components/common/charts/DonutChart';
import ImagesFileInput from 'components/common/Forms/ImagesFileInput';

import './CreateRecipeView.sass';

// Icons
import { ReactComponent as ClockIcon } from 'assets/img/icons/clock-icon.svg';
import { ReactComponent as ArrowLeft } from 'assets/img/icons/arrow-left-gray-icon.svg';
import { ReactComponent as ArrowRight } from 'assets/img/icons/arrow-right-gray-icon.svg';
import { ReactComponent as TrashIcon } from 'assets/img/icons/trash-icon.svg';

import { colourStylesSelect, servingOptions } from './selectsDatas';

const CreateRecipeView = (props: any) => {
  const t = (code: string) => getTranslate(props.localePhrases, code);

  const [unit, setUnit] = useState(t('common.gr'));

  const [isActiveInput, setActiveInput] = useState(false);

  // need add possibility to change measurement
  const [createRecipeForm, setCreateRecipeForm] = useState({
    recipeName: '',
    recipePreparation: '',
    ingredients: [],
    measurement: 'si',
    cuisine: [],
    image_ids: [],
    servings_cnt: null,
    minTime: null,
    maxTime: null,
    totalWeight: '0',
  });

  const [proteinFatCarbohydrate] = useState([
    {
      name: t('common.fat'),
      namePlural: t('common.fats'),
      value: 0,
      id: 0,
      firstColorGradient: '#03792B',
      lastColorGradient: '#D5FFBB',
      background: '#279A40',
    },
    {
      name: t('common.carbohydrate'),
      namePlural: t('common.carbohydrates'),
      value: 0,
      id: 1,
      firstColorGradient: '#FF8F6F',
      lastColorGradient: '#FAEC45',
      background: '#FFB56E',
    },
    {
      name: t('common.protein'),
      namePlural: t('common.proteins'),
      value: 0,
      id: 2,
      firstColorGradient: '#1F39FE',
      lastColorGradient: '#EFD4FF',
      background: '#3070F2',
    },
  ]);

  const [calories, setCalories] = useState({
    value: 0,
    maxCalories: 500,
  });

  const [createRecipeErrors, setCreateRecipeErrors] = useState([]);

  const calcProteinFatCarbohydrate = (ingredientsList: Array<any>) => {
    proteinFatCarbohydrate.map((item) => {
      item.value = 0;
      if (item.name === 'fat') {
        ingredientsList.map((indgredientItem) => {
          const countedValue: string = (
            indgredientItem.fat.toFixed(4) * indgredientItem.weight
          ).toFixed(4);
          item.value = +countedValue;
        });
      } else if (item.name === 'carbohydrate') {
        ingredientsList.map((indgredientItem) => {
          const countedValue: string = (
            indgredientItem.carbohydrate.toFixed(4) * indgredientItem.weight
          ).toFixed(4);
          item.value = +countedValue;
        });
      } else if (item.name === 'protein') {
        ingredientsList.map((indgredientItem) => {
          const countedValue: string = (
            indgredientItem.protein.toFixed(4) * indgredientItem.weight
          ).toFixed(4);
          item.value = +countedValue;
        });
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
      element
    );
  };

  const getFieldErrors = (field: string) =>
    getFieldErrorsUtil(field, createRecipeErrors);

  const addIndgredient = (e) => {
    getIngredient(e.value).then((response) => {
      const { data } = response.data;
      const filteredData = {
        ingredient_id: data._id,
        name: data.name_i18n,
        weight: '0',
        is_opt: false,
        calorie: data.calorie / 1000,
        carbohydrate: data.carbohydrate / 1000,
        protein: data.protein / 1000,
        fat: data.fat / 1000,
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
    let countTotalWeight: number = +createRecipeForm.totalWeight;

    setCalories({
      ...calories,
      value:
        calories.value -
        updatedListOfIngredients[index].calorie *
          updatedListOfIngredients[index].weight,
    });

    updatedListOfIngredients.splice(index, 1);

    calcProteinFatCarbohydrate(updatedListOfIngredients);

    countTotalWeight -= createRecipeForm.ingredients[index].weight;

    setCreateRecipeForm({
      ...createRecipeForm,
      ingredients: updatedListOfIngredients,
      totalWeight: `${countTotalWeight}`,
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
      ['INPUT', 'SELECT', 'TEXTAREA'].includes(i.nodeName)
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
        createRecipeForm.minTime,
        createRecipeForm.maxTime,
        createRecipeForm.totalWeight
      ).then((response) => response.data.data);
    }
  };

  const getPercent = (value: number) => (value / calories.maxCalories) * 100;

  const [files, setFiles] = React.useState([]);

  const handleChangeFiles = React.useCallback((ids: any[]) => {
    setFiles(ids);
  }, []);

  return (
    <div className='container-fluid recipe_container'>
      <h1 className='recipe__title'>{t('recipe.create.title')}</h1>
      <form className='recipe_wrap' onSubmit={(e) => createRecipeSubmit(e)}>
        <ImagesFileInput
          dropElement={document.querySelector('#root')}
          filesOut={files}
          onLoadFiles={handleChangeFiles}
          initFiles={[]}
          additionalFiles={[]}
        >
          {({ open, isDisabled }) => {
            if (isDisabled) {
              return null;
            }

            return (
              <Button className='mt-4' onClick={open}>
                Add file
              </Button>
            );
          }}
        </ImagesFileInput>

        <div className='row recipe__input-data mt-4'>
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
                  <Select
                    styles={colourStylesSelect}
                    options={servingOptions}
                    onChange={(e) =>
                      setCreateRecipeForm({
                        ...createRecipeForm,
                        servings_cnt: e.value,
                      })
                    }
                    placeholder={t('recipe.serving')}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='col-xl-3 ml-xl-5'>
            <label className='recipe__label'>
              <span className='recipe__label-description'>
                <ClockIcon />
              </span>
              <InputField
                block
                type='number'
                name='minTime'
                data-param='0,4320'
                data-validate='["min-max"]'
                value={createRecipeForm.minTime}
                onChange={(e) => validateOnChange('minTime', e.target.value, e)}
                className='recipe__label-input'
                min={0}
                max={4320}
                border='light'
              />
              <InputField
                block
                type='number'
                name='maxTime'
                data-param='0,4320'
                data-validate='["min-max"]'
                value={createRecipeForm.maxTime}
                onChange={(e) => validateOnChange('maxTime', e.target.value, e)}
                className='recipe__label-input'
                min={+createRecipeForm.minTime + 1}
                max={4320}
                border='light'
              />
            </label>
          </div>
        </div>
        <div className='recipe__switch'>
          <button
            type='button'
            onClick={() => setUnit(t('common.gr'))}
            className={classnames('recipe__switch-button', {
              'recipe__switch-button_active': unit === t('common.gr'),
            })}
          >
            <span>{t('common.gr')}</span>
          </button>
          <button
            type='button'
            onClick={() => setUnit(t('common.oz'))}
            className={classnames('recipe__switch-button', {
              'recipe__switch-button_active': unit === t('common.oz'),
            })}
          >
            <span>{t('common.oz')}</span>
          </button>
        </div>
        <div className='recipe__chart'>
          <div className='recipe__chart-progress'>
            {proteinFatCarbohydrate.map((item) => (
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
              {calories.value}
              {t('common.kcal')} /{calories.maxCalories} {t('common.kcal')}
            </div>
          </div>
          <div className='recipe__chart-lines'>
            {proteinFatCarbohydrate.map((item) => (
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
            <Button
              size='lg'
              color='secondary'
              onClick={() => setActiveInput(!isActiveInput)}
            >
              {t('ingr.add')}
            </Button>
          </div>
          {isActiveInput && (
            <div className='recipe__add-ingredients-field'>
              <AsyncSelect
                cacheOptions
                loadOptions={inputValueIngredient}
                placeholder={t('recipe.create.name')}
                onChange={addIndgredient}
                styles={colourStylesSelect}
              />
            </div>
          )}
        </div>
        <div className='recipe__list'>
          {createRecipeForm.ingredients.map(
            (ingredientItem, ingredientIndex) => {
              return (
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
                      {proteinFatCarbohydrate.map((item) => (
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
                            const updatedWeight = +updatedIngredients[
                              ingredientIndex
                            ].weight;
                            let countTotalWeight = 0;

                            if (updatedWeight <= 1) {
                              updatedIngredients[ingredientIndex] = {
                                ...updatedIngredients[ingredientIndex],
                                weight: '0',
                              };
                            } else {
                              updatedIngredients[ingredientIndex] = {
                                ...updatedIngredients[ingredientIndex],
                                weight: updatedWeight - 1,
                              };
                            }

                            calcProteinFatCarbohydrate(updatedIngredients);
                            setCalories({
                              ...calories,
                              value: calories.value -=
                                createRecipeForm.ingredients[
                                  ingredientIndex
                                ].calorie,
                            });

                            updatedIngredients.forEach((item) => {
                              countTotalWeight += +item.weight;
                            });

                            setCreateRecipeForm({
                              ...createRecipeForm,
                              ingredients: updatedIngredients,
                              totalWeight: `${countTotalWeight}`,
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
                                    .weight
                                )
                          }
                          step={0.1}
                          onChange={(e) => {
                            const updatedIngredients = [
                              ...createRecipeForm.ingredients,
                            ];
                            const prevIngredient =
                              updatedIngredients[ingredientIndex];
                            let countTotalWeight = 0;

                            updatedIngredients[ingredientIndex] = {
                              ...updatedIngredients[ingredientIndex],
                              weight: e.target.value,
                            };

                            calcProteinFatCarbohydrate(updatedIngredients);

                            setCalories({
                              ...calories,
                              value: calories.value += Math.round(
                                updatedIngredients[ingredientIndex].calorie *
                                  updatedIngredients[ingredientIndex].weight -
                                  prevIngredient.weight *
                                    updatedIngredients[ingredientIndex].calorie
                              ),
                            });

                            validateOnChange(
                              'ingredients',
                              updatedIngredients,
                              e
                            );

                            updatedIngredients.forEach((item) => {
                              countTotalWeight += +item.weight;
                            });

                            setCreateRecipeForm({
                              ...createRecipeForm,
                              ingredients: updatedIngredients,
                              totalWeight: `${countTotalWeight}`,
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
                            const updatedWeight = +updatedIngredients[
                              ingredientIndex
                            ].weight;
                            let countTotalWeight = 0;

                            updatedIngredients[ingredientIndex] = {
                              ...updatedIngredients[ingredientIndex],
                              weight: updatedWeight + 1,
                            };

                            calcProteinFatCarbohydrate(updatedIngredients);
                            setCalories({
                              ...calories,
                              value: calories.value += Math.round(
                                createRecipeForm.ingredients[ingredientIndex]
                                  .calorie
                              ),
                            });

                            updatedIngredients.forEach((item) => {
                              countTotalWeight += +item.weight;
                            });

                            setCreateRecipeForm({
                              ...createRecipeForm,
                              ingredients: updatedIngredients,
                              totalWeight: `${countTotalWeight}`,
                            });
                          }}
                        >
                          <ArrowRight />
                        </button>
                      </div>
                      <div className='recipe__item-quantity-counter-total'>
                        <span>
                          {Math.round(
                            ingredientItem.calorie *
                              +createRecipeForm.ingredients[ingredientIndex]
                                .weight
                          )}{' '}
                          {t('common.kcal')}
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
              );
            }
          )}
        </div>
        <div className='recipe__total-weight'>
          <InputField
            block
            type='number'
            name='totalWeight'
            step={0.1}
            value={
              unit === t('common.gr')
                ? createRecipeForm.totalWeight
                : getOz(+createRecipeForm.totalWeight)
            }
            onChange={(e) => validateOnChange('totalWeight', e.target.value, e)}
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
          <div className='instructions__button'>
            <Button type='submit' color='primary'>
              {t('recipe.add')}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default WithTranslate(connect(null)(CreateRecipeView));
