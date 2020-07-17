import React from 'react';

import './NutritionPlanCard.sass';

import { ReactComponent as ReloadIcon } from 'assets/img/icons/reload-icon.svg';

type NutritionPlanCardProps = {
  type: 'active' | 'cross' | 'default',
  favorite?: boolean
};

const NutritionPlanCardDefaultProps = {
  type: 'default'
};

const NutritionPlanCard = (props: NutritionPlanCardProps) => (
  <div className={`nutrition-plan-card card-bg ${props.type}`}>
    <div className="nutrition-plan-card-image" style={{ backgroundImage: `url(${require('../../assets/img/nutrition-plan-preview-img.jpg')})` }}></div>

    <div className="nutrition-plan-card-head">
      <h5 className="nutrition-plan-card-title">Õhtusöök</h5>
      
      <div className="nutrition-plan-card-controls-list">
        <div className="nutrition-plan-card-controls-item">
          <ReloadIcon id="nutrition-plan-reload-icon" className="nutrition-plan-card-controls-icon" />
        </div>

        <div className="nutrition-plan-card-controls-item">
          <span id="nutrition-plan-favorite-icon" className={`nutrition-plan-card-controls-icon ${props.favorite ? 'favorite' : ''}`}></span>
        </div>
      </div>
    </div>

    <div className="nutrition-plan-card-descr">Õuna-rosina kohupiimavorm</div>

    <div className="nutrition-plan-card-bottom">
      <span className="nutrition-plan-card-time">40 min</span>
      <span className="nutrition-plan-card-mark"></span>
      <span className="nutrition-plan-card-price">€€</span>
    </div>

    <span className="nutrition-plan-card-checkmark"></span>
  </div>
);

NutritionPlanCard.defaultProps = NutritionPlanCardDefaultProps;

export default NutritionPlanCard;
