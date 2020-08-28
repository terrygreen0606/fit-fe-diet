import React from 'react';

// Components
import Button from 'components/common/Forms/Button';

import '../RegisterV2Tpl.sass';

const DayMealPlan = (props: any) => {
  return (
    <>
      <h3 className="register_v2tpl_title">In addition to WHAT you eat, how OFTEN you eat can impact your metabolism. Which of the following best describes your typical day?</h3>

      <div className="row">
        <div className="col-8 offset-2">
          
          <div className="register_v2tpl_check_list">
            <label className="register_v2tpl_check_label">
              <input name="register_day_meal_plan" type="checkbox" />
              <div className="register_v2tpl_check_item">I almost always eat 3 or less meals per day</div>
            </label>

            <label className="register_v2tpl_check_label">
              <input name="register_day_meal_plan" type="checkbox" />
              <div className="register_v2tpl_check_item">
                I almost always eat at least 3 meals, plus several snacks a day
              </div>
            </label>

            <label className="register_v2tpl_check_label">
              <input name="register_day_meal_plan" type="checkbox" />
              <div className="register_v2tpl_check_item">
                It depends - sometimes less than 3 meals, sometimes more than 3
              </div>
            </label>
          </div>

        </div>
      </div>

      <Button className="register_v2tpl_btn" color="primary" size="lg">Next</Button>
    </>
  );
};

export default DayMealPlan;
