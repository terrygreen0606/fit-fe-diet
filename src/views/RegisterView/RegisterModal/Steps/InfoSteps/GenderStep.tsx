import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
  getTranslate,
} from 'utils';
import { toast } from 'react-toastify';
import { userValidate } from 'api';

// Components
import Button from 'components/common/Forms/Button';
import FormGroup from 'components/common/Forms/FormGroup';
import FormLabel from 'components/common/Forms/FormLabel';
import InputField from 'components/common/Forms/InputField';
import CustomRadio from 'components/common/Forms/CustomRadio';
import FormInvalidMessage from 'components/common/Forms/FormInvalidMessage';
import FormValidator from 'utils/FormValidator';

import '../../RegisterModal.sass';

import { ReactComponent as MaleIcon } from 'assets/img/icons/male-icon.svg';
import { ReactComponent as FemaleIcon } from 'assets/img/icons/female-icon.svg';
import { ReactComponent as AngleLeftIcon } from 'assets/img/icons/angle-left-icon.svg';

const GenderStep = (props: any) => {
  const { registerData } = props;

  const t = (code: string) => getTranslate(props.localePhrases, code);

  const [validateLoading, setValidateLoading] = useState(false);

  useEffect(() => {
    let currStepTitles = [...props.stepTitlesDefault];
    currStepTitles[1] = t('register.gender_step');
    currStepTitles[2] = t('register.not_eating_step');

    props.setStepTitles([...currStepTitles]);

    return () => {
      props.setStepTitles([...props.stepTitlesDefault]);
    };
  }, []);

  const validateOnChange = (name: string, value: any, event, element?) => {
    validateFieldOnChange(
      name,
      value,
      event,
      registerData,
      props.setRegisterData,
      props.registerDataErrors,
      props.setRegisterDataErrors,
      element
    );
  };

  const getFieldErrors = (field: string) =>
    getFieldErrorsUtil(field, props.registerDataErrors)
      .map(msg => ({
        ...msg,
        message: t('api.ecode.invalid_value')
      }));

  const registerInfoSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const inputs = [...form.elements].filter((i) =>
      ['INPUT', 'SELECT', 'TEXTAREA'].includes(i.nodeName)
    );

    let { errors, hasError } = FormValidator.bulkValidate(inputs);

    if (!registerData.gender) {
      errors.push({
        field: 'gender',
        message: t('api.ecode.invalid_value')
      });

      hasError = true;
    }

    props.setRegisterDataErrors([...errors]);

    if (!hasError) {
      setValidateLoading(true);

      const {
        gender,
      } = registerData;

      userValidate({
        gender,
      })
        .then(response => {
          setValidateLoading(false);
          props.setRegisterView('INFO_AGE');
        })
        .catch(error => {
          setValidateLoading(false);

          toast.error(t('register.error_msg'));

          if (error.response && error.response.status >= 400 && error.response.status < 500) {
            try {
              const validateErrors = JSON.parse(error.response.data.message);

              let registerDataErrorsTemp = [...props.registerDataErrors];

              Object.keys(validateErrors).map(field => {
                registerDataErrorsTemp.push({
                  field,
                  message: validateErrors[field]
                })
              })

              props.setRegisterDataErrors(registerDataErrorsTemp);
            } catch {
              
            }
          }
        });
    }
  };

  return (
    <div className="register_info">
      <h6 className="register_title mb-xl-5 mb-45">
        <AngleLeftIcon
          className="register-back-icon mr-3"
          onClick={e => props.setRegisterView('GOAL')}
        />
        {t('register.gender_step_title')}
      </h6>

      <form className="register_info_form" onSubmit={(e) => registerInfoSubmit(e)}>
        <FormGroup inline className="mb-5">
          <CustomRadio
            name='gender'
            className="register_gender_radio mr-md-5 pr-md-4"
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
            invalid={getFieldErrors('gender').length > 0}
            inline
            onChange={e => validateOnChange('gender', e.target.value, e)}
          />

          <CustomRadio
            name='gender'
            className="register_gender_radio"
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
            invalid={getFieldErrors('gender').length > 0}
            inline
            onChange={e => validateOnChange('gender', e.target.value, e)}
          />
        </FormGroup>

        <div className="register_info_form_submit">
          <Button
            style={{ width: '217px' }}
            color="primary"
            type="submit"
            size="lg"
            isLoading={validateLoading}
          >
            {t('register.form_next')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default GenderStep;
