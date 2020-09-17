/* eslint-disable @typescript-eslint/indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-return-assign */
/* eslint-disable no-mixed-operators */
/* eslint-disable import/order */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import classnames from 'classnames';
import { toast } from 'react-toastify';

import { routes } from 'constants/routes';
import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
  getTranslate,
} from 'utils';
import { steps } from './steps';
import {
  userUpdateMealSettings,
  getRecipeCuisines,
  getDiseases,
  fetchUserProfile,
} from 'api';
import FormValidator from 'utils/FormValidator';

// Components
import ProfileLayout from 'components/hoc/ProfileLayout';
import WithTranslate from 'components/hoc/WithTranslate';
import Breadcrumb from 'components/Breadcrumb';
import Button from 'components/common/Forms/Button';
import ProgressLine from 'components/ProgressLine';
import InputField from 'components/common/Forms/InputField';
import CustomSwitch from 'components/common/Forms/CustomSwitch';
import CustomRadio from 'components/common/Forms/CustomRadio';
import Spinner from 'components/common/Spinner';

import './SettingsChangeMealPlanView.sass';

// Icon
import { ReactComponent as LoseWeightIcon } from 'assets/img/icons/lose-weight-icon.svg';
import { ReactComponent as KeepWeightIcon } from 'assets/img/icons/keep-weight-icon.svg';
import { ReactComponent as LiftWeightIcon } from 'assets/img/icons/lift-weight-icon.svg';
import { ReactComponent as BreakfastIcon } from 'assets/img/icons/breakfast-icon.svg';
import { ReactComponent as LunchIcon } from 'assets/img/icons/lunch-icon.svg';
import { ReactComponent as DinnerIcon } from 'assets/img/icons/dinner-icon.svg';
import { ReactComponent as SnackIcon } from 'assets/img/icons/snack-icon.svg';
import { ReactComponent as MaleIcon } from 'assets/img/icons/male-icon.svg';
import { ReactComponent as FemaleIcon } from 'assets/img/icons/female-icon.svg';

