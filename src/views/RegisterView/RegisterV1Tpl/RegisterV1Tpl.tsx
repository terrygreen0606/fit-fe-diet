import React, { useState, useEffect } from 'react';
import { getTranslate } from 'utils';
import { Link } from 'react-router-dom';
import { InputError } from 'types';

// Components
import WithTranslate from 'components/hoc/WithTranslate';
import ProgressLine from 'components/common/ProgressLine';
import getRegisterStepViewUtil from './getRegisterStepView';

import { RegisterViewType } from './types';

import './RegisterV1Tpl.sass';

type RegisterV1TplProps = {
  registerData: any,
  setRegisterData: (any) => void,
  registerDataErrors: InputError[],
  setRegisterDataErrors: (any) => void,
  cuisinesLoading: boolean,
  cuisinesLoadingError: boolean,
  fetchRecipeCuisines: () => void,
  history: any,
  location: any,
  localePhrases: any
};

const registerViewsList: RegisterViewType[] = [
  'INFO_GENDER',      // 0
  'INFO_AGE',         // 1
  'INFO_HEIGHT',      // 2
  'INFO_WEIGHT',      // 3
  'INFO_WEIGHT_GOAL', // 4
  'NOT_EATING',       // 5
  'PLAN_PROGRESS',    // 6
  'HEALTH_PROBLEMS',  // 7
  'WORKOUT',          // 8
  'EXPECTATIONS',     // 9
  'JOIN',             // 10
  'READY',            // 11
];

const RegisterV1Tpl = ({
  registerData,
  history,
  location,
  setRegisterData,
  registerDataErrors,
  setRegisterDataErrors,
  cuisinesLoading,
  cuisinesLoadingError,
  fetchRecipeCuisines,
  localePhrases,
}: RegisterV1TplProps) => {
  const t = (code: string) => getTranslate(localePhrases, code);

  const [registerView, setRegisterView] = useState<RegisterViewType>(registerViewsList[0]);

  useEffect(() => {
    document.querySelector('.basePageLayoutWrapper').classList.add('registerv1_layout');

    return () => {
      document.querySelector('.basePageLayoutWrapper').classList.remove('registerv1_layout');
    };
  }, []);

  useEffect(() => {
    if (registerView) {
      history.push(`/register${location.search}#${registerView.toLowerCase()}`);
    }
  }, [registerView]);

  const getRegisterStepView = (registerViewType: RegisterViewType) => getRegisterStepViewUtil(
    registerViewType,
    registerData,
    setRegisterData,
    registerDataErrors,
    setRegisterDataErrors,
    cuisinesLoading,
    cuisinesLoadingError,
    fetchRecipeCuisines,
    localePhrases,
    setRegisterView,
    history,
  );

  const setStepPrev = () => {
    const curStepIndex = registerViewsList
      .findIndex((view) => view === registerView);

    if (curStepIndex > 0 && curStepIndex !== (registerViewsList.length - 1)) {
      if (registerViewsList[curStepIndex] === 'HEALTH_PROBLEMS') {
        setRegisterView('NOT_EATING');
      } else {
        setRegisterView(registerViewsList[curStepIndex - 1]);
      }
    }
  };

  const getProgressWidth = () => {
    const index = registerViewsList.findIndex((view) => view === registerView);
    return Math.round((100 / registerViewsList.length) * index);
  };

  return (
    <div className='register_v1'>
      <Link to='/' className='mainHeader_logo register_v1_logo' />

      <ProgressLine
        className='register_v1_progress'
        width={getProgressWidth()}
      />

      {getRegisterStepView(registerView)}
    </div>
  );
};

export default WithTranslate(RegisterV1Tpl);
