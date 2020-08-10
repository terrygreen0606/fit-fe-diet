import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
  getTranslate,
  initGoogleAuth as initGoogleAuthUtil,
  initFacebookAuth as initFacebookAuthUtil,
  wait
} from 'utils';
import { toast } from 'react-toastify';
import { fetchUserProfile, userUpdateProfile } from 'api';

// Components
import ProfileLayout from 'components/hoc/ProfileLayout';
import FormGroup from 'components/common/Forms/FormGroup';
import FormLabel from 'components/common/Forms/FormLabel';
import InputField from 'components/common/Forms/InputField';
import SelectInput from 'components/common/Forms/SelectInput';
import CustomRadio from 'components/common/Forms/CustomRadio';
import CustomCheckbox from 'components/common/Forms/CustomCheckbox';
import FormValidator from 'utils/FormValidator';
import Button from 'components/common/Forms/Button';
import ContentLoading from 'components/hoc/ContentLoading';
import WithTranslate from 'components/hoc/WithTranslate';

import './SettingsPersonalView.sass';

import { ReactComponent as MaleIcon } from 'assets/img/icons/male-icon.svg';
import { ReactComponent as FemaleIcon } from 'assets/img/icons/female-icon.svg';

const purposeOptions: { value: -1 | 0 | 1, label: string }[] = [
  { value: 1, label: 'Lift weight' },
  { value: 0, label: 'Keep weight' },
  { value: -1, label: 'Lose weight' }
];

const calorieOptions = [
  { value: 100, label: '1000' },
  { value: 2000, label: '2000' },
  { value: 3000, label: '3000' }
];

type userUpdateProfileParams = {
  name: string,
  surname: string,
  phone: string,
  birthdate: number, // timestamp
  gender: 'm' | 'f',
  height: number, // millimeters
  goal: -1 | 0 | 1 // -1 => Lose weight, 0 => Keep the weight, 1 => Lift the weight
};

