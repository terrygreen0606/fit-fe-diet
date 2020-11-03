import React, { useState, useEffect } from 'react';
import { getTranslate } from 'utils';

// Components
import ProgressLine from 'components/ProgressLine';
import WithTranslate from 'components/hoc/WithTranslate';
import getRegisterStepViewUtil from './getRegisterStepView';

import { RegisterViewType } from './types';

import './RegisterV2Tpl.sass';

const registerViewsList: RegisterViewType[] = [
  'GENDER',         // 0
  'NOT_EATING',     // 1
  'AGE',            // 2
  'BACK_ISSUES',    // 3
  'HEALTH_PROBLEMS',// 4
  'DAY_MEALPLAN',   // 5
  'HEIGHT_WEIGHT',  // 6
  'WEIGHT_GOAL',    // 7
  'PLAN_PROGRESS',  // 8
  'EXPECTATIONS',   // 9
  'CONFIRM',        // 10
  'FINAL',          // 11
];

const RegisterV2Tpl = ({
  registerData,
  setRegisterData,
  registerDataErrors,
  setRegisterDataErrors,
  localePhrases,
  history,
  location,
}: any) => {
  const t = (code: string) => getTranslate(localePhrases, code);

  const [registerStep, setRegisterStep] = useState<0 | 1 | 2>(0);
  const [registerView, setRegisterView] = useState<RegisterViewType>(registerViewsList[0]);

  useEffect(() => {
    let currentRegisterStep: 0 | 1 | 2 = null;

    switch (registerView) {
      case 'GOAL':
        currentRegisterStep = 0;
        break;

      case 'PLAN_PROGRESS':
      case 'EXPECTATIONS':
      case 'CONFIRM':
      case 'FINAL':
        currentRegisterStep = 2;
        break;

      default:
        currentRegisterStep = 1;
        break;
    }

    if (currentRegisterStep !== null) {
      setRegisterStep(currentRegisterStep);
    }

    if (registerView) {
      history.push(`/register${location.search}#${registerView.toLowerCase()}`);
    }
  }, [registerView]);

  const getRegisterStepView = (registerViewType: RegisterViewType) =>
    getRegisterStepViewUtil(
      registerViewType,
      registerData,
      setRegisterData,
      registerDataErrors,
      setRegisterDataErrors,
      setRegisterView,
      localePhrases,
    );

  const setStepPrev = () => {
    const curStepIndex = registerViewsList.findIndex((view) => view === registerView);

    if (curStepIndex > 0 && curStepIndex !== (registerViewsList.length - 1)) {
      setRegisterView(registerViewsList[curStepIndex - 1]);
    }
  };

  return (
    <div className='register_v2tpl'>
      <ProgressLine
        steps={[{
          text: t('register.v2.welcome_step'),
        }, {
          text: t('register.v2.info_step'),
        }, {
          text: t('register.v2.join_step'),
        }]}
        activeStepIndex={registerStep + 1}
      />

      <div className='register_v2tpl_content'>
        {getRegisterStepView(registerView)}
      </div>
    </div>
  );
};

export default WithTranslate(RegisterV2Tpl);
