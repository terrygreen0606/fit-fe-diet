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
import { ReactComponent as CrossIcon } from 'assets/img/icons/cross-icon-black.svg';
import { getMealItem } from './getMealItem';

const GoalStep = (props: any) => {
  const { registerData } = props;
  const [ignoreCuisineIds, setIgnoreCuisineIds] = useState([]);

  useEffect(() => {
    if (registerData && registerData.ignore_cuisine_ids) {
      setIgnoreCuisineIds(registerData.ignore_cuisine_ids.map((mealKey) => ({
        id: uuid(),
        key: mealKey,
        ...getMealItem(mealKey),
      })));
    }
  }, [registerData]);

  const t = (code: string) => getTranslate(props.localePhrases, code);

  const removeMealItem = (mealId: string) => {
    const mealItem = ignoreCuisineIds.find((meal) => meal.id === mealId);

    if (mealItem) {
      props.setRegisterData({
        ...registerData,
        ignore_cuisine_ids: registerData.ignore_cuisine_ids.filter(
          (mealKey) => mealKey !== mealItem.key,
        ),
      });

      setIgnoreCuisineIds(ignoreCuisineIds.filter((meal) => meal.key !== mealItem.key));
    }
  };

  return (
    <div className="register_goal">
      <h6 className="register_title mb-4">{t('register.help_achieve_goal')}</h6>

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

      <h6 className="register_goal_title mt-5 mb-3">
        {t('register.not_eating')}
        :
      </h6>

      <div className="register_eating_list">
        {ignoreCuisineIds.map(({ id, title, icon: Icon }) => (
          <div key={id} className="register_eating_item">
            <span>
              <Icon className="register_eating_item_icon" />
              <span className="register_eating_item_label">{title}</span>
            </span>

            <CrossIcon onClick={() => removeMealItem(id)} className="register_eating_item_cross" />
          </div>
        ))}
      </div>

      <div className="text-center">
        <Button
          className="mt-3"
          style={{ width: '220px' }}
          color="primary"
          size="lg"
          onClick={() => props.setRegisterStep('INFO')}
        >
          {t('register.form_next')}
        </Button>
      </div>
    </div>
  );
};

export default GoalStep;
