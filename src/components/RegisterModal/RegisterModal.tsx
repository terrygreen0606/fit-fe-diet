import React, { useState } from 'react';

// Components
import Steps from './Steps';
import GoalStep from './GoalStep';
import InfoStep from './InfoStep';
import JoinStep from './JoinStep';
import Modal from 'components/common/Modal';

import './RegisterModal.sass';

const RegisterModal = (props: any) => {

  const [registerStep, setRegisterStep] = useState('GOAL');

  const getRegisterStepView = (registerStepType: string) => {
    let registerStepView = null;

    switch (registerStepType) {
      case 'GOAL':
        registerStepView = <GoalStep setRegisterStep={setRegisterStep} modalClose={props.onClose} />;
        break;
      
      case 'JOIN':
        registerStepView = <JoinStep setRegisterStep={setRegisterStep} modalClose={props.onClose} />;
        break;

      case 'INFO':
        registerStepView = <InfoStep setRegisterStep={setRegisterStep} modalClose={props.onClose} />;
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
        <Steps step={registerStep} />

        <div className="registerModal_steps_content">
          {getRegisterStepView(registerStep)}
        </div>
      </Modal.Main>
    </Modal>
  );
};

export default RegisterModal;
