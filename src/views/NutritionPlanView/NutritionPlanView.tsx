import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { getTranslate, getScrollbarSize } from 'utils';

import { changeSetting } from 'store/actions';

// Components
import WithTranslate from 'components/hoc/WithTranslate';
import useWindowSize from 'components/hooks/useWindowSize';
import Button from 'components/common/Forms/Button';
import NutritionPlanCard from 'components/NutritionPlanCard';
import Advantages from 'components/Advantages';
import SiteTour from 'components/SiteTour';

import './NutritionPlanView.sass';

import { ReactComponent as CookCutIcon } from 'assets/img/icons/cook-cut-icon.svg';
import { ReactComponent as MealIcon } from 'assets/img/icons/meal-icon.svg';
import { ReactComponent as DumbbellIcon } from 'assets/img/icons/dumbbell-icon.svg';
import { ReactComponent as WeighScaleIcon } from 'assets/img/icons/weigh-scale-icon.svg';
import { ReactComponent as FileDyskIcon } from 'assets/img/icons/file-dysk-icon.svg';
import { ReactComponent as PrintIcon } from 'assets/img/icons/print-icon.svg';
import { ReactComponent as AngleLeftIcon } from 'assets/img/icons/angle-left-icon.svg';
import RecipePreviewImage from 'assets/img/recipe-preview-img.jpg';
import RewardImage from 'assets/img/reward-img.svg';
import ClockImage from 'assets/img/icons/clock-icon.svg';

import HintStep from './HintStep';
import { mockData, tourStepFunction } from './dataForNutritionPlanView';

