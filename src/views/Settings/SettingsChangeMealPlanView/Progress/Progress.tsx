/* eslint-disable react/jsx-indent */
import React from 'react';

import './Progress.sass';

// Icons
import { ReactComponent as CheckedIcon } from 'assets/img/icons/checked-icon.svg';

type ProgressProps = {
  goalText?: string;
  metricsText?: string;
  notEatingText?: string;
  desiasesText?: string;
  mealsText?: string;
  onClickGoal?: () => void;
  onClickMetrics?: () => void;
  onClickNotEating?: () => void;
  onClickDesiases?: () => void;
  onClickMeals?: () => void;
};

const Progress = ({
  goalText,
  metricsText,
  notEatingText,
  desiasesText,
  mealsText,
  onClickGoal,
  onClickMetrics,
  onClickNotEating,
  onClickDesiases,
  onClickMeals,
}: ProgressProps) => (
    <div className='progress__list'>
      <div className='progress__list-line' />
      <button
        type='button'
        className='progress__list-item'
        onClick={onClickGoal}
      >
        <div className='progress__list-item-media'>
          <CheckedIcon />
        </div>
        <div className='progress__list-item-desc'>{goalText}</div>
      </button>
      <button
        type='button'
        className='progress__list-item'
        onClick={onClickMetrics}
      >
        <div className='progress__list-item-media'>
          <CheckedIcon />
        </div>
        <div className='progress__list-item-desc'>{metricsText}</div>
      </button>
      <button
        type='button'
        className='progress__list-item'
        onClick={onClickNotEating}
      >
        <div className='progress__list-item-media'>
          <CheckedIcon />
        </div>
        <div className='progress__list-item-desc'>{notEatingText}</div>
      </button>
      <button
        type='button'
        className='progress__list-item'
        onClick={onClickDesiases}
      >
        <div className='progress__list-item-media'>
          <CheckedIcon />
        </div>
        <div className='progress__list-item-desc'>{desiasesText}</div>
      </button>
      <button
        type='button'
        className='progress__list-item'
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
