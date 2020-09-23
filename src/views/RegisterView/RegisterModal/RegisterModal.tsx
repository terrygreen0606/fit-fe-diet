import React, { useState, useEffect } from 'react';
import { getTranslate } from 'utils';
import { Link } from 'react-router-dom';
import getRegisterStepViewUtil from './getRegisterStepView';
import { RegisterViewType, RegisterStepTitlesType } from './types';
import { InputError } from 'types';

// Components
import Modal from 'components/common/Modal';
import WithTranslate from 'components/hoc/WithTranslate';
import Progress from './Progress';

import './RegisterModal.sass';

type RegisterModalProps = {
  isOpen: boolean,
  registerData: any,
  setRegisterData: (any) => void,
  registerDataErrors: InputError[],
  setRegisterDataErrors: (any) => void,
  cuisinesLoading: boolean,
  cuisinesLoadingError: boolean,
  fetchRecipeCuisines: () => void,
  onClose?: (e: React.SyntheticEvent) => void,
  history: any,
  localePhrases: any
};

const registerViewsList: RegisterViewType[] = [
  'GOAL',             // 0
  'INFO_GENDER',      // 1
  'INFO_AGE',         // 2
  'INFO_HEIGHT',      // 3
  'INFO_WEIGHT',      // 4
  'INFO_WEIGHT_GOAL', // 5
  'NOT_EATING',       // 6
  'PLAN_PROGRESS',    // 7
  'HEALTH_PROBLEMS',  // 8
  'WORKOUT',          // 9
  'EXPECTATIONS',     // 10
  'JOIN',             // 11
  'READY',            // 12
];

const RegisterModal = (props: RegisterModalProps) => {
  const t = (code: string) => getTranslate(props.localePhrases, code);
  const registerStepTitlesDefault: RegisterStepTitlesType = [t('register.step_goal'), t('register.step_info'), t('register.step_join')];

  const [registerStep, setRegisterStep] = useState<0 | 1 | 2>(0);
  const [registerStepTitles, setRegisterStepTitles] = useState<RegisterStepTitlesType>([...registerStepTitlesDefault]);
  const [registerView, setRegisterView] = useState<RegisterViewType>(registerViewsList[10]);

  useEffect(() => {
    let currentRegisterStep: 0 | 1 | 2 = null;

    switch (registerView) {
      case 'GOAL':
        currentRegisterStep = 0;
        break;

      case 'READY':
        currentRegisterStep = 2;
        break;

      default: 
        currentRegisterStep = 1;
        break;
    }

    if (currentRegisterStep !== null) {
      setRegisterStep(currentRegisterStep);
    }
  }, [registerView]);

  const getRegisterStepView = (registerView: RegisterViewType) => getRegisterStepViewUtil(
    registerView,
    props.registerData,
    props.setRegisterData,
    props.registerDataErrors,
    props.setRegisterDataErrors,
    props.cuisinesLoading,
    props.cuisinesLoadingError,
    props.fetchRecipeCuisines,
    props.localePhrases,
    registerStepTitlesDefault,
    setRegisterStepTitles,
    setRegisterView,
    props.history
  );

  const setStepPrev = () => {
    const curStepIndex = registerViewsList.findIndex(view => view === registerView);

    if (curStepIndex > 0 && curStepIndex !== (registerViewsList.length - 1)) {
      setRegisterView(registerViewsList[curStepIndex - 1]);
    }
  };

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      className="registerModal"
    >
      <Modal.Main className="registerModal_main">
        <Link to='/' className='mainHeader_logo registerModal_logo' />

        <Progress 
          step={registerStep} 
          view={registerView}
          titles={registerStepTitles} 
          setStepPrev={setStepPrev}
        />

        <div className="registerModal_steps_content_wrap">
          <div className="registerModal_steps_content">
            {getRegisterStepView(registerView)}
          </div>
        </div>
      </Modal.Main>
    </Modal>
  );
};

export default WithTranslate(RegisterModal);
