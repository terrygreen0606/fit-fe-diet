/* eslint-disable react/jsx-indent */
import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid';
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
}: ProgressProps) => {

  const [stepsList, setStepsList] = useState([]);

  useEffect(() => {
    if (steps.length && steps.length > 0) {
      setStepsList(steps.map(step => ({
        ...step,
        id: uuid()
      })));      
    }
  }, [steps]);

  return (
    <div className='progress__list'>
      <div className='progress__list-line'>
        <div
          style={{
            width: `${(100 / steps.length) * activeStepIndex}%`,
          }}
          className='progress__list-line-painted'
        />
      </div>
      {stepsList.map((step, stepIndex) => (
        <button
          key={step.id}
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
};

export default ProgressLine;
