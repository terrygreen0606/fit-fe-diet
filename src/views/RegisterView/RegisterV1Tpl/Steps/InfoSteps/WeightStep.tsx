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
import FormValidatorUtil from 'utils/FormValidator';

import '../../RegisterV1Tpl.sass';

import { ReactComponent as AngleLeftIcon } from 'assets/img/icons/angle-left-icon.svg';

const WeightStep = ({
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
  const [isShowValidateErrors, setShowValidateErrors] = useState<boolean>(false);

  const FormValidator = FormValidatorUtil(localePhrases);

  const validateOnChange = (name: string, value: any, event, element?) => {
    validateFieldOnChange(
      name,
      value,
      event,
      registerData,
      setRegisterData,
      registerDataErrors,
      setRegisterDataErrors,
      localePhrases,
      element,
    );
  };

  const getFieldErrors = (field: string) => (isShowValidateErrors
    ? getFieldErrorsUtil(field, registerDataErrors)
    : []);

  const isFieldValid = (field: string) =>
    getFieldErrorsUtil(field, registerDataErrors).length === 0 &&
      registerData[field] &&
      registerData[field].length > 0;

  const registerInfoSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const inputs = [...form.elements].filter((i) => ['INPUT', 'SELECT', 'TEXTAREA'].includes(i.nodeName));

    const { errors, hasError } = FormValidator.bulkValidate(inputs);

    setRegisterDataErrors([...errors]);

    if (!isShowValidateErrors) {
      setShowValidateErrors(true);
    }

    if (!hasError) {
      setValidateLoading(true);

      const {
        weight,
        measurement,
      } = registerData;

      userValidate({
        weight,
        measurement,
      })
        .then(({ data }) => {
          if (data.success) {
            setRegisterView('INFO_WEIGHT_GOAL');
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
        onClick={() => setRegisterView('INFO_HEIGHT')}
      />

      <h3 className='register_v1_title'>
        {t('register.weight_step_title')}
      </h3>

      <form className='register_v1_form' onSubmit={(e) => registerInfoSubmit(e)}>
        <FormGroup className='register_info_fg mb-0' inline>
          <InputField
            block
            height='md'
            type={registerData.measurement === 'us' ? 'text' : 'number'}
            autoFocus
            value={registerData.weight}
            readOnly={validateLoading}
            data-param='30,400'
            step='0.1'
            data-validate={`["required"${
              registerData.measurement === 'si' ? ', "min-max"' : ''
            }]`}
            name='weight'
            invalid={getFieldErrors('weight').length > 0}
            isValid={isFieldValid('weight')}
            onChange={(e) => validateOnChange('weight', e.target.value, e)}
            placeholder={t('register.weight.placeholder')}
          />
          <FormLabel>
            {registerData.measurement === 'us' && t('common.lbs_label')}
            {registerData.measurement === 'si' && t('common.kg_label')}
          </FormLabel>
        </FormGroup>

        {getFieldErrors('weight').slice(0, 1).map((error, i) => (
          <FormInvalidMessage key={i}>{error.message}</FormInvalidMessage>
        ))}

        <div className='register_v1_submit'>
          <Button
            style={{ minWidth: '217px' }}
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

export default WeightStep;
