import React, { useState } from 'react';
import { getTranslate } from 'utils';
import classNames from 'classnames';

// Components
import Button from 'components/common/Forms/Button';

import '../RegisterV1Tpl.sass';

import { ReactComponent as LoseIcon } from 'assets/img/icons/lose-icon.svg';
import { ReactComponent as KeepIcon } from 'assets/img/icons/keep-icon.svg';
import { ReactComponent as LiftIcon } from 'assets/img/icons/lift-icon.svg';
import { ReactComponent as AngleRightIcon } from 'assets/img/icons/angle-right-icon.svg';

const GoalStep = ({
  registerData,
  setRegisterData,
  setRegisterView,
  localePhrases,
}: any) => {
  const t = (code: string) => getTranslate(localePhrases, code);

  const [hasError, setHasError] = useState(false);

  const nextStep = () => {
    setRegisterView('INFO_GENDER');
  };

  const nextStepSubmit = () => {
    if (registerData.goal === null) {
      setHasError(true);
    } else {
      nextStep();
    }
  };

  const changeRegisterGoal = (goal: -1 | 0 | 1) => {
    setHasError(false);

    setRegisterData({
      ...registerData,
      goal,
    });

    nextStep();
  };

  return (
    <div className='register_goal'>
      <h3
        className={classNames('register_title mb-xl-5 mb-45', {
          'text-red': hasError,
        })}
      >
        {t('register.help_achieve_goal')}
      </h3>

      <div className='register_goals_list'>
        <Button
          className={classNames('register_goal_btn', {
            active: registerData.goal === -1,
          })}
          block
          onClick={() => changeRegisterGoal(-1)}
        >
          <span>
            <LoseIcon className='register_goal_icon mr-3' />
            {t('register.lose_weight')}
          </span>
          <AngleRightIcon className='register_goal_icon' />
        </Button>

        <Button
          className={classNames('register_goal_btn', {
            active: registerData.goal === 0,
          })}
          block
          onClick={() => changeRegisterGoal(0)}
        >
          <span>
            <KeepIcon className='register_goal_icon mr-3' />
            {t('register.keep_weight')}
          </span>
          <AngleRightIcon className='register_goal_icon' />
        </Button>

        <Button
          className={classNames('register_goal_btn', {
            active: registerData.goal === 1,
          })}
          block
          onClick={() => changeRegisterGoal(1)}
        >
          <span>
            <LiftIcon className='register_goal_icon mr-3' />
            {t('register.lift_weight')}
          </span>
          <AngleRightIcon className='register_goal_icon' />
        </Button>
      </div>

      <div className='text-center'>
        <Button
          className='mt-xl-5 mt-45'
          style={{ width: '220px' }}
          color='primary'
          size='lg'
          onClick={() => nextStepSubmit()}
        >
          {t('register.form_next')}
        </Button>
      </div>
    </div>
  );
};

export default GoalStep;
