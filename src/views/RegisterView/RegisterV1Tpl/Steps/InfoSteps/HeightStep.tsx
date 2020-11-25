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
import CustomSwitch from 'components/common/Forms/CustomSwitch';
import FormGroup from 'components/common/Forms/FormGroup';
import FormLabel from 'components/common/Forms/FormLabel';
import InputField from 'components/common/Forms/InputField';
import FormInvalidMessage from 'components/common/Forms/FormInvalidMessage';
import FormValidator from 'utils/FormValidator';

import '../../RegisterV1Tpl.sass';

import { ReactComponent as AngleLeftIcon } from 'assets/img/icons/angle-left-icon.svg';

const HeightStep = ({
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
        height,
        measurement,
      } = registerData;

      userValidate({
        height,
        measurement,
      })
        .then(({ data }) => {
          if (data.success) {
            setRegisterView('INFO_WEIGHT');
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
        onClick={() => setRegisterView('INFO_AGE')}
      />

      <h3 className='register_v1_title'>
        {t('register.height_step_title')}
      </h3>

      <CustomSwitch
        label1={t('common.us_metric')}
        label2={t('common.metric')}
        checked={registerData.measurement === 'si'}
        onChange={(e) => setRegisterData({
          ...registerData,
          measurement: e.target.checked ? 'si' : 'us',
        })}
      />

      <form className='register_v1_form mt-4 pt-md-5' onSubmit={(e) => registerInfoSubmit(e)}>
        <FormGroup className='register_info_fg mb-0' inline>
          <InputField
            block
            height='md'
            type={registerData.measurement === 'us' ? 'text' : 'number'}
            min={0}
            autoFocus
            value={registerData.height}
            readOnly={validateLoading}
            name='height'
            data-param='50,250'
            data-validate={`["required"${
              registerData.measurement === 'si' ? ', "min-max"' : ''
            }]`}
            invalid={getFieldErrors('height').length > 0}
            isValid={isFieldValid('height')}
            onChange={(e) => validateOnChange('height', e.target.value, e)}
            placeholder={t('register.height.placeholder')}
          />
          <FormLabel>
            {registerData.measurement === 'us' && t('common.ft_label')}
            {registerData.measurement === 'si' && t('common.cm_label')}
          </FormLabel>
        </FormGroup>

        {getFieldErrors('height').slice(0, 1).map((error, i) => (
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

export default HeightStep;
