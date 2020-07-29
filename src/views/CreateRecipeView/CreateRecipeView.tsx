import React, { useState } from 'react';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import classnames from 'classnames';
import { debounce } from 'lodash';

import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
} from 'utils';
import { 
  searchIngredients,
  createRecipe,
  getIngredient
} from 'api';

//Components
import Button from 'components/common/Forms/Button';
import InputField from 'components/common/Forms/InputField';
import Chart from 'components/common/Chart';
import InputFile from 'components/common/Forms/InputFile';

import './CreateRecipeView.sass';

// Icons
import { ReactComponent as ClockIcon } from 'assets/img/icons/clock-icon.svg';
import { ReactComponent as ArrowLeft } from 'assets/img/icons/arrow-left-gray-icon.svg';
import { ReactComponent as ArrowRight } from 'assets/img/icons/arrow-right-gray-icon.svg';
import { ReactComponent as TrashIcon } from 'assets/img/icons/trash-icon.svg';

import { colourStylesSelect, serving } from './selectsDatas';

const CreateRecipeView = () => {
  const token = localStorage.getItem('authToken');

  const [unit, setUnit] = useState('gr');

  const [isActiveInput, setActiveInput] = useState(true);

  const [createRecipeForm, setCreateRecipeForm] = useState({
    recipeName: '',
    recipePreparation: '',
    ingredients: [],
    cuisine: [],
    image_ids: [],
    servings_cnt: null,
    minTime: null,
    maxTime: null,
  });

  const [proteinFatCarbohydrateValues] = useState({
    fat: 0,
    protein: 0,
    carbohydrate: 0,
    fatId: 0,
    proteinId: 1,
    carbohydrateId:2,
  });

  const [calories, setCalories] = useState({
    value: 0,
    maxCalories: 500,
  });

  const [createRecipeErrors, setCreateRecipeErrors] = useState([]);

  const getFieldErrors = (field: string) => getFieldErrorsUtil(field, createRecipeErrors);

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

  const createRecipeSubmit = e => {
    e.preventDefault();
    createRecipe(
      token,
      createRecipeForm.recipeName,
      createRecipeForm.recipePreparation,
      createRecipeForm.ingredients,
      createRecipeForm.cuisine,
      createRecipeForm.image_ids,
      createRecipeForm.servings_cnt,
      createRecipeForm.minTime,
      createRecipeForm.maxTime,
    ).then(response => {
      const dataRecipe = response.data.data;
      return dataRecipe;
    }).catch(reject => {
      console.log('reject', reject);
    });
  };

  const addIndgredient = e => {
    getIngredient(token, e.value)
      .then(response => {
        const data = response.data.data;
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

        setCreateRecipeForm({...createRecipeForm, ingredients: [
          ...createRecipeForm.ingredients,
          filteredData
        ]});

      });
  };

  const deleteIngredient = index => {
    const updatedListOfIngredients = [...createRecipeForm.ingredients];

    setCalories({...calories, value: calories.value - updatedListOfIngredients[index].calorie * updatedListOfIngredients[index].weight});

    proteinFatCarbohydrateValues.fat -= Math.round(updatedListOfIngredients[index].fat) * updatedListOfIngredients[index].weight;
    proteinFatCarbohydrateValues.protein -= Math.round(updatedListOfIngredients[index].protein) * updatedListOfIngredients[index].weight;
    proteinFatCarbohydrateValues.carbohydrate -= Math.round(updatedListOfIngredients[index].carbohydrate) * updatedListOfIngredients[index].weight;

    updatedListOfIngredients.splice(index, 1);

    setCreateRecipeForm({...createRecipeForm, ingredients: updatedListOfIngredients});
  };
  
  const filterIngredients = async inputValue => {
    let filteredListOfIngredients = [];
    try {
      const response = await searchIngredients(token, inputValue);
      const listOfIngredients = response.data.data;
      for (let prop in listOfIngredients) {
        filteredListOfIngredients.push({ value: prop, label: listOfIngredients[prop], })
      };
      return filteredListOfIngredients;
    } catch {
      return filteredListOfIngredients;
    }
  };
  
  const inputValueIngredient = inputValue => {
    return new Promise(debounce(resolve => {
      resolve(filterIngredients(inputValue)); 
    }, 300));
  };

  const getPercent = (value: number) => value / calories.maxCalories * 100;

  return (
    <div className='container-fluid recipe_container'>
      <h1 className='recipe__title'>Create your recipe</h1>
      <form className='recipe_wrap' onSubmit={e => createRecipeSubmit(e)}>
        <div className='row recipe__photo'>
          <div className='col-3 recipe__photo-layout'>
            <InputFile />
          </div>
          <div className='col-3 recipe__photo-layout'>
            <InputFile />
          </div>
          <div className='col-3 recipe__photo-layout'>
            <InputFile />
          </div>
          <div className='col-3 recipe__photo-layout'>
            <InputFile />
          </div>
        </div>
        <div className='row recipe__input-data'>
          <div className='col-12 mb-5'>
            <div className='recipe__input-container'>
              <InputField
                block
                name='recipeName'
                data-validate='["required"]'
                errors={getFieldErrors('recipeName')}
                value={createRecipeForm.recipeName}
                onChange={e => validateOnChange('recipeName', e.target.value, e)}
                label='Recipe name'
              />
            </div>
          </div>
          <div className='col-3'>
            <div className='recipe__input-container'>
              <div className="recipe__label">
                <span className='recipe__label-description'>Serving</span>   
                <div className="recipe__label-select">
                  <Select 
                    styles={colourStylesSelect}
                    options={serving}
                    onChange={e => setCreateRecipeForm({...createRecipeForm, servings_cnt: e.value})}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='col-3 ml-5'>
            <label className='recipe__label'>
              <span className='recipe__label-description'>
                <ClockIcon />
              </span>
              <InputField
                block
                type='number'
                name='minTime'
                data-param="0,4320"
                data-validate='["min-max"]'
                value={createRecipeForm.minTime}
                onChange={e => validateOnChange('minTime', e.target.value, e)}
                className='recipe__label-input'
                min={0}
                max={4320}
              />
              <InputField
                block
                type='number'
                name='maxTime'
                data-param="0,4320"
                data-validate='["min-max"]'
                value={createRecipeForm.maxTime}
                onChange={e => validateOnChange('maxTime', e.target.value, e)}
                className='recipe__label-input'
                min={0}
                max={4320}
              />
            </label>
          </div>
        </div>
        <div className='recipe__switch'>
          <button
            type="button"
            onClick={() => setUnit('gr')}
            className={classnames('recipe__switch-button', {
              'recipe__switch-button_active': unit === 'gr',
            })}
          >
            <span>gr</span>
          </button>
          <button
            type="button"
            onClick={() => setUnit('oz')}
            className={classnames('recipe__switch-button', {
              'recipe__switch-button_active': unit === 'oz',
            })}
          >
            <span>oz</span>
          </button>
        </div>
        <div className='recipe__chart'>
          <div className='recipe__chart-progress'>
              <div
                className='recipe__chart-progress-item recipe__chart-progress-item_fat'
              >
                <Chart
                  firstColor='#03792B'
                  lastColor='#D5FFBB'
                  percent={getPercent(proteinFatCarbohydrateValues.fat)}
                  id={proteinFatCarbohydrateValues.fatId}
                />
              </div>
              <div
                className='recipe__chart-progress-item recipe__chart-progress-item_carbohydrate'
              >
                <Chart
                  firstColor='#FF8F6F'
                  lastColor='#FAEC45'
                  percent={getPercent(proteinFatCarbohydrateValues.carbohydrate)}
                  id={proteinFatCarbohydrateValues.carbohydrateId}
                />
              </div>
              <div
                className='recipe__chart-progress-item recipe__chart-progress-item_protein'
              >
                <Chart
                  firstColor='#1F39FE'
                  lastColor='#EFD4FF'
                  percent={getPercent(proteinFatCarbohydrateValues.protein)}
                  id={proteinFatCarbohydrateValues.proteinId}
                />
              </div>
            <div className='recipe__chart-progress-value'>{calories.value} kcal / {calories.maxCalories} kcal</div>
          </div>
          <div className='recipe__chart-lines'>
            <div className='recipe__chart-lines-item'>
              <div className='recipe__chart-lines-item-description'>
                Fats
              </div>
              <div className='recipe__chart-lines-item-line'>
                <div
                  className='recipe__chart-lines-item-line-paint'
                  style={{
                    width: `${getPercent(proteinFatCarbohydrateValues.fat)}%`,
                    backgroundColor: '#279A40',
                  }}
                ></div>
              </div>
              <div className='recipe__chart-lines-item-description'>{proteinFatCarbohydrateValues.fat} {unit}</div>
            </div>
            <div className='recipe__chart-lines-item'>
              <div className='recipe__chart-lines-item-description'>
                Carbohydrate
              </div>
              <div className='recipe__chart-lines-item-line'>
                <div
                  className='recipe__chart-lines-item-line-paint'
                  style={{
                    width: `${getPercent(proteinFatCarbohydrateValues.carbohydrate)}%`,
                    backgroundColor: '#FAEC45',
                  }}
                ></div>
              </div>
              <div className='recipe__chart-lines-item-description'>{proteinFatCarbohydrateValues.carbohydrate} {unit}</div>
            </div>
            <div className='recipe__chart-lines-item'>
              <div className='recipe__chart-lines-item-description'>
                Protein
              </div>
              <div className='recipe__chart-lines-item-line'>
                <div
                  className='recipe__chart-lines-item-line-paint'
                  style={{
                    width: `${getPercent(proteinFatCarbohydrateValues.protein)}%`,
                    backgroundColor: '#3070F2',
                  }}
                ></div>
              </div>
              <div className='recipe__chart-lines-item-description'>{proteinFatCarbohydrateValues.protein} {unit}</div>
            </div>
          </div>
        </div>
        <div className="recipe__add">
          <div className='recipe__add-ingredients'>
            <h2 className='recipe__add-ingredients-title'>Ingredient</h2>
            <Button
              size='lg'
              color='secondary'
              onClick={() => setActiveInput(!isActiveInput)}
            >
              Add ingredients
            </Button>
          </div>
          {isActiveInput && (
            <div className='recipe__add-ingredients-field'>
              <AsyncSelect
                cacheOptions
                defaultOptions
                loadOptions={inputValueIngredient}
                placeholder='Enter the name of the recipe'
                onChange={addIndgredient}
                styles={colourStylesSelect}
              />
            </div>
          )}
        </div>
        <div className="recipe__list">
          {createRecipeForm.ingredients.map((ingredientItem, ingredientIndex) => (
              <div
                className={classnames('recipe__item', {
                'recipe__item_full-info': ingredientItem.isFullBlock
                })}
                key={ingredientItem.ingredient_id}>
              <div className='recipe__item-name'>{ingredientItem.name}</div>
              <div className='recipe__item-counting'>
                <div>Fats: {Math.round(ingredientItem.fat) * +createRecipeForm.ingredients[ingredientIndex].weight}</div>
                <div>Carbohydrates: {Math.round(ingredientItem.carbohydrate) * +createRecipeForm.ingredients[ingredientIndex].weight}</div>
                <div>Proteins: {Math.round(ingredientItem.protein) * +createRecipeForm.ingredients[ingredientIndex].weight}</div>
              </div>
              <div className='recipe__item-quantity'>
                <div className='recipe__item-quantity-counter'>
                  <button
                    className='recipe__item-quantity-counter-arrow'
                    type="button"
                    onClick={() => {
                      const updatedIngredients = [...createRecipeForm.ingredients];
                      const updatedWeight = +updatedIngredients[ingredientIndex].weight;
                      
                      if (updatedWeight <= 1) {
                        updatedIngredients[ingredientIndex] = {
                          ...updatedIngredients[ingredientIndex],
                          weight: '0'
                        };
                      } else {
                        updatedIngredients[ingredientIndex] = {
                          ...updatedIngredients[ingredientIndex],
                          weight: updatedWeight - 1
                        };
                      }

                      if (proteinFatCarbohydrateValues.fat > 0) {
                        proteinFatCarbohydrateValues.fat -= Math.round(createRecipeForm.ingredients[ingredientIndex].fat);
                        proteinFatCarbohydrateValues.protein -= Math.round(createRecipeForm.ingredients[ingredientIndex].protein);
                        proteinFatCarbohydrateValues.carbohydrate -= Math.round(createRecipeForm.ingredients[ingredientIndex].carbohydrate);
                        setCalories({...calories, value: calories.value -= createRecipeForm.ingredients[ingredientIndex].calorie });
                      }

                      setCreateRecipeForm({...createRecipeForm, ingredients: updatedIngredients});
                    }}
                  >
                    <ArrowLeft />
                  </button>
                  <InputField
                    type='number'
                    name={`indredients[${ingredientIndex}].weight`}
                    value={createRecipeForm.ingredients[ingredientIndex].weight}
                    onChange={e => {
                      const updatedIngredients = [...createRecipeForm.ingredients];

                      const prevIngredient = updatedIngredients[ingredientIndex];

                      updatedIngredients[ingredientIndex] = {
                        ...updatedIngredients[ingredientIndex],
                        weight: e.target.value
                      };

                      proteinFatCarbohydrateValues.fat += Math.round((updatedIngredients[ingredientIndex].fat * updatedIngredients[ingredientIndex].weight) - (prevIngredient.weight * updatedIngredients[ingredientIndex].fat));
                      proteinFatCarbohydrateValues.protein += Math.round((updatedIngredients[ingredientIndex].protein * updatedIngredients[ingredientIndex].weight) - (prevIngredient.weight * updatedIngredients[ingredientIndex].fat));
                      proteinFatCarbohydrateValues.carbohydrate += Math.round((updatedIngredients[ingredientIndex].carbohydrate * updatedIngredients[ingredientIndex].weight) - (prevIngredient.weight * updatedIngredients[ingredientIndex].fat));
                      setCalories({...calories, value: calories.value += (updatedIngredients[ingredientIndex].calorie * updatedIngredients[ingredientIndex].weight) - (prevIngredient.calorie * updatedIngredients[ingredientIndex].calorie)});

                      validateOnChange('ingredients', updatedIngredients, e);
                    }}
                    height='xs'
                    className='recipe__item-quantity-counter-input'
                    min={0}
                  />
                  <button
                    type="button"
                    className='recipe__item-quantity-counter-arrow'
                    onClick={() => {
                      const updatedIngredients = [...createRecipeForm.ingredients];
                      const updatedWeight = +updatedIngredients[ingredientIndex].weight;

                      updatedIngredients[ingredientIndex] = {
                        ...updatedIngredients[ingredientIndex],
                        weight: updatedWeight + 1
                      }
                      
                      proteinFatCarbohydrateValues.fat += +Math.round(createRecipeForm.ingredients[ingredientIndex].fat);
                      proteinFatCarbohydrateValues.protein += +Math.round(createRecipeForm.ingredients[ingredientIndex].protein);
                      proteinFatCarbohydrateValues.carbohydrate += +Math.round(createRecipeForm.ingredients[ingredientIndex].carbohydrate);
                      setCalories({...calories, value: calories.value += createRecipeForm.ingredients[ingredientIndex].calorie });
                      
                      setCreateRecipeForm({...createRecipeForm, ingredients: updatedIngredients});
                    }}
                  >
                    <ArrowRight />
                  </button>
                </div>
                <div className='recipe__item-quantity-counter-total'>{Math.round(ingredientItem.calorie* +createRecipeForm.ingredients[ingredientIndex].weight)} kcal</div>
              </div>
              <button type="button" className='recipe__item-delete' onClick={() => deleteIngredient(ingredientIndex)}>
                <div className='recipe__item-delete-media'>
                  <TrashIcon />
                </div>
              </button>
              <div className='recipe__item-weight'>
                {ingredientItem.weight} {unit}
              </div>
          </div>
          ))}
        </div>
        <div className="recipe__total-weight">

        </div>
        <div className='instructions'>
          <h2 className='instructions__title'>Preparation instructions</h2>
          <InputField
            block
            type='textarea'
            name='recipePreparation'
            data-validate='["required"]'
            errors={getFieldErrors('recipePreparation')}
            value={createRecipeForm.recipePreparation}
            onChange={e => validateOnChange('recipePreparation', e.target.value, e)}
            rows={16}
            className='instructions__field'
          />
          <div className='instructions__button'>
            <Button
              type="submit"
              color='primary'
            > 
              Add recipe
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateRecipeView;
