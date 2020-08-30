/* eslint-disable import/order */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { routes, MAIN } from 'constants/routes';
import { getTranslate } from 'utils';

// Components
import ProfileLayout from 'components/hoc/ProfileLayout';
import WithTranslate from 'components/hoc/WithTranslate';
import Breadcrumb from 'components/Breadcrumb';
import Button from 'components/common/Forms/Button';
import Progress from './Progress';

import './SettingsChangeMealPlanView.sass';

// Icon
import { ReactComponent as LoseWeightIcon } from 'assets/img/icons/lose-weight-icon.svg';
import { ReactComponent as KeepWeightIcon } from 'assets/img/icons/keep-weight-icon.svg';
import { ReactComponent as LiftWeightIcon } from 'assets/img/icons/lift-weight-icon.svg';
import { ReactComponent as CloseIcon } from 'assets/img/icons/close-icon.svg';

import { notEating, desiases } from './mockData';

const SettingsChangeMealPlanView = (props: any) => {
  const t = (code: string, placeholders?: any) =>
    getTranslate(props.localePhrases, code, placeholders);

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
            >
              {t('mp.next')}
            </Button>
          </div>
        </div>
        {/* add blocks after answer by Vitaliy */}
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
          <div className='change-meal-plan__btn-wrap'>
            <Button
              type='button'
              color='primary'
              className='change-meal-plan__btn'
            >
              {t('mp.next')}
            </Button>
          </div>
        </div>
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
              <div key={item.id} className='change-meal-plan__not-eating-item'>
                <div className='change-meal-plan__not-eating-item-media'>
                  {item.icon}
                </div>
                <div className='change-meal-plan__not-eating-item-desc'>
                  {item.title}
                </div>
                <button
                  type='button'
                  className='change-meal-plan__not-eating-item-close'
                >
                  <CloseIcon />
                </button>
              </div>
            ))}
          </div>
          <div className='change-meal-plan__btn-wrap'>
            <Button
              type='button'
              color='primary'
              className='change-meal-plan__btn'
            >
              {t('mp.next')}
            </Button>
          </div>
        </div>
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
            >
              {t('mp.next')}
            </Button>
          </div>
        </div>
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
      </ProfileLayout>
    </>
  );
};

export default WithTranslate(connect(null)(SettingsChangeMealPlanView));
