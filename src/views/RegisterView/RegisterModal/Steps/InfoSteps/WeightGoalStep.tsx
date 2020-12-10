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
import FormValidatorUtil from 'utils/FormValidator';

import '../../RegisterModal.sass';

import { ReactComponent as AngleLeftIcon } from 'assets/img/icons/angle-left-icon.svg';

const WeightGoalStep = ({
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
  const [isShowValidateErrors, setShowValidateErrors] = useState<boolean>(false);

  useEffect(() => {
    const currStepTitles = [...stepTitlesDefault];
    currStepTitles[0] = t('register.weight_step');
    currStepTitles[1] = t('register.weight_goal_step');
    currStepTitles[2] = t('register.not_eating_step');

    setStepTitles([...currStepTitles]);

    return () => {
      setStepTitles([...stepTitlesDefault]);
    };
  }, []);

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
        weight_goal,
        measurement,
      } = registerData;

      userValidate({
        weight_goal,
        measurement,
      })
        .then(({ data }) => {
          if (data.success) {
            setRegisterView('NOT_EATING');
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
    <div className='register_info'>
      <h3 className='register_title mb-xl-5 mb-45'>
        <AngleLeftIcon
          className='register-back-icon mr-3'
          onClick={() => setRegisterView('INFO_WEIGHT')}
        />
        {t('register.weight_goal_step_title')}
      </h3>

      <form className='register_info_form' onSubmit={(e) => registerInfoSubmit(e)}>
        <FormGroup className='register_info_fg mb-0' inline>
          <InputField
            block
            height='md'
            type={registerData.measurement === 'us' ? 'text' : 'number'}
            autoFocus
            step='0.1'
            value={registerData.weight_goal}
            data-param='30,400'
            data-validate={`["required"${
              registerData.measurement === 'si' ? ', "min-max"' : ''
            }]`}
            name='weight_goal'
            invalid={getFieldErrors('weight_goal').length > 0}
            isValid={isFieldValid('weight_goal')}
            onChange={(e) => validateOnChange('weight_goal', e.target.value, e)}
            placeholder={t('register.weight_goal.placeholder')}
          />
          <FormLabel>
            {registerData.measurement === 'us' && t('common.lbs_label')}
            {registerData.measurement === 'si' && t('common.kg_label')}
          </FormLabel>
        </FormGroup>

        {getFieldErrors('weight_goal').slice(0, 1).map((error, i) => (
          <FormInvalidMessage key={i}>{error.message}</FormInvalidMessage>
        ))}

        <div className='register_info_form_submit'>
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

export default WeightGoalStep;
