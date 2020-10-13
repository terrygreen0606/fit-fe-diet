import React from 'react';
import { RegisterViewType } from './types';
import { InputError } from 'types';

import Goal from './Steps/Goal';
import NotEating from './Steps/NotEating';
import Gender from './Steps/Gender';
import Age from './Steps/Age';
import BackIssues from './Steps/BackIssues';
import HealthProblems from './Steps/HealthProblems';
import DayMealPlan from './Steps/DayMealPlan';
import HeghtWeight from './Steps/HeghtWeight';
import WeightGoal from './Steps/WeightGoal';
import PlanProgress from './Steps/PlanProgress';
import ExpectationsGraph from './Steps/ExpectationsGraph';
import ConfirmInfo from './Steps/ConfirmInfo';
import FinalWelcome from './Steps/FinalWelcome';


export default (
  registerView: RegisterViewType,
  registerData: any,
  setRegisterData: (any) => void,
  registerDataErrors: InputError[],
  setRegisterDataErrors: (errors: InputError[]) => void,
  setRegisterView: (RegisterViewType) => void,
  localePhrases: any,
) => {
  let registerStepView = null;

  switch (registerView) {
    case 'GOAL':
      registerStepView = (
        <Goal
          registerData={registerData}
          setRegisterData={setRegisterData}
          setRegisterView={setRegisterView}
          localePhrases={localePhrases}
        />
      );
      break;

    case 'NOT_EATING':
      registerStepView = (
        <NotEating
          registerData={registerData}
          setRegisterData={setRegisterData}
          setRegisterView={setRegisterView}
          localePhrases={localePhrases}
        />
      );
      break;

    case 'GENDER':
      registerStepView = (
        <Gender
          registerData={registerData}
          setRegisterData={setRegisterData}
          registerDataErrors={registerDataErrors}
          setRegisterDataErrors={setRegisterDataErrors}
          setRegisterView={setRegisterView}
          localePhrases={localePhrases}
        />
      );
      break;

    case 'AGE':
      registerStepView = (
        <Age
          registerData={registerData}
          setRegisterData={setRegisterData}
          registerDataErrors={registerDataErrors}
          setRegisterDataErrors={setRegisterDataErrors}
          setRegisterView={setRegisterView}
          localePhrases={localePhrases}
        />
      );
      break;

    case 'BACK_ISSUES':
      registerStepView = (
        <BackIssues
          setRegisterView={setRegisterView}
          localePhrases={localePhrases}
        />
      );
      break;

    case 'HEALTH_PROBLEMS':
      registerStepView = (
        <HealthProblems
          registerData={registerData}
          setRegisterData={setRegisterData}
          setRegisterView={setRegisterView}
          localePhrases={localePhrases}
        />
      );
      break;

    case 'DAY_MEALPLAN':
      registerStepView = (
        <DayMealPlan
          setRegisterView={setRegisterView}
          localePhrases={localePhrases}
        />
      );
      break;

    case 'HEIGHT_WEIGHT':
      registerStepView = (
        <HeghtWeight
          registerData={registerData}
          setRegisterData={setRegisterData}
          registerDataErrors={registerDataErrors}
          setRegisterDataErrors={setRegisterDataErrors}
          setRegisterView={setRegisterView}
          localePhrases={localePhrases}
        />
      );
      break;

    case 'WEIGHT_GOAL':
      registerStepView = (
        <WeightGoal
          registerData={registerData}
          setRegisterData={setRegisterData}
          registerDataErrors={registerDataErrors}
          setRegisterDataErrors={setRegisterDataErrors}
          setRegisterView={setRegisterView}
          localePhrases={localePhrases}
        />
      );
      break;

    case 'PLAN_PROGRESS':
      registerStepView = (
        <PlanProgress
          registerData={registerData}
          setRegisterData={setRegisterData}
          setRegisterView={setRegisterView}
          localePhrases={localePhrases}
        />
      );
      break;

    case 'EXPECTATIONS':
      registerStepView = (
        <ExpectationsGraph
          registerData={registerData}
          setRegisterView={setRegisterView}
          localePhrases={localePhrases}
        />
      );
      break;

    case 'CONFIRM':
      registerStepView = (
        <ConfirmInfo
          registerData={registerData}
          setRegisterData={setRegisterData}
          registerDataErrors={registerDataErrors}
          setRegisterDataErrors={setRegisterDataErrors}
          setRegisterView={setRegisterView}
          localePhrases={localePhrases}
        />
      );
      break;

    case 'FINAL':
      registerStepView = (
        <FinalWelcome
          registerData={registerData}
          localePhrases={localePhrases}
        />
      );
      break;

    default:
      break;
  }

  return registerStepView;
};
