import React from 'react';
import classNames from 'classnames';

import './Progress.sass';

type ProgressProps = {
  step: 0 | 1 | 2,
  titles: [string, string, string]
};

const Progress = ({ step, titles }: ProgressProps) => {
  return (
    <div className={classNames('registerModal_steps_wrap', {
      registerModal_steps_wrap_step1: step === 0,
      registerModal_steps_wrap_step2: step === 1,
      registerModal_steps_wrap_step3: step === 2
    })}
    >
      <div className={classNames('registerModal_step', {
        registerModal_step_active: step === 0
      })}
      >
        <h5 className="registerModal_step_label">{titles[0]}</h5>
        <span className="registerModal_step_mark" />
      </div>

      <div className={classNames('registerModal_step', {
        registerModal_step_active: step === 1
      })}
      >
        <h5 className="registerModal_step_label">{titles[1]}</h5>
        <span className="registerModal_step_mark" />
      </div>

      <div className={classNames('registerModal_step', {
        registerModal_step_active: step === 2
      })}
      >
        <h5 className="registerModal_step_label">{titles[2]}</h5>
        <span className="registerModal_step_mark" />
      </div>
    </div>
  );
};

export default Progress;
