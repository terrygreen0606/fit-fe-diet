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
  getAppSettings
} from 'api';
import { userLogin, setAppSetting } from 'store/actions';
import Helmet from 'react-helmet';

// Components
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
    // initGoogleAuth(setLoginGoogleInitLoading, setLoginGoogleLoadingError);
    // initFacebookAuth(setLoginFacebookInitLoading);
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
    getFieldErrorsUtil(field, loginErrors)
      .map(msg => ({
        ...msg,
        message: t('api.ecode.invalid_value')
      }));

  const t = (code: string, placeholders?: any) =>
    getTranslate(props.localePhrases, code, placeholders);

  const userClientLogin = (authToken: string) => {
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
          const token =
            response.data && response.data.access_token
              ? response.data.access_token
              : null;

          if (token) {
            localStorage.setItem('FITLOPE_AUTH_TOKEN', token);
            axios.defaults.headers.common.Authorization = `Bearer ${token}`;
            
            getAppSettings()
              .then(response => {
                setLoginLoading(false);

                if (response.data.success && response.data.data) {
                  props.setAppSetting({
                    ...response.data.data,
                    is_private: true,
                  });
                }
              })
              .catch(error => {
                toast.error(t('register.error_msg'));
                setLoginLoading(false);
              });

            userClientLogin(token);
          } else {
            toast.error(t('register.error_msg'));
          }
        })
        .catch((error) => {
          setLoginLoading(false);
          toast.error(t('register.error_msg'));
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
              toast.error(t('register.error_msg'));
            }
          })
          .catch((error) => {
            setLoginGoogleLoading(false);
            toast.error(t('register.error_msg'));
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
                toast.error(t('register.error_msg'));
              }
            })
            .catch((error) => {
              setLoginFacebookLoading(false);
              toast.error(t('register.error_msg'));
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

      <div className='loginScreen mt-3 mt-md-5'>
        <h3 className='loginScreen_title d-none d-lg-inline-block'>
          {t('login.title')}
        </h3>

        <span className='mainHeader_logo d-lg-none-i' />

        <form className='loginScreen_form' onSubmit={(e) => loginSubmit(e)}>
          <FormGroup>
            <InputField
              name='email'
              label={t('login.form_email')}
              data-validate='["required", "email"]'
              errors={getFieldErrors('email')}
              value={loginForm.email}
              autoComplete="email"
              autoFocus={1}
              onChange={(e) => validateOnChange('email', e.target.value, e)}
              placeholder={t('login.email_placeholder')}
              block
            />
          </FormGroup>

          <FormGroup>
            <InputField
              name='password'
              type="password"
              label={t('login.form_password')}
              data-validate='["required"]'
              errors={getFieldErrors('password')}
              autoComplete="new-password"
              value={loginForm.password}
              onChange={(e) => validateOnChange('password', e.target.value, e)}
              placeholder={t('login.password_placeholder')}
              block
            />
          </FormGroup>

          <input type="text" name="email" className="d-none" />
          <input type="password" name="pass" className="d-none" />

          <Button
            className='loginScreen_btn'
            type='submit'
            color='secondary'
            size='lg'
            block
            disabled={loginLoading || loginGoogleLoading || loginFacebookLoading}
            isLoading={loginLoading}
          >
            {t('login.submit')}
          </Button>

          <Link to="/reset-password" className='loginScreen_link link link-bold link-blue mt-45'>{t('login.forgot_pass')}</Link>
        </form>

        {/*<div className='loginScreen_socialBtns mt-4'>
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
        </div>*/}
      </div>
    </>
  );
};

export default WithTranslate(
  connect(null, { userLogin, setAppSetting }
)(LoginView));
