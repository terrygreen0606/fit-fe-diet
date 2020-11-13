/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { toast } from 'react-toastify';

import { routes } from 'constants/routes';
import { getTranslate } from 'utils';
import { fetchUserProfile } from 'api';

// Components
import ProfileLayout from 'components/hoc/ProfileLayout';
import WithTranslate from 'components/hoc/WithTranslate';
import Breadcrumb from 'components/Breadcrumb';
import ProgressLine from 'components/ProgressLine';
import ContentLoading from 'components/hoc/ContentLoading';
import MetricsStep from './Steps/MetricsStep';
import NotEatingStep from './Steps/NotEatingStep';
import DiseasesStep from './Steps/DiseasesStep';
import MealsStep from './Steps/MealsStep';
import WorkoutStep from './Steps/WorkoutStep';

import './SettingsChangeMealPlanView.sass';

import { steps } from './steps';

const SettingsChangeMealPlanView = (props: any) => {
  const t = (code: string, placeholders?: any) =>
    getTranslate(props.localePhrases, code, placeholders);

  const [activeStep, setActiveStep] = useState(steps.metrics);
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true);
  const [userData, setUserData] = useState({
    goal: null,
    gender: null,
    age: null,
    height: null,
    weight: null,
    weight_goal: null,
    ignore_cuisine_ids: null,
    diseases: null,
    meals_cnt: null,
    act_level: null,
  });

  useEffect(() => {
    fetchUserProfile().then((response) => {
      if (response.data.success && response.data.data) {
        const {
          goal,
          gender,
          age,
          height,
          weight,
          weight_goal,
          ignore_cuisine_ids,
          diseases,
          meals_cnt,
          act_level,
        } = response.data.data;

        setUserData({
          ...userData,
          goal,
          gender,
          age,
          height,
          weight,
          weight_goal,
          ignore_cuisine_ids: ignore_cuisine_ids || [],
          diseases: diseases || [],
          meals_cnt,
          act_level,
        });
      }
    }).catch(() => toast.error(t('common.error')))
      .finally(() => setIsLoadingPage(false));
  }, []);

  const updateActiveStep = (value: number) => {
    setActiveStep(value);
  };

  const updateUserMetrics = (value: {
    gender: string,
    age: number,
    height: string,
    weight: number,
    weight_goal: number,
  }) => {
    setUserData({
      ...userData,
      gender: value.gender,
      age: value.age,
      height: value.height,
      weight: value.weight,
      weight_goal: value.weight_goal,
    });
  };

  const updateUserCuisineList = (value: string[]) => {
    setUserData({
      ...userData,
      ignore_cuisine_ids: [...value],
    });
  };

  const updateUserDesiases = (value: string[]) => {
    setUserData({
      ...userData,
      diseases: [...value],
    });
  };

  const updateMealsCnt = (value: number) => {
    setUserData({
      ...userData,
      meals_cnt: value,
    });
  };

  const updateActLevel = (value: number) => {
    setUserData({
      ...userData,
      act_level: value,
    });
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
        <div className='change-meal-plan card-bg'>
          <ProgressLine
            activeStepIndex={activeStep}
            steps={[
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
          <ContentLoading
            isLoading={isLoadingPage}
            isError={false}
            spinSize='lg'
          >
            {activeStep === steps.metrics && (
              <MetricsStep
                userGender={userData.gender}
                userAge={userData.age}
                userHeight={userData.height}
                userWeight={userData.weight}
                userWeightGoal={userData.weight_goal}
                updateActiveStep={updateActiveStep}
                updateUserMetrics={updateUserMetrics}
              />
            )}
            {activeStep === steps.notEating && (
              <NotEatingStep
                userIgnoreCuisineList={userData.ignore_cuisine_ids}
                updateActiveStep={updateActiveStep}
                userUpdateCuisineList={updateUserCuisineList}
              />
            )}
            {activeStep === steps.diseases && (
              <DiseasesStep
                userDesiases={userData.diseases}
                updateActiveStep={updateActiveStep}
                userUpdateDesiases={updateUserDesiases}
              />
            )}
            {activeStep === steps.meals && (
              <MealsStep
                userMealsCnt={userData.meals_cnt}
                updateActiveStep={updateActiveStep}
                updateMealsCnt={updateMealsCnt}
              />
            )}
            {activeStep === steps.workout && (
              <WorkoutStep
                userActLevel={userData.act_level}
                updateActLevel={updateActLevel}
              />
            )}
          </ContentLoading>
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
