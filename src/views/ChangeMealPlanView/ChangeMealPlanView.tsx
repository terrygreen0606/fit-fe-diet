import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  getTranslate,
  // getFoodItem - shpuld be removed after back ingtegration?
} from 'utils';
import classNames from 'classnames';
import Helmet from 'react-helmet';

import { routes } from 'constants/routes';

import WithTranslate from 'components/hoc/WithTranslate';
import Button from 'components/common/Forms/Button';
import InputField from 'components/common/Forms/InputField';
import CustomRadio from 'components/common/Forms/CustomRadio';
import Breadcrumb from 'components/Breadcrumb';

import './ChangeMealPlanView.sass';

import { ReactComponent as LiftWeightIcon } from 'assets/img/icons/lift-plus-icon.svg';
import { ReactComponent as BreakfastIcon } from 'assets/img/icons/breakfast-icon.svg';
import { ReactComponent as LunchIcon } from 'assets/img/icons/lunch-icon.svg';
import { ReactComponent as DinnerIcon } from 'assets/img/icons/dinner-icon.svg';
import { ReactComponent as SnackIcon } from 'assets/img/icons/snack-icon.svg';
import { ReactComponent as MaleIcon } from 'assets/img/icons/male-icon.svg';
import { ReactComponent as FemaleIcon } from 'assets/img/icons/female-icon.svg';
import { ReactComponent as CrossIcon } from 'assets/img/icons/cross-icon-black.svg';

// remove after backend integration
import { ReactComponent as MilkIcon } from 'assets/img/icons/milk-icon.svg';
import { ReactComponent as MeatIcon } from 'assets/img/icons/meat-icon.svg';
import { ReactComponent as FishIcon } from 'assets/img/icons/fish-icon.svg';

