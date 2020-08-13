import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
  getTranslate,
} from 'utils';
import axios from 'utils/axios';
import { toast } from 'react-toastify';
import { UserAuthProfileType } from 'types/auth';
import { 
  userSignup, 
  userGoogleSignUp,
  userFacebookSignUp 
} from 'api';
import { userLogin } from 'store/actions';

// Components
import CustomCheckbox from 'components/common/Forms/CustomCheckbox';
import FormGroup from 'components/common/Forms/FormGroup';
import FormLabel from 'components/common/Forms/FormLabel';
import InputField from 'components/common/Forms/InputField';
import Button from 'components/common/Forms/Button';
import FormValidator from 'utils/FormValidator';

import '../RegisterModal.sass';

import { ReactComponent as GoogleIcon } from 'assets/img/icons/google-icon.svg';
import { ReactComponent as FacebookIcon } from 'assets/img/icons/facebook-letter-icon.svg';

const JoinStep = (props: any) => {
  const { registerData } = props;
  const [registerJoinErrors, setRegisterJoinErrors] = useState([]);

  const [registerLoading, setRegisterLoading] = useState<boolean>(false);
  const [socialRegister, setSocialRegister] = useState<string>(null);

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
      props.setRegisterData,
      registerJoinErrors,
      setRegisterJoinErrors,
      element,
    );
  };

  const getFieldErrors = (field: string) => getFieldErrorsUtil(field, registerJoinErrors);

  const t = (code: string) => getTranslate(props.localePhrases, code);

  const userClientLogin = (authToken: string) => {
    localStorage.setItem('authToken', authToken);
    axios.defaults.headers.common.Authorization = `Bearer ${authToken}`;
    props.userLogin(authToken);
  };

  const getRegisterProfilePayload = (): UserAuthProfileType => {
    const {
      email,
      password,
      ...userProfileData
    } = props.registerData;

    return {...userProfileData};
  };

  const registerGoogle = () => {
    const auth2 = window['gapi'].auth2.getAuthInstance();

    setRegisterGoogleLoading(true);

    auth2.signIn().then((googleUser) => {
      // token
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { id_token } = googleUser.getAuthResponse();

      userGoogleSignUp({
        id_token,
        profile: getRegisterProfilePayload()
      }).then((response) => {
        setRegisterGoogleLoading(false);

        const token = response.data
        && response.data.access_token
          ? response.data.access_token
          : null;

        if (token) {
          userClientLogin(token);
        } else {
          toast.error('Error occurred when Sign In User');
        }
      }).catch((error) => {
        setRegisterGoogleLoading(false);
        toast.error('Error occurred when Sign In User');
      });
    }).catch((error) => {
      setRegisterGoogleLoading(false);
    });
  };

  const facebookRegister = () => {
    setRegisterFacebookLoading(true);

    window['FB'].login((response) => {
      if (response && response.authResponse && response.authResponse.accessToken) {
        userFacebookSignUp({
          token: response.authResponse.accessToken,
          profile: getRegisterProfilePayload()
        }).then((res) => {
          setRegisterFacebookLoading(false);

          const token = res.data
          && res.data.access_token
            ? res.data.access_token
            : null;

          if (token) {
            userClientLogin(token);
          } else {
            toast.error('Error occurred when Sign In User');
          }
        }).catch((error) => {
          setRegisterFacebookLoading(false);
          toast.error('Error occurred when Sign In User');
        });
      } else {
        setRegisterFacebookLoading(false);
      }
    }, {
      scope: 'email',
    });
  };

  const registerJoinSubmit = e => {
    e.preventDefault();

    const form = e.target;
    const inputs = [...form.elements].filter((i) => ['INPUT', 'SELECT', 'TEXTAREA'].includes(i.nodeName));

    const { errors, hasError } = FormValidator.bulkValidate(inputs);

    setRegisterJoinErrors([...errors]);

    if (!appRulesAccepted) {
      setAppRulesAccepted(false);
    }

    if (!hasError && appRulesAccepted) {
      if (socialRegister === 'facebook') {
        facebookRegister();
      } else if (socialRegister === 'google') {
        registerGoogle();
      } else {
         setRegisterJoinLoading(true);

          userSignup({
            ...registerData,
            weight: registerData.weight
              ? registerData.weight * 1000
              : registerData.weight,
            height: registerData.height
              ? registerData.height * 10
              : registerData.height,
            weight_goal: registerData.weight_goal
              ? registerData.weight_goal * 1000
              : registerData.weight_goal,
          }).then((response) => {
            setRegisterJoinLoading(false);

            const token = response.data
            && response.data.access_token
              ? response.data.access_token
              : null;

            if (token) {
              userClientLogin(token);
              props.modalClose();
            } else {
              toast.error('Error while registering user');
            }
          }).catch((error) => {
            setRegisterJoinLoading(false);
            toast.error('Error while registering user');
          });
      }
    }
  };

  return (
    <div className="register_join">
      <h6 className="register_title mb-5">{t('register.plan_is_ready_text')}</h6>

      <CustomCheckbox
        invalid={appRulesAccepted === false}
        label={t('register.read_terms')}
        onChange={(e) => setAppRulesAccepted(e.target.checked)}
      />

      <form className="register_join_form mt-4" onSubmit={(e) => registerJoinSubmit(e)}>

        <div className="register_socialBtns">
          <Button
            type="submit"
            className="facebook-login-btn"
            block
            onClick={e => setSocialRegister('facebook')}
            disabled={
              registerJoinLoading
              || registerGoogleLoading
              || registerFacebookLoading
              || props.facebookInitLoading
            }
            isLoading={registerFacebookLoading || props.facebookInitLoading}
          >
            <FacebookIcon className="mr-2" />
            {' '}
            Login with facebook
          </Button>

          {!props.googleLoadingError && (
            <Button
              type="submit"
              className="google-login-btn mt-3"
              block
              onClick={e => setSocialRegister('google')}
              disabled={
                registerJoinLoading
                || registerGoogleLoading
                || registerFacebookLoading
                || props.googleInitLoading
              }
              isLoading={registerGoogleLoading || props.googleInitLoading}
            >
              <GoogleIcon className="mr-2" />
              {' '}
              Login with Google
            </Button>
          )}
        </div>        

        <div className="register_join_or">
          <span className="register_join_or_txt">{t('register.form_or')}</span>
        </div>

        <FormGroup inline>
          <FormLabel>
            {t('register.form_name')}
            *
          </FormLabel>
          <InputField
            block
            name="name"
            value={registerData.name}
            data-validate='["required"]'
            onChange={(e) => validateOnChange('name', e.target.value, e)}
            errors={getFieldErrors('name')}
            placeholder=""
          />
        </FormGroup>

        <FormGroup inline>
          <FormLabel>
            {t('register.form_surname')}
            *
          </FormLabel>
          <InputField
            block
            name="surname"
            value={registerData.surname}
            data-validate='["required"]'
            onChange={(e) => validateOnChange('surname', e.target.value, e)}
            errors={getFieldErrors('surname')}
            placeholder=""
          />
        </FormGroup>

        <FormGroup inline>
          <FormLabel>
            {t('register.form_email')}
            *
          </FormLabel>
          <InputField
            block
            name="email"
            value={registerData.email}
            data-validate={`["email"${socialRegister === 'email' ? ', "required"' : ''}]`}
            onChange={(e) => validateOnChange('email', e.target.value, e)}
            errors={getFieldErrors('email')}
            placeholder=""
          />
        </FormGroup>

        <FormGroup inline>
          <FormLabel>
            {t('register.form_phone')}
            *
          </FormLabel>
          <InputField
            block
            name="phone"
            value={registerData.phone}
            data-validate='["required", "number"]'
            onChange={(e) => validateOnChange('phone', e.target.value, e)}
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
            value={registerData.password}
            data-validate={`[${socialRegister === 'email' ? '"required"' : ''}]`}
            onChange={(e) => validateOnChange('password', e.target.value, e)}
            errors={getFieldErrors('password')}
            placeholder=""
          />
        </FormGroup>

        <div className="text-center mt-5">
          <Button
            className="registerBtn"
            type="submit"
            onClick={e => setSocialRegister('email')}
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
  { userLogin },
)(JoinStep);
