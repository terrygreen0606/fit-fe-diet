/* eslint-disable react/jsx-indent */
import React from 'react';
import classnames from 'classnames';

import './ProgressLine.sass';

// Icons
import { ReactComponent as CheckedIcon } from 'assets/img/icons/checked-icon.svg';

type ProgressProps = {
  activeStepIndex: number;
  steps: Array<{ text?: string, onClick?: () => void }>;
};

const ProgressLine = ({
  activeStepIndex,
  steps,
}: ProgressProps) => (
    <div className='progress__list'>
      <div className='progress__list-line'>
        <div
          style={{
            width: `${(100 / steps.length) * activeStepIndex}%`,
          }}
          className='progress__list-line-painted'
        />
      </div>
      {steps.map((step, stepIndex) => (
        <button
          key={step.text}
          type='button'
          className={classnames('progress__list-item', {
            active: activeStepIndex >= stepIndex + 1,
          })}
          onClick={step.onClick}
        >
          <div className='progress__list-item-media'>
            <CheckedIcon />
          </div>
          <div className='progress__list-item-desc'>{step.text}</div>
        </button>
      ))}
    </div>
  );

export default ProgressLine;
