import React, { useState } from 'react';
import classnames from 'classnames';
import './CreateRecipesView.sass';

//Components
import Button from 'components/common/Forms/Button';
import InputField from 'components/common/Forms/InputField';

// Icons
import { ReactComponent as ClockIcon } from 'assets/img/icons/clock-icon.svg';
import { ReactComponent as ArrowLeft } from 'assets/img/icons/arrow-left-gray-icon.svg';
import { ReactComponent as ArrowRight } from 'assets/img/icons/arrow-right-gray-icon.svg';
import { ReactComponent as TrashIcon } from 'assets/img/icons/trash-icon.svg';
import { ReactComponent as PlusIcon } from 'assets/img/icons/plus-icon-blue.svg';

import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
} from 'utils';

import { ingredientsData } from './mockData';

const CreateRecipesView = () => {
  const [unit, setUnit] = useState('gr');

  const [isActiveInput, setActiveInput] = useState(false);

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

  const [recipesQuantityInfoForm, setRecipesQuantityInfoForm] = useState({
    count: 5,
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

  const getPercent = (val: number) => {
    let amount: number = 0;
    ingredientsData.forEach((item) => (amount += item.value));
    return (val / amount) * 100;
  };

  return (
      <div className='container-fluid recipes_container'>
        <h1 className='recipes__title'>Create your recipe</h1>
        <div className='recipes_wrap'>
          <div className='row recipes_photo'>
            <div className='col-3'>
              <button className='recipes__add-photo'>
                <span className='recipes__add-photo-description'>
                  Add photo
                </span>
              </button>
            </div>
            <div className='col-3'>
              <button className='recipes__add-photo'>
                <span className='recipes__add-photo-description'>
                  Add photo
                </span>
              </button>
            </div>
            <div className='col-3'>
              <button className='recipes__add-photo'>
                <span className='recipes__add-photo-description'>
                  Add photo
                </span>
              </button>
            </div>
            <div className='col-3'>
              <button className='recipes__add-photo'>
                <span className='recipes__add-photo-description'>
                  Add photo
                </span>
              </button>
            </div>
          </div>
          <div className='row recipes__input-data'>
            <div className='col-6'>
              <div className='recipes__input-container'>
                <InputField
                  block
                  type='text'
                  value={recipeInfoForm.name}
                  onChange={(e) =>
                    validateOnChange('name', e.target.value, e, recipeInfoForm, setRecipeInfoForm)
                  }
                  label='Recipe name'
                  labelSize='l'
                />
              </div>
            </div>
            <div className='col-3'>
              <div className='recipes__input-container'>
                <InputField
                  block
                  type='number'
                  value={recipeInfoForm.money}
                  onChange={(e) =>
                    validateOnChange('money', e.target.value, e, recipeInfoForm, setRecipeInfoForm)
                  }
                  label='$$$'
                  labelSize='l'
                />
              </div>
            </div>
            <div className='col-3'>
              <label className='recipes__label'>
                <span className='recipes__label-description'>
                  <ClockIcon />
                </span>
                <InputField
                  block
                  type='number'
                  value={recipeInfoForm.startTime}
                  onChange={(e) =>
                    validateOnChange('startTime', e.target.value, e, recipeInfoForm, setRecipeInfoForm)
                  }
                  className='recipes__label-input'
                />
                <InputField
                  block
                  type='number'
                  value={recipeInfoForm.finishTime}
                  onChange={(e) =>
                    validateOnChange('finishTime', e.target.value, e, recipeInfoForm, setRecipeInfoForm)
                  }
                  className='recipes__label-input'
                />
              </label>
            </div>
          </div>
          <div className='recipes__switch'>
            <button
              onClick={() => setUnit('gr')}
              className={classnames('recipes__switch-button', {
                'recipes__switch-button_active': unit === 'gr',
              })}
            >
              <span>gr</span>
            </button>
            <button
              onClick={() => setUnit('oz')}
              className={classnames('recipes__switch-button', {
                'recipes__switch-button_active': unit === 'oz',
              })}
            >
              <span>oz</span>
            </button>
          </div>
          <div className='recipes__chart'>
            <div className='recipes__chart-progress'>
              <div className="recipes__chart-progress-item recipes__chart-progress-item_fat">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="155 155 310 310" style={{
                  "transform": "rotate(-90deg)",
                   "overflow": "visible;"
                }}>
                  <linearGradient id="grd_3wq389fe29iq" x1="0%" y1="0%" x2="0%" y2="100%" gradientTransform="rotate(90, .5, .5)">
                    <stop offset="0" stop-color="#03792B"></stop>
                    <stop offset="100" stop-color="#D5FFBB"></stop>
                    </linearGradient><circle cx="310" cy="310" r="147.5" stroke="#F5F7FA" stroke-width="15" fill="none"></circle>
                    <circle cx="310" cy="310" r="147.5" fill="none" stroke-width="15" stroke-dasharray={851 + getPercent(ingredientsData.find(item => item.name === 'Fat').value)} stroke-dashoffset="778.4866595595507" stroke-linecap="round" stroke="url(#grd_3wq389fe29iq)" style={{
                      "transition": "stroke-dashoffset 400ms ease 0s"
                    }}></circle>
                </svg>
              </div>
              <div className="recipes__chart-progress-item recipes__chart-progress-item_carbohydrate">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="125 125 250 250" style={{
                  "transform": "rotate(-90deg)",
                  "overflow": "visible"
                }}>
                  <linearGradient id="grd_mokit9bj1f2p" x1="0%" y1="0%" x2="0%" y2="100%" gradientTransform="rotate(50, .5, .5)">
                    <stop offset="0" stop-color="#FF8F6F"></stop>
                    <stop offset="100" stop-color="#FAEC45"></stop>
                    </linearGradient><circle cx="250" cy="250" r="117.5" stroke="#F5F7FA" stroke-width="15" fill="none"></circle>
                    <circle cx="250" cy="250" r="117.5" fill="none" stroke-width="15" stroke-dasharray={630 + getPercent(ingredientsData.find(item => item.name === 'Carbohydrate').value)} stroke-dashoffset="524.1747342514569" stroke-linecap="round" stroke="url(#grd_mokit9bj1f2p)" style={{
                      "transition": "stroke-dashoffset 400ms ease 0s"
                    }}></circle>
                </svg>
              </div>
              <div className="recipes__chart-progress-item recipes__chart-progress-item_protein">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="95 95 190 190" style={{
                  "transform": "rotate(-90deg)",
                  "overflow": "visible"
                }}>
                  <linearGradient id="grd_rd9tjx4dwdzq" x1="0%" y1="0%" x2="0%" y2="100%" gradientTransform="rotate(35, .5, .5)">
                    <stop offset="0" stop-color="#1F39FE"></stop>
                    <stop offset="100" stop-color="#EFD4FF"></stop>
                    </linearGradient><circle cx="190" cy="190" r="87.5" stroke="#F5F7FA" stroke-width="15" fill="none"></circle>
                    <circle cx="190" cy="190" r="87.5" fill="none" stroke-width="15" stroke-dasharray={400 + getPercent(ingredientsData.find(item => item.name === 'Protein').value)} stroke-dashoffset="252.89820861397834" stroke-linecap="round" stroke="url(#grd_rd9tjx4dwdzq)" style={{
                      "transition": "stroke-dashoffset 400ms ease 0s"
                    }}></circle>
                </svg>
              </div>
              <div className='recipes__chart-progress-value'>
                0 kcal /444 kcal
              </div>
            </div>
            <div className='recipes__chart-lines'>
              {ingredientsData.map(item => {
                  return (
                    <div className="recipes__chart-lines-item">
                      <div className="recipes__chart-lines-item-description">{item.name}</div>
                        <div className="recipes__chart-lines-item-line">
                          <div className="recipes__chart-lines-item-line-paint" style={{
                            'width': getPercent(item.value),
                            'backgroundColor': item.color,
                          }}>
                          </div>
                        </div>
                      <div className="recipes__chart-lines-item-description">{`${item.value} ${unit}`}</div>
                    </div>
                  )
                })}
            </div>
          </div>
          <div className='recipes__add-ingredients'>
            <h2 className='recipes__add-ingredients__title'>Ingredient</h2>
            <Button
              size='lg'
              color='secondary'
              onClick={() => setActiveInput(!isActiveInput)}
            >
              Add ingredients
            </Button>
          </div>
          {isActiveInput && (
            <div className='recipes__add-ingredients-field'>
              <InputField
                block
                type='text'
                value={ingredientInfoForm.name}
                onChange={(e) =>
                  validateOnChange('name', e.target.value, e, ingredientInfoForm, setIngredientInfoForm)
                }
                placeholder='Garlic clove (optional) €€€'
              />
              <button className='recipes__add-button'>
                <PlusIcon />
              </button>
            </div>
          )}
          <div className='recipes__item'>
            <div className='recipes__item-name'>
              Garlic clove (optional) €€€
            </div>
            <div>
              {ingredientsData[2].value} {unit}
            </div>
          </div>
          <div className='recipes__item-full-info'>
            <div className='recipes__item-full-info-name'>
              Garlic clove (optional) €€€
            </div>
            <div className='recipes__item-full-info-counting'>
              {ingredientsData.map((item) => (
                <div key={item.id}>{`${item.name} ${item.value}`}</div>
              ))}
            </div>
            <div className='recipes__item-full-info-quantity'>
              <div className='recipes__item-full-info-quantity-counter'>
                <button
                  className='recipes__item-full-info-quantity-counter-arrow'
                  onClick={() =>
                    setRecipesQuantityInfoForm(
                      recipesQuantityInfoForm.count === 0
                        ? { ...recipesQuantityInfoForm, count: 0 }
                        : {
                            ...recipesQuantityInfoForm,
                            count: recipesQuantityInfoForm.count - 1,
                          }
                    )
                  }
                >
                  <ArrowLeft />
                </button>
                <InputField
                  type='number'
                  min={0}
                  value={`${recipesQuantityInfoForm.count}`}
                  onChange={(e) =>
                    validateOnChange('count', e.target.value, e, recipesQuantityInfoForm, setRecipesQuantityInfoForm)
                  }
                  size='s'
                  className='recipes__item-full-info-quantity-counter-input'
                />
                <button
                  className='recipes__item-full-info-quantity-counter-arrow'
                  onClick={() =>
                    setRecipesQuantityInfoForm({
                      ...recipesQuantityInfoForm,
                      count: recipesQuantityInfoForm.count + 1,
                    })
                  }
                >
                  <ArrowRight />
                </button>
              </div>
              <div className='recipes__item-full-info-quantity-counter-total'>
                0 kcal
              </div>
            </div>
            <button className='recipes__item-full-info-delete'>
              <div className='recipes__item-full-info-delete-media'>
                <TrashIcon />
              </div>
            </button>
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

export default CreateRecipesView;
