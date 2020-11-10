import React, { useState } from 'react';
import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
  getTranslate,
} from 'utils';
import { connect } from 'react-redux';
import {
  setAppSetting as setAppSettingAction,
  setUserData as setUserDataAction,
} from 'store/actions';
import { InputError } from 'types';
import { toast } from 'react-toastify';
import { userValidate } from 'api';

// Components
import FormGroup from 'components/common/Forms/FormGroup';
import FormLabel from 'components/common/Forms/FormLabel';
import InputField from 'components/common/Forms/InputField';
import Button from 'components/common/Forms/Button';
import FormValidator from 'utils/FormValidator';

import '../RegisterV1Tpl.sass';

import { ReactComponent as AngleLeftIcon } from 'assets/img/icons/angle-left-icon.svg';

const JoinEmailStep = ({
  registerData,
  setRegisterData,
  registerDataErrors,
  setRegisterDataErrors,
  setRegisterView,
  localePhrases,
}: any) => {
  const t = (code: string) =>
    getTranslate(localePhrases, code);

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
            setRegisterView('JOIN_NAME');
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
    <div className='register_v1_steps_content'>
      <AngleLeftIcon
        className='register_v1_back_icon'
        onClick={() => setRegisterView('EXPECTATIONS')}
      />

      <h3 className='register_v1_title text-steel-blue'>
        {t('register.join_email_title')}
      </h3>

      <form className='register_v1_form' onSubmit={(e) => registerJoinSubmit(e)}>
        <FormGroup>
          <FormLabel>
            {t('register.form_email')}
            *
          </FormLabel>
          <InputField
            block
            name='email'
            value={registerData.email}
            autoComplete='email'
            readOnly={validateLoading}
            isValid={getFieldErrors('email').length === 0 && registerData.email.length > 0}
            data-validate='["email", "required"]'
            onChange={(e) => validateOnChange('email', e.target.value, e)}
            errors={getFieldErrors('email')}
            placeholder=''
          />
        </FormGroup>

        <input type='text' name='email' className='d-none' />

        <div className='register_v1_submit'>
          <Button
            className='registerBtn'
            style={{ maxWidth: '355px' }}
            type='submit'
            block
            size='lg'
            isLoading={validateLoading}
            color='primary'
          >
            {t('register.form_next')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default connect(
  null,
  { setAppSettingAction, setUserDataAction },
)(JoinEmailStep);