const ChangeMealPlanView = (props: any) => {
  // refactor after backend integration
  const [ignoreCuisineIds] = useState([
    { title: 'milk', icon: MilkIcon },
    { title: 'meat', icon: MeatIcon },
    { title: 'fish', icon: FishIcon },
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const changeInfo = () => {
    setIsEditing(true);
  };
  const saveChanges = () => {
    setIsEditing(false);
  };
  // add after backend integration
  // const removeMealItem = (mealId: string) => {
  //   const mealItem = ignoreCuisineIds.find(meal => meal.id === mealId);
  //   if (mealItem) {
  //     props.setRegisterData({
  //       ...props.registerData,
  //       ignore_cuisine_ids: props.registerData.ignore_cuisine_ids.filter(
  //         mealKey => mealKey !== mealItem.key
  //       )
  //     });
  //     setIgnoreCuisineIds(ignoreCuisineIds.filter(meal => meal.key !== mealItem.key));
  //   }
  // };

  const t = (code: string) => getTranslate(props.localePhrases, code);

  return (
    <>
      <Helmet>
        <title>{t('app.title.change_meal_plan')}</title>
      </Helmet>
      <div className='change-meal'>
        <div className='container container-mb70'>
          <Breadcrumb
            routes={[
              {
                url: routes.main,
                name: t('breadcrumb.main'),
              },
            ]}
            currentPage={t('mp.change.title')}
          />
          <div className='row'>
            <h4 className='change-meal_title'>{t('mp.change.title')}</h4>
          </div>
        </div>

        <div className='container'>
          <div className='row'>
            <div className='change-meal_info card-bg'>
              <div className='change-meal_info-row'>
                <Button className='change-meal_green-btn mb-3' color='primary'>
                  <LiftWeightIcon />
                  {t('register.lift_weight')}
                </Button>

                <div className='change-meal_not-eating'>
                  <span className='change-meal_green-text'>
                    {t('register.not_eating')}:
                  </span>

                  {/* refactor translation after backend integration */}
                  <div className='change-meal_food-list'>
                    {ignoreCuisineIds.map(({ title, icon: Icon }) => (
                      <div className='change-meal_food-list_item' key={title}>
                        <Icon />
                        {t(`food.${title.toLowerCase()}`)}

                        {isEditing && (
                          <CrossIcon
                            // onClick={() => removeMealItem(id)}
                            className='change-meal_cross-icon'
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className='change-meal_info-row'>
                <div className='change-meal_stats'>
                  <div className='change-meal_stats-item'>
                    {t('register.form_sex')}

                    {isEditing ? (
                      <div className='change-meal_stats_radio'>
                        <CustomRadio
                          name='change-meal_sex'
                          label={
                            <>
                              <MaleIcon
                                className={classNames('change-meal_sex-icon', {
                                  'change-meal_sex-icon_active': true,
                                })}
                              />
                              {t('register.form_male')}
                            </>
                          }
                          value='m'
                          checked
                          inline
                        />
                        <CustomRadio
                          name='register_sex'
                          label={
                            <>
                              <FemaleIcon
                                className={classNames('change-meal_sex-icon', {
                                  'change-meal_sex-icon_active': false,
                                })}
                              />
                              {t('register.form_female')}
                            </>
                          }
                          value='f'
                          checked={false}
                          inline
                        />
                      </div>
                    ) : (
                        <span className='change-meal_stats-item_text'>
                          {t('register.form_male')}
                        </span>
                      )}
                  </div>
                  <div className='change-meal_stats-item'>
                    {t('register.form_age')}
                    {isEditing ? (
                      <InputField
                        type='number'
                        border='light'
                        min={1}
                        name='age'
                        value={30}
                        data-validate='["required"]'
                        // onChange={e => validateOnChange('age', e.target.value, e)}
                        height='xs'
                      />
                    ) : (
                        <span className='change-meal_stats-item_text'>30</span>
                      )}
                  </div>

                  <div className='change-meal_stats-item'>
                    {t('common.height')}
                    {isEditing ? (
                      <InputField
                        type='number'
                        border='light'
                        value={180}
                        name='height'
                        data-param='50,250'
                        data-validate='["required", "min-max"]'
                        // onChange={e => validateOnChange('height', e.target.value, e)}
                        height='xs'
                      />
                    ) : (
                        <span className='change-meal_stats-item_text'>
                          180 {t('common.cm')}
                        </span>
                      )}
                  </div>
                  <div className='change-meal_stats-item'>
                    {t('common.weight')}
                    {isEditing ? (
                      <InputField
                        block
                        type='number'
                        border='light'
                        value={66}
                        data-param='30,400'
                        data-validate='["required", "min-max"]'
                        name='weight'
                        // onChange={e => validateOnChange('weight', e.target.value, e)}
                        height='xs'
                      />
                    ) : (
                        <span className='change-meal_stats-item_text'>
                          66 {t('common.kg')}
                        </span>
                      )}
                  </div>
                </div>
                {isEditing ? (
                  <Button
                    color='primary'
                    outline
                    size='lg'
                    className='mt-3 mb-3 bttn_wide'
                    onClick={() => saveChanges()}
                  >
                    Save
                  </Button>
                ) : (
                    <Button
                      color='secondary'
                      outline
                      size='lg'
                      className='mt-3 mb-3 bttn_wide'
                      onClick={() => changeInfo()}
                    >
                      {t('mp.change.change_info')}
                    </Button>
                  )}
              </div>
            </div>
          </div>
        </div>

        <div className='container'>
          <div className='row meal-row'>
            {[1, 2, 3, 4].map((item, i) => (
              <div className='col-3 meal-row_col' key={`${i + 1}`}>
                <div className='meal-block card-bg'>
                  <div className='meal-block_head'>
                    <div className='meal-block_head-count'>
                      <h3>{i + 3}</h3>
                    </div>
                    <p>{t('mp.change.meals_per_day')}</p>
                  </div>
                  <div
                    className={classNames('row', {
                      'row-mb79': i === 1,
                    })}
                  >
                    {i === 0 ? (
                      <>
                        <div className='col-4'>
                          <div className='meal-block_row-item'>
                            <BreakfastIcon />
                            <p>{t('meal.breakfast')}</p>
                          </div>
                        </div>

                        <div className='col-4'>
                          <div className='meal-block_row-item'>
                            <LunchIcon />
                            <p>{t('meal.lunch')}</p>
                          </div>
                        </div>
                        <div className='col-4'>
                          <div className='meal-block_row-item'>
                            <DinnerIcon />
                            <p>{t('meal.dinner')}</p>
                          </div>
                        </div>
                      </>
                    ) : (
                        <>
                          <div className='col-6'>
                            <div className='meal-block_row-item'>
                              <BreakfastIcon />
                              <p>{t('meal.breakfast')}</p>
                            </div>
                          </div>
                          {i > 1 && (
                            <div className='col-6'>
                              <div className='meal-block_row-item'>
                                <SnackIcon />
                                <p>{t('meal.snack')}</p>
                              </div>
                            </div>
                          )}
                          <div className='col-6'>
                            <div className='meal-block_row-item'>
                              <LunchIcon />
                              <p>{t('meal.lunch')}</p>
                            </div>
                          </div>
                          <div className='col-6'>
                            <div className='meal-block_row-item'>
                              <SnackIcon />
                              <p>{t('meal.snack')}</p>
                            </div>
                          </div>
                          <div className='col-6'>
                            <div className='meal-block_row-item'>
                              <DinnerIcon />
                              <p>{t('meal.dinner')}</p>
                            </div>
                          </div>
                          {i === 3 && (
                            <div className='col-6'>
                              <div className='meal-block_row-item'>
                                <SnackIcon />
                                <p>{t('meal.snack')}</p>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                  </div>
                  <Button color='primary' outline block>
                    {t('mp.change.choose_it')}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default WithTranslate(connect(null)(ChangeMealPlanView));
