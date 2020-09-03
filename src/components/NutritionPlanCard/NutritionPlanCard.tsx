import React from 'react';
import { getImagePath } from 'utils';

import './NutritionPlanCard.sass';

import { ReactComponent as ReloadIcon } from 'assets/img/icons/reload-icon.svg';

type NutritionPlanCardProps = {
  type: 'active' | 'cross' | 'default',
  favorite?: boolean,
  mobileStyle?: 'horizontal-mobile' | '',
};

const NutritionPlanCardDefaultProps = {
  type: 'default',
  mobileStyle: '',
};

const NutritionPlanCard = ({
  type, favorite, mobileStyle,
}: NutritionPlanCardProps) => (
  <div className={`nutrition-plan-card card-bg ${type} ${mobileStyle}`}>
    <div
      className='nutrition-plan-card-image'
      style={{ backgroundImage: `url(${getImagePath('nutrition-plan-preview-img.jpg')})` }}
    />

    <div className={`${mobileStyle}-div`}>
      <div className='nutrition-plan-card-head'>
        <h5 className='nutrition-plan-card-title'>
          Õhtusöök
        </h5>

        <div className='nutrition-plan-card-controls-list'>
          <div className='nutrition-plan-card-controls-item'>
            <ReloadIcon id='nutrition-plan-reload-icon' className='nutrition-plan-card-controls-icon' />
          </div>

          <div className='nutrition-plan-card-controls-item'>
            <span id='nutrition-plan-favorite-icon' className={`nutrition-plan-card-controls-icon ${favorite ? 'favorite' : ''}`} />
          </div>
        </div>
      </div>

      <div className='nutrition-plan-card-descr'>Õuna-rosina kohupiimavorm</div>

      <div className='nutrition-plan-card-bottom'>
        <span className='nutrition-plan-card-time'>40 min</span>
        <span className='nutrition-plan-card-mark' />
        <span className='nutrition-plan-card-price'>€€</span>
      </div>

      <span className='nutrition-plan-card-checkmark' />
    </div>
  </div>
);

NutritionPlanCard.defaultProps = NutritionPlanCardDefaultProps;

export default NutritionPlanCard;
