import React from 'react';

// Components
import Button from 'components/common/Forms/Button';
import NutritionPlanCard from 'components/NutritionPlanCard';
import Advantages from 'components/Advantages';

import './NutritionPlanView.sass';

import { ReactComponent as CookCutIcon } from 'assets/img/icons/cook-cut-icon.svg';
import MealImage, { ReactComponent as MealIcon } from 'assets/img/icons/meal-icon.svg';
import { ReactComponent as DumbbellIcon } from 'assets/img/icons/dumbbell-icon.svg';
import { ReactComponent as WeighScaleIcon } from 'assets/img/icons/weigh-scale-icon.svg';
import { ReactComponent as FileDyskIcon } from 'assets/img/icons/file-dysk-icon.svg';
import { ReactComponent as PrintIcon } from 'assets/img/icons/print-icon.svg';
import { ReactComponent as AngleLeftIcon } from 'assets/img/icons/angle-left-icon.svg';
import RecipePreviewImage from 'assets/img/recipe-preview-img.jpg';
import RewardImage from 'assets/img/reward-img.svg';
import ClockImage from 'assets/img/icons/clock-icon.svg';

const NutritionPlanView = () => (
  <>
    <Advantages
      icon1={CookCutIcon}
      icon2={MealIcon}
      icon3={DumbbellIcon}
      mainTitle="How does the diet plan work?"
      advantage1Title="Quantities are personal"
      advantage1Desc="Taking into account your data and purpose, we have created a diet plan where the amounts of food and calories are calculated for you."
      advantage2Title="All dishes are suitable for every meal"
      advantage2Desc="Eat only what you like. You can change all the recipes as you wish."
      advantage3Title="When you exercise you can eat more"
      advantage3Desc="When exercising, write it down before the last meal. This automatically increases the amount of the last meal so that you get enough of the necessary substances and energy from the food."
    />

    <section className="nutrition-plan-card-list-sect">
      <div className="container">
        <div className="row">
          <div className="nutrition-plan-card-list-col nutrition-plan-list">
            <div className="row">
              <div className="col-8 mb-5">

                <h4>
                  <AngleLeftIcon className="mr-4" />
                  Neljapäev, 18. juuni
                  {' '}
                  <span className="title-icon ml-4" />
                </h4>

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
              <img src={RecipePreviewImage} className="nutrition-plan-add-recipe-card-img" alt="" />
              <span className="nutrition-plan-add-recipe-card-btn" />
            </div>

            <h4 className="mt-5 mb-4">Today&apos;s activities</h4>

            <div className="nutrition-plan-activity-list">
              <div className="nutrition-plan-activity-card card-bg active">
                <span className="nutrition-plan-activity-card-checkmark" />

                <span className="nutrition-plan-activity-card-icon-wrap">
                  <DumbbellIcon className="nutrition-plan-activity-card-icon" />
                </span>

                <h6 className="nutrition-plan-activity-card-title">Add a workout</h6>
              </div>

              <div className="nutrition-plan-activity-card card-bg">
                <span className="nutrition-plan-activity-card-checkmark" />

                <span className="nutrition-plan-activity-card-icon-wrap">
                  <WeighScaleIcon className="nutrition-plan-activity-card-icon" />
                </span>

                <h6 className="nutrition-plan-activity-card-title">Add today&apos;s weight</h6>
              </div>
            </div>

            <div className="nutrition-plan-adherence-diet-card card-bg mt-5">
              <h4 className="nutrition-plan-adherence-diet-card-title">Adherence to a diet plan</h4>

              <div className="nutrition-plan-adherence-diet-card-img">
                <img src={RewardImage} alt="" />
              </div>

              <div className="nutrition-plan-adherence-diet-card-content">
                <p>
                  <b>0%</b>
                  {' '}
                  of the plan completed today
                </p>
                <a href="/" className="link">See last week&apos;s report</a>
              </div>
            </div>

            <div className="nutrition-plan-usage-time-card card-bg mt-5">
              <div className="nutrition-plan-usage-time-card-img text-left">
                <img src={ClockImage} alt="" />
              </div>

              <div className="nutrition-plan-usage-time-card-content">
                <h5>You have active usage time</h5>
                <p>
                  You have
                  <b className="text-steel-blue">4</b>
                  {' '}
                  more days to use.
                </p>
                <Button className="mt-3" color="secondary">Buy subscription</Button>
              </div>
            </div>

            <div className="nutrition-plan-diet-settings-card card-bg mt-5">
              <div className="nutrition-plan-diet-settings-card-img text-left">
                <img src={MealImage} alt="" />
              </div>

              <div className="nutrition-plan-diet-settings-card-content">
                <h5>Diet plan settings</h5>
                <p>
                  If you want the simplest and cheapest recipes,
                  then change the settings and select ‘Starter’
                </p>
                <Button className="mt-3" outline color="secondary">Select Starter</Button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  </>
);

export default NutritionPlanView;
