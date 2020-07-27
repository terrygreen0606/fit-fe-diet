import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
  getTranslate as getTranslateUtil,
  initGoogleAuth as initGoogleAuthUtil
} from 'utils';
import { toast } from 'react-toastify';
import axios from 'utils/axios';
import { userLogin as userAuthLogin, userGoogleSignIn } from 'api';
import {Helmet} from "react-helmet";
import { userLogin } from 'store/actions';

// Components
import RegisterModal from 'components/RegisterModal';
import FormGroup from 'components/common/Forms/FormGroup';
import InputField from 'components/common/Forms/InputField';
import Button from 'components/common/Forms/Button';
import FormValidator from 'utils/FormValidator';
import WithTranslate from 'components/hoc/WithTranslate';

import './LoginView.sass';

import { ReactComponent as GoogleIcon } from 'assets/img/icons/google-icon.svg';

const LoginView = (props: any) => {

  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const [loginErrors, setLoginErrors] = useState([]);

  const [loginLoading, setLoginLoading] = useState(false);
  const [loginGoogleLoading, setLoginGoogleLoading] = useState(true);
  const [loginGoogleLoadingError, setLoginGoogleLoadingError] = useState(false);

  useEffect(() => {
    initGoogleAuth();
  }, []);

  function initGoogleAuth () {
    const interval = setInterval(tryGoogleAuthInit, 100);
    
    function tryGoogleAuthInit () {
      if (window['gapi']) {
        clearInterval(interval);
        
        initGoogleAuthUtil(response => {
          setLoginGoogleLoading(false);
        }, error => {
          setLoginGoogleLoadingError(true);
        });
      }
    }

    tryGoogleAuthInit();
  }

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

  const getFieldErrors = (field: string) => getFieldErrorsUtil(field, loginErrors);

  const getTranslate = (code: string) => getTranslateUtil(props.localePhrases, code);

  const loginSubmit = e => {
    e.preventDefault();

    const form = e.target;
    const inputs = [...form.elements].filter(i => ['INPUT', 'SELECT', 'TEXTAREA'].includes(i.nodeName));

    const { errors, hasError } = FormValidator.bulkValidate(inputs);

    setLoginErrors([...errors]);

    if (!hasError) {
      setLoginLoading(true);

      userAuthLogin(loginForm.email, loginForm.password).then(response => {
        setLoginLoading(false);

        const token = response.data && response.data.access_token ? response.data.access_token : null;

        if (token) {
          localStorage.setItem('authToken', token);
          axios.defaults.headers.common.Authorization = `Bearer ${token}`;
          props.userLogin(token);
          props.history.push('/');
        } else {
          toast.error('Error occurred when Sign In User');
        }
      }).catch(error => {
        setLoginLoading(false);
        toast.error('Error occurred when Sign In User');
      });
    }
  };

  const loginGoogle = () => {
    const auth2 = window['gapi'].auth2.getAuthInstance();

    setLoginGoogleLoading(true);

    auth2.signIn().then(googleUser => {   
      // token
      const id_token = googleUser.getAuthResponse().id_token;

      userGoogleSignIn(id_token).then(response => {
        setLoginGoogleLoading(false);

        const token = response.data && response.data.access_token ? response.data.access_token : null;

        if (token) {
          localStorage.setItem('authToken', token);
          axios.defaults.headers.common.Authorization = `Bearer ${token}`;
          props.userLogin(token);
          props.history.push('/');
        } else {
          toast.error('Error occurred when Sign In User');
        }
      }).catch(error => {
        setLoginGoogleLoading(false);
        toast.error('Error occurred when Sign In User');
      });
    }).catch(error => {
      setLoginGoogleLoading(false);
    });
  };

  return (
    <>
      <Helmet>
        <script src="https://apis.google.com/js/platform.js" async  />
      </Helmet>

      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setRegisterModalOpen(false)}
      />

      <div className="loginScreen">
        <h3 className="loginScreen_title">{getTranslate('login.title')}</h3>

        <form className="loginScreen_form" onSubmit={e => loginSubmit(e)}>
          <FormGroup>
            <InputField
              name="email"
              data-validate='["required", "email"]'
              errors={getFieldErrors('email')}
              value={loginForm.email}
              onChange={e => validateOnChange('email', e.target.value, e)}
              placeholder={getTranslate('login.email_placeholder')}
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
              placeholder={getTranslate('login.password_placeholder')}
              block
            />
          </FormGroup>

          <span className="link link-bold mt-3">{getTranslate('login.forgot_pass')}</span>

          <Button 
            className="loginScreen_btn" 
            type="submit" 
            color="primary" 
            size="lg"
            disabled={loginGoogleLoading || loginLoading}
            isLoading={loginLoading}
            block
          >
            {getTranslate('login.submit')}
          </Button>
        </form>

        {!loginGoogleLoadingError && (
          <div className="text-center mt-4">
            <Button 
              className="google-login-btn" 
              onClick={e => loginGoogle()}
              disabled={loginLoading || loginGoogleLoading}
              isLoading={loginGoogleLoading}
            >
              <GoogleIcon className="mr-2" /> Login with Google
            </Button>
          </div>
        )}

        <span className="link link-bold mt-4" onClick={() => setRegisterModalOpen(true)}>{getTranslate('login.register_link')}</span>
      </div>
    </>
  );
};

export default WithTranslate(connect(
  null,
  { userLogin }
)(LoginView));
