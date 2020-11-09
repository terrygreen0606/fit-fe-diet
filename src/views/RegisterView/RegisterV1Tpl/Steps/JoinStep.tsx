import React, { useState, useEffect } from 'react';
import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
  getTranslate,
  getCookie,
} from 'utils';
import { connect } from 'react-redux';
import axios from 'utils/axios';
import { toast } from 'react-toastify';
import { UserAuthProfileType } from 'types/auth';
import {
  setAppSetting as setAppSettingAction,
  setUserData as setUserDataAction,
} from 'store/actions';
import { InputError } from 'types';
import {
  userSignup,
  userGoogleSignUp,
  userFacebookSignUp,
  getAppSettings,
} from 'api';

// Components
import FormGroup from 'components/common/Forms/FormGroup';
import FormLabel from 'components/common/Forms/FormLabel';
import InputField from 'components/common/Forms/InputField';
import Button from 'components/common/Forms/Button';
import FormValidator from 'utils/FormValidator';

import '../RegisterV1Tpl.sass';

const JoinStep = ({
  registerData,
  setRegisterData,
  registerDataErrors,
  setRegisterDataErrors,
  setRegisterView,
  setAppSettingAction: setAppSetting,
  setUserDataAction: setUserData,
  localePhrases,
}: any) => {
  const t = (code: string) =>
    getTranslate(localePhrases, code);

  const [socialRegister, setSocialRegister] = useState<string>('email');

  const [registerGoogleLoading, setRegisterGoogleLoading] = useState<boolean>(false);
  const [registerFacebookLoading, setRegisterFacebookLoading] = useState<boolean>(false);

  const [registerJoinLoading, setRegisterJoinLoading] = useState<boolean>(false);
  const [appRulesAccepted, setAppRulesAccepted] = useState(null);

  const validateOnChange = (name: string, value: any, event, element?) => {
    validateFieldOnChange(
      name,
      value,
      event,
      registerData,
      setRegisterData,
      registerDataErrors,
      setRegisterDataErrors,
      element,
    );
  };

  const getFieldErrors = (field: string) =>
    getFieldErrorsUtil(field, registerDataErrors)
      .map((msg) => ({
        ...msg,
        message: t('api.ecode.invalid_value'),
      }));

  const finalWelcomeStep = (authToken: string) => {
    setRegisterData({
      ...registerData,
      token: authToken,
    });

    setUserData({
      isAfterSignup: true,
      afterSignupName: registerData.name,
      afterSignupGoal: registerData.goal,
      afterSignupWeight: registerData.weight,
      afterSignupWeightGoal: registerData.weight_goal,
      afterSignupPredictDate: registerData.predicted_date,
    });

    setRegisterView('READY');
  };

  const getRegisterProfilePayload = (): UserAuthProfileType => {
    const {
      email,
      password,
      predicted_date,
      act_levels,
      meal_counts,
      ...userProfileData
    } = registerData;

    let act_level = null;

    const act_level_checked = act_levels.find(level => level.checked);

    if (act_level_checked) {
      act_level = act_level_checked.value;
    }

    const profilePayload = {
      ...userProfileData,
      ignore_cuisine_ids: userProfileData.ignore_cuisine_ids
        .filter((cuisine) => cuisine.checked)
        .map((cuisine) => cuisine.id),
      diseases: userProfileData.diseases
        .filter((disease) => disease.checked)
        .map((disease) => disease.code),
      act_level,
    };

    const ref_code = getCookie('ref_code');

    if (ref_code) {
      profilePayload.ref_code = ref_code;
    }

    return {
      ...profilePayload,
    };
  };

  const registerGoogle = () => {
    const auth2 = window['gapi'].auth2.getAuthInstance();

    setRegisterGoogleLoading(true);

    auth2
      .signIn()
      .then((googleUser) => {
        // token
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { id_token } = googleUser.getAuthResponse();

        userGoogleSignUp({
          id_token,
          profile: getRegisterProfilePayload(),
        })
          .then((response) => {
            setRegisterGoogleLoading(false);

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
          .catch(() => {
            setRegisterGoogleLoading(false);
            toast.error(t('register.error_msg'));
          });
      })
      .catch(() => {
        setRegisterGoogleLoading(false);
      });
  };

  const facebookRegister = () => {
    setRegisterFacebookLoading(true);

    window['FB'].login(
      (response) => {
        if (
          response &&
          response.authResponse &&
          response.authResponse.accessToken
        ) {
          userFacebookSignUp({
            token: response.authResponse.accessToken,
            profile: getRegisterProfilePayload(),
          })
            .then((res) => {
              setRegisterFacebookLoading(false);

              const token =
                res.data && res.data.access_token
                  ? res.data.access_token
                  : null;

              if (token) {
                finalWelcomeStep(token);
              } else {
                toast.error(t('register.error_msg'));
              }
            })
            .catch(() => {
              setRegisterFacebookLoading(false);
              toast.error(t('register.error_msg'));
            });
        } else {
          setRegisterFacebookLoading(false);
        }
      },
      {
        scope: 'email',
      },
    );
  };

  const registerEmail = () => {
    setRegisterJoinLoading(true);

    userSignup({
      email: registerData.email,
      password: registerData.password,
      ...getRegisterProfilePayload(),
    }).then(({ data }) => {
        const token =
          data && data.access_token
            ? data.access_token
            : null;

        if (token) {
          localStorage.setItem('FITLOPE_AUTH_TOKEN', token);
          axios.defaults.headers.common.Authorization = `Bearer ${token}`;

          getAppSettings()
            .then(({ data: settingsData }) => {
              setRegisterJoinLoading(false);

              if (settingsData.success && settingsData.data) {
                setAppSetting(settingsData.data);
              } else {
                toast.error(t('register.error_msg'));
              }
            })
            .catch(() => {
              toast.error(t('register.error_msg'));
              setRegisterJoinLoading(false);
            });

          finalWelcomeStep(token);
        } else {
          toast.error(t('register.error_msg'));
        }
      })
      .catch((error) => {
        setRegisterJoinLoading(false);

        toast.error(t('register.error_msg'));

        if (error.response && error.response.status >= 400 && error.response.status < 500) {
          try {
            const validateErrors = JSON.parse(error.response.data.message);

            const registerDataErrorsTemp: InputError[] = [...registerDataErrors];

            Object.keys(validateErrors).map((field) => {
              registerDataErrorsTemp.push({
                field,
                message: validateErrors[field],
              });
            });

            setRegisterDataErrors(registerDataErrorsTemp);

            if (validateErrors.gender) {
              setRegisterView('INFO_GENDER');
            } else if (validateErrors.age) {
              setRegisterView('INFO_AGE');
            } else if (validateErrors.height) {
              setRegisterView('INFO_HEIGHT');
            } else if (validateErrors.weight) {
              setRegisterView('INFO_WEIGHT');
            } else if (validateErrors.weight_goal) {
              setRegisterView('INFO_WEIGHT_GOAL');
            }
          } catch {

          }
        }
      });
  };

  const registerJoinSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const inputs = [...form.elements].filter((i) => ['INPUT', 'SELECT', 'TEXTAREA'].includes(i.nodeName));

    const { errors, hasError } = FormValidator.bulkValidate(inputs);

    setRegisterDataErrors([...errors]);

    if (!appRulesAccepted) {
      setAppRulesAccepted(false);
    }

    if (!hasError) {
      if (socialRegister === 'facebook') {
        facebookRegister();
      } else if (socialRegister === 'google') {
        registerGoogle();
      } else {
        registerEmail();
      }
    }
  };

  return (
    <div className='register_v1_steps_content'>
      <h3 className='register_v1_title'>{t('register.info_confirm_title')}</h3>

      {/*<CustomCheckbox
        invalid={appRulesAccepted === false}
        label={t('register.read_terms')}
        onChange={(e) => setAppRulesAccepted(e.target.checked)}
      />*/}

      <form className='register_join_form' onSubmit={(e) => registerJoinSubmit(e)}>

        {/*<div className='register_socialBtns'>
          <Button
            type='submit'
            className='facebook-login-btn'
            block
            onClick={(e) => setSocialRegister('facebook')}
            disabled={
              registerJoinLoading ||
              registerGoogleLoading ||
              registerFacebookLoading ||
              facebookInitLoading
            }
            isLoading={registerFacebookLoading || facebookInitLoading}
          >
            <FacebookIcon className='mr-2' /> Login with facebook
          </Button>

          {!googleLoadingError && (
            <Button
              type='submit'
              className='google-login-btn mt-3'
              block
              onClick={(e) => setSocialRegister('google')}
              disabled={
                registerJoinLoading ||
                registerGoogleLoading ||
                registerFacebookLoading ||
                googleInitLoading
              }
              isLoading={registerGoogleLoading || googleInitLoading}
            >
              <GoogleIcon className='mr-2' /> Login with Google
            </Button>
          )}
        </div>*/}

        {/*<div className='register_join_or'>
          <span className='register_join_or_txt'>{t('register.form_or')}</span>
        </div>*/}

        <FormGroup>
          <FormLabel>
            {t('register.form_name')}
            *
          </FormLabel>
          <InputField
            block
            name='name'
            autoFocus
            isValid={getFieldErrors('name').length === 0 && registerData.name.length > 0}
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
            autoComplete='email'
            isValid={getFieldErrors('email').length === 0 && registerData.email.length > 0}
            data-validate={`["email"${
              socialRegister === 'email' ? ', "required"' : ''
            }]`}
            onChange={(e) => validateOnChange('email', e.target.value, e)}
            errors={getFieldErrors('email')}
            placeholder=''
          />
        </FormGroup>

        <FormGroup>
          <FormLabel>{t('register.form_password')}</FormLabel>
          <InputField
            block
            name='password'
            type='password'
            autoComplete='new-password'
            isValid={getFieldErrors('password').length === 0 && registerData.password.length > 0}
            value={registerData.password}
            data-validate={`[${
              socialRegister === 'email' ? '"required"' : ''
            }]`}
            onChange={(e) => validateOnChange('password', e.target.value, e)}
            errors={getFieldErrors('password')}
            placeholder=''
          />
        </FormGroup>

        <input type='text' name='email' className='d-none' />
        <input type='password' name='pass' className='d-none' />

        <div className='register_v1_submit'>
          <Button
            className='registerBtn'
            style={{ maxWidth: '355px' }}
            type='submit'
            block
            size='lg'
            color='primary'
            isLoading={registerJoinLoading}
          >
            {t('register.form_submit')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default connect(
  null,
  { setAppSettingAction, setUserDataAction },
)(JoinStep);
