/* eslint-disable import/order */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import classnames from 'classnames';
import { toast } from 'react-toastify';

import { routes, MAIN } from 'constants/routes';
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
  getUserSettings,
} from 'api';
import FormValidator from 'utils/FormValidator';

// Components
import ProfileLayout from 'components/hoc/ProfileLayout';
import WithTranslate from 'components/hoc/WithTranslate';
import Breadcrumb from 'components/Breadcrumb';
import Button from 'components/common/Forms/Button';
import Progress from './Progress';
import SelectInput from 'components/common/Forms/SelectInput';
import InputField from 'components/common/Forms/InputField';
import CustomSwitch from 'components/common/Forms/CustomSwitch';

import './SettingsChangeMealPlanView.sass';

// Icon
import { ReactComponent as LoseWeightIcon } from 'assets/img/icons/lose-weight-icon.svg';
import { ReactComponent as KeepWeightIcon } from 'assets/img/icons/keep-weight-icon.svg';
import { ReactComponent as LiftWeightIcon } from 'assets/img/icons/lift-weight-icon.svg';
import { ReactComponent as BreakfastIcon } from 'assets/img/icons/breakfast-icon.svg';
import { ReactComponent as LunchIcon } from 'assets/img/icons/lunch-icon.svg';
import { ReactComponent as DinnerIcon } from 'assets/img/icons/dinner-icon.svg';
import { ReactComponent as SnackIcon } from 'assets/img/icons/snack-icon.svg';

