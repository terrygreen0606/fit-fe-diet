/* eslint-disable @typescript-eslint/indent */
/* eslint-disable react/style-prop-object */
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
  getTranslate,
} from 'utils';
import { toast } from 'react-toastify';
import { fetchUserProfile, userUpdateProfile } from 'api';
import Helmet from 'react-helmet';

import { routes } from 'constants/routes';

// Components
import ProfileLayout from 'components/hoc/ProfileLayout';
import FormGroup from 'components/common/Forms/FormGroup';
import FormLabel from 'components/common/Forms/FormLabel';
import InputField from 'components/common/Forms/InputField';
import CustomRadio from 'components/common/Forms/CustomRadio';
import CustomCheckbox from 'components/common/Forms/CustomCheckbox';
import FormValidator from 'utils/FormValidator';
import Button from 'components/common/Forms/Button';
import ContentLoading from 'components/hoc/ContentLoading';
import WithTranslate from 'components/hoc/WithTranslate';
import Breadcrumb from 'components/Breadcrumb';

import './SettingsPersonalView.sass';

import { ReactComponent as MaleIcon } from 'assets/img/icons/male-icon.svg';
import { ReactComponent as FemaleIcon } from 'assets/img/icons/female-icon.svg';

type GoalType = -1 | 0 | 1; // -1 => Lose weight, 0 => Keep the weight, 1 => Lift the weight

type GoalOptionsType = {
  value: GoalType;
  label: string;
};

const goalOptions: GoalOptionsType[] = [
  { value: 1, label: 'Lift weight' },
  { value: 0, label: 'Keep weight' },
  { value: -1, label: 'Lose weight' },
];

// const calorieOptions = [
//   { value: 100, label: '1000' },
//   { value: 2000, label: '2000' },
//   { value: 3000, label: '3000' },
// ];

type UserUpdateProfileParams = {
  name: string;
  surname: string;
  phone: string;
  birthdate: Date; // date
  height: number; // millimeters
  is_mailing: boolean;
  measurement: 'si' | 'us';
  password: string;
  image: string;
  gender: 'm' | 'f';
  goal: GoalType;
};

const SettingsPersonalView = (props: any) => {
  const [personalDataForm, setPersonalDataForm] = useState<
    UserUpdateProfileParams
  >({
    name: '',
    surname: '',
    phone: '',
    birthdate: null,
    height: null,
    is_mailing: false,
    measurement: 'si',
    password: '',
    image: null,
    gender: 'm',
    goal: goalOptions[2].value,
  });

  const [personalDataFormErrors, setPersonalDataFormErrors] = useState([]);

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
            surname: profileResponse.surname,
            phone: profileResponse.phone,
            gender: profileResponse.gender,
            height: profileResponse.height,
            is_mailing: profileResponse.is_mailing,
            goal: profileResponse.goal,
            image: profileResponse.image,
            birthdate: new Date(new Date().setTime(profileResponse.birthdate)),
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
    surname: personalDataForm.surname,
    phone: personalDataForm.phone,
    birthdate: new Date(personalDataForm.birthdate).getTime(),
    gender: personalDataForm.gender,
    is_mailing: personalDataForm.is_mailing,
    measurement: personalDataForm.measurement,
    height: personalDataForm.height,
    goal: personalDataForm.goal,
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
        .catch(() => {
          setUpdatePersonalDataLoading(false);
          toast.error(t('profile.personal_error'));
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
          <h5 className='mb-4 mb-xs-5'>{t('profile.personal_title')}</h5>

          <ContentLoading
            fetchData={() => fetchUserPersonalData()}
            isLoading={personalDataLoading}
            isError={personalDataLoadingError}
          >
            <form
              className='profile-settings-personal-form'
              onSubmit={(e) => personalDataFormSubmit(e)}
            >
              <FormGroup inline className='mb-5'>
                <FormLabel>{t('register.form_sex')}</FormLabel>

                <CustomRadio
                  name='register_sex'
                  label={(
                    <>
                      <MaleIcon
                        className={classNames('genderIcon', {
                          genderIcon_active: personalDataForm.gender === 'm',
                        })}
                      />

                      {t('register.form_male')}
                    </>
                  )}
                  value='m'
                  checked={personalDataForm.gender === 'm'}
                  inline
                  onChange={(e) =>
                    setPersonalDataForm({
                      ...personalDataForm,
                      gender: e.target.value,
                    })}
                />

                <CustomRadio
                  name='register_sex'
                  label={(
                    <>
                      <FemaleIcon
                        className={classNames('genderIcon', {
                          genderIcon_active: personalDataForm.gender === 'f',
                        })}
                      />

                      {t('register.form_female')}
                    </>
                  )}
                  value='f'
                  checked={personalDataForm.gender === 'f'}
                  inline
                  onChange={(e) =>
                    setPersonalDataForm({
                      ...personalDataForm,
                      gender: e.target.value,
                    })}
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

              {/* <FormGroup inline>
                <FormLabel>Password</FormLabel>
                <InputField
                  name="password"
                  type="password"
                  data-validate='["required"]'
                  errors={getFieldErrors('password')}
                  value={personalDataForm.password}
                  onChange={e => validateOnChange('password', e.target.value, e)}
                  block
                  height="md"
                  placeholder=""
                />
              </FormGroup> */}

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
                  color='secondary'
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

export default WithTranslate(SettingsPersonalView);
