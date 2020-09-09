/* eslint-disable react/jsx-indent */
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
  diseases?: boolean;
  diseasesText?: string;
  meals?: boolean;
  mealsText?: string;
  percent?: number;
  onClickGoal?: () => void;
  onClickMetrics?: () => void;
  onClickNotEating?: () => void;
  onClickdiseases?: () => void;
  onClickMeals?: () => void;
};

const Progress = ({
  goal,
  goalText,
  metrics,
  metricsText,
  notEating,
  notEatingText,
  diseases,
  diseasesText,
  meals,
  mealsText,
  percent,
  onClickGoal,
  onClickMetrics,
  onClickNotEating,
  onClickdiseases,
  onClickMeals,
}: ProgressProps) => (
    <div className='progress__list'>
      <div className='progress__list-line'>
        <div
          style={{
            width: `${percent}%`,
          }}
          className='progress__list-line-painted'
        />
      </div>
      <button
        type='button'
        className={classnames('progress__list-item', {
          active: goal,
        })}
        onClick={onClickGoal}
      >
        <div className='progress__list-item-media'>
          <CheckedIcon />
        </div>
        <div className='progress__list-item-desc'>{goalText}</div>
      </button>
      <button
        type='button'
        className={classnames('progress__list-item', {
          active: metrics,
        })}
        onClick={onClickMetrics}
      >
        <div className='progress__list-item-media'>
          <CheckedIcon />
        </div>
        <div className='progress__list-item-desc'>{metricsText}</div>
      </button>
      <button
        type='button'
        className={classnames('progress__list-item', {
          active: notEating,
        })}
        onClick={onClickNotEating}
      >
        <div className='progress__list-item-media'>
          <CheckedIcon />
        </div>
        <div className='progress__list-item-desc'>{notEatingText}</div>
      </button>
      <button
        type='button'
        className={classnames('progress__list-item', {
          active: diseases,
        })}
        onClick={onClickdiseases}
      >
        <div className='progress__list-item-media'>
          <CheckedIcon />
        </div>
        <div className='progress__list-item-desc'>{diseasesText}</div>
      </button>
      <button
        type='button'
        className={classnames('progress__list-item', {
          active: meals,
        })}
        onClick={onClickMeals}
      >
        <div className='progress__list-item-media'>
          <CheckedIcon />
        </div>
        <div className='progress__list-item-desc'>{mealsText}</div>
      </button>
    </div>
  );

export default Progress;
