/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import { toast } from 'react-toastify';
import uuid from 'react-uuid';
import requestHash from '@fingerprintjs/fingerprintjs';

import { routes } from 'constants/routes';
import { getTranslate, convertTime, getLangUser } from 'utils';
import { getUserDashboard } from 'api';

// Components
import WithTranslate from 'components/hoc/WithTranslate';
import ContentLoading from 'components/hoc/ContentLoading';

// Icons
import { ReactComponent as SettingsIcon } from 'assets/img/icons/settings-icon.svg';
import { ReactComponent as PenIcon } from 'assets/img/icons/pen-icon.svg';
// import { ReactComponent as FirstPlaceIcon } from 'assets/img/icons/first-place-icon.svg';
import { ReactComponent as DietIcon } from 'assets/img/icons/diet-icon.svg';
// import { ReactComponent as WorkoutIcon } from 'assets/img/icons/workout-icon.svg';
// import { ReactComponent as ClockTimeIcon } from 'assets/img/icons/clock-time-icon.svg';
// import { ReactComponent as PlayIcon } from 'assets/img/icons/play-icon.svg';
import { ReactComponent as CartIcon } from 'assets/img/icons/cart-icon.svg';
import { ReactComponent as CalendarIcon } from 'assets/img/icons/calendar-icon.svg';
import { ReactComponent as NotificationIcon } from 'assets/img/icons/notification-icon.svg';
// import { ReactComponent as BloodIcon } from 'assets/img/icons/blood-icon.svg';
// import { ReactComponent as PressureIcon } from 'assets/img/icons/pressure-icon.svg';
// import { ReactComponent as HeartIcon } from 'assets/img/icons/heart-filled-icon.svg';
import { ReactComponent as WaterCheckIcon } from 'assets/img/icons/water-check-icon.svg';
import { ReactComponent as HandShakeIcon } from 'assets/img/icons/handshake-icon.svg';

import ProgressChart from './ProgressChart';

import './MainView.sass';

