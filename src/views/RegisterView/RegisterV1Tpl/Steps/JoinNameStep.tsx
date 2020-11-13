import React, { useState } from 'react';
import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
  getTranslate,
  getCookie,
  deleteCookie,
} from 'utils';
import { connect } from 'react-redux';
import axios from 'utils/axios';
import { toast } from 'react-toastify';
import { UserAuthProfileType } from 'types/auth';
import {
  setAppSetting as setAppSettingAction,
  setUserData as setUserDataAction,
  userLogin as userLoginAction,
} from 'store/actions';
import { InputError } from 'types';
import queryString from 'query-string';
import {
  userSignup,
  getAppSettings,
  acceptInviteToFamily,
} from 'api';

// Components
import FormGroup from 'components/common/Forms/FormGroup';
import FormLabel from 'components/common/Forms/FormLabel';
import InputField from 'components/common/Forms/InputField';
import Button from 'components/common/Forms/Button';
import FormValidator from 'utils/FormValidator';

import '../RegisterV1Tpl.sass';

import { ReactComponent as AngleLeftIcon } from 'assets/img/icons/angle-left-icon.svg';

const JoinNameStep = ({
  registerData,
  setRegisterData,
  registerDataErrors,
  setRegisterDataErrors,
  setRegisterView,
  setAppSettingAction: setAppSetting,
  setUserDataAction: setUserData,
  userLoginAction: userLogin,
  history,
  location,
  localePhrases,
}: any) => {
  const t = (code: string) =>
    getTranslate(localePhrases, code);

  const [registerJoinLoading, setRegisterJoinLoading] = useState<boolean>(false);

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

    userLogin(authToken);
    history.push('/after-signup');
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

    const act_level_checked = act_levels.find((level) => level.checked);

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

    const { ps } = queryString.parse(location.search);

    if (ps) {
      profilePayload.price_set = ps;
    }

    return {
      ...profilePayload,
    };
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

        const familyCode = getCookie('acceptFamilyCode');

        if (familyCode) {
          acceptInviteToFamily(familyCode).then((response) => {
            if (response.data.success) {
              toast.success(t('family.accept.success'));
              deleteCookie('acceptFamilyCode');
            }
          }).catch(() => toast.error(t('common.error')));
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
          } catch {}
        }
      });
  };

  const registerJoinSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const inputs = [...form.elements].filter((i) => ['INPUT', 'SELECT', 'TEXTAREA'].includes(i.nodeName));

    const { errors, hasError } = FormValidator.bulkValidate(inputs);

    setRegisterDataErrors([...errors]);

    if (!hasError) {
      registerEmail();
    }
  };

  return (
    <div className='register_v1_steps_content'>
      <AngleLeftIcon
        className='register_v1_back_icon'
        onClick={() => setRegisterView('JOIN_EMAIL')}
      />

      <h3 className='register_v1_title text-steel-blue'>
        {t('register.join_name_title')}
      </h3>

      <form className='register_join_form' onSubmit={(e) => registerJoinSubmit(e)}>
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
            readOnly={registerJoinLoading}
            data-validate='["required"]'
            onChange={(e) => validateOnChange('name', e.target.value, e)}
            errors={getFieldErrors('name')}
            placeholder={t('register.name.placeholder')}
          />
        </FormGroup>

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
            {t('register.form_next')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default connect(
  null,
  { userLoginAction, setAppSettingAction, setUserDataAction },
)(JoinNameStep);
