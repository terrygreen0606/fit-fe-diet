import React from 'react';
import { getTranslate } from 'utils';

// Components
import Button from 'components/common/Forms/Button';

import '../RegisterV2Tpl.sass';

import { ReactComponent as LoseIcon } from 'assets/img/icons/lose-icon.svg';
import { ReactComponent as KeepIcon } from 'assets/img/icons/keep-icon.svg';
import { ReactComponent as LiftIcon } from 'assets/img/icons/lift-icon.svg';
import { ReactComponent as AngleRightIcon } from 'assets/img/icons/angle-right-icon.svg';

const Goal = (props: any) => {

  const t = (code: string) => getTranslate(props.localePhrases, code);

  return (
    <>
      <h3 className="register_v2tpl_title">We will help you achieve the chosen goal</h3>

      <div className="register_v2tpl_goals_list">
        <Button
          className="register_v2tpl_goal_btn"
          block
        >
          <span>
            <LoseIcon className="register_v2tpl_goal_icon" />
            {t('register.lose_weight')}
          </span>
          <AngleRightIcon />
        </Button>

        <Button
          className="register_v2tpl_goal_btn"
          block
        >
          <span>
            <KeepIcon className="register_v2tpl_goal_icon" />
            {t('register.keep_weight')}
          </span>
          <AngleRightIcon />
        </Button>

        <Button
          className="register_v2tpl_goal_btn"
          block
        >
          <span>
            <LiftIcon className="register_v2tpl_goal_icon" />
            {t('register.lift_weight')}
          </span>
          <AngleRightIcon />
        </Button>
      </div>
    </>
  );
};

export default Goal;
