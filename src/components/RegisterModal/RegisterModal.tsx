import React, { useState, useEffect } from 'react';
import { getTranslate } from 'utils';

// Components
import Modal from 'components/common/Modal';
import ContentLoading from 'components/hoc/ContentLoading';
import WithTranslate from 'components/hoc/WithTranslate';
import Steps from './Steps';
import GoalStep from './GoalStep';
import InfoStep from './InfoStep';
import NotEatingStep from './NotEatingStep';
import PlanProgressStep from './PlanProgressStep';
import ExpectationsStep from './ExpectationsStep';
import PlanReadyStep from './PlanReadyStep';
import JoinStep from './JoinStep';

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

type RegisterViewType = 'GOAL' | 'PLAN_PROGRESS' | 'NOT_EATING' | 'EXPECTATIONS' | 'INFO' | 'JOIN' | 'READY';

type RegisterStepTitlesType = [string, string, string];

const RegisterModal = (props: RegisterModalProps) => {
  const t = (code: string) => getTranslate(props.localePhrases, code);
  const registerStepTitlesDefault: RegisterStepTitlesType = [t('register.step_goal'), t('register.step_info'), t('register.step_join')];

  const [registerStep, setRegisterStep] = useState<0 | 1 | 2>(0);
  const [registerStepTitles, setRegisterStepTitles] = useState<RegisterStepTitlesType>([...registerStepTitlesDefault]);
  const [registerView, setRegisterView] = useState<RegisterViewType>('GOAL');

  useEffect(() => {
    let currentRegisterStep: 0 | 1 | 2 = null;

    switch (registerView) {
      case 'GOAL':
      case 'NOT_EATING':
        currentRegisterStep = 0;
        break;

      case 'PLAN_PROGRESS':
      case 'INFO':
      case 'EXPECTATIONS':
      case 'READY':
        currentRegisterStep = 1;
        break;

      case 'JOIN':
        currentRegisterStep = 2;
        break;

      default: break;
    }

    if (currentRegisterStep !== null) {
      setRegisterStep(currentRegisterStep);
    }
  }, [registerView]);

  const getRegisterStepView = (registerView: string) => {
    let registerStepView = null;

    const {
      registerData,
      setRegisterData,
      cuisinesLoading,
      cuisinesLoadingError,
      fetchRecipeCuisines,
      localePhrases
    } = props;

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
            stepTitlesDefault={registerStepTitlesDefault}
            setStepTitles={setRegisterStepTitles}
            setRegisterView={setRegisterView}
            localePhrases={localePhrases || {}}
          />
        );
        break;

      case 'EXPECTATIONS':
        registerStepView = (
          <ExpectationsStep
            registerData={registerData}
            stepTitlesDefault={registerStepTitlesDefault}
            setStepTitles={setRegisterStepTitles}
            setRegisterView={setRegisterView}
            localePhrases={localePhrases || {}}
          />
        );
        break;

      case 'READY':
        registerStepView = (
          <PlanReadyStep
            stepTitlesDefault={registerStepTitlesDefault}
            setStepTitles={setRegisterStepTitles}
            setRegisterView={setRegisterView}
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
            stepTitlesDefault={registerStepTitlesDefault}
            setStepTitles={setRegisterStepTitles}
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
            stepTitlesDefault={registerStepTitlesDefault}
            setStepTitles={setRegisterStepTitles}
            setRegisterData={setRegisterData}
            localePhrases={localePhrases || {}}
          />
        );
        break;

      case 'INFO':
        registerStepView = (
          <InfoStep
            registerData={registerData}
            setRegisterData={setRegisterData}
            setRegisterView={setRegisterView}
            localePhrases={localePhrases || {}}
          />
        );
        break;

      default: break;
    }

    return registerStepView;
  };

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      className="registerModal"
    >
      <Modal.Main className="registerModal_main">
        <Steps 
          step={registerStep} 
          titles={registerStepTitles} 
        />

        <div className="registerModal_steps_content">
          {getRegisterStepView(registerView)}
        </div>
      </Modal.Main>
    </Modal>
  );
};

export default WithTranslate(RegisterModal);
