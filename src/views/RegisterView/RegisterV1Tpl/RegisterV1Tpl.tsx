/* eslint-disable no-multi-spaces */
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { InputError } from 'types';

import { routes } from 'constants/routes';

// Components
import WithTranslate from 'components/hoc/WithTranslate';
import ProgressLine from 'components/common/ProgressLine';
import HeaderRegistration from 'components/HeaderRegistration';
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
  'EXPECTATIONS',     // 7
  'JOIN_EMAIL',       // 8
  'JOIN_NAME',        // 9
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
  const [registerView, setRegisterView] = useState<RegisterViewType>(registerViewsList[0]);
  const [registerViewAnimate, setRegisterViewAnimate] = useState<RegisterViewType>(registerViewsList[0]);

  const registerStepsRef = useRef(null);
  const [stepsAnimationClean, setStepsAnimationClean] = useState(null);

  useEffect(() => {
    document.querySelector('.basePageLayoutWrapper').classList.add('registerv1_layout');

    return () => {
      document.querySelector('.basePageLayoutWrapper').classList.remove('registerv1_layout');
    };
  }, []);

  const stepsRunAnimation = (viewAnimate: RegisterViewType) => {
    clearTimeout(stepsAnimationClean);

    if (registerStepsRef.current) {
      registerStepsRef.current.classList.remove('fadeInOut-25');

      setTimeout(() => {
        if (registerStepsRef.current) {
          registerStepsRef.current.classList.add('fadeInOut-25');
        }
      }, 0);

      setTimeout(() => {
        setRegisterView(viewAnimate);
      }, 100);

      const timeout = setTimeout(() => {
        if (registerStepsRef.current) {
          registerStepsRef.current.classList.remove('fadeInOut-25');
        }
      }, 2500);

      setStepsAnimationClean(timeout);
    }
  };

  useEffect(() => {
    if (registerView && registerView !== registerViewsList[0]) {
      history.push(`/register${location.search}#${registerView.toLowerCase()}`);
    }
  }, [registerView]);

  useEffect(() => {
    const index = registerViewsList.findIndex((view) => view === registerViewAnimate);

    if (registerView !== registerViewAnimate) {
      stepsRunAnimation(registerViewAnimate);
    } else {
      setRegisterView(registerViewAnimate);
    }
  }, [registerViewAnimate]);

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
    setRegisterViewAnimate,
    history,
    location,
  );

  const getProgressWidth = () => {
    const index = registerViewsList.findIndex((view) => view === registerView);

    if (index === 0) {
      return 20;
    }

    if (index === registerViewsList.length - 1) {
      return 95;
    }

    return Math.round((80 / (registerViewsList.length - 1)) * index) + 20;
  };

  return (
    <>
      {registerView === 'INFO_GENDER' && (
        <HeaderRegistration />
      )}
      <div className='register_v1'>
        <Link to={routes.main} className='mainHeader_logo register_v1_logo' />

        <ProgressLine
          className='register_v1_progress'
          width={getProgressWidth()}
        />

        <div className='register_v1_steps' ref={registerStepsRef}>
          {getRegisterStepView(registerView)}
        </div>
      </div>
    </>
  );
};

export default WithTranslate(RegisterV1Tpl);