const SettingsChangeMealPlanView = (props: any) => {
  const t = (code: string, placeholders?: any) =>
    getTranslate(props.localePhrases, code, placeholders);

  const { userSettings } = props;

  const [isSpinnerActive, setSpinnerActive] = useState(true);

  const [activeStep, setActiveStep] = useState(steps.goal);

  const [ignoreCuisinesList, setIgnoreCuisinesList] = useState([]);

  const [diseasesList, setDiseasesList] = useState([]);

  const [updateChangeMealForm, setUpdateChangeMealForm] = useState({
    measurement: null,
    gender: null,
    age: null,
    height: null,
    weight: null,
    weight_goal: null,
    goal: null,
    ignore_cuisine_ids: [],
    diseases: [],
    meals_cnt: null,
    act_level: null,
  });

  useEffect(() => {
    let cleanComponent = false;

    getRecipeCuisines().then((response) => {
      if (!cleanComponent) setIgnoreCuisinesList(response.data.data);
    });

    getDiseases().then((response) => {
      if (!cleanComponent) setDiseasesList(response.data.data);
    });

    fetchUserProfile().then((response) => {
      const { data } = response.data;

      if (!cleanComponent) {
        setUpdateChangeMealForm({
          ...updateChangeMealForm,
          measurement: userSettings.measurement,
          gender: data.gender,
          age: data.age,
          height: data.height,
          weight: data.weight,
          weight_goal: data.weight_goal,
          goal: data.goal,
          ignore_cuisine_ids: data.ignore_cuisine_ids || [],
          diseases: data.diseases || [],
          meals_cnt: data.meals_cnt,
          act_level: data.act_level,
        });
      }

      setSpinnerActive(false);
    });

    return () => cleanComponent = true;
  }, []);

  useEffect(() => {
    const updatedIgnoreCuisinesList = [...ignoreCuisinesList];

    if (ignoreCuisinesList.length > 0) {
      updateChangeMealForm.ignore_cuisine_ids.forEach((ignoreCuisineItem) => {
        updatedIgnoreCuisinesList.find((findItem) =>
          ignoreCuisineItem === findItem.id).isActive = true;
      });

      setIgnoreCuisinesList([...updatedIgnoreCuisinesList]);
    }
  }, [updateChangeMealForm.ignore_cuisine_ids.length, ignoreCuisinesList.length]);

  useEffect(() => {
    const updatedDiseasesList = [...diseasesList];

    if (updatedDiseasesList.length > 0) {
      updateChangeMealForm.diseases.forEach((diseasesItem) => {
        updatedDiseasesList.find((findItem) => diseasesItem === findItem.code).isActive = true;
      });
      setDiseasesList([...updatedDiseasesList]);
    }
  }, [updateChangeMealForm.diseases.length, diseasesList.length]);

  const [updateChangeMealErrors, setUpdateChangeMealErrors] = useState([]);

  const validateOnChange = (name: string, value: any, event, element?) => {
    validateFieldOnChange(
      name,
      value,
      event,
      updateChangeMealForm,
      setUpdateChangeMealForm,
      updateChangeMealErrors,
      setUpdateChangeMealErrors,
      element,
    );
  };

  const getFieldErrors = (field: string) => getFieldErrorsUtil(field, updateChangeMealErrors);

  const getMealSettingsUpdatePayload = () => ({
    measurement: updateChangeMealForm.measurement,
    gender: updateChangeMealForm.gender,
    age: updateChangeMealForm.age,
    height: updateChangeMealForm.height,
    weight: updateChangeMealForm.weight,
    weight_goal: updateChangeMealForm.weight_goal,
    goal: updateChangeMealForm.goal,
    ignore_cuisine_ids: updateChangeMealForm.ignore_cuisine_ids,
    diseases: updateChangeMealForm.diseases,
    meals_cnt: updateChangeMealForm.meals_cnt,
    act_level: updateChangeMealForm.act_level,
  });

  const updateChangeMealSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const inputs = [...form.elements || []].filter((i) => ['INPUT', 'SELECT', 'TEXTAREA'].includes(i.nodeName));

    const { errors, hasError } = FormValidator.bulkValidate(inputs);

    setUpdateChangeMealErrors([...errors]);

    if (!hasError) {
      userUpdateMealSettings(getMealSettingsUpdatePayload())
        .catch(() => {
          toast.error(t('mp.form.error'), {
            autoClose: 3000,
          });
        });
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('app.title.change_meal_plan')}</title>
      </Helmet>
      <div className='container'>
        <Breadcrumb
          routes={[
            {
              url: routes.main,
              name: t('breadcrumb.main'),
            },
          ]}
          currentPage={t('app.title.change_meal_plan')}
        />
      </div>
      <ProfileLayout>
        <div
          className='change-meal-plan card-bg'
        >
          {isSpinnerActive ? (
            <div className='container text-center'>
              <Spinner
                size='lg'
                color='#0FC1A1'
              />
            </div>
          ) : (
              <>
                <ProgressLine
                  activeStepIndex={activeStep}
                  steps={[
                    {
                      text: t('mp.progress.goal'),
                      onClick: () => setActiveStep(steps.goal),
                    },
                    {
                      text: t('mp.progress.metrics'),
                      onClick: () => setActiveStep(steps.metrics),
                    },
                    {
                      text: t('mp.progress.not_eating'),
                      onClick: () => setActiveStep(steps.notEating),
                    },
                    {
                      text: t('mp.progress.diseases'),
                      onClick: () => setActiveStep(steps.diseases),
                    },
                    {
                      text: t('mp.progress.meals'),
                      onClick: () => setActiveStep(steps.meals),
                    },
                    {
                      text: t('mp.progress.workout'),
                      onClick: () => setActiveStep(steps.workout),
                    },
                  ]}
                />
                {activeStep === steps.goal && (
                  <div>
                    <div className='change-meal-plan__title'>{t('mp.goal.title')}</div>
                    <div className='change-meal-plan__goals'>
                      <Button
                        type='button'
                        onClick={() => setUpdateChangeMealForm({ ...updateChangeMealForm, goal: -1 })}
                        className={classnames('change-meal-plan__goals-item', {
                          active: updateChangeMealForm.goal === -1,
                        })}
                      >
                        <div className='change-meal-plan__goals-item-media'>
                          <LoseWeightIcon />
                        </div>
                        <span>{t('mp.goal.lose')}</span>
                      </Button>
                      <Button
                        type='button'
                        onClick={() => setUpdateChangeMealForm({ ...updateChangeMealForm, goal: 0 })}
                        className={classnames('change-meal-plan__goals-item', {
                          active: updateChangeMealForm.goal === 0,
                        })}
                      >
                        <div className='change-meal-plan__goals-item-media'>
                          <KeepWeightIcon />
                        </div>
                        <span>{t('mp.goal.keep')}</span>
                      </Button>
                      <Button
                        type='button'
                        onClick={() => setUpdateChangeMealForm({ ...updateChangeMealForm, goal: 1 })}
                        className={classnames('change-meal-plan__goals-item', {
                          active: updateChangeMealForm.goal === 1,
                        })}
                      >
                        <div className='change-meal-plan__goals-item-media'>
                          <LiftWeightIcon />
                        </div>
                        <span>{t('mp.goal.lift')}</span>
                      </Button>
                    </div>
                    <div className='change-meal-plan__btn-wrap'>
                      <Button
                        type='button'
                        color='primary'
                        className='change-meal-plan__btn'
                        onClick={(e) => {
                          setActiveStep(steps.metrics);
                          updateChangeMealSubmit(e);
                        }}
                      >
                        {t('mp.save_next')}
                      </Button>
                    </div>
                  </div>
                )}
                {activeStep === steps.metrics && (
                  <div>
                    <div className='change-meal-plan__title'>{t('mp.metrics.title')}</div>
                    <div className='change-meal-plan__metrics'>
                      <div className='change-meal-plan__metrics-switch'>
                        <CustomSwitch
                          label1={t('mp.imperial')}
                          label2={t('mp.metric')}
                          checked={updateChangeMealForm.measurement === 'si'}
                          onChange={() => {
                            setUpdateChangeMealForm({
                              ...updateChangeMealForm,
                              measurement: updateChangeMealForm.measurement === 'si' ? 'us' : 'si',
                            });
                          }}
                        />
                      </div>
                      <div className='change-meal-plan__metrics-wrap'>
                        <div className='change-meal-plan__metrics-gender'>
                          <div className='change-meal-plan__metrics-gender-desc'>
                            {t('mp.metrics.sex')}
                          </div>
                          <div
                            className={classnames('change-meal-plan__metrics-gender-item', {
                              active: updateChangeMealForm.gender === 'm',
                            })}
                          >
                            <CustomRadio
                              name='gender'
                              label={(
                                <>
                                  <MaleIcon className='change-meal-plan__metrics-gender-item-icon' />
                                  <div className='change-meal-plan__metrics-gender-item-text'>
                                    {t('mp.form.male')}
                                  </div>
                                </>
                              )}
                              value='m'
                              checked={updateChangeMealForm.gender === 'm'}
                              onChange={(e) => setUpdateChangeMealForm({
                                ...updateChangeMealForm,
                                gender: e.target.value,
                              })}
                            />
                          </div>
                          <div
                            className={classnames('change-meal-plan__metrics-gender-item', {
                              active: updateChangeMealForm.gender === 'f',
                            })}
                          >
                            <CustomRadio
                              name='gender'
                              label={(
                                <>
                                  <FemaleIcon className='change-meal-plan__metrics-gender-item-icon' />
                                  <div className='change-meal-plan__metrics-gender-item-text'>
                                    {t('mp.form.female')}
                                  </div>
                                </>
                              )}
                              value='f'
                              checked={updateChangeMealForm.gender === 'f'}
                              onChange={(e) => setUpdateChangeMealForm({
                                ...updateChangeMealForm,
                                gender: e.target.value,
                              })}
                            />
                          </div>
                        </div>
                        <div className='change-meal-plan__metrics-row'>
                          <div className='change-meal-plan__metrics-item'>
                            <InputField
                              type='number'
                              name='age'
                              errors={getFieldErrors('age')}
                              data-param='16, 100'
                              data-validate='["min-max", "required"]'
                              value={updateChangeMealForm.age}
                              onChange={(e) => validateOnChange('age', e.target.value, e)}
                              min={16}
                              max={100}
                              label={t('mp.metrics.age')}
                            />
                          </div>
                          <div className='change-meal-plan__metrics-item'>
                            <InputField
                              name='height'
                              errors={getFieldErrors('height')}
                              data-validate='["required"]'
                              value={updateChangeMealForm.height}
                              onChange={(e) => validateOnChange('height', e.target.value, e)}
                              label={t('mp.metrics.height')}
                            />
                            <div className='change-meal-plan__metrics-item-unit'>
                              {updateChangeMealForm.measurement === 'si' ? t('common.cm_label') : t('common.ft_label')}
                            </div>
                          </div>
                          <div className='change-meal-plan__metrics-item'>
                            <InputField
                              label={t('mp.metrics.weight_now')}
                              type='number'
                              name='weight'
                              step={0.1}
                              data-param='30, 999'
                              data-validate='["min-max", "required"]'
                              errors={getFieldErrors('weight')}
                              value={updateChangeMealForm.weight}
                              onChange={(e) => validateOnChange('weight', e.target.value, e)}
                              min={30}
                              max={999}
                            />
                            <div className='change-meal-plan__metrics-item-unit'>
                              {updateChangeMealForm.measurement === 'si' ? t('common.kg_label') : t('common.lbs_label')}
                            </div>
                          </div>
                          <div className='change-meal-plan__metrics-item'>
                            <InputField
                              label={t('mp.metrics.weight_want')}
                              type='number'
                              name='weight_goal'
                              step={0.1}
                              data-param='30, 999'
                              data-validate='["min-max", "required"]'
                              errors={getFieldErrors('weight_goal')}
                              value={updateChangeMealForm.weight_goal}
                              onChange={(e) => validateOnChange('weight_goal', e.target.value, e)}
                              min={30}
                              max={999}
                            />
                            <div className='change-meal-plan__metrics-item-unit'>
                              {updateChangeMealForm.measurement === 'si' ? t('common.kg_label') : t('common.lbs_label')}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='change-meal-plan__btn-wrap'>
                      <Button
                        type='button'
                        color='primary'
                        className='change-meal-plan__btn'
                        onClick={(e) => {
                          updateChangeMealSubmit(e);
                          setActiveStep(steps.notEating);
                        }}
                      >
                        {t('mp.save_next')}
                      </Button>
                    </div>
                  </div>
                )}
                {activeStep === steps.notEating && (
                  <div>
                    <div className='change-meal-plan__title'>
                      {t('mp.not_eating.title')}
                    </div>
                    <div className='change-meal-plan__not-eating'>
                      {ignoreCuisinesList.map((item, itemIndex) => (
                        <button
                          key={item.id}
                          type='button'
                          onClick={() => {
                            const updatedIgnoreCuisinesList = [...ignoreCuisinesList];
                            if (!item.isActive) {
                              updatedIgnoreCuisinesList[itemIndex].isActive = true;
                              setIgnoreCuisinesList([...updatedIgnoreCuisinesList]);
                              updateChangeMealForm.ignore_cuisine_ids.push(item.id);
                            } else {
                              updatedIgnoreCuisinesList[itemIndex].isActive = false;
                              setIgnoreCuisinesList([...updatedIgnoreCuisinesList]);
                              updateChangeMealForm.ignore_cuisine_ids.find((cuisineItem, cuisineItemIndex) => {
                                if (cuisineItem === item.id) {
                                  updateChangeMealForm.ignore_cuisine_ids.splice(cuisineItemIndex, 1);
                                }
                              });
                            }
                          }}
                          className={classnames('change-meal-plan__not-eating-item', {
                            active: item.isActive,
                          })}
                        >
                          <div className='change-meal-plan__not-eating-item-media'>
                            <img src={item.image} alt='icon' />
                          </div>
                          <div className='change-meal-plan__not-eating-item-desc'>
                            {item.name}
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className='change-meal-plan__btn-wrap'>
                      <Button
                        type='button'
                        color='primary'
                        className='change-meal-plan__btn'
                        onClick={(e) => {
                          setActiveStep(steps.diseases);

                          updateChangeMealSubmit(e);
                        }}
                      >
                        {t('mp.save_next')}
                      </Button>
                    </div>
                  </div>
                )}
                {activeStep === steps.diseases && (
                  <div>
                    <div className='change-meal-plan__title'>
                      {t('mp.diseases.title')}
                    </div>
                    <div className='change-meal-plan__diseases'>
                      {diseasesList.map((item, itemIndex) => (
                        <button
                          key={item.code}
                          type='button'
                          onClick={() => {
                            const updatedDiseasesList = [...diseasesList];
                            if (!item.isActive) {
                              updatedDiseasesList[itemIndex].isActive = true;
                              setDiseasesList([...updatedDiseasesList]);
                              updateChangeMealForm.diseases.push(item.code);
                            } else {
                              updatedDiseasesList[itemIndex].isActive = false;
                              setDiseasesList([...updatedDiseasesList]);
                              updateChangeMealForm.diseases.find((cuisineItem, cuisineItemIndex) => {
                                if (cuisineItem === item.code) {
                                  updateChangeMealForm.diseases.splice(cuisineItemIndex, 1);
                                }
                              });
                            }
                          }}
                          className={classnames('change-meal-plan__diseases-item', {
                            active: item.isActive,
                          })}
                        >
                          {t(item.i18n_code)}
                        </button>
                      ))}
                    </div>
                    <div className='change-meal-plan__btn-wrap'>
                      <Button
                        type='button'
                        color='primary'
                        className='change-meal-plan__btn'
                        onClick={(e) => {
                          setActiveStep(steps.meals);
                          updateChangeMealSubmit(e);
                        }}
                      >
                        {t('mp.save_next')}
                      </Button>
                    </div>
                  </div>
                )}
                {activeStep === steps.meals && (
                  <div>
                    <div className='change-meal-plan__title'>{t('mp.meals.title')}</div>
                    <div className='change-meal-plan__meals'>
                      <div className={classnames('change-meal-plan__meals-item', 'card-bg', {
                        active: updateChangeMealForm.meals_cnt === 3,
                      })}
                      >
                        <div className='change-meal-plan__meals-item-count'>3</div>
                        <div className='change-meal-plan__meals-item-desc'>
                          {t('mp.meals.desc')}
                        </div>
                        <div className='change-meal-plan__meals-item-content'>
                          <div className='change-meal-plan__meals-item-content-block'>
                            <div className='change-meal-plan__meals-item-content-block-media'>
                              <BreakfastIcon />
                            </div>
                            {t('meal.breakfast')}
                          </div>
                          <div className='change-meal-plan__meals-item-content-block'>
                            <div className='change-meal-plan__meals-item-content-block-media'>
                              <LunchIcon />
                            </div>
                            {t('meal.lunch')}
                          </div>
                          <div className='change-meal-plan__meals-item-content-block'>
                            <div className='change-meal-plan__meals-item-content-block-media'>
                              <DinnerIcon />
                            </div>
                            {t('meal.dinner')}
                          </div>
                        </div>
                        <Button
                          type='button'
                          onClick={() => setUpdateChangeMealForm({ ...updateChangeMealForm, meals_cnt: 3 })}
                          className='change-meal-plan__meals-item-btn'
                        >
                          {t('mp.meals.choose')}
                        </Button>
                      </div>
                      <div className={classnames('change-meal-plan__meals-item', 'card-bg', {
                        active: updateChangeMealForm.meals_cnt === 4,
                      })}
                      >
                        <div className='change-meal-plan__meals-item-count'>4</div>
                        <div className='change-meal-plan__meals-item-desc'>
                          {t('mp.meals.desc')}
                        </div>
                        <div className='change-meal-plan__meals-item-content'>
                          <div className='change-meal-plan__meals-item-content-block'>
                            <div className='change-meal-plan__meals-item-content-block-media'>
                              <BreakfastIcon />
                            </div>
                            {t('meal.breakfast')}
                          </div>
                          <div className='change-meal-plan__meals-item-content-block'>
                            <div className='change-meal-plan__meals-item-content-block-media'>
                              <LunchIcon />
                            </div>
                            {t('meal.lunch')}
                          </div>
                          <div className='change-meal-plan__meals-item-content-block'>
                            <div className='change-meal-plan__meals-item-content-block-media'>
                              <SnackIcon />
                            </div>
                            {t('meal.snack')}
                          </div>
                          <div className='change-meal-plan__meals-item-content-block'>
                            <div className='change-meal-plan__meals-item-content-block-media'>
                              <DinnerIcon />
                            </div>
                            {t('meal.dinner')}
                          </div>
                        </div>
                        <Button
                          type='button'
                          onClick={() => setUpdateChangeMealForm({ ...updateChangeMealForm, meals_cnt: 4 })}
                          className='change-meal-plan__meals-item-btn'
                        >
                          {t('mp.meals.choose')}
                        </Button>
                      </div>
                      <div className={classnames('change-meal-plan__meals-item', 'card-bg', {
                        active: updateChangeMealForm.meals_cnt === 5,
                      })}
                      >
                        <div className='change-meal-plan__meals-item-count'>5</div>
                        <div className='change-meal-plan__meals-item-desc'>
                          {t('mp.meals.desc')}
                        </div>
                        <div className='change-meal-plan__meals-item-content'>
                          <div className='change-meal-plan__meals-item-content-block'>
                            <div className='change-meal-plan__meals-item-content-block-media'>
                              <BreakfastIcon />
                            </div>
                            {t('meal.breakfast')}
                          </div>
                          <div className='change-meal-plan__meals-item-content-block'>
                            <div className='change-meal-plan__meals-item-content-block-media'>
                              <SnackIcon />
                            </div>
                            {t('meal.snack')}
                          </div>
                          <div className='change-meal-plan__meals-item-content-block'>
                            <div className='change-meal-plan__meals-item-content-block-media'>
                              <LunchIcon />
                            </div>
                            {t('meal.lunch')}
                          </div>
                          <div className='change-meal-plan__meals-item-content-block'>
                            <div className='change-meal-plan__meals-item-content-block-media'>
                              <SnackIcon />
                            </div>
                            {t('meal.snack')}
                          </div>
                          <div className='change-meal-plan__meals-item-content-block'>
                            <div className='change-meal-plan__meals-item-content-block-media'>
                              <DinnerIcon />
                            </div>
                            {t('meal.dinner')}
                          </div>
                        </div>
                        <Button
                          type='button'
                          onClick={() => setUpdateChangeMealForm({ ...updateChangeMealForm, meals_cnt: 5 })}
                          className='change-meal-plan__meals-item-btn'
                        >
                          {t('mp.meals.choose')}
                        </Button>
                      </div>
                    </div>
                    <div className='change-meal-plan__btn-wrap'>
                      <Button
                        type='button'
                        color='primary'
                        onClick={(e) => updateChangeMealSubmit(e)}
                        className='change-meal-plan__btn'
                      >
                        {t('mp.save_next')}
                      </Button>
                    </div>
                  </div>
                )}
                {activeStep === steps.workout && (
                  <div>
                    <div className='change-meal-plan__title'>
                      {t('mp.workout.title')}
                    </div>
                    <div className='change-meal-plan__works-out-list'>
                      <button
                        type='button'
                        className={classnames('change-meal-plan__works-out-btn', {
                          active: updateChangeMealForm.act_level === 1200,
                        })}
                        onClick={() => {
                          setUpdateChangeMealForm({
                            ...updateChangeMealForm,
                            act_level: 1200,
                          });
                        }}
                      >
                        <div className='change-meal-plan__works-out-btn-desc'>
                          {t('mp.works_out.little_activities')}
                        </div>
                      </button>
                      <button
                        type='button'
                        className={classnames('change-meal-plan__works-out-btn', {
                          active: updateChangeMealForm.act_level === 1375,
                        })}
                        onClick={() => {
                          setUpdateChangeMealForm({
                            ...updateChangeMealForm,
                            act_level: 1375,
                          });
                        }}
                      >
                        <div className='change-meal-plan__works-out-btn-desc'>
                          {t('mp.works_out.light_activities')}
                        </div>
                      </button>
                      <button
                        type='button'
                        className={classnames('change-meal-plan__works-out-btn', {
                          active: updateChangeMealForm.act_level === 1550,
                        })}
                        onClick={() => {
                          setUpdateChangeMealForm({
                            ...updateChangeMealForm,
                            act_level: 1550,
                          });
                        }}
                      >
                        <div className='change-meal-plan__works-out-btn-desc'>
                          {t('mp.works_out.moderate_activities')}
                        </div>
                      </button>
                      <button
                        type='button'
                        className={classnames('change-meal-plan__works-out-btn', {
                          active: updateChangeMealForm.act_level === 1725,
                        })}
                        onClick={() => {
                          setUpdateChangeMealForm({
                            ...updateChangeMealForm,
                            act_level: 1725,
                          });
                        }}
                      >
                        <div className='change-meal-plan__works-out-btn-desc'>
                          {t('mp.works_out.active')}
                        </div>
                      </button>
                      <button
                        type='button'
                        className={classnames('change-meal-plan__works-out-btn', {
                          active: updateChangeMealForm.act_level === 1900,
                        })}
                        onClick={() => {
                          setUpdateChangeMealForm({
                            ...updateChangeMealForm,
                            act_level: 1900,
                          });
                        }}
                      >
                        <div className='change-meal-plan__works-out-btn-desc'>
                          {t('mp.works_out.very_active')}
                        </div>
                      </button>
                    </div>
                    <div className='change-meal-plan__btn-wrap'>
                      <Button
                        type='button'
                        color='primary'
                        onClick={(e) => updateChangeMealSubmit(e)}
                        className='change-meal-plan__btn'
                      >
                        {t('mp.save')}
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
        </div>
      </ProfileLayout>
    </>
  );
};

export default WithTranslate(connect(
  (state: any) => ({
    userSettings: state.settings,
  }),
)(SettingsChangeMealPlanView));
