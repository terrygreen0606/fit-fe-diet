import React, { useState } from 'react';
import getRegisterStepView from './getRegisterStepView';
import { RegisterViewType } from './types';

// Components
import ProgressLine from 'components/ProgressLine';
import WithTranslate from 'components/hoc/WithTranslate';

import './RegisterV2Tpl.sass';

const RegisterV2Tpl = (props: any) => {

  const [registerView, setRegisterView] = useState<RegisterViewType>('GOAL');

  return (
    <>
      <ProgressLine
        steps={['Choose a goal', 'Add info', 'Join']}
        activeStepIndex={1}
      />

      {getRegisterStepView(registerView, props.localePhrases)}
    </>
  );
};

export default WithTranslate(RegisterV2Tpl);
