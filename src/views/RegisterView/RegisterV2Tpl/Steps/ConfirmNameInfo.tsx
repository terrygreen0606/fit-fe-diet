import React, { useState } from 'react';
import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
  getTranslate,
  getCookie,
  deleteCookie,
} from 'utils';
import { connect } from 'react-redux';
import {
  userLogin as userLoginAction,
  setStorageSettings as setStorageSettingsAction,
} from 'store/actions';
import axios from 'utils/axios';
import { toast } from 'react-toastify';
import queryString from 'query-string';
import requestHash from '@fingerprintjs/fingerprintjs';
import { UserAuthProfileType, InputError } from 'types';
import { routes } from 'constants/routes';
import { userSignup, acceptInviteToFamily } from 'api';

// Components
import FormGroup from 'components/common/Forms/FormGroup';
import FormLabel from 'components/common/Forms/FormLabel';
import InputField from 'components/common/Forms/InputField';
import Button from 'components/common/Forms/Button';
import FormValidatorUtil from 'utils/FormValidator';

import '../RegisterV2Tpl.sass';

const ConfirmInfo = ({
  registerData,
  setRegisterData,
  registerDataErrors,
  setRegisterDataErrors,
  setRegisterView,
  userLoginAction: userLogin,
  setStorageSettingsAction: setStorageSettings,
  history,
  location,
  localePhrases,
}: any) => {
  const t = (code: string, placeholders?: any) =>
    getTranslate(localePhrases, code, placeholders);

  const [registerJoinLoading, setRegisterJoinLoading] = useState<boolean>(false);
  const [isShowValidateErrors, setShowValidateErrors] = useState<boolean>(false);

  const FormValidator = FormValidatorUtil(localePhrases);

  const validateOnChange = (name: string, value: any, event, element?) => {
    validateFieldOnChange(
      name,
      value,
      event,
      registerData,
      setRegisterData,
      registerDataErrors,
      setRegisterDataErrors,
      localePhrases,
      element,
    );
  };

  const getFieldErrors = (field: string) => (isShowValidateErrors
    ? getFieldErrorsUtil(field, registerDataErrors)
    : []);

  const isFieldValid = (field: string) =>
    getFieldErrorsUtil(field, registerDataErrors).length === 0 &&
      registerData[field] &&
      registerData[field].length > 0;

  const getRegisterProfilePayload = (): UserAuthProfileType => {
    const {
      email,
      password,
      act_levels,
      predicted_date,
      meal_counts,
      ...userProfileData
    } = registerData;

    let act_level = null;

    const act_level_checked = act_levels.find((level) => level.checked);

    if (act_level_checked) {
      act_level = act_level_checked.value;
    }

    let meals_cnt = null;

    const meals_cnt_checked = meal_counts.find((meal_count) => meal_count.checked);

    if (meals_cnt_checked) {
      meals_cnt = meals_cnt_checked.value;
    }

    const profilePayload = {
      ...userProfileData,
      act_level,
      meals_cnt,
      ignore_cuisine_ids: userProfileData.ignore_cuisine_ids.map((cuisine) => cuisine.id),
      diseases: userProfileData.diseases
        .filter((disease) => disease.checked)
        .map((disease) => disease.code),
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

  const finalWelcomeStep = (authToken: string) => {
    localStorage.setItem('FITLOPE_AUTH_TOKEN', authToken);
    axios.defaults.headers.common.Authorization = `Bearer ${authToken}`;

    setRegisterData({
      ...registerData,
      token: authToken,
    });

    setStorageSettings({
      isAfterSignup: true,
      afterSignupName: registerData.name,
      afterSignupGoal: registerData.goal,
      afterSignupWeight: registerData.weight,
      afterSignupWeightGoal: registerData.weight_goal,
      afterSignupPredictDate: registerData.predicted_date,
      afterSignupNameFirstSection: queryString.parse(location.search).firstsection,
    });

    const queryParametersObj = queryString.parse(window.location.search);

    let nextSearch = null;

    if (queryParametersObj.lang || queryParametersObj._by_ip) {
      nextSearch = window.location.search;
    } else {
      nextSearch = '';
    }

    history.replace({
      pathname: history.location.pathname,
      state: {
        ...location.state || {},
        nextPathname: routes.registerWelcome,
        nextSearch,
      },
    });

    userLogin(authToken);
  };

  const registerEmail = () => {
    setRegisterJoinLoading(true);
    (async () => {
      // We recommend to call `load` at application startup.
      const requestHashData = await requestHash.load();

      // The FingerprintJS agent is ready.
      // Get a visitor identifier when you'd like to.
      const result = await requestHashData.get();

      // This is the visitor identifier:
      const { visitorId } = result;

      userSignup({
        email: registerData.email,
        password: '1',
        request_hash: visitorId || null,
        ...getRegisterProfilePayload(),
      }).then((response) => {
        setRegisterJoinLoading(false);

        const token =
          response.data && response.data.access_token
            ? response.data.access_token
            : null;

        if (token) {
          finalWelcomeStep(token);
        } else {
          toast.error(t('register.error_msg'));
        }

        const familyCode = getCookie('acceptFamilyCode');

        if (familyCode) {
          acceptInviteToFamily(familyCode).then((res) => {
            if (res.data.success) {
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
                setRegisterView('GENDER');
              } else if (validateErrors.height || validateErrors.weight) {
                setRegisterView('HEIGHT_WEIGHT');
              } else if (validateErrors.weight_goal) {
                setRegisterView('WEIGHT_GOAL');
              }
            } catch { }
          }
        });
    })();
  };

  const registerJoinSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const inputs = [...form.elements].filter((i) => ['INPUT', 'SELECT', 'TEXTAREA'].includes(i.nodeName));

    const { errors, hasError } = FormValidator.bulkValidate(inputs);

    setRegisterDataErrors([...errors]);

    if (!isShowValidateErrors) {
      setShowValidateErrors(true);
    }

    if (!hasError) {
      registerEmail();
    }
  };

  return (
    <>
      <h1 className='register_title mb-md-5 text-center'>{t('register.info_confirm_title')}</h1>

      <div className='row'>
        <div className='col-xs-10 offset-xs-1 col-md-8 offset-md-2 px-md-4'>

          <form className='text-left mt-4 px-xl-5' onSubmit={(e) => registerJoinSubmit(e)}>
            <FormGroup>
              <FormLabel>
                {t('register.form_name')}
                *
              </FormLabel>
              <InputField
                block
                name='name'
                autoFocus
                value={registerData.name}
                readOnly={registerJoinLoading}
                data-validate='["required"]'
                onChange={(e) => validateOnChange('name', e.target.value, e)}
                errors={getFieldErrors('name')}
                isValid={isFieldValid('name')}
                placeholder={t('register.name.placeholder')}
              />
            </FormGroup>

            <div className='text-center'>
              <Button
                className='register_v2_btn mt-5'
                style={{ maxWidth: '355px' }}
                color='primary'
                type='submit'
                size='lg'
                block
                isLoading={registerJoinLoading}
              >
                {t('register.form_next')}
              </Button>
            </div>
          </form>

        </div>
      </div>
    </>
  );
};

export default connect(
  null,
  { userLoginAction, setStorageSettingsAction },
)(ConfirmInfo);
