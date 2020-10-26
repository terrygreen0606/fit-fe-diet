import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
  getTranslate,
} from 'utils';
import { toast } from 'react-toastify';
import { InputError } from 'types';
import { userValidate } from 'api';

// Components
import CustomSwitch from 'components/common/Forms/CustomSwitch';
import FormGroup from 'components/common/Forms/FormGroup';
import FormLabel from 'components/common/Forms/FormLabel';
import InputField from 'components/common/Forms/InputField';
import Button from 'components/common/Forms/Button';
import FormValidator from 'utils/FormValidator';
import FormInvalidMessage from 'components/common/Forms/FormInvalidMessage';

import '../RegisterV2Tpl.sass';

const WeightGoal = ({
  registerData,
  setRegisterData,
  registerDataErrors,
  setRegisterDataErrors,
  setRegisterView,
  localePhrases,
}: any) => {
  const t = (code: string) => getTranslate(localePhrases, code);

  const [validateLoading, setValidateLoading] = useState<boolean>(false);

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
      .map(msg => ({
        ...msg,
        message: t('api.ecode.invalid_value')
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
        measurement,
        weight_goal,
      } = registerData;

      userValidate({
        measurement,
        weight_goal,
      })
        .then((response) => {
          setValidateLoading(false);
          setRegisterView('PLAN_PROGRESS');
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
      <h3 className='register_v2tpl_title mb-5'>{t('register.v2.weight_goal_step_title')}</h3>

      <form className='mt-5 pt-4' onSubmit={(e) => registerInfoSubmit(e)}>
        <div className='row'>
          <div className='col-8 offset-3 col-xs-7 offset-xs-4 col-md-4 offset-md-5 pl-md-2'>

            <div>
              <FormGroup className='register_v2tpl_fg_inline mb-0' inline>
                <InputField
                  block
                  height='md'
                  type='number'
                  value={registerData.weight_goal}
                  data-param='30,400'
                  data-validate='["required", "min-max"]'
                  name='weight_goal'
                  autoFocus
                  onChange={(e) => validateOnChange('weight_goal', e.target.value, e)}
                  invalid={getFieldErrors('weight_goal').length > 0}
                  placeholder=''
                />
                <FormLabel>{t('common.kg_label')}</FormLabel>
              </FormGroup>

              {getFieldErrors('weight_goal').slice(0, 1).map((error, i) => (
                <FormInvalidMessage key={i} className='text-left'>{error.message}</FormInvalidMessage>
              ))}
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

export default WeightGoal;