import React, { useState, useEffect } from 'react';
import { getTranslate } from 'utils';
import getRegisterStepViewUtil from './getRegisterStepView';
import { RegisterViewType, RegisterStepTitlesType } from './types';

// Components
import Modal from 'components/common/Modal';
import WithTranslate from 'components/hoc/WithTranslate';
import Progress from './Progress';

import './RegisterModal.sass';

type RegisterModalProps = {
  isOpen: boolean,
  registerData: any,
  setRegisterData: (any) => void,
  cuisinesLoading: boolean,
  cuisinesLoadingError: boolean,
  fetchRecipeCuisines: () => void,
  onClose?: (e: React.SyntheticEvent) => void,
  localePhrases: any
};

const RegisterModal = (props: RegisterModalProps) => {
  const t = (code: string) => getTranslate(props.localePhrases, code);
  const registerStepTitlesDefault: RegisterStepTitlesType = [t('register.step_goal'), t('register.step_info'), t('register.step_join')];

  const [registerStep, setRegisterStep] = useState<0 | 1 | 2>(0);
  const [registerStepTitles, setRegisterStepTitles] = useState<RegisterStepTitlesType>([...registerStepTitlesDefault]);
  const [registerView, setRegisterView] = useState<RegisterViewType>('READY');

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
    props.cuisinesLoading,
    props.cuisinesLoadingError,
    props.fetchRecipeCuisines,
    props.localePhrases,
    registerStepTitlesDefault,
    setRegisterStepTitles,
    setRegisterView
  );

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      className="registerModal"
    >
      <Modal.Main className="registerModal_main">
        <Progress 
          step={registerStep} 
          view={registerView}
          titles={registerStepTitles} 
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
