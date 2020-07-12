import React, { useState, useEffect } from 'react';
import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
  hasFieldError
} from 'utils';

// Components
import CustomCheckbox from 'components/common/Forms/CustomCheckbox';
import FormGroup from 'components/common/Forms/FormGroup';
import FormLabel from 'components/common/Forms/FormLabel';
import InputField from 'components/common/Forms/InputField';
import Button from 'components/common/Forms/Button';
import FormValidator from 'components/common/Forms/FormValidator';

import styles from '../RegisterModal.module.sass';

const JoinStep = (props: any) => {

  const [registerJoinForm, setRegisterJoinForm] = useState({
    name: '',
    phone: '',
    email: '',
    password: ''
  });

  const [loginErrors, setLoginErrors] = useState([]);

  const [registerJoinLoading, setRegisterJoinLoading] = useState(false);

  const validateOnChange = (name: string, value: any, event, element?) => {
    validateFieldOnChange(
      name,
      value,
      event,
      registerJoinForm,
      setRegisterJoinForm,
      loginErrors,
      setLoginErrors,
      element
    );
  };

  const hasError = (field: string, code?: string) => hasFieldError(loginErrors, field, code);

  const getFieldErrors = (field: string) => getFieldErrorsUtil(field, loginErrors);

  const registerJoinSubmit = e => {
    e.preventDefault();

    const form = e.target;
    const inputs = [...form.elements].filter(i => ['INPUT', 'SELECT', 'TEXTAREA'].includes(i.nodeName));

    const { errors, hasError } = FormValidator.bulkValidate(inputs);

    setLoginErrors([...errors]);

    if (!hasError) {
      setRegisterJoinLoading(true);

      setTimeout(() => {
        setRegisterJoinLoading(false);
        alert('REGISTERED');
      }, 400);
    }
  };

  return (
    <div className="register_join">
      <h6 className="register_title mb-5">Your personal plan is ready. Choose how you want to join</h6>

      <CustomCheckbox label={<>I have read the <span className="link">private policy</span> and <span className="link">terms and conditions</span></>} />

      <div className="register_join_or">
        <span className="register_join_or_txt">or</span>
      </div>
      
      <form className="register_join_form" onSubmit={e => registerJoinSubmit(e)}>
        <FormGroup inline>
          <FormLabel>Name*</FormLabel>
          <InputField 
            block 
            name="name"
            value={registerJoinForm.name}
            data-validate='["required"]'
            onChange={e => validateOnChange('name', e.target.value, e)}
            errors={getFieldErrors('name')}
            placeholder=""
          />
        </FormGroup>

        <FormGroup inline>
          <FormLabel>Email*</FormLabel>
          <InputField 
            block 
            name="email"
            value={registerJoinForm.email}
            data-validate='["required", "email"]'
            onChange={e => validateOnChange('email', e.target.value, e)}
            errors={getFieldErrors('email')}
            placeholder=""
          />
        </FormGroup>

        <FormGroup inline>
          <FormLabel>Phone*</FormLabel>
          <InputField 
            block 
            name="phone"
            value={registerJoinForm.phone}
            data-validate='["required"]'
            onChange={e => validateOnChange('phone', e.target.value, e)}
            errors={getFieldErrors('phone')}
            placeholder=""
          />
        </FormGroup>

        <FormGroup inline>
          <FormLabel>Password</FormLabel>
          <InputField 
            block 
            name="password"
            type="password"
            value={registerJoinForm.password}
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
            Register
          </Button>

          <Button 
            outline 
            color="secondary" 
            size="lg"
            onClick={() => props.setRegisterStep('INFO')}
            className="mt-4"
            style={{ width: '217px' }}
          >
            Back
          </Button>
        </div>
      </form>
    </div>
  );
};

export default JoinStep;
