/* eslint-disable import/order */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { routes, MAIN } from 'constants/routes';
import { getTranslate } from 'utils';
import { steps } from './steps';
import { userUpdateMealSettings } from 'api';

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

import { notEating, desiases } from './mockData';

const SettingsChangeMealPlanView = (props: any) => {
  const t = (code: string, placeholders?: any) =>
    getTranslate(props.localePhrases, code, placeholders);

  const [activeStep, setActiveStep] = useState(steps.goal);

  const [sex] = useState([
    {
      value: 'm',
      label: t('meal_plan.form.male'),
    },
    {
      value: 'f',
      label: t('meal_plan.form.female'),
    },
  ]);

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
        {/* {activeStep === steps.goal && ( */}
        <div className='change-meal-plan card-bg'>
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
            <label className='change-meal-plan__goals-item'>
              <input
                type='radio'
                className='change-meal-plan__goals-item-radio'
                name='goal'
              />
              <div className='change-meal-plan__goals-item-btn'>
                <div className='change-meal-plan__goals-item-btn-media'>
                  <LoseWeightIcon />
                </div>
                <span>{t('mp.goal.lose')}</span>
              </div>
            </label>
            <label className='change-meal-plan__goals-item'>
              <input
                type='radio'
                className='change-meal-plan__goals-item-radio'
                name='goal'
              />
              <div className='change-meal-plan__goals-item-btn'>
                <div className='change-meal-plan__goals-item-btn-media'>
                  <KeepWeightIcon />
                </div>
                <span>{t('mp.goal.lift')}</span>
              </div>
            </label>
            <label className='change-meal-plan__goals-item'>
              <input
                type='radio'
                className='change-meal-plan__goals-item-radio'
                name='goal'
              />
              <div className='change-meal-plan__goals-item-btn'>
                <div className='change-meal-plan__goals-item-btn-media'>
                  <LiftWeightIcon />
                </div>
                <span>{t('mp.goal.lose')}</span>
              </div>
            </label>
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
        {/* )} */}
        {/* {activeStep === steps.metrics && ( */}
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
                  options={sex}
                  placeholder='Male'
                  onChange={() => { }}
                />
              </div>
            </div>
            <div className='change-meal-plan__metrics-item'>
              <div className='change-meal-plan__metrics-item-desc'>
                {t('mp.metrics.age')}
              </div>
              <div className='change-meal-plan__metrics-item-value'>
                <InputField type='number' />
              </div>
            </div>
            <div className='change-meal-plan__metrics-item'>
              <div className='change-meal-plan__metrics-item-desc'>
                {t('mp.metrics.height')}
              </div>
              <div className='change-meal-plan__metrics-item-value'>
                <InputField type='number' />
                {t('common.cm')}
              </div>
            </div>
            <div className='change-meal-plan__metrics-item'>
              <div className='change-meal-plan__metrics-item-desc'>
                {t('mp.metrics.weight')}
              </div>
              <div className='change-meal-plan__metrics-item-value'>
                <InputField type='number' />
                <CustomSwitch label1={t('common.pound')} label2={t('common.kg')} />
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
        {/* )} */}
        {/* {activeStep === steps.notEating && ( */}
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
            {notEating.map((item) => (
              <label className='change-meal-plan__not-eating-label'>
                <input
                  name='not-eating'
                  type='checkbox'
                  className='change-meal-plan__not-eating-input'
                />
                <div
                  key={item.id}
                  className='change-meal-plan__not-eating-item'
                >
                  <div className='change-meal-plan__not-eating-item-media'>
                    {item.icon}
                  </div>
                  <div className='change-meal-plan__not-eating-item-desc'>
                    {item.title}
                  </div>
                </div>
              </label>
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
        {/* )} */}
        {/* {activeStep === steps.desiases && ( */}
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
            {desiases.map((item) => (
              <label key={item.id} className='change-meal-plan__desiases-item'>
                <input
                  type='checkbox'
                  name='desiase'
                  className='change-meal-plan__desiases-item-checkbox'
                />
                <div className='change-meal-plan__desiases-item-desc'>
                  {item.title}
                </div>
              </label>
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
        {/* )}
        {activeStep === steps.meals && ( */}
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
            <div className='change-meal-plan__meals-item card-bg'>
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
              <Button className='change-meal-plan__meals-item-btn'>
                {t('mp.meals.choose')}
              </Button>
            </div>
            <div className='change-meal-plan__meals-item card-bg'>
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
              <Button className='change-meal-plan__meals-item-btn'>
                {t('mp.meals.choose')}
              </Button>
            </div>
            <div className='change-meal-plan__meals-item card-bg'>
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
              <Button className='change-meal-plan__meals-item-btn'>
                {t('mp.meals.choose')}
              </Button>
            </div>
          </div>
          <div className='change-meal-plan__btn-wrap'>
            <Button
              type='button'
              color='primary'
              className='change-meal-plan__btn'
            >
              {t('mp.save')}
            </Button>
          </div>
        </div>
        {/* )} */}
      </ProfileLayout>
    </>
  );
};

export default WithTranslate(connect(null)(SettingsChangeMealPlanView));
