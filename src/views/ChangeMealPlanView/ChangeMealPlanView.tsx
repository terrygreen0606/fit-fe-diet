import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getTranslate } from 'utils';
import { getMealItem } from './getMealItem';
import classNames from 'classnames';

import WithTranslate from 'components/hoc/WithTranslate';
import Button from 'components/common/Forms/Button';
import InputField from 'components/common/Forms/InputField';
import CustomRadio from 'components/common/Forms/CustomRadio';

import './ChangeMealPlanView.sass';

import { ReactComponent as LiftWeightIcon } from 'assets/img/icons/lift-plus-icon.svg';
import { ReactComponent as BreakfastIcon } from 'assets/img/icons/breakfast-icon.svg';
import { ReactComponent as LunchIcon } from 'assets/img/icons/lunch-icon.svg';
import { ReactComponent as DinnerIcon } from 'assets/img/icons/dinner-icon.svg';
import { ReactComponent as SnackIcon } from 'assets/img/icons/snack-icon.svg';
import { ReactComponent as MaleIcon } from 'assets/img/icons/male-icon.svg';
import { ReactComponent as FemaleIcon } from 'assets/img/icons/female-icon.svg';

const ChangeMealPlanView = (props: any) => {

  const [ignoreCuisineIds, setIgnoreCuisineIds] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const food = [
    {title:'milk',icon:'milk'},
    {title:'meat',icon:'meat'},
    {title:'fish',icon:'fish'},
  ]

  useEffect(() => {
    setIgnoreCuisineIds(food.map(mealKey => (
      getMealItem(mealKey.title)
    )));
  }, []);

  const changeInfo = () => {
    setIsEditing(true)
  }
  const saveChanges = () => {
    setIsEditing(false)
  }

  const t = (code: string) => getTranslate(props.localePhrases, code);

  return (
    <>
      <div className="change-meal">
        <div className="container">
          <div className="row">
            <h4 className="change-meal_title">
              {t('mp.change.title')}
            </h4>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="change-meal_info">

              <div className='change-meal_info-row'>
                <Button
                  className='change-meal_green-btn mb-3'
                  color="primary" 
                >
                  <LiftWeightIcon />
                  {t('register.lift_weight')}
                </Button>

                <div className='change-meal_not-eating'>
                  <span className='change-meal_green-text'>
                    {t('register.not_eating')}
                  </span>

                  <div className='change-meal_food-list'>
                    {ignoreCuisineIds.map(({ title, icon: Icon }) => (
                      <div className='change-meal_food-list_item' key={title}>
                        <Icon />
{/*need to be translated {t(`food.${title}`)} */}
                        {title}
                      </div>  
                    ))}
                  </div>
                </div>
              </div>

              <div className='change-meal_info-row'>
                <div className="change-meal_stats">
                  <p className="change-meal_stats-item">
                    {t('register.form_sex')}

                    {isEditing ?
                      <div>
                        <CustomRadio 
                          name="register_sex" 
                          label={
                            <>
                              <MaleIcon 
                                className={classNames("registerSexIcon", {
                                  "registerSexIcon_active": true
                                })}
                              />
                              {t('register.form_male')}
                            </>
                          }
                          value="m"
                          checked={true}
                          inline
                          // onChange={e => props.setRegisterData({
                          //     ...props.registerData,
                          //     gender: e.target.value
                          //   })
                          // }
                        />
                        <CustomRadio 
                          name="register_sex" 
                          label={
                            <>
                              <FemaleIcon 
                                className={classNames("registerSexIcon", {
                                  "registerSexIcon_active": false
                                })}
                              />
                              {t('register.form_female')}
                            </>
                          }
                          value="f"
                          checked={false}
                          inline
                          // onChange={e => props.setRegisterData({
                          //     ...props.registerData,
                          //     gender: e.target.value
                          //   })
                          // }
                        />
                      </div>
                      :
                      <p>
                        {t('register.form_male')}
                      </p>
                    }
                  </p>
                  <p className="change-meal_stats-item">
                    {t('register.form_age')}
                    {isEditing
                      ? <InputField
                          type="number"
                          min={1}
                          name="age"
                          value={30}
                          data-validate='["required"]'
                          // onChange={e => validateOnChange('age', e.target.value, e)}
                          height='xs'
                        />
                      : <p>
                          30
                        </p>
                    }
                  </p>

                  <p className="change-meal_stats-item">
                    {t('common.height')}
                    {isEditing
                      ? <InputField
                          type="number"
                          value={180}
                          name="height"
                          data-param="50,250"
                          data-validate='["required", "min-max"]'
                          // onChange={e => validateOnChange('height', e.target.value, e)}
                          height='xs'
                        />
                      : <p>
                          180 {t('common.cm')}
                        </p>
                    }
                  </p>
                  <p className="change-meal_stats-item">
                    {t('common.weight')}
                    {isEditing
                      ? <InputField
                          block
                          type="number"
                          value={66}
                          data-param="30,400"
                          data-validate='["required", "min-max"]'
                          name="weight"
                          // onChange={e => validateOnChange('weight', e.target.value, e)}
                          height='xs'
                        />
                      : <p>
                          66 {t('common.kg')}
                        </p>
                    }
                  </p>
                </div>
                {isEditing ?
                  <Button
                    color='primary'
                    outline
                    size='lg'
                    className='mt-3 mb-3 bttn_wide'
                    onClick={()=> saveChanges()}
                  >
                    Save
                  </Button>
                :
                  <Button
                    color='secondary'
                    outline
                    size='lg'
                    className='mt-3 mb-3 bttn_wide'
                    onClick={()=> changeInfo()}
                  >
                    {t('mp.change.change_info')}
                  </Button>
                }
                
              </div>
            </div>
          </div>
        </div>
        
        <div className="container">
          <div className="row meal-row">

          {[1,2,3,4].map((item, i) => {
              return (
                <div className="col-3" key={i}>
                  <div className='meal-block'>
                    <div className='meal-block_head'>
                      <div className='meal-block_head-count'>
                        <h3>{i + 3}</h3>
                      </div>
                      <p>{t('mp.change.meals_per_day')}</p>
                    </div>
                    <div className='row' style={{marginBottom: i == 1 ? '79px':'0px'}}>
                      {i == 0 ?
                        <>
                          <div className="col-4">
                            <div className='meal-block_row-item'>
                              <BreakfastIcon />
                              <p>{t('meal.breakfast')}</p>
                            </div>
                          </div>
        
                          <div className="col-4">
                            <div className='meal-block_row-item'>
                              <LunchIcon />
                              <p>{t('meal.lunch')}</p>
                            </div>
                          </div>
                          <div className="col-4">
                            <div className='meal-block_row-item'>
                              <DinnerIcon />
                              <p>{t('meal.dinner')}</p>
                            </div>
                          </div>
                        </>
                        : 
                        <>
                          <div className="col-6">
                            <div className='meal-block_row-item'>
                              <BreakfastIcon />
                              <p>Breakfast</p>
                            </div>
                          </div>
                          {i > 1 &&
                            <div className="col-6">
                              <div className='meal-block_row-item'>
                                <SnackIcon />
                                <p>{t('meal.snack')}</p>
                              </div>
                            </div>
                          }
                          <div className="col-6">
                            <div className='meal-block_row-item'>
                              <LunchIcon />
                              <p>Lunch</p>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className='meal-block_row-item'>
                              <SnackIcon />
                              <p>{t('meal.snack')}</p>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className='meal-block_row-item'>
                              <DinnerIcon />
                              <p>Dinner</p>
                            </div>
                          </div>
                          {i == 3 &&
                            <div className="col-6">
                              <div className='meal-block_row-item'>
                                <SnackIcon />
                                <p>{t('meal.snack')}</p>
                              </div>
                            </div>
                          }
                        </>
                      }
                    </div>
                    <Button
                      color='primary'
                      outline
                      block
                    >
                      {t('mp.change.choose_it')}
                    </Button>        
                  </div>
                </div>
              )
            }
          )}
          </div>
        </div>
      </div>
    </>
  )
};

export default WithTranslate(connect(
  null,
)(ChangeMealPlanView));