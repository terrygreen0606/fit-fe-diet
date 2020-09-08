import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { routes } from 'constants/routes';
import { getTranslate } from 'utils';

// Components
import WithTranslate from 'components/hoc/WithTranslate';
import Breadcrumb from 'components/Breadcrumb';

// Icons
import { ReactComponent as SettingsIcon } from 'assets/img/icons/settings-icon.svg';
import { ReactComponent as PenIcon } from 'assets/img/icons/pen-icon.svg';
import { ReactComponent as FirstPlaceIcon } from 'assets/img/icons/first-place-icon.svg';
import { ReactComponent as SecondPlaceIcon } from 'assets/img/icons/second-place-icon.svg';
import { ReactComponent as DietIcon } from 'assets/img/icons/diet-icon.svg';
import { ReactComponent as WorkoutIcon } from 'assets/img/icons/workout-icon.svg';
import { ReactComponent as ClockTimeIcon } from 'assets/img/icons/clock-time-icon.svg';
import { ReactComponent as PlayIcon } from 'assets/img/icons/play-icon.svg';
import { ReactComponent as CartIcon } from 'assets/img/icons/cart-icon.svg';
import { ReactComponent as CalendarIcon } from 'assets/img/icons/calendar-icon.svg';
import { ReactComponent as NotificationIcon } from 'assets/img/icons/notification-icon.svg';
import { ReactComponent as BloodIcon } from 'assets/img/icons/blood-icon.svg';
import { ReactComponent as PressureIcon } from 'assets/img/icons/pressure-icon.svg';
import { ReactComponent as HeartIcon } from 'assets/img/icons/heart-filled-icon.svg';
import { ReactComponent as WaterCheckIcon } from 'assets/img/icons/water-check-icon.svg';
import { ReactComponent as HandShakeIcon } from 'assets/img/icons/handshake-icon.svg';

import ProgressChart from './ProgressChart';

import './DashboardView.sass';

import { data, labels } from './mockDatasChart';

