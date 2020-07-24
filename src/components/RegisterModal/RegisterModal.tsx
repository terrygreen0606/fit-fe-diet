import React, { useState, useEffect } from 'react';

// Components
import Steps from './Steps';
import GoalStep from './GoalStep';
import InfoStep from './InfoStep';
import JoinStep from './JoinStep';
import Modal from 'components/common/Modal';
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
  goal: -1,
  ignore_cuisine_ids: ['milk', 'meat', 'fish', 'diseases', 'gluten', 'deabetes']
};

const RegisterModal = (props: any) => {

  const [registerStep, setRegisterStep] = useState('GOAL');

  const [registerData, setRegisterData] = useState({...registerDataDefault});

  useEffect(() => {
    if (props.isOpen === false) {
      setRegisterData({...registerDataDefault});
    }
  }, [props.isOpen]);

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
            localPhrases={props.localPhrases}
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
            localPhrases={props.localPhrases}
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
            localPhrases={props.localPhrases}
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
        <Steps step={registerStep} localPhrases={props.localPhrases} />

        <div className="registerModal_steps_content">
          {getRegisterStepView(registerStep)}
        </div>
      </Modal.Main>
    </Modal>
  );
};

export default WithTranslate(RegisterModal);
