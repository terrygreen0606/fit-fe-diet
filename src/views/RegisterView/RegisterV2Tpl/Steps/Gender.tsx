import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
  getTranslate,
} from 'utils';
import { toast } from 'react-toastify';
import { userValidate } from 'api';

// Components
import Button from 'components/common/Forms/Button';
import FormValidator from 'utils/FormValidator';

import { InputError } from 'types';

import '../RegisterV2Tpl.sass';

const Gender = ({
  registerData,
  setRegisterData,
  registerDataErrors,
  setRegisterDataErrors,
  setRegisterView,
  localePhrases
}: any) => {
  const [validateLoading, setValidateLoading] = useState(false);

  const t = (code: string) => getTranslate(localePhrases, code);

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
      setValidateLoading(true);

      const {
        gender,
      } = registerData;

      userValidate({
        gender,
      })
        .then((response) => {
          setValidateLoading(false);
          setRegisterView('AGE');
        })
        .catch((error) => {
          setValidateLoading(false);

          toast.error(t('register.error_msg'));

          if (error.response && error.response.status >= 400 && error.response.status < 500) {
            try {
              const validateErrors = JSON.parse(error.response.data.message);

              const registerDataErrorsTemp: InputError[] = [...registerDataErrors];

              Object.keys(validateErrors).map((field) => {
                registerDataErrorsTemp.push({
                  field,
                  message: validateErrors[field],
                });
              });

              setRegisterDataErrors(registerDataErrorsTemp);
            } catch {

            }
          }
        });
    }
  };

  return (
    <>
      <h3
        className={classNames('register_v2tpl_title', {
          'text-red': getFieldErrors('gender').length > 0,
        })}
      >
        {t('register.v2.gender_step_title')}
      </h3>

      <form onSubmit={(e) => registerInfoSubmit(e)}>
        <div className='row'>
          <div className='col-8 offset-2'>

            <div className='register_v2tpl_check_list'>
              <label className='register_v2tpl_check_label'>
                <input
                  name='gender'
                  type='radio'
                  value='m'
                  data-validate='["required"]'
                  onChange={(e) => validateOnChange('gender', e.target.value, e)}
                />
                <div className='register_v2tpl_check_item'>{t('register.form_male')}</div>
              </label>

              <label className='register_v2tpl_check_label'>
                <input
                  name='gender'
                  type='radio'
                  value='f'
                  data-validate='["required"]'
                  onChange={(e) => validateOnChange('gender', e.target.value, e)}
                />
                <div className='register_v2tpl_check_item'>{t('register.form_female')}</div>
              </label>
            </div>

          </div>
        </div>

        <Button
          className='register_v2tpl_btn mt-5'
          type='submit'
          color='primary'
          size='lg'
          isLoading={validateLoading}
        >
          {t('register.form_next')}
        </Button>
      </form>
    </>
  );
};

export default Gender;