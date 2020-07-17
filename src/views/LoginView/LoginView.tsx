import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
  hasFieldError
} from 'utils';
import { userLogin } from 'store/actions';

// Components
import RegisterModal from 'components/RegisterModal';
import FormGroup from 'components/common/Forms/FormGroup';
import InputField from 'components/common/Forms/InputField';
import Button from 'components/common/Forms/Button';
import FormValidator from 'components/common/Forms/FormValidator';

import './LoginView.sass';

const LoginView = (props: any) => {

  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const [loginErrors, setLoginErrors] = useState([]);

  const [loginLoading, setLoginLoading] = useState(false);

  const validateOnChange = (name: string, value: any, event, element?) => {
    validateFieldOnChange(
      name,
      value,
      event,
      loginForm,
      setLoginForm,
      loginErrors,
      setLoginErrors,
      element
    );
  };

  const hasError = (field: string, code?: string) => hasFieldError(loginErrors, field, code);

  const getFieldErrors = (field: string) => getFieldErrorsUtil(field, loginErrors);

  const loginSubmit = e => {
    e.preventDefault();

    const form = e.target;
    const inputs = [...form.elements].filter(i => ['INPUT', 'SELECT', 'TEXTAREA'].includes(i.nodeName));

    const { errors, hasError } = FormValidator.bulkValidate(inputs);

    setLoginErrors([...errors]);

    if (!hasError) {
      setLoginLoading(true);

      setTimeout(() => {
        setLoginLoading(false);

        const token = 'token777';
        localStorage.setItem('authToken', token);
        props.userLogin(token);
        
        props.history.push('/');
      }, 400);
    }
  };

  return (
    <>
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setRegisterModalOpen(false)}
      />

      <div className="loginScreen">
        <h3 className="loginScreen_title">Login</h3>

        <form className="loginScreen_form" onSubmit={e => loginSubmit(e)}>
          <FormGroup>
            <InputField
              name="email"
              data-validate='["required", "email"]'
              errors={getFieldErrors('email')}
              value={loginForm.email}
              onChange={e => validateOnChange('email', e.target.value, e)}
              placeholder="Email"
              block
            />
          </FormGroup>

          <FormGroup>
            <InputField
              name="password"
              className="mt-3"
              type="password"
              autocomplate="current-password"
              data-validate='["required"]'
              errors={getFieldErrors('password')}
              value={loginForm.password}
              onChange={e => validateOnChange('password', e.target.value, e)}
              placeholder="Password"
              block
            />
          </FormGroup>

          <span className="link link-bold mt-5">Forgot your password? Remind me</span>

          <Button 
            className="loginScreen_btn" 
            type="submit" 
            color="primary" 
            size="lg"
            isLoading={loginLoading}
            block
          >
            Log in
          </Button>

          <span className="link link-bold mt-3" onClick={() => setRegisterModalOpen(true)}>Register</span>
        </form>
      </div>
    </>
  );
};

export default connect(
  null,
  { userLogin }
)(LoginView);
