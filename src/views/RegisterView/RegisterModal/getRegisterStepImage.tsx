import React from 'react';
import { RegisterViewType } from './types';
import { getImagePath } from 'utils';

export default (registerView: RegisterViewType) => {
  let registerStepImagePath = null;

  switch (registerView) {
    case 'GOAL':
      registerStepImagePath = 'register/goal_step.png';
      break;

    case 'PLAN_PROGRESS':
      registerStepImagePath = 'register/meal_plan_step.png';
      break;

    case 'EXPECTATIONS':
      registerStepImagePath = 'register/expectations_step.png';
      break;

    case 'HEALTH_PROBLEMS':
      registerStepImagePath = 'register/health_step.png';
      break;

    case 'READY':
      registerStepImagePath = 'register/take_plan_step.png';
      break;

    case 'NOT_EATING':
      registerStepImagePath = 'register/goal_step.png';
      break;

    case 'JOIN':
      registerStepImagePath = 'register/confirm_step.png';
      break;

    case 'INFO':
      registerStepImagePath = 'register/info_step.png';
      break;

    default:
      break;
  }

  return registerStepImagePath 
    ? getImagePath(registerStepImagePath) 
    : registerStepImagePath;
};
