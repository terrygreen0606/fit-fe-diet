import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
  getTranslate,
} from 'utils';
import { InputError } from 'types';
import { toast } from 'react-toastify';
import { userValidate } from 'api';

// Components
import CustomRadio from 'components/common/Forms/CustomRadio';
import CustomSwitch from 'components/common/Forms/CustomSwitch';
import FormGroup from 'components/common/Forms/FormGroup';
import FormLabel from 'components/common/Forms/FormLabel';
import InputField from 'components/common/Forms/InputField';
import Button from 'components/common/Forms/Button';
import FormValidator from 'utils/FormValidator';
import FormInvalidMessage from 'components/common/Forms/FormInvalidMessage';

import '../RegisterModal.sass';

import { ReactComponent as MaleIcon } from 'assets/img/icons/male-icon.svg';
import { ReactComponent as FemaleIcon } from 'assets/img/icons/female-icon.svg';
import { ReactComponent as AngleLeftIcon } from 'assets/img/icons/angle-left-icon.svg';

const InfoStep = ({
  registerData,
  setRegisterData,
  registerDataErrors,
  setRegisterDataErrors,
  stepTitlesDefault,
  setStepTitles,
  localePhrases,
}: any) => {
  const [weightPredictionLoading, setWeightPredictionLoading] = useState(false);

  const t = (code: string) => getTranslate(localePhrases, code);

  useEffect(() => {
    const currStepTitles = [...stepTitlesDefault];
    currStepTitles[2] = t('register.not_eating_step');

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

  const registerInfoSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const inputs = [...form.elements].filter((i) => ['INPUT', 'SELECT', 'TEXTAREA'].includes(i.nodeName));

    const { errors, hasError } = FormValidator.bulkValidate(inputs);

    setRegisterDataErrors([...errors]);

    if (!hasError) {
      setWeightPredictionLoading(true);

      const {
        age,
        height,
        weight,
        weight_goal,
      } = registerData;

      userValidate({
        age,
        height,
        weight,
        weight_goal,
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
            } catch {

            }
          }
        })
        .finally(() => {
          setWeightPredictionLoading(false);
        });
    }
  };

  return (
    <div className='register_info'>
      <h6 className='register_title mb-xl-5 mb-45'>
        <AngleLeftIcon
          className='register-back-icon mr-3'
          onClick={() => props.setRegisterView('GOAL')}
        />
        {t('register.fill_details_text')}
      </h6>

      <div className='text-center'>
        <CustomSwitch
          label1={t('common.us_metric')}
          label2={t('common.metric')}
          checked={registerData.measurement === 'si'}
          onChange={(e) => props.setRegisterData({
            ...props.registerData,
            measurement: e.target.checked ? 'si' : 'us',
          })}
        />
      </div>

      <form className='register_info_form mt-5' onSubmit={(e) => registerInfoSubmit(e)}>
        <FormGroup inline className='mb-5'>
          <FormLabel>{t('register.form_sex')}</FormLabel>

          <CustomRadio
            name='register_sex'
            label={
              <>
                <MaleIcon
                  className={classNames('genderIcon', {
                    genderIcon_active: registerData.gender === 'm',
                  })}
                />

                {t('register.form_male')}
              </>
            }
            value='m'
            checked={registerData.gender === 'm'}
            inline
            onChange={(e) => setRegisterData({
              ...registerData,
              gender: e.target.value,
            })}
          />

          <CustomRadio
            name='register_sex'
            label={
              <>
                <FemaleIcon
                  className={classNames('genderIcon', {
                    genderIcon_active: registerData.gender === 'f',
                  })}
                />

                {t('register.form_female')}
              </>
            }
            value='f'
            checked={registerData.gender === 'f'}
            inline
            onChange={(e) => setRegisterData({
              ...registerData,
              gender: e.target.value,
            })}
          />
        </FormGroup>

        <div className='row'>
          <div className='col-sm-6 mb-45'>

            <FormGroup className='register_info_fg_age mb-0' inline>
              <FormLabel>{t('register.form_age')}</FormLabel>
              <InputField
                block
                height='md'
                type='number'
                min={12}
                max={100}
                data-param='12,100'
                name='age'
                value={registerData.age}
                data-validate='["required", "min-max"]'
                onChange={(e) => validateOnChange('age', e.target.value, e)}
                invalid={getFieldErrors('age').length > 0}
                placeholder=''
              />
              <FormLabel>{t('common.age_yo')}</FormLabel>
            </FormGroup>

            {getFieldErrors('age').slice(0, 1).map((error, i) => (
              <FormInvalidMessage key={i} className='text-center'>{error.message}</FormInvalidMessage>
            ))}

          </div>
          <div className='col-sm-6 mb-45'>

            <FormGroup className='register_info_fg_height mb-0' inline>
              <FormLabel>{t('register.form_height')}</FormLabel>
              <InputField
                block
                height='md'
                type='number'
                value={registerData.height}
                name='height'
                data-param='50,250'
                data-validate='["required", "min-max"]'
                onChange={(e) => validateOnChange('height', e.target.value, e)}
                invalid={getFieldErrors('height').length > 0}
                placeholder=''
              />
              <FormLabel>
                {registerData.measurement === 'us' && t('common.ft_label')}
                {registerData.measurement === 'si' && t('common.cm_label')}
              </FormLabel>
            </FormGroup>

            {getFieldErrors('height').slice(0, 1).map((error, i) => (
              <FormInvalidMessage key={i} className='text-center'>{error.message}</FormInvalidMessage>
            ))}

          </div>
          <div
            className={classNames({
              'col-sm-6 offset-sm-3 mb-45': registerData.goal === 0,
              'col-sm-6 mb-45': registerData.goal !== 0,
            })}
          >

            <FormGroup className='register_info_fg_weight mb-0' inline>
              <FormLabel>{t('register.form_weight_now')}</FormLabel>
              <InputField
                block
                height='md'
                type='number'
                value={registerData.weight}
                data-param='30,400'
                data-validate='["required", "min-max"]'
                name='weight'
                onChange={(e) => validateOnChange('weight', e.target.value, e)}
                invalid={getFieldErrors('weight').length > 0}
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

          </div>
          {registerData.goal !== 0 && (
            <div className='col-sm-6 mb-45'>

              <FormGroup className='register_info_fg_weight mb-0' inline>
                <FormLabel>{t('register.form_weight_want')}</FormLabel>
                <InputField
                  block
                  height='md'
                  type='number'
                  value={registerData.weight_goal}
                  data-param='30,400'
                  data-validate='["required", "min-max"]'
                  name='weight_goal'
                  onChange={(e) => validateOnChange('weight_goal', e.target.value, e)}
                  invalid={getFieldErrors('weight_goal').length > 0}
                  placeholder=''
                />
                <FormLabel>
                  {registerData.measurement === 'us' && t('common.lbs_label')}
                  {registerData.measurement === 'si' && t('common.kg_label')}
                </FormLabel>
              </FormGroup>

              {getFieldErrors('weight_goal').slice(0, 1).map((error, i) => (
                <FormInvalidMessage key={i}>{error.message}</FormInvalidMessage>
              ))}

            </div>
          )}
        </div>

        <div className='text-center mt-xl-4 mt-3'>
          <Button
            style={{ width: '217px' }}
            color='primary'
            type='submit'
            size='lg'
            isLoading={weightPredictionLoading}
          >
            {t('register.form_next')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default InfoStep;
