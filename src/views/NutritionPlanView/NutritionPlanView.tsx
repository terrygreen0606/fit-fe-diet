import React from 'react';

// Components
import Button from 'components/common/Forms/Button'
import NutritionPlanCard from 'components/NutritionPlanCard'

import './NutritionPlanView.sass';

import { ReactComponent as CookCutIcon } from 'assets/img/icons/cook-cut-icon.svg';
import { ReactComponent as MealIcon } from 'assets/img/icons/meal-icon.svg';
import { ReactComponent as DumbbellIcon } from 'assets/img/icons/dumbbell-icon.svg';
import { ReactComponent as WeighScaleIcon } from 'assets/img/icons/weigh-scale-icon.svg';
import { ReactComponent as FileDyskIcon } from 'assets/img/icons/file-dysk-icon.svg';
import { ReactComponent as PrintIcon } from 'assets/img/icons/print-icon.svg';
import { ReactComponent as AngleLeftIcon } from 'assets/img/icons/angle-left-icon.svg';

const NutritionPlanView = () => {
  return (
    <>
      <section className="how-nutrition-plan-works-sect">
        <div className="container">
          <div className="row">
            <div className="how-nutrition-plan-works-col d-flex align-items-center">
              
              <h4>How does the diet plan work?</h4>

            </div>
            <div className="how-nutrition-plan-works-col">
              
              <div className="how-nutrition-plan-works-icon-wrap">
                <CookCutIcon className="how-nutrition-plan-works-icon" />
              </div>

              <h5 className="mt-4 mb-4">Quantities are personal</h5>
              <p>Taking into account your data and purpose, we have created a diet plan where the amounts of food and calories are calculated for you.</p>

            </div>
            <div className="how-nutrition-plan-works-col">
              
              <div className="how-nutrition-plan-works-icon-wrap">
                <MealIcon className="how-nutrition-plan-works-icon" />
              </div>

              <h5 className="mt-4 mb-4">All dishes are suitable for every meal</h5>
              <p>Eat only what you like. You can change all the recipes as you wish.</p>

            </div>
            <div className="how-nutrition-plan-works-col">
              
              <div className="how-nutrition-plan-works-icon-wrap">
                <DumbbellIcon className="how-nutrition-plan-works-icon" />
              </div>

              <h5 className="mt-4 mb-4">When you exercise you can eat more</h5>
              <p>When exercising, write it down before the last meal. This automatically increases the amount of the last meal so that you get enough of the necessary substances and energy from the food.</p>

            </div>
          </div>
        </div>
      </section>

      <section className="nutrition-plan-card-list-sect">
        <div className="container">
          <div className="row">
            <div className="nutrition-plan-card-list-col">
              <div className="row">
                <div className="col-8 mb-5">
                  
                  <h4><AngleLeftIcon className="mr-4" />Neljapäev, 18. juuni <span className="title-icon ml-4" /></h4>

                </div>
                <div className="col-4 mb-5">
                  
                  <div className="nutrition-plan-controls-list">
                    <div className="nutrition-plan-controls-item">
                      <FileDyskIcon className="nutrition-plan-controls-icon" />
                    </div>

                    <div className="nutrition-plan-controls-item">
                      <PrintIcon className="nutrition-plan-controls-icon" />
                    </div>
                  </div>

                </div>
                <div className="col-6">

                  <NutritionPlanCard />
                  
                </div>
                <div className="col-6">

                  <NutritionPlanCard type="active" favorite />
                  
                </div>
                <div className="col-6">

                  <NutritionPlanCard type="cross" />

                </div>
              </div>
            </div>
            <div className="nutrition-plan-info-col">
              
              <div className="nutrition-plan-add-recipe-card card-bg">
                <h4>Now you can add your own recipes to the diet plan</h4>
                <img src={require('../../assets/img/recipe-preview-img.jpg')} className="nutrition-plan-add-recipe-card-img" />
                <span className="nutrition-plan-add-recipe-card-btn"></span>
              </div>

              <h4 className="mt-5 mb-4">Today's activities</h4>

              <div className="nutrition-plan-activity-list">
                <div className="nutrition-plan-activity-card card-bg active">
                  <span className="nutrition-plan-activity-card-checkmark"></span>
                  
                  <span className="nutrition-plan-activity-card-icon-wrap">
                    <DumbbellIcon className="nutrition-plan-activity-card-icon" />
                  </span>

                  <h6 className="nutrition-plan-activity-card-title">Add a workout</h6>
                </div>

                <div className="nutrition-plan-activity-card card-bg">
                  <span className="nutrition-plan-activity-card-checkmark"></span>
                  
                  <span className="nutrition-plan-activity-card-icon-wrap">
                    <WeighScaleIcon className="nutrition-plan-activity-card-icon" />
                  </span>

                  <h6 className="nutrition-plan-activity-card-title">Add today's weight</h6>
                </div>
              </div>

              <div className="nutrition-plan-adherence-diet-card card-bg mt-5">
                <h4 className="nutrition-plan-adherence-diet-card-title">Adherence to a diet plan</h4>

                <div className="nutrition-plan-adherence-diet-card-img">
                  <img src={require('../../assets/img/reward-img.svg')} alt="" />
                </div>

                <div className="nutrition-plan-adherence-diet-card-content">
                  <p><b>0%</b> of the plan completed today</p>
                  <a href="" className="link">See last week's report</a>
                </div>
              </div>

              <div className="nutrition-plan-usage-time-card card-bg mt-5">
                <div className="nutrition-plan-usage-time-card-img text-left">
                  <img src={require('../../assets/img/icons/clock-icon.svg')} alt="" />
                </div>

                <div className="nutrition-plan-usage-time-card-content">
                  <h5>You have active usage time</h5>
                  <p>You have <b className="text-steel-blue">4</b> more days to use.</p>
                  <Button className="mt-3" color="secondary">Buy subscription</Button>
                </div>
              </div>

              <div className="nutrition-plan-diet-settings-card card-bg mt-5">
                <div className="nutrition-plan-diet-settings-card-img text-left">
                  <img src={require('../../assets/img/icons/meal-icon.svg')} alt="" />
                </div>

                <div className="nutrition-plan-diet-settings-card-content">
                  <h5>Diet plan settings</h5>
                  <p>If you want the simplest and cheapest recipes, then change the settings and select ‘Starter’</p>
                  <Button className="mt-3" outline color="secondary">Select Starter</Button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NutritionPlanView;
