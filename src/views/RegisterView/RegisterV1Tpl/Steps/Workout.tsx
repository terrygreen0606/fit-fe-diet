import React, { useState } from 'react';
import { getTranslate } from 'utils';
import classNames from 'classnames';

// Components
import Button from 'components/common/Forms/Button';

import '../RegisterV1Tpl.sass';

import { ReactComponent as AngleLeftIcon } from 'assets/img/icons/angle-left-icon.svg';

const Workout = ({
  registerData,
  setRegisterData,
  setRegisterView,
  localePhrases,
}: any) => {
  const t = (code: string) => getTranslate(localePhrases, code);

  const [hasError, setHasError] = useState(false);

  const nextStep = () => {
    if (registerData.goal === 0) {
      setRegisterView('JOIN');
    } else {
      setRegisterView('EXPECTATIONS');
    }
  };

  const nextStepSubmit = () => {
    if (registerData.act_levels.find((level) => level.checked)) {
      setHasError(false);
      nextStep();
    } else {
      setHasError(true);
    }
  };

  const changeActLevelState = (value: number, checked: boolean) => {
    setHasError(false);

    const index = registerData.act_levels.findIndex((activity) => activity.value === value);

    if (index >= 0) {
      const act_levels = registerData.act_levels.map((level) => ({
        ...level,
        checked: false,
      }));

      if (act_levels[index]) {
        act_levels[index] = {
          ...act_levels[index],
          checked,
        };

        setRegisterData({
          ...registerData,
          act_levels,
        });
      }
    }

    nextStep();
  };

  return (
    <div className='register_v1_steps_content'>
      <AngleLeftIcon
        className='register_v1_back_icon'
        onClick={() => setRegisterView('HEALTH_PROBLEMS')}
      />

      <h3
        className={classNames('register_v1_title', {
          'text-red': hasError,
        })}
      >
        {t('register.workout_title')}
      </h3>

      <div className='register_check_list'>
        {registerData.act_levels.map(({ value, checked, i18n_code }) => (
          <label key={value} className='register_check_item'>
            <input
              name='register_act_levels'
              type='radio'
              value={value}
              checked={!!checked}
              onChange={(e) => changeActLevelState(value, e.target.checked)}
            />

            <Button className='register_check_btn' block spanBtn>
              {t(i18n_code)}
            </Button>
          </label>
        ))}
      </div>

      <div className='register_v1_submit'>
        <Button
          style={{ width: '220px' }}
          color='primary'
          size='lg'
          onClick={() => nextStepSubmit()}
        >
          {t('register.form_next')}
        </Button>
      </div>
    </div>
  );
};

export default Workout;
