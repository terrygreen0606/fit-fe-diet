import React from 'react';
import classNames from 'classnames';
import getRegisterStepImage from '../getRegisterStepImage';
import { RegisterViewType, RegisterStepTitlesType } from '../types';

import './Progress.sass';

type ProgressProps = {
  step: 0 | 1 | 2;
  view: RegisterViewType;
  titles: RegisterStepTitlesType;
};

const Progress = ({ step, view, titles }: ProgressProps) => {
  return (
    <div 
      className={classNames('registerModal_steps_wrap', {
        registerModal_steps_wrap_step1: step === 0,
        registerModal_steps_wrap_step2: step === 1,
        registerModal_steps_wrap_step3: step === 2
      })}
      style={{ backgroundImage: `url(${getRegisterStepImage(view)})` }}
    >
      <div className={classNames('registerModal_step', {
        'active': step === 0
      })}
      >
        <h5 className="registerModal_step_label">{titles[0]}</h5>
        <span className="registerModal_step_mark" />
      </div>

      <div className={classNames('registerModal_step', {
        'active': step === 1
      })}
      >
        <h5 className="registerModal_step_label">{titles[1]}</h5>
        <span className="registerModal_step_mark" />
      </div>

      <div className={classNames('registerModal_step', {
        'active': step === 2
      })}
      >
        <h5 className="registerModal_step_label">{titles[2]}</h5>
        <span className="registerModal_step_mark" />
      </div>
    </div>
  );
};

export default Progress;
