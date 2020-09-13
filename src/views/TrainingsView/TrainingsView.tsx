/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Helmet from 'react-helmet';

import { routes } from 'constants/routes';

import WeekDays from 'components/WeekDays';
import TrainingCard from 'components/TrainingCard';
import TodayActivities from 'components/TodayActivities';
import Button from 'components/common/Forms/Button';
import WithTranslate from 'components/hoc/WithTranslate';
import { getTranslate, getImagePath } from 'utils';
import Breadcrumb from 'components/Breadcrumb';
import ShareButtons from 'components/ShareButtons';

import { ReactComponent as RewardImage } from 'assets/img/reward-img.svg';
import { ReactComponent as CheckedIcon } from 'assets/img/icons/checked-icon.svg';
import { ReactComponent as WorkoutSettingsIcon } from 'assets/img/icons/workout-settings-icon.svg';

import {
  dataForWeekWorkout,
  dataForTodayActivities,
  workPlace,
} from './mockDataForTrainings';

import './TrainingsView.sass';

const TrainingsView: React.FC = (props: any) => {
  const [weekWorkout, setWeekWorkout] = useState('wed');
  const [todayActivities, setTodayActivities] = useState(['workout_add']);

  const t = (code: string, placeholders?: any) => getTranslate(
    props.localePhrases,
    code,
    placeholders,
  );

  const onWorkoutChange = (e) => setWeekWorkout(e.target.value);

  const onActivitiesChange = (e) => {
    e.persist();
    return e.target.checked
      ? setTodayActivities((prev) => [...prev, e.target.value])
      : setTodayActivities((prev) => [
        ...prev.slice(0, prev.indexOf(e.target.value)),
        ...prev.slice(prev.indexOf(e.target.value) + 1),
      ]);
  };

  return (
    <>
      <Helmet>
        <title>{t('app.title.trainings')}</title>
      </Helmet>

      <section className='training-plan-card-list-sect'>
        <div className='container'>
          <Breadcrumb
            routes={[
              {
                url: routes.main,
                name: t('breadcrumb.main'),
              },
              {
                url: routes.mealPlanList,
                name: t('app.title.meal_plan'),
              },
            ]}
            currentPage={t('app.title.trainings')}
          />
          <h1 className='training-plan-title'>
            <span className='training-plan-title-text'>
              {t('trainings.title')}
            </span>
          </h1>
          <div className='row'>
            <div className='training-plan-card-list-col training-plan-list'>
              <div className='row'>
                <div className='place-of-work'>
                  {workPlace.map((item) => (
                    <label key={item.title} className='place-of-work__item'>
                      <input
                        type='radio'
                        className='place-of-work__item-input'
                        name='work-place'
                      />
                      <div className='place-of-work__item-wrap'>
                        <div className='place-of-work__item-checked'>
                          <CheckedIcon />
                        </div>
                        <div className='place-of-work__item-media'>
                          {item.icon}
                        </div>
                        <div className='place-of-work__item-desc'>
                          {item.title}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                <WeekDays
                  days={dataForWeekWorkout}
                  curDay={weekWorkout}
                  onChange={onWorkoutChange}
                  type='radio'
                  className='training-plan-days'
                />

                <Button
                  className='px-5 mb-5 mx-auto week-workout-start-btn'
                  size='lg'
                  color='secondary'
                >
                  {t('trainings.start_workout')}
                </Button>

                <div className='col-12'>
                  {Array.from({ length: 8 }, (_, index) => (
                    <TrainingCard
                      key={index}
                      image={getImagePath('woman_ball_gym.png')}
                      text='Intermediate level 1'
                      time={t('common.minutes', { number: 16 })}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className='training-plan-info-col'>
              <TodayActivities
                name={t('trainings.today_activities')}
                items={dataForTodayActivities}
                todayActivities={todayActivities}
                onChange={onActivitiesChange}
                type='checkbox'
              />
              <div className='training-plan-adherence-diet-card card-bg mt-5'>
                <h4 className='training-plan-adherence-diet-card-title'>
                  {t('trainings.diet_plan')}
                </h4>
                <div className='training-plan-adherence-diet-card-img'>
                  <RewardImage />
                </div>
                <div className='training-plan-adherence-diet-card-content'>
                  <p dangerouslySetInnerHTML={{ __html: t('trainings.plan.completed', { number: 0 }) }} />
                </div>
                <div className='training-plan-adherence-diet-card-progress'>
                  <div className='training-plan-adherence-diet-card-progress-desc'>
                    <div className='training-plan-adherence-diet-card-progress-desc-title'>
                      {t('trainings.week_progress')}
                    </div>
                    <a
                      href='/'
                      className='training-plan-adherence-diet-card-progress-desc-link'
                    >
                      {t('trainings.report')}
                    </a>
                  </div>
                  <div className='training-plan-adherence-diet-card-progress-line'>
                    <div
                      style={{
                        left: 'calc(20% - 40px)',
                      }}
                      className='training-plan-adherence-diet-card-progress-line-percent'
                    >
                      20%
                    </div>
                    <div
                      style={{
                        width: '20%',
                      }}
                      className='training-plan-adherence-diet-card-progress-line-painted'
                    />
                  </div>
                </div>
              </div>
              <div className='training-plan-adherence-diet-card-level'>
                <div className='training-plan-adherence-diet-card-level-title'>
                  {t('trainings.level')}
                </div>
                <div className='training-plan-adherence-diet-card-level-list'>
                  <label className='training-plan-adherence-diet-card-level-list-item card-bg'>
                    <input
                      type='radio'
                      name='level'
                      className='training-plan-adherence-diet-card-level-list-item-radio'
                    />
                    <div className='training-plan-adherence-diet-card-level-list-item-wrap'>
                      <div className='training-plan-adherence-diet-card-level-list-item-checked'>
                        <CheckedIcon />
                      </div>
                      <div className='training-plan-adherence-diet-card-level-list-item-desc'>
                        {t('trainings.elementary')}
                      </div>
                    </div>
                  </label>
                  <label className='training-plan-adherence-diet-card-level-list-item card-bg'>
                    <input
                      type='radio'
                      name='level'
                      className='training-plan-adherence-diet-card-level-list-item-radio'
                    />
                    <div className='training-plan-adherence-diet-card-level-list-item-wrap'>
                      <div className='training-plan-adherence-diet-card-level-list-item-checked'>
                        <CheckedIcon />
                      </div>
                      <div className='training-plan-adherence-diet-card-level-list-item-desc'>
                        {t('trainings.intermediate')}
                      </div>
                    </div>
                  </label>
                  <label className='training-plan-adherence-diet-card-level-list-item card-bg'>
                    <input
                      type='radio'
                      name='level'
                      className='training-plan-adherence-diet-card-level-list-item-radio'
                    />
                    <div className='training-plan-adherence-diet-card-level-list-item-wrap'>
                      <div className='training-plan-adherence-diet-card-level-list-item-checked'>
                        <CheckedIcon />
                      </div>
                      <div className='training-plan-adherence-diet-card-level-list-item-desc'>
                        {t('trainings.advanced')}
                      </div>
                    </div>
                  </label>
                </div>
              </div>
              <div className='training-plan-adherence-diet-card-workout-settings card-bg'>
                <div className='training-plan-adherence-diet-card-workout-settings-desc'>
                  <div className='training-plan-adherence-diet-card-workout-settings-desc-media'>
                    <WorkoutSettingsIcon />
                  </div>
                  <div className='training-plan-adherence-diet-card-workout-settings-desc-text'>
                    {t('trainings.workout_settings.title')}
                  </div>
                </div>
                <div className='training-plan-adherence-diet-card-workout-settings-button'>
                  <Button color='secondary'>{t('trainings.settings')}</Button>
                </div>
              </div>
              <div className='training-plan-adherence-diet-card-socials card-bg'>
                <div className='training-plan-adherence-diet-card-socials-title'>
                  {t('trainings.socials_title')}
                </div>
                <ShareButtons shareLink='' classes='training-plan-adherence-diet-card-socials-list' />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WithTranslate(TrainingsView);
