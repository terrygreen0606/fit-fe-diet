import React, { useState } from 'react';
import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
  getTranslate,
} from 'utils';
import { toast } from 'react-toastify';
import { InputError } from 'types';
import { userValidate } from 'api';

// Components
import Button from 'components/common/Forms/Button';
import FormGroup from 'components/common/Forms/FormGroup';
import FormLabel from 'components/common/Forms/FormLabel';
import InputField from 'components/common/Forms/InputField';
import FormInvalidMessage from 'components/common/Forms/FormInvalidMessage';
import FormValidator from 'utils/FormValidator';

import '../RegisterV2Tpl.sass';

import { ReactComponent as AngleLeftIcon } from 'assets/img/icons/angle-left-icon.svg';

const Age = ({ 
  registerData,
  setRegisterData,
  registerDataErrors,
  setRegisterDataErrors,
  setRegisterView,
  localePhrases,
}: any) => {
  const t = (code: string) => getTranslate(localePhrases, code);

  const [validateLoading, setValidateLoading] = useState(false);

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

    const { errors, hasError } = FormValidator.bulkValidate(inputs);

    setRegisterDataErrors([...errors]);

    if (!hasError) {
      setValidateLoading(true);

      const {
        age,
      } = registerData;

      userValidate({
        age,
      })
        .then((response) => {
          setValidateLoading(false);
          setRegisterView('BACK_ISSUES');
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
      <h1 className='register_v2tpl_title mb-5'>
        {t('register.age_step_title')}
      </h1>

      <form className='mt-5 pt-4' onSubmit={(e) => registerInfoSubmit(e)}>
        <div className='row'>
          <div className='col-8 offset-3 col-xs-7 offset-xs-4 col-md-4 offset-md-5 pl-md-2'>

            <div>
              <FormGroup className='register_v2tpl_fg_inline mb-0' inline>
                <InputField
                  block
                  height='md'
                  type='number'
                  autoFocus
                  min={16}
                  max={100}
                  data-param='16,100'
                  name='age'
                  value={registerData.age}
                  data-validate='["required", "min-max", "integer"]'
                  invalid={getFieldErrors('age').length > 0}
                  onChange={(e) => validateOnChange('age', e.target.value, e)}
                  placeholder=''
                />
                <FormLabel>{t('common.age_yo')}</FormLabel>
              </FormGroup>

              {getFieldErrors('age').slice(0, 1).map((error, i) => (
                <FormInvalidMessage key={i}>{error.message}</FormInvalidMessage>
              ))}
            </div>
          </div>
        </div>

        <Button
          className='register_v2tpl_btn mt-5'
          color='primary'
          type='submit'
          size='lg'
          isLoading={validateLoading}
        >
          {t('register.form_next')}
        </Button>
      </form>
    </>
  );
};

export default Age;
