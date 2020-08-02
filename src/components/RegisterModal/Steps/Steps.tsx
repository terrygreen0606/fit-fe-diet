import React from 'react';
import { getTranslate } from 'utils';
import classNames from 'classnames';

import './Steps.sass';

const Steps = (props: any) => {

  const t = (code: string) => getTranslate(props.localePhrases, code);

  return (
    <div className={classNames("registerModal_steps_wrap", {
      "registerModal_steps_wrap_step1": props.step === 'GOAL',
      "registerModal_steps_wrap_step2": props.step === 'INFO',
      "registerModal_steps_wrap_step3": props.step === 'JOIN',
    })}>
      <div className={classNames("registerModal_step", {
        "registerModal_step_active": props.step === 'GOAL'
      })}>
        <h5 className="registerModal_step_label">{t('register.step_goal')}</h5>
        <span className="registerModal_step_mark"></span>
      </div>

      <div className={classNames("registerModal_step", {
        "registerModal_step_active": props.step === 'INFO'
      })}>
        <h5 className="registerModal_step_label">{t('register.step_info')}</h5>
        <span className="registerModal_step_mark"></span>
      </div>

      <div className={classNames("registerModal_step", {
        "registerModal_step_active": props.step === 'JOIN'
      })}>
        <h5 className="registerModal_step_label">{t('register.step_join')}</h5>
        <span className="registerModal_step_mark"></span>
      </div>
    </div>
  );
};

export default Steps
