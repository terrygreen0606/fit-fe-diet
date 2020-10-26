import React, { useState, useEffect } from 'react';
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

import '../../RegisterModal.sass';

import { ReactComponent as AngleLeftIcon } from 'assets/img/icons/angle-left-icon.svg';

const WeightStep = ({
  registerData,
  setRegisterData,
  registerDataErrors,
  setRegisterDataErrors,
  setRegisterView,
  stepTitlesDefault,
  setStepTitles,
  localePhrases,
}: any) => {
  const t = (code: string) => getTranslate(localePhrases, code);

  const [validateLoading, setValidateLoading] = useState(false);

  useEffect(() => {
    const currStepTitles = [...stepTitlesDefault];
    currStepTitles[0] = t('register.height_step');
    currStepTitles[1] = t('register.weight_step');
    currStepTitles[2] = t('register.weight_goal_step');

    setStepTitles([...currStepTitles]);

    return () => {
      setStepTitles([...stepTitlesDefault]);
    };
  }, []);

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
            } catch {

            }
          }
        })
        .finally(() => {
          setValidateLoading(false);
        });
    }
  };

  return (
    <div className='register_info'>
      <h6 className='register_title mb-xl-5 mb-45'>
        <AngleLeftIcon
          className='register-back-icon mr-3'
          onClick={() => setRegisterView('INFO_HEIGHT')}
        />
        {t('register.weight_step_title')}
      </h6>

      <form className='register_info_form' onSubmit={(e) => registerInfoSubmit(e)}>
        <FormGroup className='register_info_fg mb-0' inline>
          <InputField
            block
            height='md'
            type={registerData.measurement === 'us' ? 'text' : 'number'}
            min={0}
            autoFocus
            value={registerData.weight}
            data-param='30,400'
            data-validate={`["required"${
              registerData.measurement === 'si' ? ', "min-max"' : ''
            }]`}
            name='weight'
            invalid={getFieldErrors('weight').length > 0}
            isValid={isFieldValid('weight')}
            onChange={(e) => validateOnChange('weight', e.target.value, e)}
            placeholder=''
          />
          <FormLabel>
            {registerData.measurement === 'us' && t('common.lbs_label')}
            {registerData.measurement === 'si' && t('common.kg_label')}
          </FormLabel>
        </FormGroup>

        {getFieldErrors('weight').slice(0, 1).map((error, i) => (
          <FormInvalidMessage key={i}>{error.message}</FormInvalidMessage>
        ))}

        <div className='register_info_form_submit'>
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

export default WeightStep;
