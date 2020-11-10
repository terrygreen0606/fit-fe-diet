import React, { useState } from 'react';
import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
  getTranslate,
} from 'utils';
import { InputError } from 'types';
import { toast } from 'react-toastify';
import { userValidate } from 'api';

// Components
import FormGroup from 'components/common/Forms/FormGroup';
import FormLabel from 'components/common/Forms/FormLabel';
import InputField from 'components/common/Forms/InputField';
import Button from 'components/common/Forms/Button';
import FormValidator from 'utils/FormValidator';

import '../RegisterV2Tpl.sass';

const ConfirmInfo = ({
  registerData,
  setRegisterData,
  registerDataErrors,
  setRegisterDataErrors,
  setRegisterView,
  localePhrases,
}: any) => {
  const t = (code: string, placeholders?: any) =>
    getTranslate(localePhrases, code, placeholders);

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
    getFieldErrorsUtil(field, registerDataErrors);

  const registerJoinSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const inputs = [...form.elements].filter((i) => ['INPUT', 'SELECT', 'TEXTAREA'].includes(i.nodeName));

    const { errors, hasError } = FormValidator.bulkValidate(inputs);

    setRegisterDataErrors([...errors]);

    if (!hasError) {
      setValidateLoading(true);

      const {
        email,
      } = registerData;

      userValidate({
        email,
      })
        .then(({ data }) => {
          if (data.success) {
            setRegisterView('WEIGHT_GOAL');
          } else {
            toast.error(t('register.error_msg'));
          }
        })
        .catch(({ response }) => {
          toast.error(t('register.error_msg'));

          if (response && response.status >= 400 && response.status < 500) {
            const validateErrors = response.data.message;

            const registerDataErrorsTemp: InputError[] = [...registerDataErrors];

            Object.keys(validateErrors).map((field) => {
              registerDataErrorsTemp.push({
                field,
                message: validateErrors[field],
              });
            });

            setRegisterDataErrors(registerDataErrorsTemp);
          }
        })
        .finally(() => {
          setValidateLoading(false);
        });
    }
  };

  return (
    <>
      <h1 className='register_title mb-md-5 text-center'>{t('register.info_confirm_title')}</h1>

      <div className='row'>
        <div className='col-xs-10 offset-xs-1 col-md-8 offset-md-2 px-md-4'>

          <form className='text-left mt-4 px-xl-5' onSubmit={(e) => registerJoinSubmit(e)}>
            <FormGroup>
              <FormLabel>
                {t('register.form_email')}
                *
              </FormLabel>
              <InputField
                block
                name='email'
                autoComplete='email'
                value={registerData.email}
                data-validate='["email", "required"]'
                readOnly={validateLoading}
                onChange={(e) => validateOnChange('email', e.target.value, e)}
                errors={getFieldErrors('email')}
                isValid={getFieldErrors('email').length === 0 && registerData.email.length > 0}
                placeholder={t('register.email.placeholder')}
              />
            </FormGroup>

            <input type='text' name='email' className='d-none' />
            <input type='password' name='pass' className='d-none' />

            <div className='text-center'>
              <Button
                className='register_v2_btn mt-5'
                style={{ maxWidth: '355px' }}
                color='primary'
                type='submit'
                size='lg'
                isLoading={validateLoading}
                block
              >
                {t('button.continue')}
              </Button>
            </div>
          </form>

        </div>
      </div>
    </>
  );
};

export default ConfirmInfo;
