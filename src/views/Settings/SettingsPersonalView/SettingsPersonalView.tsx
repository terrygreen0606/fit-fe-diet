/* eslint-disable @typescript-eslint/indent */
/* eslint-disable react/style-prop-object */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
  getTranslate,
} from 'utils';
import { toast } from 'react-toastify';
import { InputError } from 'types';
import { fetchUserProfile, userUpdateProfile } from 'api';
import Helmet from 'react-helmet';

import { routes } from 'constants/routes';

// Components
import ProfileLayout from 'components/hoc/ProfileLayout';
import FormGroup from 'components/common/Forms/FormGroup';
import FormLabel from 'components/common/Forms/FormLabel';
import InputField from 'components/common/Forms/InputField';
import CustomCheckbox from 'components/common/Forms/CustomCheckbox';
import FormValidator from 'utils/FormValidator';
import Button from 'components/common/Forms/Button';
import ContentLoading from 'components/hoc/ContentLoading';
import WithTranslate from 'components/hoc/WithTranslate';
import Breadcrumb from 'components/Breadcrumb';

import './SettingsPersonalView.sass';

type UserUpdateProfileParams = {
  name: string;
  measurement: 'si' | 'us';
  gender: 'm' | 'f';
  surname: string;
  phone: string;
  is_mailing: boolean;
};

const SettingsPersonalView = (props: any) => {
  const { userSettings } = props;

  const [personalDataForm, setPersonalDataForm] = useState<UserUpdateProfileParams>({
    name: '',
    measurement: 'si',
    gender: 'm',
    surname: '',
    phone: '',
    is_mailing: false,
  });

  const [personalDataFormErrors, setPersonalDataFormErrors] = useState<InputError[]>([]);

  const [personalDataLoading, setPersonalDataLoading] = useState(false);
  const [personalDataLoadingError, setPersonalDataLoadingError] = useState(
    false,
  );
  const [updatePersonalDataLoading, setUpdatePersonalDataLoading] = useState(
    false,
  );

  const fetchUserPersonalData = () => {
    setPersonalDataLoadingError(false);
    setPersonalDataLoading(true);

    fetchUserProfile()
      .then((response) => {
        setPersonalDataLoading(false);

        if (response.data && response.data.data) {
          const profileResponse = response.data.data;

          setPersonalDataForm({
            ...personalDataForm,
            name: profileResponse.name,
            measurement: userSettings.measurement,
            gender: profileResponse.gender,
            surname: profileResponse.surname,
            phone: profileResponse.phone,
            is_mailing: profileResponse.is_mailing,
          });
        }
      })
      .catch(() => {
        setPersonalDataLoading(false);
        setPersonalDataLoadingError(true);
      });
  };

  useEffect(() => {
    fetchUserPersonalData();
  }, []);

  const validateOnChange = (name: string, value: any, event, element?) => {
    validateFieldOnChange(
      name,
      value,
      event,
      personalDataForm,
      setPersonalDataForm,
      personalDataFormErrors,
      setPersonalDataFormErrors,
      element,
    );
  };

  const getFieldErrors = (field: string) =>
    getFieldErrorsUtil(field, personalDataFormErrors);

  const t = (code: string, placeholders?: any) =>
    getTranslate(props.localePhrases, code, placeholders);

  const getPersonalDataUpdatePayload = () => ({
    name: personalDataForm.name,
    measurement: personalDataForm.measurement,
    gender: personalDataForm.gender,
    surname: personalDataForm.surname,
    phone: personalDataForm.phone,
    is_mailing: personalDataForm.is_mailing,
  });

  const personalDataFormSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const inputs = [...form.elements].filter((i) =>
      ['INPUT', 'SELECT', 'TEXTAREA'].includes(i.nodeName));

    const { errors, hasError } = FormValidator.bulkValidate(inputs);

    setPersonalDataFormErrors([...errors]);

    if (!hasError) {
      setUpdatePersonalDataLoading(true);

      userUpdateProfile(getPersonalDataUpdatePayload())
        .then(() => {
          setUpdatePersonalDataLoading(false);
          toast.success(t('profile.personal_success'));
        })
        .catch((error) => {
          setUpdatePersonalDataLoading(false);
          toast.error(t('profile.personal_error'));

          if (error.response && error.response.status >= 400 && error.response.status < 500) {
            try {
              const validateErrors = JSON.parse(error.response.data.message);

              let formErrorsTemp: InputError[] = [...personalDataFormErrors];

              Object.keys(validateErrors).map((field) => {
                formErrorsTemp.push({
                  field,
                  message: validateErrors[field],
                });
              });

              setPersonalDataFormErrors(formErrorsTemp);
            } catch {

            }
          }
        });
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('app.title.settings_personal')}</title>
      </Helmet>
      <div className='container'>
        <Breadcrumb
          routes={[
            {
              url: routes.main,
              name: t('breadcrumb.main'),
            },
          ]}
          currentPage={t('app.title.settings_personal')}
        />
      </div>
      <ProfileLayout>
        <div className='profile-settings-personal-card card-bg'>
          <h2 className='mb-4 mb-xs-5'>{t('profile.personal_title')}</h2>

          <ContentLoading
            fetchData={() => fetchUserPersonalData()}
            isLoading={personalDataLoading}
            isError={personalDataLoadingError}
          >
            <form
              className='profile-settings-personal-form'
              onSubmit={(e) => personalDataFormSubmit(e)}
            >

              <FormGroup inline>
                <FormLabel>{t('register.form_name')}</FormLabel>
                <InputField
                  name='name'
                  data-validate='["required"]'
                  errors={getFieldErrors('name')}
                  value={personalDataForm.name}
                  onChange={(e) => validateOnChange('name', e.target.value, e)}
                  block
                  height='md'
                  placeholder=''
                />
              </FormGroup>

              <FormGroup inline>
                <FormLabel>{t('register.form_surname')}</FormLabel>
                <InputField
                  name='surname'
                  data-validate='["required"]'
                  errors={getFieldErrors('surname')}
                  value={personalDataForm.surname}
                  onChange={(e) =>
                    validateOnChange('surname', e.target.value, e)}
                  block
                  height='md'
                  placeholder=''
                />
              </FormGroup>

              <FormGroup inline>
                <FormLabel>{t('register.form_phone')}</FormLabel>
                <InputField
                  name='phone'
                  data-validate='["required", "number"]'
                  errors={getFieldErrors('phone')}
                  value={personalDataForm.phone}
                  onChange={(e) =>
                    validateOnChange('phone', e.target.value, e)}
                  block
                  height='md'
                  placeholder=''
                />
              </FormGroup>

              <div className='pl-xs-5'>
                <FormGroup className='mt-5'>
                  <CustomCheckbox
                    label={t('register.form_receive_news')}
                    inline
                    checked={personalDataForm.is_mailing}
                    onChange={(e) =>
                      setPersonalDataForm({
                        ...personalDataForm,
                        is_mailing: e.target.checked,
                      })}
                  />
                </FormGroup>

                <Button
                  className='mt-2 mt-xs-3 profile-settings-personal-form-btn'
                  type='submit'
                  color='primary'
                  isLoading={updatePersonalDataLoading}
                >
                  {t('button.save')}
                </Button>
              </div>
            </form>
          </ContentLoading>
        </div>
      </ProfileLayout>
    </>
  );
};

export default WithTranslate(connect(
  (state: any) => ({
    userSettings: state.settings,
  }),
)(SettingsPersonalView));
