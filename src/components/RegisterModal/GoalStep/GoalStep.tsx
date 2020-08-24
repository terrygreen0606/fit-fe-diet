import React, { useState, useEffect } from 'react';
import { getTranslate } from 'utils';
import uuid from 'react-uuid';

// Components
import Button from 'components/common/Forms/Button';

import '../RegisterModal.sass';

import { ReactComponent as LoseIcon } from 'assets/img/icons/lose-icon.svg';
import { ReactComponent as KeepIcon } from 'assets/img/icons/keep-icon.svg';
import { ReactComponent as LiftIcon } from 'assets/img/icons/lift-icon.svg';
import { ReactComponent as AngleRightIcon } from 'assets/img/icons/angle-right-icon.svg';

const GoalStep = (props: any) => {
  const { registerData } = props;

  const t = (code: string) => getTranslate(props.localePhrases, code);

  return (
    <div className="register_goal">
      <h6 className="register_title mb-5">{t('register.help_achieve_goal')}</h6>

      <div className="register_goals_list">
        <Button
          className="register_goal_btn"
          color="primary"
          block
          onClick={(e) => props.setRegisterData({
            ...registerData,
            goal: -1,
          })}
          outline={registerData.goal !== -1}
        >
          <span>
            <LoseIcon className="register_goal_icon" />
            {t('register.lose_weight')}
          </span>
          <AngleRightIcon />
        </Button>

        <Button
          className="register_goal_btn"
          color="primary"
          block
          onClick={(e) => props.setRegisterData({
            ...registerData,
            goal: 0,
          })}
          outline={registerData.goal !== 0}
        >
          <span>
            <KeepIcon className="register_goal_icon" />
            {t('register.keep_weight')}
          </span>
          <AngleRightIcon />
        </Button>

        <Button
          className="register_goal_btn"
          color="primary"
          block
          onClick={(e) => props.setRegisterData({
            ...registerData,
            goal: 1,
          })}
          outline={registerData.goal !== 1}
        >
          <span>
            <LiftIcon className="register_goal_icon" />
            {t('register.lift_weight')}
          </span>
          <AngleRightIcon />
        </Button>
      </div>

      <div className="text-center">
        <Button
          className="mt-5"
          style={{ width: '220px' }}
          color="primary"
          size="lg"
          onClick={() => props.setRegisterView('NOT_EATING')}
        >
          {t('register.form_next')}
        </Button>
      </div>
    </div>
  );
};

export default GoalStep;
