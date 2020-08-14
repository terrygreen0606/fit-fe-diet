import React, { FunctionComponent, SVGProps } from 'react';

import NutritionPlanCard from 'components/NutritionPlanCard';

export type ItemProps = {
  icon: FunctionComponent<SVGProps<SVGSVGElement>>,
  title?: string,
  type?: 'active' | 'cross' | 'default',
  favorite?: boolean,
  plan?: string,
};

const FoodPlanDayItem = ({
  icon: Icon,
  title,
  type,
  favorite,
  plan,
}: ItemProps) => (
  <div className='food_plan_day_item col-12 col-md-6 col-lg-4'>
    {
      title && plan !== 'week' ? (
        <div className='food_plan_day_item_type'>
          <Icon />
          {title}
        </div>
      ) : null
    }
    <NutritionPlanCard
      type={type}
      favorite={favorite}
      mobileStyle='horizontal-mobile'
    />
  </div>
);

export default FoodPlanDayItem;