const SettingsChangeMealPlanView = (props: any) => {
  const t = (code: string, placeholders?: any) =>
    getTranslate(props.localePhrases, code, placeholders);

  const [gender] = useState([
    {
      value: 'm',
      label: t('mp.form.male'),
    },
    {
      value: 'f',
      label: t('mp.form.female'),
    },
  ]);

  const [activeStep, setActiveStep] = useState(steps.goal);

  const [cuisinesList, setCuisinesList] = useState([]);

  const [diseasesList, setDiseasesList] = useState([]);

  const [updateChangeMealForm, setUpdateChangeMealForm] = useState({
    measurement: null,
    gender: null,
    age: null,
    height: '',
    weight: null,
    goal: null,
    ignore_cuisine_ids: [],
    diseases: [],
    meals_cnt: null,
  });

  const [updateChangeMeal, setUpdateChangeMealErrors] = useState([]);

  const validateOnChange = (name: string, value: any, event, element?) => {
    validateFieldOnChange(
      name,
      value,
      event,
      updateChangeMealForm,
      setUpdateChangeMealForm,
      updateChangeMeal,
      setUpdateChangeMealErrors,
      element,
    );
  };

  const getFieldErrors = (field: string) => getFieldErrorsUtil(field, updateChangeMeal);

  const updateChangeMealSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const inputs = [...form.elements].filter((i) => ['INPUT', 'SELECT', 'TEXTAREA'].includes(i.nodeName));

    const { errors, hasError } = FormValidator.bulkValidate(inputs);

    setUpdateChangeMealErrors([...errors]);

    if (!hasError) {
      userUpdateMealSettings(
        updateChangeMealForm.measurement,
        updateChangeMealForm.gender,
        updateChangeMealForm.age,
        updateChangeMealForm.height,
        updateChangeMealForm.weight,
        updateChangeMealForm.goal,
        updateChangeMealForm.ignore_cuisine_ids,
        updateChangeMealForm.diseases,
        updateChangeMealForm.meals_cnt,
      ).then((response) => {
        toast.success(t('mp.form.success'), {
          autoClose: 3000,
        });

        setUpdateChangeMealForm({
          ...updateChangeMealForm,
          measurement: null,
          gender: '',
          age: null,
          height: '',
          weight: null,
          goal: null,
          ignore_cuisine_ids: [],
          diseases: [],
          meals_cnt: null,
        });

        const updatedDiseasesList = [];

        diseasesList.map((item) => {
          item.isActive = false;
          updatedDiseasesList.push(item);
        });

        setDiseasesList(updatedDiseasesList);

        const updatedCuisinesList = [];

        cuisinesList.map((item) => {
          item.isActive = false;
          updatedCuisinesList.push(item);
        });

        setCuisinesList(updatedCuisinesList);

        return response.data.data;
      }).catch(() => {
        toast.error(t('mp.form.error'), {
          autoClose: 3000,
        });
      });
    }
  };

  useEffect(() => {
    getRecipeCuisines().then((response) => setCuisinesList(response.data.data));
    getDiseases().then((response) => setDiseasesList(response.data.data));
    getUserSettings().then((response) =>
      setUpdateChangeMealForm({ ...updateChangeMealForm, measurement: response.data.data.measurement }));
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('app.title.family')}</title>
      </Helmet>
      <div className='container'>
        <Breadcrumb
          routes={[
            {
              url: routes[MAIN],
              name: MAIN,
            },
          ]}
          currentPage={t('app.title.family')}
        />
      </div>
      <ProfileLayout>
        <form onSubmit={(e) => updateChangeMealSubmit(e)}>
          {activeStep === steps.goal && (
            <div
              onSubmit={(e) => updateChangeMealSubmit(e)}
              className='change-meal-plan card-bg'
            >
              <Progress
                goal
                goalText={t('mp.progress.goal')}
                metricsText={t('mp.progress.metrics')}
                notEatingText={t('mp.progress.not_eating')}
                desiasesText={t('mp.progress.desiases')}
                mealsText={t('mp.progress.meals')}
                percent={20}
              />
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
                  onClick={() => setActiveStep(steps.metrics)}
                >
                  {t('mp.next')}
                </Button>
              </div>
            </div>
          )}
          {activeStep === steps.metrics && (
            <div className='change-meal-plan card-bg'>
              <Progress
                goal
                goalText={t('mp.progress.goal')}
                metrics
                metricsText={t('mp.progress.metrics')}
                notEatingText={t('mp.progress.not_eating')}
                desiasesText={t('mp.progress.desiases')}
                mealsText={t('mp.progress.meals')}
                percent={40}
              />
              <div className='change-meal-plan__title'>{t('mp.metrics.title')}</div>
              <div className='change-meal-plan__metrics'>
                <div className='change-meal-plan__metrics-item'>
                  <div className='change-meal-plan__metrics-item-desc'>
                    {t('mp.metrics.sex')}
                  </div>
                  <div className='change-meal-plan__metrics-item-value'>
                    <SelectInput
                      value={gender.find((option) => option.value === updateChangeMealForm.gender)}
                      options={gender}
                      placeholder=''
                      onChange={(option, e) => validateOnChange('gender', option.value, e)}
                    />
                  </div>
                </div>
                <div className='change-meal-plan__metrics-item'>
                  <div className='change-meal-plan__metrics-item-desc'>
                    {t('mp.metrics.age')}
                  </div>
                  <div className='change-meal-plan__metrics-item-value'>
                    <InputField
                      type='number'
                      name='age'
                      errors={getFieldErrors('age')}
                      data-param='12, 100'
                      data-validate='["min-max"]'
                      value={updateChangeMealForm.age}
                      onChange={(e) => validateOnChange('age', +e.target.value, e)}
                      min={12}
                      max={100}
                    />
                  </div>
                </div>
                <div className='change-meal-plan__metrics-item'>
                  <div className='change-meal-plan__metrics-item-desc'>
                    {t('mp.metrics.height')}
                  </div>
                  <div className='change-meal-plan__metrics-item-value'>
                    <InputField
                      name='height'
                      errors={getFieldErrors('height')}
                      value={updateChangeMealForm.height}
                      onChange={(e) => validateOnChange('height', e.target.value, e)}
                    />
                    {t('common.cm')}
                  </div>
                </div>
                <div className='change-meal-plan__metrics-item'>
                  <div className='change-meal-plan__metrics-item-desc'>
                    {t('mp.metrics.weight')}
                  </div>
                  <div className='change-meal-plan__metrics-item-value'>
                    <InputField
                      type='number'
                      name='weight'
                      data-param='30, 999'
                      data-validate='["min-max"]'
                      errors={getFieldErrors('weight')}
                      value={updateChangeMealForm.weight}
                      onChange={(e) => validateOnChange('weight', +e.target.value, e)}
                      min={30}
                      max={999}
                    />
                    <CustomSwitch
                      label1={t('common.pound')}
                      label2={t('common.kg')}
                      checked={updateChangeMealForm.measurement === 'si'}
                      onChange={() => {
                        setUpdateChangeMealForm({
                          ...updateChangeMealForm,
                          measurement: updateChangeMealForm.measurement === 'si' ? 'us' : 'si',
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className='change-meal-plan__btn-wrap'>
                <Button
                  type='button'
                  color='primary'
                  className='change-meal-plan__btn'
                  onClick={() => setActiveStep(steps.notEating)}
                >
                  {t('mp.next')}
                </Button>
              </div>
            </div>
          )}
          {activeStep === steps.notEating && (
            <div className='change-meal-plan card-bg'>
              <Progress
                goal
                goalText={t('mp.progress.goal')}
                metrics
                metricsText={t('mp.progress.metrics')}
                notEating
                notEatingText={t('mp.progress.not_eating')}
                desiasesText={t('mp.progress.desiases')}
                mealsText={t('mp.progress.meals')}
                percent={60}
              />
              <div className='change-meal-plan__title'>
                {t('mp.not_eating.title')}
              </div>
              <div className='change-meal-plan__not-eating'>
                {cuisinesList.map((item, itemIndex) => (
                  <button
                    key={item.id}
                    type='button'
                    onClick={() => {
                      const updatedCuisinesList = [...cuisinesList];
                      if (!item.isActive) {
                        updatedCuisinesList[itemIndex].isActive = true;
                        setCuisinesList([...updatedCuisinesList]);
                        updateChangeMealForm.ignore_cuisine_ids.push(item.id);
                      } else {
                        updatedCuisinesList[itemIndex].isActive = false;
                        setCuisinesList([...updatedCuisinesList]);
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
                  onClick={() => setActiveStep(steps.desiases)}
                >
                  {t('mp.next')}
                </Button>
              </div>
            </div>
          )}
          {activeStep === steps.desiases && (
            <div className='change-meal-plan card-bg'>
              <Progress
                goal
                goalText={t('mp.progress.goal')}
                metrics
                metricsText={t('mp.progress.metrics')}
                notEating
                notEatingText={t('mp.progress.not_eating')}
                desiases
                desiasesText={t('mp.progress.desiases')}
                mealsText={t('mp.progress.meals')}
                percent={80}
              />
              <div className='change-meal-plan__title'>
                {t('mp.desiases.title')}
              </div>
              <div className='change-meal-plan__desiases'>
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
                    className={classnames('change-meal-plan__desiases-item', {
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
                  onClick={() => setActiveStep(steps.meals)}
                >
                  {t('mp.next')}
                </Button>
              </div>
            </div>
          )}
          {activeStep === steps.meals && (
            <div className='change-meal-plan card-bg'>
              <Progress
                goal
                goalText={t('mp.progress.goal')}
                metrics
                metricsText={t('mp.progress.metrics')}
                notEating
                notEatingText={t('mp.progress.not_eating')}
                desiases
                desiasesText={t('mp.progress.desiases')}
                meals
                mealsText={t('mp.progress.meals')}
                percent={100}
              />
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
                  type='submit'
                  color='primary'
                  className='change-meal-plan__btn'
                >
                  {t('mp.save')}
                </Button>
              </div>
            </div>
          )}
        </form>
      </ProfileLayout>
    </>
  );
};

export default WithTranslate(connect(null)(SettingsChangeMealPlanView));
