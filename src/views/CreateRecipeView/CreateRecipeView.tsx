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

  const [createRecipeForm, setCreateRecipeForm] = useState({
    recipeName: '',
    recipeInstruction: '',
    recipeCost: '',
    startTime: '',
    finishTime: '',
    ingredients: [],
    ingredientName: '',
    ingredientCount: '',
  });

  const [createRecipeErrors, setCreateRecipeErrors] = useState([]);

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

  const getFieldErrors = (field: string) => getFieldErrorsUtil(field, createRecipeErrors);

  const createRecipeSubmit = e => {
    e.preventDefault();
    console.log(e.target)
  }

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
              <InputField
                block
                type='number'
                name='recipeCost'
                data-validate='["required"]'
                errors={getFieldErrors('recipeCost')}
                value={createRecipeForm.recipeCost}
                onChange={e => validateOnChange('recipeCost', e.target.value, e)}
                label='$$$'
                min={0}
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
                name='startTime'
                data-validate='["required"]'
                errors={getFieldErrors('startTime')}
                value={createRecipeForm.startTime}
                onChange={e => validateOnChange('startTime', e.target.value, e,)}
                className='recipe__label-input'
                min={0}
              />
              <InputField
                block
                type='number'
                name='finishTime'
                data-validate='["required"]'
                errors={getFieldErrors('finishTime')}
                value={createRecipeForm.finishTime}
                onChange={e => validateOnChange('finishTime', e.target.value, e)}
                className='recipe__label-input'
                min={0}
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
            {recipeData.ingredients.map((item) => (
              <div
                key={item.id}
                className={`recipe__chart-progress-item recipe__chart-progress-item_${item.name}`}
              >
                <Chart
                  firstColor={item.firstColorGradient}
                  lastColor={item.lastColorGradient}
                  percent={1}
                  id={item.id}
                />
              </div>
              ))}
            <div className='recipe__chart-progress-value'>0 kcal /444 kcal</div>
          </div>
          <div className='recipe__chart-lines'>
            {recipeData.ingredients.map((item) => (
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
                      width: 1,
                      backgroundColor: item.backgroundColor,
                    }}
                  ></div>
                </div>
                <div className='recipe__chart-lines-item-description'>{`${item.value} ${unit}`}</div>
              </div>
              ))}
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
              name='ingredientName'
              data-validate='["required"]'
              errors={getFieldErrors('ingredientName')}
              value={createRecipeForm.ingredientName}
              onChange={e => validateOnChange('ingredientName', e.target.value, e)}
              placeholder='Garlic clove (optional) €€€'
            />
            <button type="button" className='recipe__add-ingredients-field-button'>
              <PlusIcon />
            </button>
          </div>
        )}
        <div className='recipe__item'>
          <div className='recipe__item-name'>Garlic clove (optional) €€€</div>
          <div className='recipe__item-counting'>
            {recipeData.ingredients.map((item) => (
              <div key={item.id}>{`${item.name} ${item.value}`}</div>
            ))}
          </div>
          <div className='recipe__item-quantity'>
            <div className='recipe__item-quantity-counter'>
              <button
                type="button"
                className='recipe__item-quantity-counter-arrow'
                onClick={() => {
                  if (createRecipeForm.ingredientCount === '0' || !createRecipeForm.ingredientCount) {
                    setCreateRecipeForm({
                      ...createRecipeForm,
                      ingredientCount: '0'
                    })
                  } else {
                    const count = +createRecipeForm.ingredientCount - 1;
                    setCreateRecipeForm({
                      ...createRecipeForm,
                      ingredientCount: count.toString(),
                    })
                  }
                }}
              >
                <ArrowLeft />
              </button>
              <InputField
                type='number'
                name='ingredientCount'
                data-validate='["required"]'
                errors={getFieldErrors('ingredientCount')}
                value={createRecipeForm.ingredientCount}
                onChange={e => validateOnChange('ingredientCount', e.target.value, e)}
                height='xs'
                className='recipe__item-quantity-counter-input'
                min={0}
              />
              <button
                type="button"
                className='recipe__item-quantity-counter-arrow'
                onClick={() => {
                    const count = +createRecipeForm.ingredientCount + 1;
                    setCreateRecipeForm({
                      ...createRecipeForm,
                      ingredientCount: count.toString(),
                    })
                  }
                }
              >
                <ArrowRight />
              </button>
            </div>
            <div className='recipe__item-quantity-counter-total'>0 kcal</div>
          </div>
          <button type="button" className='recipe__item-delete'>
            <div className='recipe__item-delete-media'>
              <TrashIcon />
            </div>
          </button>
          <div className='recipe__item-weight'>
            {recipeData.weight} {unit}
          </div>
        </div>
        <div className='recipe__item recipe__item_full-info'>
          <div className='recipe__item-name'>Garlic clove (optional) €€€</div>
          <div className='recipe__item-counting'>
            {recipeData.ingredients.map((item) => (
              <div key={item.id}>{`${item.name} ${item.value}`}</div>
            ))}
          </div>
          <div className='recipe__item-quantity'>
            <div className='recipe__item-quantity-counter'>
              <button
                type="button"
                className='recipe__item-quantity-counter-arrow'
                onClick={() => {
                  if (createRecipeForm.ingredientCount === '0' || !createRecipeForm.ingredientCount) {
                    setCreateRecipeForm({
                      ...createRecipeForm,
                      ingredientCount: '0'
                    })
                  } else {
                    const count = +createRecipeForm.ingredientCount - 1;
                    setCreateRecipeForm({
                      ...createRecipeForm,
                      ingredientCount: count.toString(),
                    })
                  }
                }}
              >
                <ArrowLeft />
              </button>
              <InputField
                type='number'
                name='ingredientCount'
                data-param="0"
                data-validate='["required"]'
                errors={getFieldErrors('ingredientCount')}
                value={createRecipeForm.ingredientCount}
                onChange={e => validateOnChange('ingredientCount', e.target.value, e)}
                height='xs'
                className='recipe__item-quantity-counter-input'
                min={0}
              />
              <button
                type="button"
                className='recipe__item-quantity-counter-arrow'
                onClick={() => {
                    const count = +createRecipeForm.ingredientCount + 1;
                    setCreateRecipeForm({
                      ...createRecipeForm,
                      ingredientCount: count.toString(),
                    })
                  }
                }
              >
                <ArrowRight />
              </button>
            </div>
            <div className='recipe__item-quantity-counter-total'>0 kcal</div>
          </div>
          <button type="button" className='recipe__item-delete'>
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
            name='recipeInstruction'
            data-validate='["required"]'
            errors={getFieldErrors('recipeInstruction')}
            value={createRecipeForm.recipeInstruction}
            onChange={e => validateOnChange('recipeInstruction', e.target.value, e)}
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
