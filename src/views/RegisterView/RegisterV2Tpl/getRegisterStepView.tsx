import React from 'react';
import { RegisterViewType } from './types';

import Goal from './Steps/Goal';
import NotEating from './Steps/NotEating';
import Gender from './Steps/Gender';
import BackIssues from './Steps/BackIssues';
import HealthProblems from './Steps/HealthProblems';
import DayMealPlan from './Steps/DayMealPlan';
import HeghtWeight from './Steps/HeghtWeight';
import WeightGoal from './Steps/WeightGoal';
import PlanProgress from './Steps/PlanProgress';
import ExpectationsGraph from './Steps/ExpectationsGraph';
import ConfirmInfo from './Steps/ConfirmInfo';
import FinalWelcome from './Steps/FinalWelcome';


export default (registerView: RegisterViewType, localePhrases: any) => {
  let registerStepView = null;

  switch (registerView) {
    case 'GOAL':
      registerStepView = (
        <Goal
          localePhrases={localePhrases}
        />
      );
      break;

    case 'NOT_EATING':
      registerStepView = (
        <NotEating
          localePhrases={localePhrases}
        />
      );
      break;

    case 'GENDER':
      registerStepView = (
        <Gender
          localePhrases={localePhrases}
        />
      );
      break;

    case 'BACK_ISSUES':
      registerStepView = (
        <BackIssues
          localePhrases={localePhrases}
        />
      );
      break;

    case 'HEALTH_PROBLEMS':
      registerStepView = (
        <HealthProblems
          localePhrases={localePhrases}
        />
      );
      break;

    case 'DAY_MEALPLAN':
      registerStepView = (
        <DayMealPlan
          localePhrases={localePhrases}
        />
      );
      break;

    case 'HEIGHT_WEIGHT':
      registerStepView = (
        <HeghtWeight
          localePhrases={localePhrases}
        />
      );
      break;

    case 'WEIGHT_GOAL':
      registerStepView = (
        <WeightGoal
          localePhrases={localePhrases}
        />
      );
      break;

    case 'PLAN_PROGRESS':
      registerStepView = (
        <PlanProgress
          localePhrases={localePhrases}
        />
      );
      break;

    case 'EXPECTATIONS':
      registerStepView = (
        <ExpectationsGraph
          localePhrases={localePhrases}
        />
      );
      break;

    case 'CONFIRM':
      registerStepView = (
        <ConfirmInfo
          localePhrases={localePhrases}
        />
      );
      break;

    case 'FINAL':
      registerStepView = (
        <FinalWelcome
          localePhrases={localePhrases}
        />
      );
      break;

    default:
      break;
  }

  return registerStepView;
};
