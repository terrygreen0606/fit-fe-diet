import React, { useState, useEffect } from 'react';
import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
  getTranslate,
  getImagePath
} from 'utils';
import axios from 'utils/axios';
import { toast } from 'react-toastify';
import { UserAuthProfileType } from 'types/auth';
import { userSignup, userGoogleSignUp, userFacebookSignUp } from 'api';

// Components
import FormGroup from 'components/common/Forms/FormGroup';
import FormLabel from 'components/common/Forms/FormLabel';
import InputField from 'components/common/Forms/InputField';
import Button from 'components/common/Forms/Button';
import FormValidator from 'utils/FormValidator';

import '../RegisterV2Tpl.sass';

const ConfirmInfo = (props: any) => {

  const { registerData } = props;

  const t = (code: string, placeholders?: any) => 
    getTranslate(props.localePhrases, code, placeholders);

  const [registerJoinErrors, setRegisterJoinErrors] = useState([]);
  const [registerJoinLoading, setRegisterJoinLoading] = useState<boolean>(false);

  const validateOnChange = (name: string, value: any, event, element?) => {
    validateFieldOnChange(
      name,
      value,
      event,
      registerData,
      props.setRegisterData,
      registerJoinErrors,
      setRegisterJoinErrors,
      element
    );
  };

  const getFieldErrors = (field: string) =>
    getFieldErrorsUtil(field, registerJoinErrors);

  const getRegisterProfilePayload = (): UserAuthProfileType => {
    const {
      email,
      password,
      predicted_date,
      ...userProfileData
    } = props.registerData;

    return {
      ...userProfileData,
      ignore_cuisine_ids: userProfileData.ignore_cuisine_ids.map(cuisine => cuisine.id),
      diseases: userProfileData.diseases.filter(disease => disease.checked).map(disease => disease.code)
    };
  };

  const finalWelcomeStep = (authToken: string) => {
    localStorage.setItem('authToken', authToken);
    axios.defaults.headers.common.Authorization = `Bearer ${authToken}`;

    props.setRegisterData({
      ...registerData,
      token: authToken
    });

    props.setRegisterView('READY');
  };

  const registerEmail = () => {
    setRegisterJoinLoading(true);

    userSignup({
      email: props.registerData.email,
      password: props.registerData.password,
      ...getRegisterProfilePayload()
    }).then(response => {
      setRegisterJoinLoading(false);

        const token =
          response.data && response.data.access_token
            ? response.data.access_token
            : null;

        if (token) {
          finalWelcomeStep(token);
        } else {
          toast.error(t('register.error_msg'));
        }
      })
      .catch((error) => {
        setRegisterJoinLoading(false);
        toast.error(t('register.error_msg'));
      });
  };

  const registerJoinSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const inputs = [...form.elements].filter((i) =>
      ['INPUT', 'SELECT', 'TEXTAREA'].includes(i.nodeName)
    );

    const { errors, hasError } = FormValidator.bulkValidate(inputs);

    setRegisterJoinErrors([...errors]);

    if (!hasError) {
      registerEmail();
    }
  };

  return (
    <>
      <h4 className="register_title mb-xl-5 mb-45 text-center">{t('register.info_confirm_title')}</h4>

      <div className="row">
        <div className="col-xs-10 offset-xs-1 col-md-8 offset-md-2 px-md-4">
          
          <form className="text-left mt-4 px-xl-5" onSubmit={(e) => registerJoinSubmit(e)}>
            <FormGroup>
              <FormLabel>
                {t('register.form_name')}
                *
              </FormLabel>
              <InputField
                block
                name='name'
                value={registerData.name}
                data-validate='["required"]'
                onChange={(e) => validateOnChange('name', e.target.value, e)}
                errors={getFieldErrors('name')}
                placeholder=''
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>
                {t('register.form_email')}
                *
              </FormLabel>
              <InputField
                block
                name='email'
                value={registerData.email}
                data-validate='["email", "required"]'
                onChange={e => validateOnChange('email', e.target.value, e)}
                errors={getFieldErrors('email')}
                placeholder=''
              />
            </FormGroup>

            <FormGroup className="mb-0">
              <FormLabel>{t('register.form_password')}</FormLabel>
              <InputField
                block
                name='password'
                type='password'
                value={registerData.password}
                data-validate='["required"]'
                onChange={e => validateOnChange('password', e.target.value, e)}
                errors={getFieldErrors('password')}
                placeholder=''
              />
            </FormGroup>

            <div className="text-center">
              <Button
                className="register_v2tpl_btn"
                style={{ maxWidth: '355px' }}
                color="primary"
                type="submit"
                size="lg"
                block
                onClick={() => props.setRegisterView('JOIN')}
              >
                {t('button.continue')}
              </Button>
            </div>
          </form>

        </div>
      </div>
    </>
  );
};

export default ConfirmInfo;
