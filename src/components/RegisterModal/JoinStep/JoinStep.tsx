import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
  getTranslate
} from 'utils';
import axios from 'utils/axios';
import { toast } from 'react-toastify';
import { userSignup } from 'api';
import { userLogin } from 'store/actions';

// Components
import CustomCheckbox from 'components/common/Forms/CustomCheckbox';
import FormGroup from 'components/common/Forms/FormGroup';
import FormLabel from 'components/common/Forms/FormLabel';
import InputField from 'components/common/Forms/InputField';
import Button from 'components/common/Forms/Button';
import FormValidator from 'utils/FormValidator';

import '../RegisterModal.sass';

const JoinStep = (props: any) => {

  const [registerJoinErrors, setRegisterJoinErrors] = useState([]);

  const [registerJoinLoading, setRegisterJoinLoading] = useState(false);
  const [appRulesAccepted, setAppRulesAccepted] = useState(null);

  const validateOnChange = (name: string, value: any, event, element?) => {
    validateFieldOnChange(
      name,
      value,
      event,
      props.registerData,
      props.setRegisterData,
      registerJoinErrors,
      setRegisterJoinErrors,
      element
    );
  };

  const getFieldErrors = (field: string) => getFieldErrorsUtil(field, registerJoinErrors);

  const t = (code: string) => getTranslate(props.localePhrases, code);

  const userClientLogin = (authToken: string) => {
    localStorage.setItem('authToken', authToken);
    axios.defaults.headers.common.Authorization = `Bearer ${authToken}`;
    props.userLogin(authToken);
  };

  const registerJoinSubmit = e => {
    e.preventDefault();

    const form = e.target;
    const inputs = [...form.elements].filter(i => ['INPUT', 'SELECT', 'TEXTAREA'].includes(i.nodeName));

    const { errors, hasError } = FormValidator.bulkValidate(inputs);

    setRegisterJoinErrors([...errors]);

    if (!appRulesAccepted) {
      setAppRulesAccepted(false);
    }

    if (!hasError && appRulesAccepted) {
      setRegisterJoinLoading(true);

      userSignup({
        ...props.registerData,
        weight: props.registerData.weight ? props.registerData.weight * 1000 : props.registerData.weight,
        height: props.registerData.height ? props.registerData.height * 10 : props.registerData.height,
        weight_goal: props.registerData.weight_goal ? props.registerData.weight_goal * 1000 : props.registerData.weight_goal,
      }).then(response => {
        setRegisterJoinLoading(false);

        const token = response.data && response.data.access_token ? response.data.access_token : null;

        if (token) {
          userClientLogin(token);
          props.modalClose();
        } else {
          toast.error('Error while registering user');
        }
      }).catch(error => {
        setRegisterJoinLoading(false);
        toast.error('Error while registering user');
      });
    }
  };

  return (
    <div className="register_join">
      <h6 className="register_title mb-5">{t('register.plan_is_ready_text')}</h6>

      <CustomCheckbox 
        invalid={appRulesAccepted === false} 
        label={t('register.read_terms')}
        onChange={e => setAppRulesAccepted(e.target.checked)}
      />

      <div className="register_join_or">
        <span className="register_join_or_txt">{t('register.form_or')}</span>
      </div>
      
      <form className="register_join_form" onSubmit={e => registerJoinSubmit(e)}>
        <FormGroup inline>
          <FormLabel>{t('register.form_name')}*</FormLabel>
          <InputField 
            block 
            name="name"
            value={props.registerData.name}
            data-validate='["required"]'
            onChange={e => validateOnChange('name', e.target.value, e)}
            errors={getFieldErrors('name')}
            placeholder=""
          />
        </FormGroup>

        <FormGroup inline>
          <FormLabel>{t('register.form_surname')}*</FormLabel>
          <InputField 
            block 
            name="surname"
            value={props.registerData.surname}
            data-validate='["required"]'
            onChange={e => validateOnChange('surname', e.target.value, e)}
            errors={getFieldErrors('surname')}
            placeholder=""
          />
        </FormGroup>

        <FormGroup inline>
          <FormLabel>{t('register.form_email')}*</FormLabel>
          <InputField 
            block 
            name="email"
            value={props.registerData.email}
            data-validate='["required", "email"]'
            onChange={e => validateOnChange('email', e.target.value, e)}
            errors={getFieldErrors('email')}
            placeholder=""
          />
        </FormGroup>

        <FormGroup inline>
          <FormLabel>{t('register.form_phone')}*</FormLabel>
          <InputField 
            block 
            name="phone"
            value={props.registerData.phone}
            data-validate='["required", "number"]'
            onChange={e => validateOnChange('phone', e.target.value, e)}
            errors={getFieldErrors('phone')}
            placeholder=""
          />
        </FormGroup>

        <FormGroup inline>
          <FormLabel>{t('register.form_password')}</FormLabel>
          <InputField 
            block 
            name="password"
            type="password"
            value={props.registerData.password}
            data-validate='["required"]'
            onChange={e => validateOnChange('password', e.target.value, e)}
            errors={getFieldErrors('password')}
            placeholder=""
          />
        </FormGroup>

        <div className="text-center mt-5">
          <Button 
            className="registerBtn"
            type="submit" 
            block 
            size="lg"
            color="primary"
            isLoading={registerJoinLoading}
          >
            {t('register.form_submit')}
          </Button>

          <Button 
            outline 
            color="secondary" 
            size="lg"
            onClick={() => props.setRegisterStep('INFO')}
            className="mt-4"
            style={{ width: '217px' }}
          >
            {t('register.form_back')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default connect(
  null,
  { userLogin }
)(JoinStep);
