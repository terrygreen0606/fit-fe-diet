import React, { useState } from 'react';
import classNames from 'classnames';
import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
  getTranslate,
} from 'utils';

// Components
import CustomRadio from 'components/common/Forms/CustomRadio';
import FormGroup from 'components/common/Forms/FormGroup';
import FormLabel from 'components/common/Forms/FormLabel';
import InputField from 'components/common/Forms/InputField';
import Button from 'components/common/Forms/Button';
import FormValidator from 'utils/FormValidator';

import '../RegisterModal.sass';

import { ReactComponent as MaleIcon } from 'assets/img/icons/male-icon.svg';
import { ReactComponent as FemaleIcon } from 'assets/img/icons/female-icon.svg';

const InfoStep = (props: any) => {
  const { registerData } = props;
  const [registerInfoErrors, setRegisterInfoErrors] = useState([]);

  const [registerInfoLoading, setRegisterInfoLoading] = useState(false);

  const validateOnChange = (name: string, value: any, event, element?) => {
    validateFieldOnChange(
      name,
      value,
      event,
      registerData,
      props.setRegisterData,
      registerInfoErrors,
      setRegisterInfoErrors,
      element
    );
  };

  const getFieldErrors = (field: string) =>
    getFieldErrorsUtil(field, registerInfoErrors);

  const t = (code: string) => getTranslate(props.localePhrases, code);

  const registerInfoSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const inputs = [...form.elements].filter((i) =>
      ['INPUT', 'SELECT', 'TEXTAREA'].includes(i.nodeName)
    );

    const { errors, hasError } = FormValidator.bulkValidate(inputs);

    setRegisterInfoErrors([...errors]);

    if (!hasError) {
      setRegisterInfoLoading(true);

      setTimeout(() => {
        setRegisterInfoLoading(false);
        props.setRegisterStep('JOIN');
      }, 400);
    }
  };

  return (
    <div className='register_info'>
      <h6 className='register_title mb-5'>{t('register.fill_details_text')}</h6>

      <div style={{ height: '50px' }} />

      <form
        className='register_info_form'
        onSubmit={(e) => registerInfoSubmit(e)}
      >
        <FormGroup inline>
          <FormLabel>{t('register.form_sex')}</FormLabel>

          <CustomRadio
            name='register_sex'
            label={
              <>
                <MaleIcon
                  className={classNames('genderIcon', {
                    genderIcon_active: props.registerData.gender === 'm',
                  })}
                />

                {t('register.form_male')}
              </>
            }
            value='m'
            checked={registerData.gender === 'm'}
            inline
            onChange={(e) =>
              props.setRegisterData({
                ...registerData,
                gender: e.target.value,
              })
            }
          />

          <CustomRadio
            name='register_sex'
            label={
              <>
                <FemaleIcon
                  className={classNames('genderIcon', {
                    genderIcon_active: props.registerData.gender === 'f',
                  })}
                />

                {t('register.form_female')}
              </>
            }
            value='f'
            checked={registerData.gender === 'f'}
            inline
            onChange={(e) =>
              props.setRegisterData({
                ...registerData,
                gender: e.target.value,
              })
            }
          />
        </FormGroup>

        <FormGroup inline>
          <FormLabel>{t('register.form_age')}</FormLabel>
          <InputField
            block
            type='number'
            min={1}
            name='age'
            value={registerData.age}
            data-validate='["required"]'
            onChange={(e) => validateOnChange('age', e.target.value, e)}
            errors={getFieldErrors('age')}
            placeholder=''
          />
        </FormGroup>

        <FormGroup inline>
          <FormLabel>{t('register.form_height')}</FormLabel>
          <InputField
            block
            type='number'
            value={registerData.height}
            name='height'
            data-param='50,250'
            data-validate='["required", "min-max"]'
            onChange={(e) => validateOnChange('height', e.target.value, e)}
            errors={getFieldErrors('height')}
            placeholder=''
          />
        </FormGroup>

        <FormGroup inline>
          <FormLabel>{t('register.form_weight')}</FormLabel>
          <InputField
            block
            type='number'
            value={registerData.weight}
            data-param='30,400'
            data-validate='["required", "min-max"]'
            name='weight'
            onChange={(e) => validateOnChange('weight', e.target.value, e)}
            errors={getFieldErrors('weight')}
            placeholder=''
          />
        </FormGroup>

        <div className='text-center mt-5'>
          <Button
            style={{ width: '217px' }}
            outline
            color='secondary'
            size='lg'
            onClick={() => props.setRegisterStep('GOAL')}
          >
            {t('register.form_back')}
          </Button>

          <Button
            style={{ width: '217px' }}
            color='primary'
            type='submit'
            className='ml-3'
            size='lg'
            isLoading={registerInfoLoading}
          >
            {t('register.form_next')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default InfoStep;
