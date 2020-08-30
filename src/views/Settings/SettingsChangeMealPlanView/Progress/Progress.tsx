import React from 'react';
import classnames from 'classnames';

import './Progress.sass';

// Icons
import { ReactComponent as CheckedIcon } from 'assets/img/icons/checked-icon.svg';

type ProgressProps = {
  goal?: boolean;
  goalText?: string;
  metrics?: boolean;
  metricsText?: string;
  notEating?: boolean;
  notEatingText?: string;
  desiases?: boolean;
  desiasesText?: string;
  meals?: boolean;
  mealsText?: string;
  percent?: number;
};

const Progress = ({
  goal,
  goalText,
  metrics,
  metricsText,
  notEating,
  notEatingText,
  desiases,
  desiasesText,
  meals,
  mealsText,
  percent,
}: ProgressProps) => {
  return (
    <div className='progress__list'>
      <div className='progress__list-line'>
        <div
          style={{
            width: `${percent}%`,
          }}
          className='progress__list-line-painted'
        />
      </div>
      <div
        className={classnames('progress__list-item', {
          active: goal,
        })}
      >
        <div className='progress__list-item-media'>
          <CheckedIcon />
        </div>
        <div className='progress__list-item-desc'>{goalText}</div>
      </div>
      <div
        className={classnames('progress__list-item', {
          active: metrics,
        })}
      >
        <div className='progress__list-item-media'>
          <CheckedIcon />
        </div>
        <div className='progress__list-item-desc'>{metricsText}</div>
      </div>
      <div
        className={classnames('progress__list-item', {
          active: notEating,
        })}
      >
        <div className='progress__list-item-media'>
          <CheckedIcon />
        </div>
        <div className='progress__list-item-desc'>{notEatingText}</div>
      </div>
      <div
        className={classnames('progress__list-item', {
          active: desiases,
        })}
      >
        <div className='progress__list-item-media'>
          <CheckedIcon />
        </div>
        <div className='progress__list-item-desc'>{desiasesText}</div>
      </div>
      <div
        className={classnames('progress__list-item', {
          active: meals,
        })}
      >
        <div className='progress__list-item-media'>
          <CheckedIcon />
        </div>
        <div className='progress__list-item-desc'>{mealsText}</div>
      </div>
    </div>
  );
};

export default Progress;
