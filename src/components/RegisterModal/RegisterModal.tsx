import React, { useState, useEffect } from 'react';
import { UserAuthProfileType } from 'types/auth';
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

interface RegisterDataType extends UserAuthProfileType {
  email: string;
  password: string;
};

const registerDataDefault: RegisterDataType = {
  email: '',
  password: '',
  name: '',
  surname: '',
  phone: '',
  age: null,
  gender: 'm',
  measurement: 'si',
  height: null,
  weight: null,
  weight_goal: null,
  tpl_signup: null,
  goal: -1,
  ignore_cuisine_ids: [],
};

type RegisterModalProps = {
  isOpen: boolean,
  tpl: number,
  cuisines: any[],
  cuisinesLoading: boolean,
  cuisinesLoadingError: boolean,
  fetchRecipeCuisines: () => void,
  onClose?: (e: React.SyntheticEvent) => void,
  localePhrases: any
};

type RegisterViewType = 'GOAL' | 'PLAN_PROGRESS' | 'NOT_EATING' | 'EXPECTATIONS' | 'INFO' | 'JOIN' | 'READY';

type RegisterStepTitlesType = [string, string, string];

const RegisterModal = ({
  isOpen,
  onClose,
  tpl,
  cuisines,
  cuisinesLoading,
  cuisinesLoadingError,
  fetchRecipeCuisines,
  localePhrases
}: RegisterModalProps) => {
  const t = (code: string) => getTranslate(localePhrases, code);
  const registerStepTitlesDefault: RegisterStepTitlesType = [t('register.step_goal'), t('register.step_info'), t('register.step_join')];

  const [registerStep, setRegisterStep] = useState<0 | 1 | 2>(0);
  const [registerStepTitles, setRegisterStepTitles] = useState<RegisterStepTitlesType>([...registerStepTitlesDefault]);
  const [registerView, setRegisterView] = useState<RegisterViewType>('GOAL');

  const [registerData, setRegisterData] = useState({ ...registerDataDefault });

  useEffect(() => {
    if (isOpen === false) {
      setRegisterData({ ...registerDataDefault});
      setRegisterStep(0);
    }
  }, [isOpen]);

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

  useEffect(() => {
    if (tpl) {
      setRegisterData({
        ...registerData,
        tpl_signup: tpl,
      });
    }
  }, [tpl]);

  useEffect(() => {
    if (cuisines) {
      setRegisterData({
        ...registerData,
        ignore_cuisine_ids: cuisines
      });
    }
  }, [cuisines]);

  const getRegisterStepView = (registerView: string) => {
    let registerStepView = null;

    switch (registerView) {
      case 'GOAL':
        registerStepView = (
          <GoalStep
            registerData={registerData}
            setRegisterData={setRegisterData}
            setRegisterView={setRegisterView}
            modalClose={onClose}
            localePhrases={localePhrases || {}}
          />
        );
        break;

      case 'PLAN_PROGRESS':
        registerStepView = (
          <PlanProgressStep
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
            modalClose={onClose}
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
            modalClose={onClose}
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
      isOpen={isOpen}
      onClose={onClose}
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
