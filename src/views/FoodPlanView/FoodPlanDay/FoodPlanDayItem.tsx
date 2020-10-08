import React, { FunctionComponent, SVGProps } from 'react';

import { getImagePath } from 'utils';

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
        title='Some title'
        linkToRecipe='/'
        type={type}
        favorite={favorite}
        mobileStyle='horizontal-mobile'
        imgSrc={getImagePath('nutrition-plan-preview-img.jpg')}
      />
    </div>
  );

export default FoodPlanDayItem;
