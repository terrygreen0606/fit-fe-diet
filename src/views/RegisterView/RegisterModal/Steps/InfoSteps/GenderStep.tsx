import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
  getTranslate,
} from 'utils';
import { toast } from 'react-toastify';

// Components
import Button from 'components/common/Forms/Button';
import FormGroup from 'components/common/Forms/FormGroup';
import FormLabel from 'components/common/Forms/FormLabel';
import InputField from 'components/common/Forms/InputField';
import CustomRadio from 'components/common/Forms/CustomRadio';
import FormInvalidMessage from 'components/common/Forms/FormInvalidMessage';
import FormValidator from 'utils/FormValidator';

import '../../RegisterModal.sass';

import { ReactComponent as MaleIcon } from 'assets/img/icons/male-icon.svg';
import { ReactComponent as FemaleIcon } from 'assets/img/icons/female-icon.svg';
import { ReactComponent as AngleLeftIcon } from 'assets/img/icons/angle-left-icon.svg';

const GenderStep = ({
  registerData,
  setRegisterData,
  registerDataErrors,
  setRegisterDataErrors,
  setRegisterView,
  stepTitlesDefault,
  setStepTitles,
  localePhrases,
}: any) => {
  const t = (code: string) => getTranslate(localePhrases, code);

  useEffect(() => {
    const currStepTitles = [...stepTitlesDefault];
    currStepTitles[1] = t('register.gender_step');
    currStepTitles[2] = t('register.not_eating_step');

    setStepTitles([...currStepTitles]);

    return () => {
      setStepTitles([...stepTitlesDefault]);
    };
  }, []);

  const validateOnChange = (name: string, value: any, event, element?) => {
    validateFieldOnChange(
      name,
      value,
      event,
      registerData,
      setRegisterData,
      registerDataErrors,
      setRegisterDataErrors,
      element,
    );
  };

  const getFieldErrors = (field: string) =>
    getFieldErrorsUtil(field, registerDataErrors)
      .map((msg) => ({
        ...msg,
        message: t('api.ecode.invalid_value'),
      }));

  const nextStep = () => {
    setRegisterView('INFO_AGE');
  };

  const changeRegisterGender = (e: Event & { target: HTMLInputElement }) => {
    validateOnChange('gender', e.target.value, e);
    nextStep();
  };

  const registerInfoSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const inputs = [...form.elements].filter((i) => ['INPUT', 'SELECT', 'TEXTAREA'].includes(i.nodeName));

    let { errors, hasError } = FormValidator.bulkValidate(inputs);

    if (!registerData.gender) {
      errors.push({
        field: 'gender',
        message: t('api.ecode.invalid_value'),
      });

      hasError = true;
    }

    setRegisterDataErrors([...errors]);

    if (!hasError) {
      nextStep();
    }
  };

  return (
    <div className='register_info'>
      <h6 className='register_title mb-xl-5 mb-45'>
        <AngleLeftIcon
          className='register-back-icon mr-3'
          onClick={() => setRegisterView('GOAL')}
        />
        {t('register.gender_step_title')}
      </h6>

      <form className='register_info_form' onSubmit={(e) => registerInfoSubmit(e)}>
        <FormGroup inline className='mb-5'>
          <CustomRadio
            name='gender'
            className='register_gender_radio mr-md-5 pr-md-4'
            label={
              <>
                <MaleIcon
                  className={classNames('genderIcon', {
                    genderIcon_active: registerData.gender === 'm',
                  })}
                />

                {t('register.form_male')}
              </>
            }
            value='m'
            checked={registerData.gender === 'm'}
            invalid={getFieldErrors('gender').length > 0}
            inline
            onChange={(e) => changeRegisterGender(e)}
          />

          <CustomRadio
            name='gender'
            className='register_gender_radio'
            label={
              <>
                <FemaleIcon
                  className={classNames('genderIcon', {
                    genderIcon_active: registerData.gender === 'f',
                  })}
                />

                {t('register.form_female')}
              </>
            }
            value='f'
            checked={registerData.gender === 'f'}
            invalid={getFieldErrors('gender').length > 0}
            inline
            onChange={(e) => changeRegisterGender(e)}
          />
        </FormGroup>

        <div className='register_info_form_submit'>
          <Button
            style={{ width: '217px' }}
            color='primary'
            type='submit'
            size='lg'
          >
            {t('register.form_next')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default GenderStep;
