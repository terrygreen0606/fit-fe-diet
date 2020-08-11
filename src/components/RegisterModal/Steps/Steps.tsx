import React from 'react';
import { getTranslate } from 'utils';
import classNames from 'classnames';

import './Steps.sass';

const Steps = ({
  step,
  localePhrases,
}: any) => {
  const t = (code: string) => getTranslate(localePhrases, code);

  return (
    <div className={classNames('registerModal_steps_wrap', {
      registerModal_steps_wrap_step1: step === 'GOAL',
      registerModal_steps_wrap_step2: step === 'INFO',
      registerModal_steps_wrap_step3: step === 'JOIN',
    })}
    >
      <div className={classNames('registerModal_step', {
        registerModal_step_active: step === 'GOAL',
      })}
      >
        <h5 className="registerModal_step_label">{t('register.step_goal')}</h5>
        <span className="registerModal_step_mark" />
      </div>

      <div className={classNames('registerModal_step', {
        registerModal_step_active: step === 'INFO',
      })}
      >
        <h5 className="registerModal_step_label">{t('register.step_info')}</h5>
        <span className="registerModal_step_mark" />
      </div>

      <div className={classNames('registerModal_step', {
        registerModal_step_active: step === 'JOIN',
      })}
      >
        <h5 className="registerModal_step_label">{t('register.step_join')}</h5>
        <span className="registerModal_step_mark" />
      </div>
    </div>
  );
};

export default Steps;
