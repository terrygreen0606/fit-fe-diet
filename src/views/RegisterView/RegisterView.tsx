import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {
  initGoogleAuth,
  initFacebookAuth,
  getTranslate,
} from 'utils';
import { UserAuthProfileType } from 'types/auth';
import { getSignUpData } from 'api';

// Components
import AuthSocialHelmet from 'components/AuthSocialHelmet';
import RegisterModal from './RegisterModal';
import RegisterV2Tpl from './RegisterV2Tpl';
import ContentLoading from 'components/hoc/ContentLoading';
import WithTranslate from 'components/hoc/WithTranslate';

import './RegisterView.sass';

interface RegisterDataType extends UserAuthProfileType {
  email: string;
  password: string;
  predicted_date: string;
  token: string;
}

const registerDataDefault: RegisterDataType = {
  email: '',
  password: '',
  name: '',
  surname: '',
  phone: '',
  token: null,
  age: null,
  gender: 'm',
  measurement: 'si',
  height: null,
  weight: null,
  weight_goal: null,
  predicted_date: null,
  tpl_signup: null,
  goal: -1,
  ignore_cuisine_ids: [],
  diseases: []
};

const RegisterView = (props: any) => {
  const t = (code: string, placeholders?: any) => getTranslate(
    props.localePhrases,
    code,
    placeholders,
  );

  const [registerData, setRegisterData] = useState({ ...registerDataDefault });

  const [registerGoogleInitLoading, setRegisterGoogleInitLoading] = useState<boolean>(false);
  const [registerGoogleLoadingError, setRegisterGoogleLoadingError] = useState(false);
  const [registerFacebookInitLoading, setRegisterFacebookInitLoading] = useState<boolean>(false);

  const [registerSettingsLoading, setRegisterSettingsLoading] = useState<boolean>(true);
  const [registerSettingsLoadingError, setRegisterSettingsLoadingError] = useState<boolean>(false);

  const loadRegisterSettings = () => {
    setRegisterSettingsLoading(true);
    setRegisterSettingsLoadingError(false);

    getSignUpData()
      .then(response => {
        setRegisterSettingsLoading(false);

        if (response.data.data) {
          setRegisterData({
            ...registerData,
            tpl_signup: response.data.data.tpl || null,
            ignore_cuisine_ids: response.data.data.cuisines || [],
            diseases: response.data.data.diseases.map(disease => ({
              ...disease,
              checked: false
            })) || []

          });
        }
      })
      .catch(error => {
        setRegisterSettingsLoading(false);
        setRegisterSettingsLoadingError(true);
      });
  };

  useEffect(() => {
    initGoogleAuth(setRegisterGoogleInitLoading, setRegisterGoogleLoadingError);
    initFacebookAuth(setRegisterFacebookInitLoading);
    loadRegisterSettings();
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('app.title.register')}</title>
      </Helmet>

      <ContentLoading
        isLoading={registerSettingsLoading}
        isError={registerSettingsLoadingError}
        fetchData={() => loadRegisterSettings()}
        spinSize='lg'
      >
        <AuthSocialHelmet />

        <RegisterV2Tpl />

        {/*<RegisterModal
          isOpen
          registerData={registerData}
          setRegisterData={setRegisterData}
          facebookInitLoading={registerFacebookInitLoading}
          googleLoadingError={registerGoogleLoadingError}
          googleInitLoading={registerGoogleInitLoading}
        />*/}

        <RegisterV2Tpl />
      </ContentLoading>
    </>
  );
};

export default WithTranslate(RegisterView);
