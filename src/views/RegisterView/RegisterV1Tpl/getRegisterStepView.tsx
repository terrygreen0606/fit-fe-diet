import React from 'react';
import { InputError } from 'types';
import { RegisterViewType } from './types';

// Components
import GoalStep from './Steps/GoalStep';
import InfoStep from './Steps/InfoStep';
import AgeStep from './Steps/InfoSteps/AgeStep';
import GenderStep from './Steps/InfoSteps/GenderStep';
import HeightStep from './Steps/InfoSteps/HeightStep';
import WeightGoalStep from './Steps/InfoSteps/WeightGoalStep';
import WeightStep from './Steps/InfoSteps/WeightStep';
import NotEatingStep from './Steps/NotEatingStep';
import PlanProgressStep from './Steps/PlanProgressStep';
import Workout from './Steps/Workout';
import ExpectationsStep from './Steps/ExpectationsStep';
import PlanReadyStep from './Steps/PlanReadyStep';
import HealthProblems from './Steps/HealthProblems';
import JoinStep from './Steps/JoinStep';

export default (
  registerView: RegisterViewType,
  registerData: any,
  setRegisterData: (any) => void,
  registerDataErrors: InputError[],
  setRegisterDataErrors: (any) => void,
  cuisinesLoading: boolean,
  cuisinesLoadingError: boolean,
  fetchRecipeCuisines: () => any,
  localePhrases: any,
  setRegisterView: (any) => void,
  history: any,
) => {
  let registerStepView = null;

  switch (registerView) {
    case 'GOAL':
      registerStepView = (
        <GoalStep
          registerData={registerData}
          setRegisterData={setRegisterData}
          setRegisterView={setRegisterView}
          localePhrases={localePhrases || {}}
        />
      );
      break;

    case 'PLAN_PROGRESS':
      registerStepView = (
        <PlanProgressStep
          registerData={registerData}
          setRegisterData={setRegisterData}
          setRegisterView={setRegisterView}
          localePhrases={localePhrases || {}}
        />
      );
      break;

    case 'EXPECTATIONS':
      registerStepView = (
        <ExpectationsStep
          registerData={registerData}
          setRegisterView={setRegisterView}
          localePhrases={localePhrases || {}}
        />
      );
      break;

    case 'WORKOUT':
      registerStepView = (
        <Workout 
          registerData={registerData}
          setRegisterData={setRegisterData}
          setRegisterView={setRegisterView}
          localePhrases={localePhrases || {}}
        />
      );
      break;

    case 'HEALTH_PROBLEMS':
      registerStepView = (
        <HealthProblems 
          registerData={registerData}
          setRegisterData={setRegisterData}
          setRegisterView={setRegisterView}
          localePhrases={localePhrases || {}}
        />
      );
      break;

    case 'READY':
      registerStepView = (
        <PlanReadyStep
          registerData={registerData}
          setRegisterView={setRegisterView}
          history={history}
          localePhrases={localePhrases || {}}
        />
      );
      break;

    case 'NOT_EATING':
      registerStepView = (
        <NotEatingStep 
          registerData={registerData}
          setRegisterData={setRegisterData}
          setRegisterView={setRegisterView}
          cuisinesLoading={cuisinesLoading}
          cuisinesLoadingError={cuisinesLoadingError}
          fetchRecipeCuisines={fetchRecipeCuisines}
          localePhrases={localePhrases || {}}
        />
      );
      break;

    case 'JOIN':
      registerStepView = (
        <JoinStep
          registerData={registerData}
          setRegisterData={setRegisterData}
          registerDataErrors={registerDataErrors}
          setRegisterDataErrors={setRegisterDataErrors}
          setRegisterView={setRegisterView}
          localePhrases={localePhrases || {}}
        />
      );
      break;

    case 'INFO':
      registerStepView = (
        <InfoStep
          registerData={registerData}
          setRegisterData={setRegisterData}
          registerDataErrors={registerDataErrors}
          setRegisterDataErrors={setRegisterDataErrors}
          setRegisterView={setRegisterView}
          localePhrases={localePhrases || {}}
        />
      );
      break;

    case 'INFO_AGE':
      registerStepView = (
        <AgeStep
          registerData={registerData}
          setRegisterData={setRegisterData}
          registerDataErrors={registerDataErrors}
          setRegisterDataErrors={setRegisterDataErrors}
          setRegisterView={setRegisterView}
          localePhrases={localePhrases || {}}
        />
      );
      break;

    case 'INFO_GENDER':
      registerStepView = (
        <GenderStep
          registerData={registerData}
          setRegisterData={setRegisterData}
          registerDataErrors={registerDataErrors}
          setRegisterDataErrors={setRegisterDataErrors}
          setRegisterView={setRegisterView}
          localePhrases={localePhrases || {}}
        />
      );
      break;

    case 'INFO_HEIGHT':
      registerStepView = (
        <HeightStep
          registerData={registerData}
          setRegisterData={setRegisterData}
          registerDataErrors={registerDataErrors}
          setRegisterDataErrors={setRegisterDataErrors}
          setRegisterView={setRegisterView}
          localePhrases={localePhrases || {}}
        />
      );
      break;

    case 'INFO_WEIGHT_GOAL':
      registerStepView = (
        <WeightGoalStep
          registerData={registerData}
          setRegisterData={setRegisterData}
          registerDataErrors={registerDataErrors}
          setRegisterDataErrors={setRegisterDataErrors}
          setRegisterView={setRegisterView}
          localePhrases={localePhrases || {}}
        />
      );
      break;

    case 'INFO_WEIGHT':
      registerStepView = (
        <WeightStep
          registerData={registerData}
          setRegisterData={setRegisterData}
          registerDataErrors={registerDataErrors}
          setRegisterDataErrors={setRegisterDataErrors}
          setRegisterView={setRegisterView}
          localePhrases={localePhrases || {}}
        />
      );
      break;

    default:
      break;
  }

  return registerStepView;
};
