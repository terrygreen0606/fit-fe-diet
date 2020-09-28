/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { getTranslate, getScrollbarSize } from 'utils';

import { routes } from 'constants/routes';
import { changeSetting } from 'store/actions';

// Components
import WithTranslate from 'components/hoc/WithTranslate';
import useWindowSize from 'components/hooks/useWindowSize';
import Button from 'components/common/Forms/Button';
import NutritionPlanCard from 'components/NutritionPlanCard';
import SiteTour from 'components/SiteTour';
import Breadcrumb from 'components/Breadcrumb';
import TodayActivities from 'components/TodayActivities';

import './MealPlanView.sass';

import { ReactComponent as MealIcon } from 'assets/img/icons/meal-icon.svg';
import { ReactComponent as FileDyskIcon } from 'assets/img/icons/file-dysk-icon.svg';
import { ReactComponent as PrintIcon } from 'assets/img/icons/print-icon.svg';
import { ReactComponent as ShareIcon } from 'assets/img/icons/share-icon.svg';
import { ReactComponent as CalendarIcon } from 'assets/img/icons/calendar-icon.svg';
import RecipePreviewImage from 'assets/img/recipe-preview-img.jpg';
import RewardImage from 'assets/img/reward-img.svg';
import ClockImage from 'assets/img/icons/clock-icon.svg';

import HintStep from './HintStep';
import {
  mockData,
  tourStepFunction,
  dataForTodayActivities,
} from './dataForMealPlanView';

