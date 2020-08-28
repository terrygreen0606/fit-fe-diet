import React, { useState } from 'react';
import getRegisterStepViewUtil from './getRegisterStepView';
import { RegisterViewType } from './types';

// Components
import ProgressLine from 'components/ProgressLine';
import WithTranslate from 'components/hoc/WithTranslate';

import './RegisterV2Tpl.sass';

const RegisterV2Tpl = (props: any) => {

  const [registerView, setRegisterView] = useState<RegisterViewType>('PLAN_PROGRESS');

  const getRegisterStepView = (registerView: RegisterViewType) => 
    getRegisterStepViewUtil(
      registerView,
      props.registerData,
      props.setRegisterData,
      props.localePhrases
    );

  return (
    <div className="register_v2tpl">
      <ProgressLine
        steps={['Choose a goal', 'Add info', 'Join']}
        activeStepIndex={1}
      />

      <div className="register_v2tpl_content">
        {getRegisterStepView(registerView)}
      </div>
    </div>
  );
};

export default WithTranslate(RegisterV2Tpl);
