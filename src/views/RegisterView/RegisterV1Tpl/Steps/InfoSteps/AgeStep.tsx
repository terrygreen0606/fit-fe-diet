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
import Button from 'components/common/Forms/Button';
import FormGroup from 'components/common/Forms/FormGroup';
import FormLabel from 'components/common/Forms/FormLabel';
import InputField from 'components/common/Forms/InputField';
import FormInvalidMessage from 'components/common/Forms/FormInvalidMessage';
import FormValidator from 'utils/FormValidator';

import '../../RegisterV1Tpl.sass';

import { ReactComponent as AngleLeftIcon } from 'assets/img/icons/angle-left-icon.svg';

const AgeStep = ({
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

  const isFieldValid = (field: string) =>
    getFieldErrors(field).length === 0 && registerData[field] && registerData[field].length > 0;

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
        .then(({ data }) => {
          if (data.success) {
            setRegisterView('INFO_HEIGHT');
          } else {
            toast.error(t('register.error_msg'));
          }
        })
        .catch((error) => {
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
            } catch {}
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
        onClick={() => setRegisterView('INFO_GENDER')}
      />

      <h3 className='register_v1_title'>
        {t('register.age_step_title')}
      </h3>

      <form className='register_v1_form' onSubmit={(e) => registerInfoSubmit(e)}>
        <FormGroup className='register_info_fg mb-0' inline>
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
            data-validate='["required", "min-max"]'
            invalid={getFieldErrors('age').length > 0}
            isValid={isFieldValid('age')}
            onChange={(e) => validateOnChange('age', e.target.value, e)}
            placeholder=''
          />
          <FormLabel>{t('common.age_yo')}</FormLabel>
        </FormGroup>

        {getFieldErrors('age').slice(0, 1).map((error, i) => (
          <FormInvalidMessage key={i}>{error.message}</FormInvalidMessage>
        ))}

        <div className='register_v1_submit'>
          <Button
            style={{ width: '217px' }}
            color='primary'
            type='submit'
            size='lg'
            isLoading={validateLoading}
          >
            {t('register.form_next')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AgeStep;
