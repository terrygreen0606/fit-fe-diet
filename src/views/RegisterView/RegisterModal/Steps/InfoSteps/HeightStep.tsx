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
import CustomSwitch from 'components/common/Forms/CustomSwitch';
import FormGroup from 'components/common/Forms/FormGroup';
import FormLabel from 'components/common/Forms/FormLabel';
import InputField from 'components/common/Forms/InputField';
import FormInvalidMessage from 'components/common/Forms/FormInvalidMessage';
import FormValidator from 'utils/FormValidator';

import '../../RegisterModal.sass';

import { ReactComponent as AngleLeftIcon } from 'assets/img/icons/angle-left-icon.svg';

const HeightStep = (props: any) => {
  const { registerData } = props;

  const t = (code: string) => getTranslate(props.localePhrases, code);

  const [validateLoading, setValidateLoading] = useState(false);

  useEffect(() => {
    let currStepTitles = [...props.stepTitlesDefault];
    currStepTitles[0] = t('register.age_step');
    currStepTitles[1] = t('register.height_step');
    currStepTitles[2] = t('register.weight_step');

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

    const { errors, hasError } = FormValidator.bulkValidate(inputs);

    props.setRegisterDataErrors([...errors]);

    if (!hasError) {
      setValidateLoading(true);

      const {
        height,
        measurement
      } = registerData;

      userValidate({
        height,
        measurement
      })
        .then(response => {
          setValidateLoading(false);
          props.setRegisterView('INFO_WEIGHT');
        })
        .catch(error => {
          setValidateLoading(false);

          toast.error(t('register.error_msg'));

          if (error.response.status >= 400 && error.response.status < 500) {
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
          onClick={e => props.setRegisterView('INFO_AGE')}
        />
        {t('register.height_step_title')}
      </h6>

      <div className="text-center mt-5 pt-md-5">
        <CustomSwitch
          label1={t('common.us_metric')}
          label2={t('common.metric')}
          checked={props.registerData.measurement === 'si'}
          onChange={e => props.setRegisterData({
            ...props.registerData,
            measurement: e.target.checked ? 'si' : 'us'
          })}
        />
      </div>

      <form className="register_info_form mt-4 pt-md-5" onSubmit={(e) => registerInfoSubmit(e)}>
        <FormGroup className="register_info_fg mb-0" inline>
          <InputField
            block
            height="md"
            type={registerData.measurement === 'us' ? 'text' : "number"}
            min={0}
            autoFocus 
            value={registerData.height}
            name="height"
            data-param="50,250"
            data-validate={`["required"${
              registerData.measurement === 'si' ? ', "min-max"' : ''
            }]`}
            invalid={getFieldErrors('height').length > 0}
            onChange={(e) => validateOnChange('height', e.target.value, e)}
            placeholder=""
          />
          <FormLabel>
            {registerData.measurement === 'us' && t('common.ft_label')}
            {registerData.measurement === 'si' && t('common.cm_label')}
          </FormLabel>
        </FormGroup>

        {getFieldErrors('height').slice(0, 1).map((error, i) => (
          <FormInvalidMessage key={i}>{error.message}</FormInvalidMessage>
        ))}

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

export default HeightStep;