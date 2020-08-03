import React, { useState, useEffect } from 'react';

// Components
import Steps from './Steps';
import GoalStep from './GoalStep';
import InfoStep from './InfoStep';
import JoinStep from './JoinStep';
import Modal from 'components/common/Modal';
import ContentLoading from 'components/hoc/ContentLoading';
import WithTranslate from 'components/hoc/WithTranslate';

import './RegisterModal.sass';

const registerDataDefault = {
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
  ignore_cuisine_ids: ['milk', 'meat', 'fish', 'diseases', 'gluten', 'deabetes']
};

type RegisterModalProps = {
  isOpen: boolean,
  onClose?: (e: React.SyntheticEvent) => void,
  tpl: any,
  tplLoading: boolean,
  tplLoadingError: boolean,
  fetchTpl: () => void,
  localePhrases: any
};

const RegisterModal = (props: RegisterModalProps) => {

  const [registerStep, setRegisterStep] = useState('GOAL');

  const [registerData, setRegisterData] = useState({...registerDataDefault});

  useEffect(() => {
    if (props.isOpen === false) {
      setRegisterData({...registerDataDefault});
      setRegisterStep('GOAL');
    }
  }, [props.isOpen]);

  useEffect(() => {
    if (props.tpl) {
      setRegisterData({
        ...registerData,
        tpl_signup: props.tpl
      });
    }
  }, [props.tpl]);

  const getRegisterStepView = (registerStepType: string) => {
    let registerStepView = null;

    switch (registerStepType) {
      case 'GOAL':
        registerStepView = (
          <GoalStep 
            registerData={registerData} 
            setRegisterData={setRegisterData}
            setRegisterStep={setRegisterStep} 
            modalClose={props.onClose}
            localePhrases={props.localePhrases || {}}
          />
        );
        break;
      
      case 'JOIN':
        registerStepView = (
          <JoinStep 
            registerData={registerData} 
            setRegisterData={setRegisterData}
            setRegisterStep={setRegisterStep} 
            modalClose={props.onClose}
            localePhrases={props.localePhrases || {}}
          />
        );
        break;

      case 'INFO':
        registerStepView = (
          <InfoStep 
            registerData={registerData} 
            setRegisterData={setRegisterData}
            setRegisterStep={setRegisterStep} 
            modalClose={props.onClose}
            localePhrases={props.localePhrases || {}}
          />
        );
        break;
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
        <ContentLoading
          isLoading={props.tplLoading}
          isError={props.tplLoadingError}
          fetchData={props.fetchTpl}
        >
          <Steps step={registerStep} localePhrases={props.localePhrases || {}} />

          <div className="registerModal_steps_content">
            {getRegisterStepView(registerStep)}
          </div>          
        </ContentLoading>
      </Modal.Main>
    </Modal>
  );
};

export default WithTranslate(RegisterModal);
