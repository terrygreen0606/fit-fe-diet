import React, { useState } from 'react';
import classNames from 'classnames';
import { getTranslate } from 'utils';

// Components
import Button from 'components/common/Forms/Button';

import '../RegisterV2Tpl.sass';

const DayMealPlan = ({
  registerData,
  setRegisterData,
  setRegisterView,
  localePhrases,
}: any) => {
  const t = (code: string) => getTranslate(localePhrases, code);

  const [hasError, setHasError] = useState(false);

  const nextStep = () => {
    if (registerData.meal_counts.find((meal_count) => meal_count.checked)) {
      setHasError(false);
      setRegisterView('HEIGHT_WEIGHT');
    } else {
      setHasError(true);
    }
  };

  const changeMealCountState = (value: number, checked: boolean) => {
    setHasError(false);

    const index = registerData.meal_counts.findIndex((meal_count) => meal_count.value === value);

    if (index >= 0) {
      const meal_counts = registerData.meal_counts.map((meal_count) => ({
        ...meal_count,
        checked: false,
      }));

      if (meal_counts[index]) {
        meal_counts[index] = {
          ...meal_counts[index],
          checked,
        };

        setRegisterData({
          ...registerData,
          meal_counts,
        });
      }
    }
  };

  return (
    <>
      <h1
        className={classNames('register_v2_title', {
          'text-red': hasError,
        })}
      >
        {t('register.v2.meal_plan.title')}
      </h1>

      <div className='row'>
        <div className='col-8 offset-2'>

          <div className='register_v2_check_list'>
            {registerData.meal_counts.map(({ value, checked, i18n_code }) => (
              <label key={value} className='register_v2_check_label'>
                <input
                  name='register_day_meal_plan'
                  type='radio'
                  checked={checked}
                  onChange={(e) => changeMealCountState(value, e.target.checked)}
                />
                <div className='register_v2_check_item'>{t(i18n_code)}</div>
              </label>
            ))}
          </div>

        </div>
      </div>

      <Button
        className='register_v2_btn mt-5'
        color='primary'
        size='lg'
        onClick={() => nextStep()}
      >
        {t('register.form_next')}
      </Button>
    </>
  );
};

export default DayMealPlan;
