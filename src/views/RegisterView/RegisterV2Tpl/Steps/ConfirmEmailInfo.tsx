import React, { useState } from 'react';
import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
  getTranslate,
  getCookie,
} from 'utils';
import axios from 'utils/axios';
import { toast } from 'react-toastify';
import { UserAuthProfileType, InputError } from 'types';
import { userSignup } from 'api';

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

  const [registerJoinLoading, setRegisterJoinLoading] = useState<boolean>(false);

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
      setRegisterView('WEIGHT_GOAL');
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
                onChange={(e) => validateOnChange('email', e.target.value, e)}
                errors={getFieldErrors('email')}
                isValid={getFieldErrors('email').length === 0 && registerData.email.length > 0}
                placeholder=''
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
                block
                isLoading={registerJoinLoading}
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