const SettingsPersonalView = (props: any) => {

  const [personalDataForm, setPersonalDataForm] = useState<userUpdateProfileParams>({
    name: '',
    surname: '',
    phone: '',
    birthdate: null,
    height: null,
    is_mailing: false,
    age: '',
    password: '',
    image: null,
    gender: 'm',
    goal: purposeOptions[2].value,
    calorie: calorieOptions[0].value
  });

  const [personalDataFormErrors, setPersonalDataFormErrors] = useState([]);

  const [personalDataLoading, setPersonalDataLoading] = useState(false);
  const [personalDataLoadingError, setPersonalDataLoadingError] = useState(false);
  const [savePersonalDataLoading, setSavePersonalDataLoading] = useState(false);

  useEffect(() => {
    fetchUserPersonalData();
  }, []);

  const fetchUserPersonalData = () => {
    setPersonalDataLoadingError(false);
    setPersonalDataLoading(true);

    fetchUserProfile().then(response => {
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
          birthdate: profileResponse.birthdate
        });
      }
    }).catch(error => {
      setPersonalDataLoading(false);
      setPersonalDataLoadingError(true);
    });
  };

  const validateOnChange = (name: string, value: any, event, element?) => {
    validateFieldOnChange(
      name,
      value,
      event,
      personalDataForm,
      setPersonalDataForm,
      personalDataFormErrors,
      setPersonalDataFormErrors,
      element
    );
  };

  const getFieldErrors = (field: string) => getFieldErrorsUtil(field, personalDataFormErrors);

  const t = (code: string, placeholders?: any) => getTranslate(props.localePhrases, code, placeholders);

  const getPersonalDataUpdatePayload = () => {
    return {
      name: personalDataForm.name,
      surname: personalDataForm.surname,
      phone: personalDataForm.phone,
      birthdate: personalDataForm.birthdate,
      gender: personalDataForm.gender,
      height: personalDataForm.height,
      goal: personalDataForm.goal,
    };
  };

  const personalDataFormSubmit = e => {
    e.preventDefault();

    const form = e.target;
    const inputs = [...form.elements].filter(i => ['INPUT', 'SELECT', 'TEXTAREA'].includes(i.nodeName));

    const { errors, hasError } = FormValidator.bulkValidate(inputs);

    setPersonalDataFormErrors([...errors]);

    if (!hasError) {
      setSavePersonalDataLoading(true);

      userUpdateProfile(getPersonalDataUpdatePayload()).then(response => {

      }).catch(error => {

      });
    }
  };

  return (
    <ProfileLayout>
      <div className="profile-settings-personal-card card-bg">
        <h5 className="mb-5">Personal Data</h5>

        <ContentLoading
          fetchData={() => fetchUserPersonalData()}
          isLoading={personalDataLoading}
          isError={false}
        >
          <form onSubmit={e => personalDataFormSubmit(e)}>
            <FormGroup inline>
              <FormLabel>Sex</FormLabel>

              <CustomRadio 
                name="register_sex" 
                label={
                  <>
                    <MaleIcon 
                      className={classNames("genderIcon", {
                        "genderIcon_active": personalDataForm.gender === 'm'
                      })}
                    />

                    Male
                  </>
                }
                value="m"
                checked={personalDataForm.gender === 'm'}
                inline
                onChange={e => setPersonalDataForm({
                    ...personalDataForm,
                    gender: e.target.value
                  })
                }
              />

              <CustomRadio 
                name="register_sex" 
                label={
                  <>
                    <FemaleIcon 
                      className={classNames("genderIcon", {
                        "genderIcon_active": personalDataForm.gender === 'f'
                      })}
                    />

                    Female
                  </>
                }
                value="f"
                checked={personalDataForm.gender === 'f'}
                inline
                onChange={e => setPersonalDataForm({
                    ...personalDataForm,
                    gender: e.target.value
                  })
                }
              />
            </FormGroup>

            <FormGroup inline>
              <FormLabel>Surname</FormLabel>
              <InputField
                name="surname"
                data-validate='["required"]'
                errors={getFieldErrors('surname')}
                value={personalDataForm.surname}
                onChange={e => validateOnChange('surname', e.target.value, e)}
                block
                placeholder=""
              />
            </FormGroup>

            <FormGroup inline>
              <FormLabel>Name</FormLabel>
              <InputField
                name="name"
                data-validate='["required"]'
                errors={getFieldErrors('name')}
                value={personalDataForm.name}
                onChange={e => validateOnChange('name', e.target.value, e)}
                block
                placeholder=""
              />
            </FormGroup>

            <FormGroup inline>
              <FormLabel>Phone</FormLabel>
              <InputField
                name="phone"
                data-validate='["required", "number"]'
                errors={getFieldErrors('phone')}
                value={personalDataForm.phone}
                onChange={e => validateOnChange('phone', e.target.value, e)}
                block
                placeholder=""
              />
            </FormGroup>

            <FormGroup inline>
              <FormLabel>Age</FormLabel>
              <InputField
                name="age"
                type="number"
                min={1}
                data-validate='["required"]'
                errors={getFieldErrors('age')}
                value={personalDataForm.age}
                onChange={e => validateOnChange('age', e.target.value, e)}
                block
                placeholder=""
              />
            </FormGroup>

            <FormGroup inline>
              <FormLabel>Length (cm)</FormLabel>
              <InputField
                name="height"
                errors={getFieldErrors('height')}
                value={personalDataForm.height}
                data-param="50,250"
                data-validate='["required", "min-max"]'
                onChange={e => validateOnChange('height', e.target.value, e)}
                block
                placeholder=""
              />
            </FormGroup>

            <FormGroup inline>
              <FormLabel>Purpose</FormLabel>
              <SelectInput 
                value={purposeOptions.find(option => option.value === personalDataForm.goal)} 
                options={purposeOptions}
                onChange={(option, e) => validateOnChange('goal', option, e)}
              />  
            </FormGroup>

            <FormGroup inline>
              <FormLabel>Password</FormLabel>
              <InputField
                name="password"
                type="password"
                data-validate='["required"]'
                errors={getFieldErrors('password')}
                value={personalDataForm.password}
                onChange={e => validateOnChange('password', e.target.value, e)}
                block
                placeholder=""
              />
            </FormGroup>

            <FormGroup inline>
              <FormLabel>Calorie</FormLabel>
              <SelectInput
                name="calorie"
                value={calorieOptions.find(option => option.value === personalDataForm.calorie)}
                data-validate='["required"]'
                errors={getFieldErrors('calorie')}
                options={calorieOptions}
                onChange={(option, e) => validateOnChange('calorie', option.value, e)}
                placeholder="Select..."
              />
            </FormGroup>

            <CustomCheckbox 
              label="I want to receive newsletters" 
              checked={personalDataForm.is_mailing}
              onChange={e => setPersonalDataForm({
                ...personalDataForm,
                is_mailing: e.target.checked
              })}
            />

            <Button type="submit" color="secondary" isLoading={savePersonalDataLoading}>Save</Button>
          </form>          
        </ContentLoading>
      </div>      
    </ProfileLayout>
  );
};

export default WithTranslate(SettingsPersonalView);