const MainView = (props: any) => {
  const t = (code: string, placeholders?: any) => getTranslate(
    props.localePhrases,
    code,
    placeholders,
  );

  const { settings, location } = props;

  type UserDashboardDataParams = {
    bloodPressure: {
      bpm: number,
      bp: string,
    };
    lastLogin: string;
    mealPlan: boolean;
    name: string;
    pointsData: number[];
    pointsLabel: string[];
    rewards: {
      description: string,
      name: string,
      place: number,
      id: string,
    }[];
    subDays: number;
    userpic: string;
    waterTracker: {
      completed: number,
      completedPercent: number,
      dailyGoal: number,
      unit: string,
    };
    workoutPlan: {
      levelI18nCode: 1,
      minutes: 5,
      nameI18n: string,
    };
    todayDate: string;
  };

  const [userDashboardData, setUserDashboardData] = useState<UserDashboardDataParams>({
    bloodPressure: {
      bpm: null,
      bp: null,
    },
    lastLogin: null,
    mealPlan: null,
    name: null,
    pointsData: [],
    pointsLabel: [],
    rewards: [],
    subDays: null,
    userpic: null,
    waterTracker: {
      completed: null,
      completedPercent: null,
      dailyGoal: null,
      unit: null,
    },
    workoutPlan: {
      levelI18nCode: null,
      minutes: null,
      nameI18n: null,
    },
    todayDate: null,
  });

  const [isLoadingDashboard, setIsLoadingDashboard] = useState<boolean>(true);

  const setData = (data) => {
    const updatedPointsData = data.points.map((item) => item.points);
    const updatedPointsLabel = data.points.map((item) => convertTime(item.date, { day: '2-digit', month: '2-digit' }));

    const updatedRewards = data.rewards.map((item) => ({
      ...item,
      id: uuid(),
    }));

    const today = new Date().toLocaleDateString(getLangUser(), { day: '2-digit', month: '2-digit' });

    return ({
      bloodPressure: {
        bpm: data.blood_pressure.bpm,
        bp: data.blood_pressure.bp,
      },
      lastLogin: convertTime(data.last_login),
      mealPlan: data.meal_plan,
      name: data.name,
      pointsData: [...updatedPointsData],
      pointsLabel: [...updatedPointsLabel],
      rewards: [...updatedRewards],
      subDays: data.sub_days,
      userpic: data.userpic,
      waterTracker: {
        completed: data.water_tracker.completed,
        completedPercent: data.water_tracker.completed_percent,
        dailyGoal: data.water_tracker.daily_goal,
        unit: data.water_tracker.unit,
      },
      workoutPlan: {
        levelI18nCode: data.workout_plan.level_i18n_code,
        minutes: data.workout_plan.minutes,
        nameI18n: data.workout_plan.name_i18n,
      },
      todayDate: today,
    });
  };

  useEffect(() => {
    if (Object.prototype.hasOwnProperty.call(location, 'joinFamily')) {
      if (location.joinFamily) {
        toast.success(t('family.accept.success'));
      } else {
        toast.error(t('common.error'));
      }
    }

    (async () => {
      // We recommend to call `load` at application startup.
      const requestHashData = await requestHash.load();

      // The FingerprintJS agent is ready.
      // Get a visitor identifier when you'd like to.
      const result = await requestHashData.get();

      const totalValue = result.visitorId || null;

      getUserDashboard(totalValue)
        .then(({ data }) => {
          if (data.data && data.success) {
            setUserDashboardData(setData(data.data));
          } else {
            toast.error(t('common.error'));
          }
        })
        .catch(() => toast.error(t('common.error')))
        .finally(() => setIsLoadingDashboard(false));
    })();
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('app.title.dashboard')}</title>
      </Helmet>
      <div className='container'>
        <ContentLoading
          isLoading={isLoadingDashboard}
          isError={false}
          spinSize='lg'
        >
          <div className='dashboard'>
            <div className='dashboard__user card-bg'>
              <div className='dashboard__user-personal-data'>
                <div className='dashboard__user-personal-data-name'>
                  <span>{`${t('common.hello')} ${userDashboardData.name}`}</span>
                  <Link
                    to={routes.changeMealSettings}
                    className='dashboard__user-personal-data-name-settings'
                  >
                    <SettingsIcon />
                  </Link>
                </div>
                <div className='dashboard__user-personal-data_container'>
                  <Link
                    to={routes.personalSettings}
                    className='dashboard__user-personal-data-media dashboard__user-personal-data-media_online'
                  >
                    <img
                      src={userDashboardData.userpic}
                      alt=''
                    />
                    <button
                      type='button'
                      className='dashboard__user-personal-data-media-edit'
                    >
                      <PenIcon />
                    </button>
                  </Link>
                  <div className='dashboard__user-personal-data-activity'>
                    <div className='dashboard__user-personal-data-activity-last-login'>
                      <div className='dashboard__user-personal-data-activity-last-login-description'>
                        {`${t('dashboard.last_login')}:`}
                      </div>
                      <div className='dashboard__user-personal-data-activity-last-login-date'>
                        {userDashboardData.lastLogin}
                      </div>
                    </div>
                    <div className='dashboard__user-personal-data-activity-subscription'>
                      <div className='dashboard__user-personal-data-activity-subscription-description'>
                        {`${t('common.subscription_title')}:`}
                      </div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: t('dashboard.tariff.end',
                            { COUNT: userDashboardData.subDays }),
                        }}
                        className='dashboard__user-personal-data-activity-subscription-date'
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='dashboard__user-progress'>
                <div className='dashboard__user-progress-title'>
                  {`${t('dashboard.progress_title')}:`}
                </div>
                <div className='dashboard__user-progress-chart'>
                  <ProgressChart data={userDashboardData.pointsData} labels={userDashboardData.pointsLabel} />
                </div>
              </div>
              {/* <div className='dashboard__user-rewards'>
                <div className='dashboard__user-rewards-title'>
                  {`${t('dashboard.rewards_title')}:`}
                </div>
                {userDashboardData.rewards.map((item) => (
                  <div
                    key={item.id}
                    className='dashboard__user-rewards-item'
                  >
                    <div className='dashboard__user-rewards-item-media'>
                      <FirstPlaceIcon />
                    </div>
                    <div className='dashboard__user-rewards-item-text'>
                      <div className='dashboard__user-rewards-item-text-title'>
                        {item.name}
                      </div>
                      <div className='dashboard__user-rewards-item-text-description'>
                        {item.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div> */}
            </div>
            <div className='dashboard__cards'>
              <Link
                to={routes.mealPlan}
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
                  {userDashboardData.mealPlan ? (
                    t('dashboard.mp.ready', { PERIOD: userDashboardData.todayDate })
                  ) : (
                      t('dashboard.mp.not_ready', { PERIOD: userDashboardData.todayDate })
                    )}
                </div>
              </Link>
              {/* <Link
                to={routes.trainings}
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
                    {userDashboardData.workoutPlan.nameI18n}
                  </div>
                  <div className='dashboard__cards-item_workout-description-level'>
                    {userDashboardData.workoutPlan.levelI18nCode}
                  </div>
                  <div className='dashboard__cards-item_workout-description-time'>
                    <ClockTimeIcon />
                    <span className='dashboard__cards-item_workout-description-time-quantity'>
                      {t('common.minutes', { COUNT: userDashboardData.workoutPlan.minutes })}
                    </span>
                  </div>
                  <div className='dashboard__cards-item_workout-description-play'>
                    <div className='dashboard__cards-item_workout-description-play-duration' />
                    <div className='dashboard__cards-item_workout-description-play-button'>
                      <PlayIcon className='dashboard__cards-item_workout-description-play-icon' />
                    </div>
                  </div>
                </div>
              </Link> */}
              <Link
                to={routes.shoppingList}
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
                        {userDashboardData.todayDate}
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
                        {t('dashboard.need_to_buy')}
                      </div>
                      <div className='dashboard__cards-item_shopping-notifications-item-description-content'>
                        {t('common.products', { COUNT: settings.shopping_list_count })}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              {/* <Link
                to={routes.main}
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
                      {userDashboardData.bloodPressure.bp}
                    </div>
                  </div>
                  <div className='dashboard__cards-item_blood-datas-item'>
                    <div className='dashboard__cards-item_blood-datas-item-media'>
                      <HeartIcon className='dashboard__cards-item_blood-datas-item-media-img' />
                    </div>
                    <div className='dashboard__cards-item_blood-datas-item-description'>
                      {t('common.bpm', { COUNT: userDashboardData.bloodPressure.bpm })}
                    </div>
                  </div>
                </div>
              </Link> */}
              <Link
                to={routes.waterTracker}
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
                      {`${userDashboardData.waterTracker.dailyGoal} ${userDashboardData.waterTracker.unit}`}
                    </div>
                    <div className='dashboard__cards-item_water-rate-now'>
                      {`${userDashboardData.waterTracker.completed} ${userDashboardData.waterTracker.unit}`}
                    </div>
                  </div>
                  <div className='dashboard__cards-item_water-rate-media'>
                    {`${userDashboardData.waterTracker.completedPercent}%`}
                  </div>
                </div>
              </Link>
              <Link
                to={routes.referral}
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
              </Link>
            </div>
          </div>
        </ContentLoading>
      </div>
    </>
  );
};

export default WithTranslate(
  connect(
    (state: any) => ({
      settings: state.settings,
    }),
  )(MainView),
);
