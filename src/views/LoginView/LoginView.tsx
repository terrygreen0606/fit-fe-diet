import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
  getTranslate,
  initGoogleAuth,
  initFacebookAuth,
} from 'utils';
import { toast } from 'react-toastify';
import axios from 'utils/axios';
import {
  userLogin as userAuthLogin,
  userGoogleSignIn,
  userFacebookSignIn,
} from 'api';
import { userLogin } from 'store/actions';
import Helmet from 'react-helmet';

// Components
import AuthSocialHelmet from 'components/AuthSocialHelmet';
import FormGroup from 'components/common/Forms/FormGroup';
import InputField from 'components/common/Forms/InputField';
import Button from 'components/common/Forms/Button';
import FormValidator from 'utils/FormValidator';
import WithTranslate from 'components/hoc/WithTranslate';

import './LoginView.sass';

import { ReactComponent as GoogleIcon } from 'assets/img/icons/google-icon.svg';
import { ReactComponent as FacebookIcon } from 'assets/img/icons/facebook-letter-icon.svg';

const LoginView = (props: any) => {
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const [loginErrors, setLoginErrors] = useState([]);

  const [loginLoading, setLoginLoading] = useState(false);

  const [loginGoogleInitLoading, setLoginGoogleInitLoading] = useState(false);
  const [loginGoogleLoading, setLoginGoogleLoading] = useState(false);
  const [loginGoogleLoadingError, setLoginGoogleLoadingError] = useState(false);

  const [loginFacebookInitLoading, setLoginFacebookInitLoading] = useState(
    false
  );
  const [loginFacebookLoading, setLoginFacebookLoading] = useState(false);

  useEffect(() => {
    initGoogleAuth(setLoginGoogleInitLoading, setLoginGoogleLoadingError);
    initFacebookAuth(setLoginFacebookInitLoading);
  }, []);

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

  const getFieldErrors = (field: string) =>
    getFieldErrorsUtil(field, loginErrors);

  const t = (code: string, placeholders?: any) =>
    getTranslate(props.localePhrases, code, placeholders);

  const userClientLogin = (authToken: string) => {
    localStorage.setItem('authToken', authToken);
    axios.defaults.headers.common.Authorization = `Bearer ${authToken}`;
    props.userLogin(authToken);
  };

  const loginSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const inputs = [...form.elements].filter((i) =>
      ['INPUT', 'SELECT', 'TEXTAREA'].includes(i.nodeName)
    );

    const { errors, hasError } = FormValidator.bulkValidate(inputs);

    setLoginErrors([...errors]);

    if (!hasError) {
      setLoginLoading(true);

      userAuthLogin(loginForm.email, loginForm.password)
        .then((response) => {
          setLoginLoading(false);

          const token =
            response.data && response.data.access_token
              ? response.data.access_token
              : null;

          if (token) {
            userClientLogin(token);
          } else {
            toast.error('Error occurred when Sign In User');
          }
        })
        .catch((error) => {
          setLoginLoading(false);
          toast.error('Error occurred when Sign In User');
        });
    }
  };

  const loginGoogle = () => {
    const auth2 = window['gapi'].auth2.getAuthInstance();

    setLoginGoogleLoading(true);

    auth2
      .signIn()
      .then((googleUser) => {
        // token
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { id_token } = googleUser.getAuthResponse();

        userGoogleSignIn(id_token)
          .then((response) => {
            setLoginGoogleLoading(false);

            const token =
              response.data && response.data.access_token
                ? response.data.access_token
                : null;

            if (token) {
              userClientLogin(token);
            } else {
              toast.error('Error occurred when Sign In User');
            }
          })
          .catch((error) => {
            setLoginGoogleLoading(false);
            toast.error('Error occurred when Sign In User');
          });
      })
      .catch((error) => {
        setLoginGoogleLoading(false);
      });
  };

  const facebookLogin = () => {
    setLoginFacebookLoading(true);

    window['FB'].login(
      (response) => {
        if (
          response &&
          response.authResponse &&
          response.authResponse.accessToken
        ) {
          userFacebookSignIn(response.authResponse.accessToken)
            .then((res) => {
              setLoginFacebookLoading(false);

              const token =
                res.data && res.data.access_token
                  ? res.data.access_token
                  : null;

              if (token) {
                userClientLogin(token);
              } else {
                toast.error('Error occurred when Sign In User');
              }
            })
            .catch((error) => {
              setLoginFacebookLoading(false);
              toast.error('Error occurred when Sign In User');
            });
        } else {
          setLoginFacebookLoading(false);
        }
      },
      {
        scope: 'email',
      }
    );
  };

  return (
    <>
      <Helmet>
        <title>{t('app.title.login')}</title>
      </Helmet>

      <AuthSocialHelmet />

      <div className='loginScreen'>
        <h3 className='loginScreen_title'>
          {t('login.title', { product: 'TEST' })}
        </h3>

        <form className='loginScreen_form' onSubmit={(e) => loginSubmit(e)}>
          <FormGroup>
            <InputField
              name='email'
              data-validate='["required", "email"]'
              errors={getFieldErrors('email')}
              value={loginForm.email}
              onChange={(e) => validateOnChange('email', e.target.value, e)}
              placeholder={t('login.email_placeholder')}
              block
            />
          </FormGroup>

          <FormGroup>
            <InputField
              name='password'
              className='mt-3'
              type='password'
              autocomplate='current-password'
              data-validate='["required"]'
              errors={getFieldErrors('password')}
              value={loginForm.password}
              onChange={(e) => validateOnChange('password', e.target.value, e)}
              placeholder={t('login.password_placeholder')}
              block
            />
          </FormGroup>

          <span className='link link-bold mt-3'>{t('login.forgot_pass')}</span>

          <Button
            className='loginScreen_btn'
            type='submit'
            color='primary'
            size='lg'
            disabled={
              loginLoading || loginGoogleLoading || loginFacebookLoading
            }
            isLoading={loginLoading}
            block
          >
            {t('login.submit')}
          </Button>
        </form>

        <div className='loginScreen_socialBtns mt-4'>
          <Button
            className='facebook-login-btn mr-3'
            onClick={(e) => facebookLogin()}
            disabled={
              loginLoading ||
              loginGoogleLoading ||
              loginFacebookLoading ||
              loginFacebookInitLoading
            }
            isLoading={loginFacebookLoading || loginFacebookInitLoading}
          >
            <FacebookIcon className='mr-2' /> Login with facebook
          </Button>

          {!loginGoogleLoadingError && (
            <Button
              className='google-login-btn'
              onClick={(e) => loginGoogle()}
              disabled={
                loginLoading ||
                loginGoogleLoading ||
                loginFacebookLoading ||
                loginGoogleInitLoading
              }
              isLoading={loginGoogleLoading || loginGoogleInitLoading}
            >
              <GoogleIcon className='mr-2' /> Login with Google
            </Button>
          )}
        </div>

        <Link
          className='link link-bold mt-4'
          to='/register'
          role='presentation'
        >
          {t('login.register_link')}
        </Link>
      </div>
    </>
  );
};

export default WithTranslate(connect(null, { userLogin })(LoginView));
