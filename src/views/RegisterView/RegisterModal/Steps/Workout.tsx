import React, { useState, useEffect } from 'react';
import { getTranslate } from 'utils';
import classNames from 'classnames';

// Components
import Button from 'components/common/Forms/Button';

import '../RegisterModal.sass';

import { ReactComponent as AngleLeftIcon } from 'assets/img/icons/angle-left-icon.svg';

const Workout = (props: any) => {

  const t = (code: string) => getTranslate(props.localePhrases, code);

  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let currStepTitles = [...props.stepTitlesDefault];
    currStepTitles[0] = t('register.step_health');
    currStepTitles[1] = t('register.step_workout');
    currStepTitles[2] = t('register.expect_step');

    props.setStepTitles([...currStepTitles]);

    return () => {
      props.setStepTitles([...props.stepTitlesDefault]);
    };
  }, []);

  const nextStep = () => {
    if (props.registerData.act_levels.find(level => level.checked)) {
      setHasError(false);

      if (props.registerData.goal === 0) {
        props.setRegisterView('JOIN');
      } else {
        props.setRegisterView('EXPECTATIONS');
      }
    } else {
      setHasError(true);
    }
  };

  const changeActLevelState = (value: number, checked: boolean) => {
    setHasError(false);

    const index = props.registerData.act_levels.findIndex(activity => activity.value === value);

    if (index >= 0) {
      let act_levels = props.registerData.act_levels.map(level => ({
        ...level,
        checked: false
      }));

      if (act_levels[index]) {
        act_levels[index] = {
          ...act_levels[index],
          checked
        };

        props.setRegisterData({
          ...props.registerData,
          act_levels
        });
      }
    }
  };

  return (
    <>
      <h1 className={classNames("register_title mb-xl-5 mb-45", {
        'text-red': hasError
      })}>
        <AngleLeftIcon 
          className="register-back-icon mr-5" 
          onClick={e => props.setRegisterView('HEALTH_PROBLEMS')}
        />
        {t('register.workout_title')}:
      </h1>

      <div className="register_check_list">
        {props.registerData.act_levels.map(({ value, checked, i18n_code }) => (
          <label key={value} className="register_check_item">
            <input 
              name="register_act_levels" 
              type="radio" 
              checked={checked}
              onChange={e => changeActLevelState(value, e.target.checked)}
            />

            <Button className="register_check_btn" block spanBtn>
              {t(i18n_code)}
            </Button>
          </label>
        ))}
      </div>

      <div className="text-center">
        <Button
          className="mt-xl-5 mt-45"
          style={{ width: '220px' }}
          color="primary"
          size="lg"
          onClick={() => nextStep()}
        >
          {t('register.form_next')}
        </Button>
      </div>
    </>
  );
};

export default Workout;
