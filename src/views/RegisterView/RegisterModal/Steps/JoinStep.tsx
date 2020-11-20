/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
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
import requestHash from '@fingerprintjs/fingerprintjs';
import { UserAuthProfileType } from 'types/auth';
import { setAppSetting, setStorageSettings } from 'store/actions';
import queryString from 'query-string';
import { InputError } from 'types';
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

import '../RegisterModal.sass';

const JoinStep = (props: any) => {
  const { registerData } = props;

  const t = (code: string) => getTranslate(props.localePhrases, code);

  const [registerGoogleLoading, setRegisterGoogleLoading] = useState<boolean>(false);
  const [registerFacebookLoading, setRegisterFacebookLoading] = useState<boolean>(false);

  const [registerJoinLoading, setRegisterJoinLoading] = useState<boolean>(false);

  useEffect(() => {
    const currStepTitles = [...props.stepTitlesDefault];
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
      element,
    );
  };

  const getFieldErrors = (field: string) =>
    getFieldErrorsUtil(field, props.registerDataErrors)
      .map((msg) => ({
        ...msg,
        message: t('api.ecode.invalid_value'),
      }));

  const finalWelcomeStep = (authToken: string) => {
    props.setRegisterData({
      ...registerData,
      token: authToken,
    });

    props.setStorageSettings({
      isAfterSignup: true,
      afterSignupName: registerData.name,
      afterSignupGoal: registerData.goal,
      afterSignupWeight: registerData.weight,
      afterSignupWeightGoal: registerData.weight_goal,
      afterSignupPredictDate: registerData.predicted_date,
      afterSignupNameFirstSection: queryString.parse(props.location.search).firstsection,
    });

    props.setRegisterView('READY');
  };

  const getRegisterProfilePayload = (): UserAuthProfileType => {
    const {
      email,
      password,
      predicted_date,
      act_levels,
      meal_counts,
      ...userProfileData
    } = props.registerData;

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

    return {
      ...profilePayload,
    };
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
        email: props.registerData.email,
        password: '1',
        request_hash: visitorId || null,
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
                props.setAppSetting(settingsData.data);
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

              const registerDataErrorsTemp: InputError[] = [...props.registerDataErrors];

              Object.keys(validateErrors).map((field) => {
                registerDataErrorsTemp.push({
                  field,
                  message: validateErrors[field],
                });
              });

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

    props.setRegisterDataErrors([...errors]);

    if (!hasError) {
      registerEmail();
    }
  };

  return (
    <div className='register_join'>
      <h3 className='register_title mb-xl-5 mb-45 text-center'>{t('register.info_confirm_title')}</h3>

      <form className='register_join_form mt-4 px-xl-5' onSubmit={(e) => registerJoinSubmit(e)}>
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
            placeholder={t('register.name.placeholder')}
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
            data-validate='["email", "required"]'
            onChange={(e) => validateOnChange('email', e.target.value, e)}
            errors={getFieldErrors('email')}
            placeholder={t('register.email.placeholder')}
          />
        </FormGroup>

        <input type='text' name='email' className='d-none' />

        <div className='text-center mt-xl-5 mt-45'>
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
  { setAppSetting, setStorageSettings },
)(JoinStep);
