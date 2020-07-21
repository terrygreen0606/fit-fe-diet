import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid';

// Components
import Button from 'components/common/Forms/Button';

import '../RegisterModal.sass';

import { ReactComponent as LoseIcon } from 'assets/img/icons/lose-icon.svg';
import { ReactComponent as KeepIcon } from 'assets/img/icons/keep-icon.svg';
import { ReactComponent as LiftIcon } from 'assets/img/icons/lift-icon.svg';
import { ReactComponent as AngleRightIcon } from 'assets/img/icons/angle-right-icon.svg';
import { ReactComponent as CrossIcon } from 'assets/img/icons/cross-icon-black.svg';
import { ReactComponent as MilkIcon } from 'assets/img/icons/milk-icon.svg';
import { ReactComponent as MeatIcon } from 'assets/img/icons/meat-icon.svg';
import { ReactComponent as FishIcon } from 'assets/img/icons/fish-icon.svg';
import { ReactComponent as CookIcon } from 'assets/img/icons/cook-icon.svg';
import { ReactComponent as BreadIcon } from 'assets/img/icons/bread-icon.svg';
import { ReactComponent as CakeIcon } from 'assets/img/icons/cake-icon.svg';

const GoalStep = (props: any) => {

  const [ignoreCuisineIds, setIgnoreCuisineIds] = useState([]);

  useEffect(() => {
    if (props.registerData && props.registerData.ignore_cuisine_ids) {
      setIgnoreCuisineIds(props.registerData.ignore_cuisine_ids.map(mealKey => ({
        id: uuid(),
        key: mealKey,
        ...getMealItem(mealKey)
      })));
    }
  }, [props.registerData]);

  function getMealItem (mealId: string) {
    let mealItem = {
      title: '',
      icon: null
    };

    switch (mealId) {
      case 'milk':
        mealItem = {
          title: 'Milk',
          icon: MilkIcon
        };
        break;

      case 'meat':
        mealItem = {
          title: 'Meat',
          icon: MeatIcon
        };
        break;

      case 'fish':
        mealItem = {
          title: 'Fish',
          icon: FishIcon
        };
        break;

      case 'diseases':
        mealItem = {
          title: 'Diseases',
          icon: CookIcon
        };
        break;

      case 'gluten':
        mealItem = {
          title: 'Gluten',
          icon: BreadIcon
        };
        break;

      case 'deabetes':
        mealItem = {
          title: 'Deabetes',
          icon: CakeIcon
        };
        break;
    }

    return mealItem;
  }

  const removeMealItem = (mealId: string) => {
    const mealItem = ignoreCuisineIds.find(meal => meal.id === mealId);

    if (mealItem) {
      props.setRegisterData({
        ...props.registerData,
        ignore_cuisine_ids: props.registerData.ignore_cuisine_ids.filter(mealKey => mealKey !== mealItem.key)
      });

      setIgnoreCuisineIds(ignoreCuisineIds.filter(meal => meal.key !== mealItem.key));
    }
  };

  return (
    <div className="register_goal">
      <h6 className="register_title mb-4">We will help you achieve the chosen goal</h6>

      <div className="register_goals_list">
        <Button 
          className="register_goal_btn" 
          color="primary" 
          block
          onClick={e => props.setRegisterData({
            ...props.registerData,
            goal: -1
          })}
          outline={props.registerData.goal !== -1}
        >
          <span>
            <LoseIcon className="register_goal_icon" />
            Lose weight
          </span>
          <AngleRightIcon />
        </Button>

        <Button 
          className="register_goal_btn" 
          color="primary" 
          block
          onClick={e => props.setRegisterData({
            ...props.registerData,
            goal: 0
          })}
          outline={props.registerData.goal !== 0}
        >
          <span>
            <KeepIcon className="register_goal_icon" />
            Keep the weight
          </span>
          <AngleRightIcon />
        </Button>

        <Button 
          className="register_goal_btn" 
          color="primary" 
          block
          onClick={e => props.setRegisterData({
            ...props.registerData,
            goal: 1
          })}
          outline={props.registerData.goal !== 1}
        >
          <span>
            <LiftIcon className="register_goal_icon" />
            Lift the weight
          </span>
          <AngleRightIcon />
        </Button>
      </div>

      <h6 className="register_goal_title mt-5 mb-3">I'm not eating:</h6>

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
          Next
        </Button>
      </div>
    </div>
  );
};

export default GoalStep;
