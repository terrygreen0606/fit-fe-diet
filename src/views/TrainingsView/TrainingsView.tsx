/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Helmet from 'react-helmet';

import { routes } from 'constants/routes';

import WeekDays from 'components/WeekDays';
import TrainingCard from 'components/TrainingCard';
import Button from 'components/common/Forms/Button';
import WithTranslate from 'components/hoc/WithTranslate';
import { getTranslate, getImagePath } from 'utils';
import Breadcrumb from 'components/Breadcrumb';
import ShareButtons from 'components/ShareButtons';
import AdherenceDietPlan from 'components/AdherenceDietPlan';

import { ReactComponent as CheckedIcon } from 'assets/img/icons/checked-icon.svg';
import { ReactComponent as WorkoutSettingsIcon } from 'assets/img/icons/workout-settings-icon.svg';

import {
  dataForWeekWorkout,
  workPlace,
} from './mockDataForTrainings';

import './TrainingsView.sass';

const TrainingsView: React.FC = (props: any) => {
  const [weekWorkout, setWeekWorkout] = useState('wed');

  const t = (code: string, placeholders?: any) => getTranslate(
    props.localePhrases,
    code,
    placeholders,
  );

  const onWorkoutChange = (e) => setWeekWorkout(e.target.value);

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
          <h1 className='training-plan-title sect-subtitle'>
            {t('trainings.title')}
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
                      time={t('common.minutes', { COUNT: 16 })}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className='training-plan-info-col'>
              <AdherenceDietPlan
                className='mb-5 mt-5'
                todayProgress={0}
                weekProgress={20}
              />
              <div className='training-plan-adherence-diet-card-level'>
                <h2 className='training-plan-adherence-diet-card-level-title'>
                  {t('trainings.level')}
                </h2>
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
                <h2 className='training-plan-adherence-diet-card-socials-title'>
                  {t('socials.share.title')}
                </h2>
                <ShareButtons
                  shareLink=''
                  visible
                  className='training-plan-adherence-diet-card-socials-list'
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WithTranslate(TrainingsView);
