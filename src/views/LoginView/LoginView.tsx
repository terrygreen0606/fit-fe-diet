import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
  getTranslate as getTranslateUtil,
  initGoogleAuth as initGoogleAuthUtil,
  initFacebookAuth as initFacebookAuthUtil,
  wait
} from 'utils';
import { toast } from 'react-toastify';
import axios from 'utils/axios';
import { 
  userLogin as userAuthLogin, 
  userGoogleSignIn, 
  userFacebookSignIn 
} from 'api';
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
import { ReactComponent as FacebookIcon } from 'assets/img/icons/facebook-letter-icon.svg';

const LoginView = (props: any) => {

  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const [loginErrors, setLoginErrors] = useState([]);

  const [loginLoading, setLoginLoading] = useState(false);

  const [loginGoogleInitLoading, setLoginGoogleInitLoading] = useState(false);
  const [loginGoogleLoading, setLoginGoogleLoading] = useState(false);
  const [loginGoogleLoadingError, setLoginGoogleLoadingError] = useState(false);
  
  const [loginFacebookInitLoading, setLoginFacebookInitLoading] = useState(false);
  const [loginFacebookLoading, setLoginFacebookLoading] = useState(false);

  useEffect(() => {
    initGoogleAuth();
    initFacebookAuth();
  }, []);

  function initGoogleAuth () {
    setLoginGoogleInitLoading(true);

    const interval = setInterval(tryGoogleAuthInit, 100);
    
    function tryGoogleAuthInit () {
      if (window['gapi']) {
        clearInterval(interval);
        
        initGoogleAuthUtil(response => {
          setLoginGoogleInitLoading(false);
        }, error => {
          setLoginGoogleInitLoading(true);
        });
      }
    }
  }

  function initFacebookAuth () {
    setLoginFacebookInitLoading(true);

    window['fbAsyncInit'] = () => {
      const interval = setInterval(checkFacebookInitSuccess, 100);
    
      function checkFacebookInitSuccess () {
        if (window['FB']) {
          clearInterval(interval);        
          setLoginFacebookInitLoading(false);
        }
      }

      initFacebookAuthUtil();
    };
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

  const facebookLogin = () => {
    setLoginFacebookLoading(true);

    window['FB'].login(response => {
      if (response && response.authResponse && response.authResponse.accessToken) {
        userFacebookSignIn(response.authResponse.accessToken).then(response => {
          setLoginFacebookLoading(false);

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
          setLoginFacebookLoading(false);
          toast.error('Error occurred when Sign In User');
        });
      } else {
        setLoginFacebookLoading(false);
      }
    });
  };

  return (
    <>
      <Helmet>
        <script src="https://apis.google.com/js/platform.js" async />
        <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js" />
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
            disabled={loginLoading || loginGoogleLoading || loginFacebookLoading}
            isLoading={loginLoading}
            block
          >
            {getTranslate('login.submit')}
          </Button>
        </form>

        <div className="d-flex text-center mt-4">
          <Button 
            className="facebook-login-btn mr-3" 
            onClick={e => facebookLogin()}
            disabled={loginLoading || loginGoogleLoading || loginFacebookLoading || loginFacebookInitLoading}
            isLoading={loginFacebookLoading || loginFacebookInitLoading}
          >
            <FacebookIcon className="mr-2" /> Login with facebook
          </Button>

          {!loginGoogleLoadingError && (
            <Button 
              className="google-login-btn" 
              onClick={e => loginGoogle()}
              disabled={loginLoading || loginGoogleLoading || loginFacebookLoading || loginGoogleInitLoading}
              isLoading={loginGoogleLoading || loginGoogleInitLoading}
            >
              <GoogleIcon className="mr-2" /> Login with Google
            </Button>
          )}
        </div>

        <span className="link link-bold mt-4" onClick={() => setRegisterModalOpen(true)}>{getTranslate('login.register_link')}</span>
      </div>
    </>
  );
};

export default WithTranslate(connect(
  null,
  { userLogin }
)(LoginView));
