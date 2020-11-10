import React, { useState } from 'react';
import classNames from 'classnames';
import { getTranslate } from 'utils';

// Components
import Button from 'components/common/Forms/Button';

import '../../RegisterV1Tpl.sass';

import { ReactComponent as MaleIcon } from 'assets/img/icons/male-icon.svg';
import { ReactComponent as FemaleIcon } from 'assets/img/icons/female-icon.svg';

const GenderStep = ({
  registerData,
  setRegisterData,
  setRegisterView,
  localePhrases,
}: any) => {
  const t = (code: string) =>
    getTranslate(localePhrases, code);

  const [hasError, setHasError] = useState(false);

  const nextStep = () => {
    setRegisterView('INFO_AGE');
  };

  const nextStepSubmit = () => {
    if (registerData.gender === null) {
      setHasError(true);
    } else {
      nextStep();
    }
  };

  const changeRegisterGender = (gender: 'm' | 'f') => {
    setHasError(false);

    setRegisterData({
      ...registerData,
      gender,
    });

    nextStep();
  };

  return (
    <div
      className={classNames('register_v1_steps_content', {
        'text-red': hasError,
      })}
    >
      <h3 className='register_v1_title'>
        {t('register.gender_step_title')}
      </h3>

      <div className='register_gender_list'>
        <Button
          className={classNames('register_gender_btn', {
            active: registerData.gender === 'f',
          })}
          block
          onClick={() => changeRegisterGender('f')}
        >
          <FemaleIcon id='register_gender_female_icon' className='register_gender_icon' />
          {t('register.form_female')}
        </Button>

        <Button
          className={classNames('register_gender_btn', {
            active: registerData.gender === 'm',
          })}
          block
          onClick={() => changeRegisterGender('m')}
        >
          <MaleIcon id='register_gender_male_icon' className='register_gender_icon' />
          {t('register.form_male')}
        </Button>
      </div>

      <div className='register_v1_submit'>
        <Button
          style={{ width: '217px' }}
          color='primary'
          type='submit'
          size='lg'
          onClick={() => nextStepSubmit()}
        >
          {t('register.form_next')}
        </Button>
      </div>
    </div>
  );
};

export default GenderStep;
