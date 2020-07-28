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

import './CreateRecipeView.sass';

// Icons
import { ReactComponent as ClockIcon } from 'assets/img/icons/clock-icon.svg';
import { ReactComponent as ArrowLeft } from 'assets/img/icons/arrow-left-gray-icon.svg';
import { ReactComponent as ArrowRight } from 'assets/img/icons/arrow-right-gray-icon.svg';
import { ReactComponent as TrashIcon } from 'assets/img/icons/trash-icon.svg';

import { priceCategory } from './priceCategory';
import { colourStylesSelect } from './selectStyles';

const maxCalories = 500;

const CreateRecipeView = () => {
  const token = localStorage.getItem('authToken');

  const [unit, setUnit] = useState('gr');

  const [isActiveInput, setActiveInput] = useState(true);

  const [createRecipeForm, setCreateRecipeForm] = useState({
    recipeName: '',
    recipePreparation: '',
    ingredients: [],
    ingredientsWeight: [],
    cuisine: [],
    image_ids: [],
    recipeCost: null,
    minTime: null,
    maxTime: null,
  });

  const [proteinFatCarbohydrate, setProteinFatCarbohydrate] = useState([
    {
      name: 'fat',
      value: 0,
      id: 0,
      firstColorGradient: '#03792B',
      lastColorGradient: '#D5FFBB',
      backgroundColor: '#279A40',
    },
    {
      name: 'carbohydrate',
      value: 0,
      id: 1,
      firstColorGradient: '#FF8F6F',
      lastColorGradient: '#FAEC45',
      backgroundColor: '#FAEC45',
    },
    {
      name: 'protein',
      value: 0,
      id: 2,
      firstColorGradient: '#1F39FE',
      lastColorGradient: '#EFD4FF',
      backgroundColor: '#3070F2',
    }
  ]);

  const [listOfIngredients, setListOfIngredients] = useState([]);

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
      createRecipeForm.recipeCost,
      createRecipeForm.minTime,
      createRecipeForm.maxTime,
    ).then(response => {
      const dataRecipe = response.data.data;
      return dataRecipe;
    }).catch(reject => {
      console.log(reject);
    });
  };

  const addIndgredient = e => {
    getIngredient(token, e.value)
      .then(response => {
        const data = response.data.data;
        setListOfIngredients([...listOfIngredients, data]);
        setCreateRecipeForm({...createRecipeForm, ingredients: [
          ...createRecipeForm.ingredients,
          {
            ingredient_id: data._id,
            weight: 0,
          }
        ]})
      });
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

  const getPercent = (value: number) => value / maxCalories * 100;

  const deleteIngredient = index => {
    console.log('createRecipeForm', createRecipeForm.ingredients);
    console.log('listOfIngredients', listOfIngredients);
    const updatedRenderListOfIngredients = [...listOfIngredients];
    updatedRenderListOfIngredients.splice(index, 1);
    setListOfIngredients(updatedRenderListOfIngredients);
    const updatedListOfIngredients = [...createRecipeForm.ingredients];
    updatedListOfIngredients.splice(index, 1);
    setCreateRecipeForm({...createRecipeForm, ingredients: updatedListOfIngredients});
  };

  return (
    <div className='container-fluid recipe_container'>
      <h1 className='recipe__title'>Create your recipe</h1>
      <form className='recipe_wrap' onSubmit={e => createRecipeSubmit(e)}>
        <div className='row recipe_photo'>
          <div className='col-3'>
            <button type="button" className='recipe__add-photo'>
              <span className='recipe__add-photo-description'>Add photo</span>
            </button>
          </div>
          <div className='col-3'>
            <button type="button" className='recipe__add-photo'>
              <span className='recipe__add-photo-description'>Add photo</span>
            </button>
          </div>
          <div className='col-3'>
            <button type="button" className='recipe__add-photo'>
              <span className='recipe__add-photo-description'>Add photo</span>
            </button>
          </div>
          <div className='col-3'>
            <button type="button" className='recipe__add-photo'>
              <span className='recipe__add-photo-description'>Add photo</span>
            </button>
          </div>
        </div>
        <div className='row recipe__input-data'>
          <div className='col-6'>
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
                <span className='recipe__label-description'>$$$</span>   
                <div className="recipe__label-select">           
                  <Select 
                    styles={colourStylesSelect}
                    options={priceCategory}
                    onChange={e => setCreateRecipeForm({...createRecipeForm, recipeCost: e.value})}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='col-3'>
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
                onChange={e => validateOnChange('minTime', e.target.value, e,)}
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
            {proteinFatCarbohydrate.map(item => (
              <div
                key={item.id}
                className={`recipe__chart-progress-item recipe__chart-progress-item_${item.name}`}
              >
                <Chart
                  firstColor={item.firstColorGradient}
                  lastColor={item.lastColorGradient}
                  percent={getPercent(item.value)}
                  id={item.id}
                />
              </div>
              ))}
            <div className='recipe__chart-progress-value'>0 kcal /{maxCalories} kcal</div>
          </div>
          <div className='recipe__chart-lines'>
            {proteinFatCarbohydrate.map(item => (
              <div
                key={item.id}
                className='recipe__chart-lines-item'>
                <div className='recipe__chart-lines-item-description'>
                  {item.name}
                </div>
                <div className='recipe__chart-lines-item-line'>
                  <div
                    className='recipe__chart-lines-item-line-paint'
                    style={{
                      width: getPercent(item.value),
                      backgroundColor: item.backgroundColor,
                    }}
                  ></div>
                </div>
                <div className='recipe__chart-lines-item-description'>{`${item.value} ${unit}`}</div>
              </div>
              ))}
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
          {listOfIngredients.map((item, index) => {
            return (
              <div className='recipe__item recipe__item_full-info' key={item._id}>
              <div className='recipe__item-name'>{item.name_i18n}</div>
              <div className='recipe__item-counting'>
                <div>Carbohydrates: {item.carbohydrate}</div>
                <div>Protein: {item.protein}</div>
                <div>Fats: {item.fat}</div>
              </div>
              <div className='recipe__item-quantity'>
                <div className='recipe__item-quantity-counter'>
                  <button
                    type="button"
                    className='recipe__item-quantity-counter-arrow'
                    // onClick={() => {
                    //   if (createRecipeForm.ingredientCount === '0' || !createRecipeForm.ingredientCount) {
                    //     setCreateRecipeForm({
                    //       ...createRecipeForm,
                    //       ingredientCount: '0'
                    //     })
                    //   } else {
                    //     const count = +createRecipeForm.ingredientCount - 1;
                    //     setCreateRecipeForm({
                    //       ...createRecipeForm,
                    //       ingredientCount: count.toString(),
                    //     })
                    //   }
                    // }}
                  >
                    <ArrowLeft />
                  </button>
                  <InputField
                    type='number'
                    value='0'
                    height='xs'
                    className='recipe__item-quantity-counter-input'
                    min={0}
                  />
                  <button
                    type="button"
                    className='recipe__item-quantity-counter-arrow'
                    // onClick={() => {
                    //     const count = +createRecipeForm.ingredientCount + 1;
                    //     setCreateRecipeForm({
                    //       ...createRecipeForm,
                    //       ingredientCount: count.toString(),
                    //     })
                    //   }
                    // }
                  >
                    <ArrowRight />
                  </button>
                </div>
                <div className='recipe__item-quantity-counter-total'>{item.calorie} kcal</div>
              </div>
              <button type="button" className='recipe__item-delete' onClick={() => deleteIngredient(index)}>
                <div className='recipe__item-delete-media'>
                  <TrashIcon />
                </div>
              </button>
              <div className='recipe__item-weight'>
                0 {unit}
              </div>
          </div>
          )})}
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
