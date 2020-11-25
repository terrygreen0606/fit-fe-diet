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
        .then(({ data }) => {
          if (data.success) {
            setValidateLoading(false);
            setRegisterView('DAY_MEALPLAN');
          } else {
            toast.error(t('register.error_msg'));
          }
        })
        .catch(({ response }) => {
          toast.error(t('register.error_msg'));

          if (response && response.status >= 400 && response.status < 500) {
            const validateErrors = response.data.message;

            if (typeof validateErrors !== 'object') {
              return false;
            }

            const registerDataErrorsTemp: InputError[] = [...registerDataErrors];

            Object.keys(validateErrors).map((field) => {
              registerDataErrorsTemp.push({
                field,
                message: validateErrors[field],
              });
            });

            setRegisterDataErrors(registerDataErrorsTemp);
          }
        });
    }
  };

  return (
    <>
      <h1 className='register_v2_title mb-5'>
        {t('register.age_step_title')}
      </h1>

      <form className='mt-5 pt-4' onSubmit={(e) => registerInfoSubmit(e)}>
        <div className='row'>
          <div className='col-8 offset-3 col-xs-7 offset-xs-4 col-md-4 offset-md-5 pl-md-2'>

            <div>
              <FormGroup className='register_v2_fg_inline mb-0' inline>
                <InputField
                  block
                  height='md'
                  type='number'
                  autoFocus
                  min={16}
                  max={100}
                  data-param='16,100'
                  name='age'
                  readOnly={validateLoading}
                  value={registerData.age}
                  data-validate='["required", "min-max", "integer"]'
                  invalid={getFieldErrors('age').length > 0}
                  onChange={(e) => validateOnChange('age', e.target.value, e)}
                  placeholder={t('register.age.placeholder')}
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
          className='register_v2_btn mt-5'
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
