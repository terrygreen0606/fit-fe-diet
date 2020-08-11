import React from 'react';

import './NutritionPlanCard.sass';

import { ReactComponent as ReloadIcon } from 'assets/img/icons/reload-icon.svg';
import NutritionPlanPreviewImage from 'assets/img/nutrition-plan-preview-img.jpg';

type NutritionPlanCardProps = {
  type: 'active' | 'cross' | 'default',
  favorite?: boolean
};

const NutritionPlanCardDefaultProps = {
  type: 'default',
};

const NutritionPlanCard = ({ type, favorite }: NutritionPlanCardProps) => (
  <div className={`nutrition-plan-card card-bg ${type}`}>
    <div className="nutrition-plan-card-image" style={{ backgroundImage: `url(${NutritionPlanPreviewImage})` }} />

    <div className="nutrition-plan-card-head">
      <h5 className="nutrition-plan-card-title">Õhtusöök</h5>

      <div className="nutrition-plan-card-controls-list">
        <div className="nutrition-plan-card-controls-item">
          <ReloadIcon id="nutrition-plan-reload-icon" className="nutrition-plan-card-controls-icon" />
        </div>

        <div className="nutrition-plan-card-controls-item">
          <span id="nutrition-plan-favorite-icon" className={`nutrition-plan-card-controls-icon ${favorite ? 'favorite' : ''}`} />
        </div>
      </div>
    </div>

    <div className="nutrition-plan-card-descr">Õuna-rosina kohupiimavorm</div>

    <div className="nutrition-plan-card-bottom">
      <span className="nutrition-plan-card-time">40 min</span>
      <span className="nutrition-plan-card-mark" />
      <span className="nutrition-plan-card-price">€€</span>
    </div>

    <span className="nutrition-plan-card-checkmark" />
  </div>
);

NutritionPlanCard.defaultProps = NutritionPlanCardDefaultProps;

export default NutritionPlanCard;