const DashboardView = (props: any) => {
  const t = (code: string, placeholders?: any) => getTranslate(
    props.localePhrases,
    code,
    placeholders,
  );

  return (
    <>
      <Helmet>
        <title>{t('app.title.dashboard')}</title>
      </Helmet>
      <div className='container'>
        <Breadcrumb
          routes={[
            {
              url: routes.main,
              name: t('breadcrumb.main'),
            },
          ]}
          currentPage={t('app.title.dashboard')}
        />
        <div className='dashboard'>
          <div className='dashboard__user card-bg'>
            <div className='dashboard__user-personal-data'>
              <div className='dashboard__user-personal-data-name'>
                <span>{`${t('common.hello')} Anna`}</span>
                <button
                  type='button'
                  className='dashboard__user-personal-data-name-settings'
                >
                  <SettingsIcon />
                </button>
              </div>
              <div className='dashboard__user-personal-data_container'>
                <div className='dashboard__user-personal-data-media dashboard__user-personal-data-media_online'>
                  <img
                    src='https://fitstg.s3.eu-central-1.amazonaws.com/anna_t.png'
                    alt=''
                  />
                  <button
                    type='button'
                    className='dashboard__user-personal-data-media-edit'
                  >
                    <PenIcon />
                  </button>
                </div>
                <div className='dashboard__user-personal-data-activity'>
                  <div className='dashboard__user-personal-data-activity-last-login'>
                    <div className='dashboard__user-personal-data-activity-last-login-description'>
                      {`${t('dashboard.last_login')}:`}
                    </div>
                    <div className='dashboard__user-personal-data-activity-last-login-date'>
                      12.05.2020
                    </div>
                  </div>
                  <div className='dashboard__user-personal-data-activity-subscription'>
                    <div className='dashboard__user-personal-data-activity-subscription-description'>
                      {`${t('common.subscription_title')}:`}
                    </div>
                    <div className='dashboard__user-personal-data-activity-subscription-date'>
                      {t('dashboard.subscription_description', { number: 20 })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='dashboard__user-progress'>
              <div className='dashboard__user-progress-title'>
                {`${t('dashboard.progress_title')}:`}
              </div>
              <div className='dashboard__user-progress-chart'>
                <ProgressChart data={data} labels={labels} />
              </div>
            </div>
            <div className='dashboard__user-rewards'>
              <div className='dashboard__user-rewards-title'>
                {`${t('dashboard.rewards_title')}:`}
              </div>
              <div className='dashboard__user-rewards-item'>
                <div className='dashboard__user-rewards-item-media'>
                  <FirstPlaceIcon />
                </div>
                <div className='dashboard__user-rewards-item-text'>
                  <div className='dashboard__user-rewards-item-text-title'>
                    {t('dashboard.trophy', { number: 1 })}
                  </div>
                  <div className='dashboard__user-rewards-item-text-description'>
                    {t('dashboard.rewards_description')}
                  </div>
                </div>
              </div>
              <div className='dashboard__user-rewards-item'>
                <div className='dashboard__user-rewards-item-media'>
                  <SecondPlaceIcon />
                </div>
                <div className='dashboard__user-rewards-item-text'>
                  <div className='dashboard__user-rewards-item-text-title'>
                    {t('dashboard.trophy', { number: 2 })}
                  </div>
                  <div className='dashboard__user-rewards-item-text-description'>
                    {t('dashboard.rewards_description')}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='dashboard__cards'>
            <div
              className='
              dashboard__cards-item
              dashboard__cards-item_diet
              card-bg'
            >
              <div className='dashboard__cards-item-head'>
                <span className='dashboard__cards-item-head-title'>
                  {t('dashboard.diet_title')}
                </span>
                <div className='dashboard__cards-item-head-media'>
                  <DietIcon />
                </div>
              </div>
              <div className='dashboard__cards-item_diet-description'>
                {t('dashboard.diet_description', { number: 12.05 })}
              </div>
            </div>
            <div
              className='
              dashboard__cards-item
              dashboard__cards-item_workout
              card-bg'
            >
              <div className='dashboard__cards-item-head'>
                <span className='dashboard__cards-item-head-title'>
                  {t('dashboard.workout_title')}
                </span>
                <div className='dashboard__cards-item-head-media'>
                  <WorkoutIcon />
                </div>
              </div>
              <div className='dashboard__cards-item_workout-description'>
                <div className='dashboard__cards-item_workout-description-name'>
                  {t('dashboard.morning_complex')}
                </div>
                <div className='dashboard__cards-item_workout-description-level'>
                  {t('dashboard.beginner_level')}
                </div>
                <div className='dashboard__cards-item_workout-description-time'>
                  <ClockTimeIcon />
                  <span className='dashboard__cards-item_workout-description-time-quantity'>
                    {t('common.minutes', { number: 16 })}
                  </span>
                </div>
                <div className='dashboard__cards-item_workout-description-play'>
                  <div className='dashboard__cards-item_workout-description-play-duration' />
                  <a
                    href='/'
                    className='dashboard__cards-item_workout-description-play-button'
                  >
                    <PlayIcon className='dashboard__cards-item_workout-description-play-icon' />
                  </a>
                </div>
              </div>
            </div>
            <div
              className='
              dashboard__cards-item
              dashboard__cards-item_shopping
              card-bg'
            >
              <div className='dashboard__cards-item-head'>
                <span className='dashboard__cards-item-head-title'>
                  {t('dashboard.shopping_title')}
                </span>
                <div className='dashboard__cards-item-head-media'>
                  <CartIcon />
                  <div className='dashboard__cards-item_shopping-date'>
                    <CalendarIcon className='dashboard__cards-item_shopping-date-media' />
                    <span className='dashboard__cards-item_shopping-date-description'>
                      12.05
                    </span>
                  </div>
                </div>
              </div>
              <div className='dashboard__cards-item_shopping-notifications'>
                <div className='dashboard__cards-item_shopping-notifications-item'>
                  <div className='dashboard__cards-item_shopping-notifications-item-media'>
                    <NotificationIcon />
                  </div>
                  <div className='dashboard__cards-item_shopping-notifications-item-description'>
                    <div className='dashboard__cards-item_shopping-notifications-item-description-title'>
                      {t('common.snack')}
                    </div>
                    <div className='dashboard__cards-item_shopping-notifications-item-description-content'>
                      {t('common.products', { number: 20 })}
                    </div>
                  </div>
                </div>
                <div className='dashboard__cards-item_shopping-notifications-item'>
                  <div className='dashboard__cards-item_shopping-notifications-item-media'>
                    <NotificationIcon />
                  </div>
                  <div className='dashboard__cards-item_shopping-notifications-item-description'>
                    <div className='dashboard__cards-item_shopping-notifications-item-description-title'>
                      {t('common.snack')}
                    </div>
                    <div className='dashboard__cards-item_shopping-notifications-item-description-content'>
                      {t('common.products', { number: 20 })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className='
              dashboard__cards-item
              dashboard__cards-item_blood
              card-bg'
            >
              <div className='dashboard__cards-item-head'>
                <span className='dashboard__cards-item-head-title'>
                  {t('dashboard.blood_title')}
                </span>
                <div className='dashboard__cards-item-head-media'>
                  <BloodIcon />
                </div>
              </div>
              <div className='dashboard__cards-item_blood-datas'>
                <div className='dashboard__cards-item_blood-datas-item'>
                  <div className='dashboard__cards-item_blood-datas-item-media'>
                    <PressureIcon className='dashboard__cards-item_blood-datas-item-media-img' />
                  </div>
                  <div className='dashboard__cards-item_blood-datas-item-description'>
                    120/70
                  </div>
                </div>
                <div className='dashboard__cards-item_blood-datas-item'>
                  <div className='dashboard__cards-item_blood-datas-item-media'>
                    <HeartIcon className='dashboard__cards-item_blood-datas-item-media-img' />
                  </div>
                  <div className='dashboard__cards-item_blood-datas-item-description'>
                    {t('common.bpm', { number: 70 })}
                  </div>
                </div>
              </div>
            </div>
            <div
              className='
              dashboard__cards-item
              dashboard__cards-item_water
              card-bg'
            >
              <div className='dashboard__cards-item-head'>
                <span className='dashboard__cards-item-head-title'>
                  {t('dashboard.wt_title')}
                </span>
                <div className='dashboard__cards-item-head-media'>
                  <WaterCheckIcon />
                </div>
              </div>
              <div className='dashboard__cards-item_water-rate'>
                <div>
                  <div className='dashboard__cards-item_water-rate-title'>
                    {`${t('dashboard.daily_rate')}:`}
                  </div>
                  <div className='dashboard__cards-item_water-rate-norm'>
                    {`2000 ${t('common.ml')}`}
                  </div>
                  <div className='dashboard__cards-item_water-rate-now'>
                    {`1000 ${t('common.ml')}`}
                  </div>
                </div>
                <div className='dashboard__cards-item_water-rate-media'>
                  50%
                </div>
              </div>
            </div>
            <div
              className='
              dashboard__cards-item
              dashboard__cards-item_invite
              card-bg'
            >
              <div className='dashboard__cards-item-head'>
                <span className='dashboard__cards-item-head-title'>
                  {t('dashboard.invite_title')}
                </span>
                <div className='dashboard__cards-item-head-media'>
                  <HandShakeIcon />
                </div>
              </div>
              <div className='dashboard__cards-item_invite-description'>
                {t('dashboard.invite_description')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WithTranslate(connect(null)(DashboardView));
