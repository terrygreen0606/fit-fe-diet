import React from 'react';
import { getTranslate } from 'utils';
import classNames from 'classnames';

// Components
import Button from 'components/common/Forms/Button';

import '../RegisterV2Tpl.sass';

import { ReactComponent as LoseIcon } from 'assets/img/icons/lose-icon.svg';
import { ReactComponent as KeepIcon } from 'assets/img/icons/keep-icon.svg';
import { ReactComponent as LiftIcon } from 'assets/img/icons/lift-icon.svg';
import { ReactComponent as AngleRightIcon } from 'assets/img/icons/angle-right-icon.svg';

const Goal = (props: any) => {

  const t = (code: string) => getTranslate(props.localePhrases, code);

  const { registerData } = props;

  return (
    <>
      <h3 className="register_v2tpl_title">We will help you achieve the chosen goal</h3>

      <div className="row">
        <div className="col-8 offset-2">
          
          <div className="register_goals_list">
            <Button
              className={classNames("register_goal_btn", {
                'active': registerData.goal === -1
              })}
              block
              onClick={(e) => props.setRegisterData({
                ...registerData,
                goal: -1,
              })}
            >
              <span>
                <LoseIcon className="register_goal_icon mr-3" />
                {t('register.lose_weight')}
              </span>
              <AngleRightIcon className="register_goal_icon" />
            </Button>

            <Button
              className={classNames("register_goal_btn", {
                'active': registerData.goal === 0
              })}
              block
              onClick={(e) => props.setRegisterData({
                ...registerData,
                goal: 0,
              })}
            >
              <span>
                <KeepIcon className="register_goal_icon mr-3" />
                {t('register.keep_weight')}
              </span>
              <AngleRightIcon className="register_goal_icon" />
            </Button>

            <Button
              className={classNames("register_goal_btn", {
                'active': registerData.goal === 1
              })}
              block
              onClick={(e) => props.setRegisterData({
                ...registerData,
                goal: 1,
              })}
            >
              <span>
                <LiftIcon className="register_goal_icon mr-3" />
                {t('register.lift_weight')}
              </span>
              <AngleRightIcon className="register_goal_icon" />
            </Button>
          </div>

          <Button className="register_v2tpl_btn" color="primary" size="lg">Next</Button>

        </div>
      </div>
    </>
  );
};

export default Goal;
