import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
  getTranslate,
} from 'utils';
import { InputError } from 'types';
import { userValidate } from 'api';
import { toast } from 'react-toastify';

// Components
import CustomSwitch from 'components/common/Forms/CustomSwitch';
import FormGroup from 'components/common/Forms/FormGroup';
import FormLabel from 'components/common/Forms/FormLabel';
import InputField from 'components/common/Forms/InputField';
import Button from 'components/common/Forms/Button';
import FormValidator from 'utils/FormValidator';
import FormInvalidMessage from 'components/common/Forms/FormInvalidMessage';

import '../RegisterV2Tpl.sass';

const HeightWeight = ({
  registerData,
  setRegisterData,
  registerDataErrors,
  setRegisterDataErrors,
  setRegisterView,
  localePhrases,
}: any) => {
  const [validateLoading, setValidateLoading] = useState<boolean>(false);

  const t = (code: string) => getTranslate(localePhrases, code);

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
        measurement,
        height,
        weight,
      } = registerData;

      userValidate({
        measurement,
        height,
        weight,
      })
        .then((response) => {
          setValidateLoading(false);
          setRegisterView('WEIGHT_GOAL');
        })
        .catch(({ response }) => {
          setValidateLoading(false);

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
        });
    }
  };

  return (
    <>
      <h1 className='register_v2_title mb-5'>{t('register.v2.height_weight.title')}</h1>

      <CustomSwitch
        label1={t('common.us_metric')}
        label2={t('common.metric')}
        checked={registerData.measurement === 'si'}
        onChange={(e) => setRegisterData({
          ...registerData,
          measurement: e.target.checked ? 'si' : 'us',
        })}
      />

      <form className='mt-5 pt-4' onSubmit={(e) => registerInfoSubmit(e)}>
        <div className='row'>
          <div className='col-8 offset-3 col-xs-7 offset-xs-4 col-md-4 offset-md-5 pl-md-2'>

            <div className='mb-4'>
              <FormGroup className='register_v2_fg_inline mb-0' inline>
                <InputField
                  block
                  height='md'
                  type='number'
                  value={registerData.height}
                  name='height'
                  autoFocus
                  min={50}
                  max={250}
                  readOnly={validateLoading}
                  data-param='50,250'
                  data-validate='["required", "min-max"]'
                  onChange={(e) => validateOnChange('height', e.target.value, e)}
                  invalid={getFieldErrors('height').length > 0}
                  placeholder=''
                />
                <FormLabel>{t('common.cm_label')}</FormLabel>
              </FormGroup>

              {getFieldErrors('height').slice(0, 1).map((error, i) => (
                <FormInvalidMessage key={i} className='text-left'>{error.message}</FormInvalidMessage>
              ))}
            </div>

            <div>
              <FormGroup className='register_v2_fg_inline mb-0' inline>
                <InputField
                  block
                  height='md'
                  type='number'
                  value={registerData.weight}
                  min={30}
                  max={400}
                  readOnly={validateLoading}
                  data-param='30,400'
                  data-validate='["required", "min-max"]'
                  name='weight'
                  onChange={(e) => validateOnChange('weight', e.target.value, e)}
                  invalid={getFieldErrors('weight').length > 0}
                  placeholder=''
                />
                <FormLabel>{t('common.kg_label')}</FormLabel>
              </FormGroup>

              {getFieldErrors('weight').slice(0, 1).map((error, i) => (
                <FormInvalidMessage key={i} className='text-left'>{error.message}</FormInvalidMessage>
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

export default HeightWeight;