const NutritionPlanView = (props: any) => {
  const { localePhrases, afterSignup } = props;
  const { width } = useWindowSize();
  const [afterSignUp, setAfterSignUp] = useState(afterSignup);
  const [tourStep, setTourStep] = useState(0);
  const { scrollbarWidth } = getScrollbarSize();

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
    if (tourStep === 4) props.changeSetting('afterSignup', false);

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

  return (
    <>
      <Helmet>
        <title>{t('app.title.nutrition_plan')}</title>
      </Helmet>
      {
        afterSignUp
          ? (
            <SiteTour
              data={mockData}
              onAction={onAction}
              localePhrases={localePhrases}
            />
          )
          : (
            <Advantages
              icon1={CookCutIcon}
              icon2={MealIcon}
              icon3={DumbbellIcon}
              mainTitle={t('nutrition.plan.title')}
              advantage1Title={t('nutrition.plan.feat1_title')}
              advantage1Desc={t('nutrition.plan.feat1_desc')}
              advantage2Title={t('nutrition.plan.feat2_title')}
              advantage2Desc={t('nutrition.plan.feat2_desc')}
              advantage3Title={t('nutrition.plan.feat3_title')}
              advantage3Desc={t('nutrition.plan.feat3_desc')}
            />
          )
      }

      { (tourStep > 0 || afterSignUp) && <div className='hint_sect_backdrop' /> }

      <section className='nutrition-plan-card-list-sect'>
        <div className='container'>
          <div className='row'>
            <div className={classnames('nutrition-plan-card-list-col nutrition-plan-list', {
              hinted: tourStep === 3,
            })}
            >
              <div className='row'>
                <div className='col-8 mb-5'>

                  <h4>
                    <AngleLeftIcon className='mr-4' />
                    Neljapäev, 18. juuni
                    {' '}
                    <span className='title-icon ml-4' />
                  </h4>

                </div>
                <div className='col-4 mb-5'>

                  <div className='nutrition-plan-controls-list'>
                    <div className='nutrition-plan-controls-item'>
                      <FileDyskIcon className='nutrition-plan-controls-icon' />
                    </div>

                    <div className='nutrition-plan-controls-item'>
                      <PrintIcon className='nutrition-plan-controls-icon' />
                    </div>
                  </div>

                </div>
                <div className='col-6'>

                  <NutritionPlanCard />

                </div>
                <div className='col-6'>

                  <NutritionPlanCard type='active' favorite />

                </div>
                <div className='col-6'>

                  <NutritionPlanCard type='cross' />

                </div>
              </div>

              {
                tourStep === 3 && (
                  <HintStep
                    hintStep={3}
                    onClick={() => setTourStep(4)}
                    text={t('tour.hint.step3')}
                    closeText={t('common.understand')}
                  />
                )
              }

            </div>
            <div className='nutrition-plan-info-col'>

              <div className={classnames('nutrition-plan-add-recipe-card-back', {
                hinted: tourStep === 1,
              })}
              >
                <div className='nutrition-plan-add-recipe-card card-bg'>
                  <h4>
                    {t('nutrition.add.recipes')}
                  </h4>
                  <img src={RecipePreviewImage} className='nutrition-plan-add-recipe-card-img' alt='' />
                  <span className='nutrition-plan-add-recipe-card-btn' />

                  {
                    tourStep === 1 && (
                      <HintStep
                        hintStep={1}
                        onClick={() => setTourStep(2)}
                        text={t('tour.hint.step1')}
                        closeText={t('common.understand')}
                      />
                    )
                  }

                </div>
              </div>

              <div className={classnames('today-activities', {
                hinted: tourStep === 2,
              })}
              >
                <h4 className='mt-5 mb-4'>
                  {t('trainings.today_activities')}
                </h4>

                <div className='nutrition-plan-activity-list'>
                  <div className='nutrition-plan-activity-card card-bg active'>
                    <span className='nutrition-plan-activity-card-checkmark' />

                    <span className='nutrition-plan-activity-card-icon-wrap'>
                      <DumbbellIcon className='nutrition-plan-activity-card-icon' />
                    </span>

                    <h6 className='nutrition-plan-activity-card-title'>
                      {t('trainings.add.workout')}
                    </h6>
                  </div>

                  <div className='nutrition-plan-activity-card card-bg'>
                    <span className='nutrition-plan-activity-card-checkmark' />

                    <span className='nutrition-plan-activity-card-icon-wrap'>
                      <WeighScaleIcon className='nutrition-plan-activity-card-icon' />
                    </span>

                    <h6 className='nutrition-plan-activity-card-title'>
                      {t('trainings.add.weight')}
                    </h6>
                  </div>

                  {
                    tourStep === 2 && (
                      <HintStep
                        hintStep={2}
                        onClick={() => setTourStep(3)}
                        text={t('tour.hint.step2')}
                        closeText={t('common.understand')}
                      />
                    )
                  }

                </div>
              </div>

              <div className='nutrition-plan-adherence-diet-card card-bg mt-5'>
                <h4 className='nutrition-plan-adherence-diet-card-title'>
                  {t('trainings.diet_plan')}
                </h4>

                <div className='nutrition-plan-adherence-diet-card-img'>
                  <img src={RewardImage} alt='' />
                </div>

                <div className='nutrition-plan-adherence-diet-card-content'>
                  <p>
                    {t('trainings.plan.completed', { number: 0 })}
                  </p>
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
                  <p>
                    {t('nutrition.days_use', { number: 4 })}
                  </p>
                  <Button className='mt-3' color='primary'>
                    {t('nutrition.subscription')}
                  </Button>
                </div>
              </div>

              <div className={classnames('nutrition-plan-diet-settings-card-back', {
                hinted: tourStep === 4,
              })}
              >
                <div className='nutrition-plan-diet-settings-card card-bg mt-5'>
                  <div className='nutrition-plan-diet-settings-card-img text-left'>
                    <MealIcon />
                  </div>

                  <div className='nutrition-plan-diet-settings-card-content'>
                    <h5>
                      {t('personal.menu_diet')}
                    </h5>
                    <p>
                      {t('nutrition.settings.text')}
                    </p>
                    <Button className='mt-3' outline color='secondary'>
                      {t('nutrition.starter')}
                    </Button>
                  </div>

                  {
                    tourStep === 4 && (
                      <HintStep
                        hintStep={4}
                        onClick={() => setTourStep(0)}
                        text={t('tour.hint.step4')}
                        closeText={t('common.understand')}
                      />
                    )
                  }

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WithTranslate(connect(
  (state: any) => ({
    afterSignup: state.storage.afterSignup,
  }), {
    changeSetting,
  },
)(NutritionPlanView));