const MealPlanView = (props: any) => {
  const { localePhrases, afterSignup } = props;
  const { width } = useWindowSize();
  const [afterSignUp, setAfterSignUp] = useState(afterSignup);
  const [tourStep, setTourStep] = useState(0);
  const { scrollbarWidth } = getScrollbarSize();
  const [todayActivities, setTodayActivities] = useState(['workout_add']);

  const t = (code: string, placeholders?: any) => getTranslate(
    localePhrases,
    code,
    placeholders,
  );

  const onAction = () => {
    setAfterSignUp(false);
    setTourStep(1);
  };

  useEffect(() => {
    if (tourStep === 3) props.changeSetting('afterSignup', false);

    tourStepFunction(width, tourStep);
  }, [tourStep]);

  useEffect(() => {
    if (afterSignUp || tourStep > 0) {
      document.querySelector('body').classList.add('overflow-y-hidden');
      document.body.style.marginRight = `${scrollbarWidth}px`;
    } else {
      document.querySelector('body').classList.remove('overflow-y-hidden');
      document.body.style.marginRight = '0px';
    }
  }, [afterSignUp, tourStep]);

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
        <title>{t('app.title.nutrition_plan')}</title>
      </Helmet>
      <div className='container'>
        <Breadcrumb
          routes={[
            {
              url: routes.main,
              name: t('breadcrumb.main'),
            },
          ]}
          currentPage={t('nutrition.title')}
        />
      </div>
      {afterSignUp && (
        <SiteTour
          data={mockData}
          onAction={onAction}
          localePhrases={localePhrases}
        />
      )}

      {(tourStep > 0 || afterSignUp) && <div className='hint_sect_backdrop' />}

      <section className='nutrition-plan-card-list-sect'>
        <div className='container'>
          <div className='row'>
            <div
              className={classnames(
                'nutrition-plan-card-list-col nutrition-plan-list',
                {
                  hinted: tourStep === 2,
                },
              )}
            >
              <div className='nutrition-plan-card-list-controls'>
                <button
                  type='button'
                  className='nutrition-plan-card-list-controls-item'
                >
                  <FileDyskIcon />
                </button>
                <button
                  type='button'
                  className='nutrition-plan-card-list-controls-item'
                >
                  <PrintIcon />
                </button>
                <button
                  type='button'
                  className='nutrition-plan-card-list-controls-item'
                >
                  <ShareIcon />
                </button>
              </div>
              <div className='nutrition-plan-card-list-date'>
                <button
                  type='button'
                  className='nutrition-plan-card-list-date-item card-bg'
                >
                  <div className='nutrition-plan-card-list-date-item-number'>
                    27
                  </div>
                  <div className='nutrition-plan-card-list-date-item-day-week'>
                    mon
                  </div>
                </button>
                <button
                  type='button'
                  className='nutrition-plan-card-list-date-item card-bg'
                >
                  <div className='nutrition-plan-card-list-date-item-number'>
                    28
                  </div>
                  <div className='nutrition-plan-card-list-date-item-day-week'>
                    tus
                  </div>
                </button>
                <button
                  type='button'
                  className='nutrition-plan-card-list-date-item card-bg'
                >
                  <div className='nutrition-plan-card-list-date-item-number'>
                    29
                  </div>
                  <div className='nutrition-plan-card-list-date-item-day-week'>
                    wed
                  </div>
                </button>
                <button
                  type='button'
                  className='nutrition-plan-card-list-date-item card-bg'
                >
                  <div className='nutrition-plan-card-list-date-item-number'>
                    30
                  </div>
                  <div className='nutrition-plan-card-list-date-item-day-week'>
                    thu
                  </div>
                </button>
                <button
                  type='button'
                  className='nutrition-plan-card-list-date-item card-bg'
                >
                  <div className='nutrition-plan-card-list-date-item-number'>
                    31
                  </div>
                  <div className='nutrition-plan-card-list-date-item-day-week'>
                    fri
                  </div>
                </button>
                <button
                  type='button'
                  className='nutrition-plan-card-list-date-item card-bg'
                >
                  <div className='nutrition-plan-card-list-date-item-number'>
                    01
                  </div>
                  <div className='nutrition-plan-card-list-date-item-day-week'>
                    sat
                  </div>
                </button>
                <button
                  type='button'
                  className='nutrition-plan-card-list-date-item card-bg'
                >
                  <div className='nutrition-plan-card-list-date-item-number'>
                    02
                  </div>
                  <div className='nutrition-plan-card-list-date-item-day-week'>
                    sun
                  </div>
                </button>
              </div>
              <div className='nutrition-plan-card-list-recipes card-bg'>
                <div className='nutrition-plan-card-list-recipes-title'>
                  <CalendarIcon />
                  <span>Monday, July 29th 2020</span>
                </div>
                <div className='row'>
                  <div className='col-xl-6'>
                    <NutritionPlanCard
                      favorite
                      reload
                      shopCart
                      checked
                    />
                  </div>
                  <div className='col-xl-6'>
                    <NutritionPlanCard type='active' favorite />
                  </div>
                  <div className='col-xl-6'>
                    <NutritionPlanCard type='cross' />
                  </div>
                </div>
              </div>
              {tourStep === 2 && (
                <HintStep
                  hintStep={2}
                  onClick={() => setTourStep(3)}
                  text={t('tour.hint.step2')}
                  closeText={t('common.understand')}
                />
              )}
            </div>
            <div className='nutrition-plan-info-col'>
              <div
                className='nutrition-plan-add-recipe-card-back'
              >
                <div className='nutrition-plan-add-recipe-card card-bg'>
                  <h4>{t('nutrition.add.recipes')}</h4>
                  <img
                    src={RecipePreviewImage}
                    className='nutrition-plan-add-recipe-card-img'
                    alt=''
                  />
                  <span className='nutrition-plan-add-recipe-card-btn' />
                </div>
              </div>

              <div
                className={classnames('today-activities', {
                  hinted: tourStep === 1,
                })}
              >
                <TodayActivities
                  name={t('trainings.today_activities')}
                  items={dataForTodayActivities}
                  todayActivities={todayActivities}
                  onChange={onActivitiesChange}
                  type='checkbox'
                />
                {tourStep === 1 && (
                  <HintStep
                    hintStep={1}
                    onClick={() => setTourStep(2)}
                    text={t('tour.hint.step1')}
                    closeText={t('common.understand')}
                  />
                )}
              </div>

              <div className='nutrition-plan-adherence-diet-card card-bg mt-5'>
                <h4 className='nutrition-plan-adherence-diet-card-title'>
                  {t('trainings.diet_plan')}
                </h4>

                <div className='nutrition-plan-adherence-diet-card-img'>
                  <img src={RewardImage} alt='' />
                </div>

                <div className='nutrition-plan-adherence-diet-card-content'>
                  <p
                    dangerouslySetInnerHTML={
                      { __html: t('workout.plan.completed', { COUNT: 0 }) }
                    }
                  />
                  <a href='/' className='link'>
                    {t('trainings.report.week')}
                  </a>
                </div>
              </div>

              <div className='nutrition-plan-usage-time-card card-bg mt-5'>
                <div className='nutrition-plan-usage-time-card-img text-left'>
                  <img src={ClockImage} alt='' />
                </div>

                <div className='nutrition-plan-usage-time-card-content'>
                  <h5>
                    {t('nutrition.active_time')}
                  </h5>
                  <p
                    dangerouslySetInnerHTML={
                      { __html: t('nutrition.days_use', { COUNT: 4 }) }
                    }
                  />
                  <Button className='mt-3' color='primary'>
                    {t('nutrition.subscription')}
                  </Button>
                </div>
              </div>

              <div
                className={classnames(
                  'nutrition-plan-diet-settings-card-back',
                  {
                    hinted: tourStep === 3,
                  },
                )}
              >
                <div className='nutrition-plan-diet-settings-card card-bg mt-5'>
                  <div className='nutrition-plan-diet-settings-card-img text-left'>
                    <MealIcon />
                  </div>

                  <div className='nutrition-plan-diet-settings-card-content'>
                    <h5>{t('personal.menu_diet')}</h5>
                    <p>{t('nutrition.settings.text')}</p>
                    <Button className='mt-3' outline color='secondary'>
                      {t('nutrition.starter')}
                    </Button>
                  </div>

                  {tourStep === 3 && (
                    <HintStep
                      hintStep={3}
                      onClick={() => setTourStep(0)}
                      text={t('tour.hint.step3')}
                      closeText={t('common.understand')}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WithTranslate(
  connect(
    (state: any) => ({
      afterSignup: state.storage.afterSignup,
    }),
    {
      changeSetting,
    },
  )(MealPlanView),
);
