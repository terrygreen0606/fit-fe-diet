import React, { ReactNode } from 'react';
import Button from 'components/common/Forms/Button';

import { ReactComponent as CalendarIcon } from 'assets/img/icons/calendar-icon.svg';
import { ReactComponent as TrashIcon } from 'assets/img/icons/trash-icon.svg';

import FoodPlanDayItem, { ItemProps } from './FoodPlanDayItem';

import './FoodPlanDay.sass';

type FoodPlanDay = {
  date: string,
  mealPlan: ItemProps[],
  plan: string,
  t: (any) => ReactNode,
};

const FoodPlanDay = ({
  date,
  mealPlan,
  plan,
  t,
}: FoodPlanDay) => (
  <div className='food_plan_day_sect'>
    <div className='row mb-xl-5 mb-4'>
      <div className='col d-flex align-items-center'>
        <CalendarIcon className='food_plan_day_icon' />
        <span className='food_plan_day_title'>
          {date}
        </span>
      </div>
      <div className='col-auto d-flex justify-content-end'>
        <div className='food_plan_day_trash d-flex justify-content-center align-items-center'>
          <TrashIcon />
        </div>
      </div>
    </div>

    <div className='flex-wrap d-flex flex-row'>
      {
        mealPlan.map((meal) => (
          <FoodPlanDayItem
            key={`${meal.title}${meal.type}${meal.favorite}`}
            plan={plan}
            {...meal}
          />
        ))
      }
    </div>

    <div className='row d-flex flex-row justify-content-end food_plan_day_btn'>
      <Button
        color='info'
        className='food_plan_day_btn_day'
      >
        {t('foodplan.change.meals')}
      </Button>
      <Button
        color='default'
        className='food_plan_day_btn_settings'
      >
        {t('foodplan.change.settings')}
      </Button>
    </div>
  </div>
);

export default FoodPlanDay;
