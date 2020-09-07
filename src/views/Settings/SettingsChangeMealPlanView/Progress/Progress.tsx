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
  desiases?: boolean;
  desiasesText?: string;
  meals?: boolean;
  mealsText?: string;
  percent?: number;
  onClickGoal?: () => void;
  onClickMetrics?: () => void;
  onClickNotEating?: () => void;
  onClickDesiases?: () => void;
  onClickMeals?: () => void;
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
  onClickGoal,
  onClickMetrics,
  onClickNotEating,
  onClickDesiases,
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
        onClick={goal ? onClickGoal : null}
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
        onClick={metrics ? onClickMetrics : null}
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
        onClick={notEating ? onClickNotEating : null}
      >
        <div className='progress__list-item-media'>
          <CheckedIcon />
        </div>
        <div className='progress__list-item-desc'>{notEatingText}</div>
      </button>
      <button
        type='button'
        className={classnames('progress__list-item', {
          active: desiases,
        })}
        onClick={desiases ? onClickDesiases : null}
      >
        <div className='progress__list-item-media'>
          <CheckedIcon />
        </div>
        <div className='progress__list-item-desc'>{desiasesText}</div>
      </button>
      <button
        type='button'
        className={classnames('progress__list-item', {
          active: meals,
        })}
        onClick={meals ? onClickMeals : null}
      >
        <div className='progress__list-item-media'>
          <CheckedIcon />
        </div>
        <div className='progress__list-item-desc'>{mealsText}</div>
      </button>
    </div>
  );

export default Progress;
