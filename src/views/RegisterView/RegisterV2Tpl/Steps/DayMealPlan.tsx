import React from 'react';
import { getTranslate } from 'utils';

// Components
import Button from 'components/common/Forms/Button';

import '../RegisterV2Tpl.sass';

const DayMealPlan = ({ setRegisterView, localePhrases }: any) => {
  const t = (code: string) => getTranslate(localePhrases, code);

  return (
    <>
      <h3 className='register_v2tpl_title'>{t('register.v2.meal_plan.title')}</h3>

      <div className='row'>
        <div className='col-8 offset-2'>

          <div className='register_v2tpl_check_list'>
            <label className='register_v2tpl_check_label'>
              <input name='register_day_meal_plan' type='radio' />
              <div className='register_v2tpl_check_item'>I almost always eat 3 or less meals per day</div>
            </label>

            <label className='register_v2tpl_check_label'>
              <input name='register_day_meal_plan' type='radio' />
              <div className='register_v2tpl_check_item'>
                I almost always eat at least 3 meals, plus several snacks a day
              </div>
            </label>

            <label className='register_v2tpl_check_label'>
              <input name='register_day_meal_plan' type='radio' />
              <div className='register_v2tpl_check_item'>
                It depends - sometimes less than 3 meals, sometimes more than 3
              </div>
            </label>
          </div>

        </div>
      </div>

      <Button
        className='register_v2tpl_btn mt-5'
        color='primary'
        size='lg'
        onClick={() => setRegisterView('HEIGHT_WEIGHT')}
      >
        {t('register.form_next')}
      </Button>
    </>
  );
};

export default DayMealPlan;
