import React from 'react';
import classNames from 'classnames'

import './ProgressLine.sass';

type ProgressLineProps = {
  steps: string[];
  activeStepIndex: number;
  className?: string;
};

const ProgressLine = ({ steps, activeStepIndex, className }: ProgressLineProps) => {
  return (
    <div 
      className={classNames("progress-line-steps", {
        className: className
      })}
    >
      {steps.map((stepTitle, stepIndex) => (
        <div
          className={classNames('progress-line-step', {
            'active': activeStepIndex >= stepIndex
          })}
        >
          <span className="progress-line-step-point" />
          <p className="progress-line-step-title">{stepTitle}</p>
        </div>
      ))}
    </div>
  );
};

export default ProgressLine;
