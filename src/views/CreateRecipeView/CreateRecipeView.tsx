import React, { useState } from 'react';
import classnames from 'classnames';

import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
} from 'utils';

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
import { ReactComponent as PlusIcon } from 'assets/img/icons/plus-icon-blue.svg';

import { recipeData } from './mockData';

const CreateRecipeView = () => {
  const [unit, setUnit] = useState('gr');

  const [isActiveInput, setActiveInput] = useState(false);

  const [recipeQuantityInfoForm, setRecipeQuantityInfoForm] = useState({
    count: 5,
  });

  const [recipeInfoForm, setRecipeInfoForm] = useState({
    name: '',
    money: '',
    startTime: '',
    finishTime: '',
  });

  const [ingredientInfoForm, setIngredientInfoForm] = useState({
    name: '',
  });

  const [instructionsInfoForm, setInstructionsInfoForm] = useState({
    value: '',
  });

  const [recipeInfoErrors, setRecipeInfoErrors] = useState([]);

  const validateOnChange = (
    name: string,
    value: any,
    event,
    data,
    changeData,
    element?
  ) => {
    validateFieldOnChange(
      name,
      value,
      event,
      data,
      changeData,
      recipeInfoErrors,
      setRecipeInfoErrors,
      element
    );
  };

  return (
      <div className='container-fluid recipe_container'>
        <h1 className='recipe__title'>Create your recipe</h1>
        <div className='recipe_wrap'>
          <div className='row recipe_photo'>
            <div className='col-3'>
              <button className='recipe__add-photo'>
                <span className='recipe__add-photo-description'>
                  Add photo
                </span>
              </button>
            </div>
            <div className='col-3'>
              <button className='recipe__add-photo'>
                <span className='recipe__add-photo-description'>
                  Add photo
                </span>
              </button>
            </div>
            <div className='col-3'>
              <button className='recipe__add-photo'>
                <span className='recipe__add-photo-description'>
                  Add photo
                </span>
              </button>
            </div>
            <div className='col-3'>
              <button className='recipe__add-photo'>
                <span className='recipe__add-photo-description'>
                  Add photo
                </span>
              </button>
            </div>
          </div>
          <div className='row recipe__input-data'>
            <div className='col-6'>
              <div className='recipe__input-container'>
                <InputField
                  block
                  type='text'
                  value={recipeInfoForm.name}
                  onChange={(e) =>
                    validateOnChange('name', e.target.value, e, recipeInfoForm, setRecipeInfoForm)
                  }
                  label='Recipe name'
                />
              </div>
            </div>
            <div className='col-3'>
              <div className='recipe__input-container'>
                <InputField
                  block
                  type='number'
                  value={recipeInfoForm.money}
                  onChange={(e) =>
                    validateOnChange('money', e.target.value, e, recipeInfoForm, setRecipeInfoForm)
                  }
                  label='$$$'
                />
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
                  value={recipeInfoForm.startTime}
                  onChange={(e) =>
                    validateOnChange('startTime', e.target.value, e, recipeInfoForm, setRecipeInfoForm)
                  }
                  className='recipe__label-input'
                />
                <InputField
                  block
                  type='number'
                  value={recipeInfoForm.finishTime}
                  onChange={(e) =>
                    validateOnChange('finishTime', e.target.value, e, recipeInfoForm, setRecipeInfoForm)
                  }
                  className='recipe__label-input'
                />
              </label>
            </div>
          </div>
          <div className='recipe__switch'>
            <button
              onClick={() => setUnit('gr')}
              className={classnames('recipe__switch-button', {
                'recipe__switch-button_active': unit === 'gr',
              })}
            >
              <span>gr</span>
            </button>
            <button
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
              {recipeData.ingredients.map(item => {
                return (
                  <div className={`recipe__chart-progress-item recipe__chart-progress-item_${item.name}`}>
                    <Chart firstColor={item.firstColorGradient} lastColor={item.lastColorGradient} percent={1} id={item.id} />
                  </div>
                )
              })}
              <div className='recipe__chart-progress-value'>
                0 kcal /444 kcal
              </div>
            </div>
            <div className='recipe__chart-lines'>
              {recipeData.ingredients.map(item => {
                  return (
                    <div className="recipe__chart-lines-item">
                      <div className="recipe__chart-lines-item-description">{item.name}</div>
                        <div className="recipe__chart-lines-item-line">
                          <div className="recipe__chart-lines-item-line-paint" style={{
                            'width': 1,
                            'backgroundColor': item.backgroundColor,
                          }}>
                          </div>
                        </div>
                      <div className="recipe__chart-lines-item-description">{`${item.value} ${unit}`}</div>
                    </div>
                  )
                })}
            </div>
          </div>
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
              <InputField
                block
                type='text'
                value={ingredientInfoForm.name}
                onChange={(e) =>
                  validateOnChange('name', e.target.value, e, ingredientInfoForm, setIngredientInfoForm)
                }
                placeholder='Garlic clove (optional) €€€'
              />
              <button className='recipe__add-ingredients-field-button'>
                <PlusIcon />
              </button>
            </div>
          )}
          <div className='recipe__item'>
            <div className='recipe__item-name'>
              Garlic clove (optional) €€€
            </div>
            <div className='recipe__item-counting'>
              {recipeData.ingredients.map((item) => (
                <div key={item.id}>{`${item.name} ${item.value}`}</div>
              ))}
            </div>
            <div className='recipe__item-quantity'>
              <div className='recipe__item-quantity-counter'>
                <button
                  className='recipe__item-quantity-counter-arrow'
                  onClick={() =>
                    setRecipeQuantityInfoForm(
                      recipeQuantityInfoForm.count === 0
                        ? { ...recipeQuantityInfoForm, count: 0 }
                        : {
                            ...recipeQuantityInfoForm,
                            count: +recipeQuantityInfoForm.count - 1,
                          }
                    )
                  }
                >
                  <ArrowLeft />
                </button>
                <InputField
                  type='number'
                  min={0}
                  value={`${recipeQuantityInfoForm.count}`}
                  onChange={(e) =>
                    validateOnChange('count', e.target.value, e, recipeQuantityInfoForm, setRecipeQuantityInfoForm)
                  }
                  height='xs'
                  className='recipe__item-quantity-counter-input'
                />
                <button
                  className='recipe__item-quantity-counter-arrow'
                  onClick={() =>
                    setRecipeQuantityInfoForm({
                      ...recipeQuantityInfoForm,
                      count: +recipeQuantityInfoForm.count + 1,
                    })
                  }
                >
                  <ArrowRight />
                </button>
              </div>
              <div className='recipe__item-quantity-counter-total'>
                0 kcal
              </div>
            </div>
            <button className='recipe__item-delete'>
              <div className='recipe__item-delete-media'>
                <TrashIcon />
              </div>
            </button>
            <div className='recipe__item-weight'>
              {recipeData.weight} {unit}
            </div>
          </div>
          <div className='recipe__item recipe__item_full-info'>
            <div className='recipe__item-name'>
              Garlic clove (optional) €€€
            </div>
            <div className='recipe__item-counting'>
              {recipeData.ingredients.map((item) => (
                <div key={item.id}>{`${item.name} ${item.value}`}</div>
              ))}
            </div>
            <div className='recipe__item-quantity'>
              <div className='recipe__item-quantity-counter'>
                <button
                  className='recipe__item-quantity-counter-arrow'
                  onClick={() =>
                    setRecipeQuantityInfoForm(
                      recipeQuantityInfoForm.count === 0
                        ? { ...recipeQuantityInfoForm, count: 0 }
                        : {
                            ...recipeQuantityInfoForm,
                            count: +recipeQuantityInfoForm.count - 1,
                          }
                    )
                  }
                >
                  <ArrowLeft />
                </button>
                <InputField
                  type='number'
                  min={0}
                  value={`${recipeQuantityInfoForm.count}`}
                  onChange={(e) =>
                    validateOnChange('count', e.target.value, e, recipeQuantityInfoForm, setRecipeQuantityInfoForm)
                  }
                  height='xs'
                  className='recipe__item-quantity-counter-input'
                />
                <button
                  className='recipe__item-quantity-counter-arrow'
                  onClick={() =>
                    setRecipeQuantityInfoForm({
                      ...recipeQuantityInfoForm,
                      count: +recipeQuantityInfoForm.count + 1,
                    })
                  }
                >
                  <ArrowRight />
                </button>
              </div>
              <div className='recipe__item-quantity-counter-total'>
                0 kcal
              </div>
            </div>
            <button className='recipe__item-delete'>
              <div className='recipe__item-delete-media'>
                <TrashIcon />
              </div>
            </button>
            <div className='recipe__item-weight'>
              {recipeData.weight} {unit}
            </div>
          </div>
          <div className='instructions'>
            <h2 className='instructions__title'>Preparation instructions</h2>
            <InputField
              block
              type='textarea'
              value={instructionsInfoForm.value}
              onChange={(e) =>
                validateOnChange('value', e.target.value, e, instructionsInfoForm, setInstructionsInfoForm)
              }
              rows={16}
              className='instructions__field'
            />
            <div className='instructions__button'>
              <Button
                color='primary'
                onClick={() => setActiveInput(!isActiveInput)}
              >
                Add recipe
              </Button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default CreateRecipeView;
