import React, { useState, useEffect } from 'react';
import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
  getTranslate
} from 'utils';
import { connect } from 'react-redux';
import axios from 'utils/axios';
import { toast } from 'react-toastify';
import { UserAuthProfileType } from 'types/auth';
import { setAppSetting, setUserData } from 'store/actions';
import { 
  userSignup, 
  userGoogleSignUp, 
  userFacebookSignUp,
  getAppSettings,
  userValidate
} from 'api';

// Components
import FormGroup from 'components/common/Forms/FormGroup';
import FormLabel from 'components/common/Forms/FormLabel';
import InputField from 'components/common/Forms/InputField';
import Button from 'components/common/Forms/Button';
import FormValidator from 'utils/FormValidator';

import '../RegisterModal.sass';

const JoinStep = (props: any) => {
  const { registerData } = props;

  const t = (code: string) => getTranslate(props.localePhrases, code);

  const [socialRegister, setSocialRegister] = useState<string>('email');

  const [registerGoogleLoading, setRegisterGoogleLoading] = useState<boolean>(false);
  const [registerFacebookLoading, setRegisterFacebookLoading] = useState<boolean>(false);

  const [registerJoinLoading, setRegisterJoinLoading] = useState<boolean>(false);
  const [appRulesAccepted, setAppRulesAccepted] = useState(null);

  useEffect(() => {
    let currStepTitles = [...props.stepTitlesDefault];
    currStepTitles[0] = t('register.expect_step');
    currStepTitles[1] = t('register.step_confirm');
    currStepTitles[2] = t('register.ready_step');

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

  const finalWelcomeStep = (authToken: string) => {
    props.setRegisterData({
      ...registerData,
      token: authToken
    });

    props.setUserData({
      isAfterSignup: true,
      afterSignupName: registerData.name,
      afterSignupGoal: registerData.goal,
      afterSignupWeight: registerData.weight,
      afterSignupWeightGoal: registerData.weight_goal,
      afterSignupPredictDate: registerData.predicted_date
    });

    props.setRegisterView('READY');
  };

  const getRegisterProfilePayload = (): UserAuthProfileType => {
    const {
      email,
      password,
      predicted_date,
      ...userProfileData
    } = props.registerData;

    let act_level = null;

    const act_level_checked = userProfileData.act_levels.find(level => level.checked);

    if (act_level_checked) {
      act_level = act_level_checked.value;
    }

    let profilePayload = {
      ...userProfileData,
      ignore_cuisine_ids: userProfileData.ignore_cuisine_ids.filter(cuisine => cuisine.checked).map(cuisine => cuisine.id),
      diseases: userProfileData.diseases.filter(disease => disease.checked).map(disease => disease.code),
      act_level
    };

    return {
      ...profilePayload
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
          .catch((error) => {
            setRegisterGoogleLoading(false);
            toast.error(t('register.error_msg'));
          });
      })
      .catch((error) => {
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
            .catch((error) => {
              setRegisterFacebookLoading(false);
              toast.error(t('register.error_msg'));
            });
        } else {
          setRegisterFacebookLoading(false);
        }
      },
      {
        scope: 'email',
      }
    );
  };

  const registerEmail = () => {
    setRegisterJoinLoading(true);

    userSignup({
      email: props.registerData.email,
      password: props.registerData.password,
      ...getRegisterProfilePayload()
    }).then(response => {
        const token =
          response.data && response.data.access_token
            ? response.data.access_token
            : null;

        if (token) {
          localStorage.setItem('authToken', token);
          axios.defaults.headers.common.Authorization = `Bearer ${token}`;

          getAppSettings()
            .then(response => {
              setRegisterJoinLoading(false);

              if (response.data.success && response.data.data) {
                props.setAppSetting(response.data.data);
              }
            })
            .catch(error => {
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

            let registerDataErrorsTemp = [...props.registerDataErrors];

            Object.keys(validateErrors).map(field => {
              registerDataErrorsTemp.push({
                field,
                message: validateErrors[field]
              })
            })

            props.setRegisterDataErrors(registerDataErrorsTemp);

            if (validateErrors.gender) {
              props.setRegisterView('INFO_GENDER');
            } else if (validateErrors.age) {
              props.setRegisterView('INFO_AGE');
            } else if (validateErrors.height) {
              props.setRegisterView('INFO_HEIGHT');
            } else if (validateErrors.weight) {
              props.setRegisterView('INFO_WEIGHT');
            } else if (validateErrors.weight_goal) {
              props.setRegisterView('INFO_WEIGHT_GOAL');
            }
          } catch {
            
          }
        }
      });
  };

  const registerJoinSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const inputs = [...form.elements].filter((i) =>
      ['INPUT', 'SELECT', 'TEXTAREA'].includes(i.nodeName)
    );

    const { errors, hasError } = FormValidator.bulkValidate(inputs);

    props.setRegisterDataErrors([...errors]);

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
    <div className="register_join">
      <h4 className="register_title mb-xl-5 mb-45 text-center">{t('register.info_confirm_title')}</h4>

      {/*<CustomCheckbox
        invalid={appRulesAccepted === false}
        label={t('register.read_terms')}
        onChange={(e) => setAppRulesAccepted(e.target.checked)}
      />*/}

      <form className="register_join_form mt-4 px-xl-5" onSubmit={(e) => registerJoinSubmit(e)}>

        {/*<div className="register_socialBtns">
          <Button
            type='submit'
            className='facebook-login-btn'
            block
            onClick={(e) => setSocialRegister('facebook')}
            disabled={
              registerJoinLoading ||
              registerGoogleLoading ||
              registerFacebookLoading ||
              props.facebookInitLoading
            }
            isLoading={registerFacebookLoading || props.facebookInitLoading}
          >
            <FacebookIcon className='mr-2' /> Login with facebook
          </Button>

          {!props.googleLoadingError && (
            <Button
              type='submit'
              className='google-login-btn mt-3'
              block
              onClick={(e) => setSocialRegister('google')}
              disabled={
                registerJoinLoading ||
                registerGoogleLoading ||
                registerFacebookLoading ||
                props.googleInitLoading
              }
              isLoading={registerGoogleLoading || props.googleInitLoading}
            >
              <GoogleIcon className='mr-2' /> Login with Google
            </Button>
          )}
        </div>*/}        

        {/*<div className="register_join_or">
          <span className="register_join_or_txt">{t('register.form_or')}</span>
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
            autoComplete="email"
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
            autoComplete="new-password"
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

        <input type="text" name="email" className="d-none" />
        <input type="password" name="pass" className="d-none" />

        <div className='text-center mt-xl-5 mt-45'>
          <Button
            className="registerBtn"
            style={{ maxWidth: '355px' }}
            type="submit"
            block
            size="lg"
            color="primary"
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
  { setAppSetting, setUserData }
)(JoinStep);
