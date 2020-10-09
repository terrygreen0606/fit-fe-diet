import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import {
  initGoogleAuth,
  initFacebookAuth,
  getTranslate,
} from 'utils';
import { UserAuthProfileType } from 'types/auth';
import { getSignUpData } from 'api';

// Components
import ContentLoading from 'components/hoc/ContentLoading';
import WithTranslate from 'components/hoc/WithTranslate';
import RegisterModal from './RegisterModal';
import RegisterV2Tpl from './RegisterV2Tpl';

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
  gender: null,
  measurement: 'si',
  height: null,
  weight: null,
  weight_goal: null,
  predicted_date: null,
  tpl_signup: null,
  goal: -1,
  ignore_cuisine_ids: [],
  diseases: [],
  act_levels: []
};

const RegisterView = (props: any) => {
  const t = (code: string, placeholders?: any) => getTranslate(
    props.localePhrases,
    code,
    placeholders,
  );

  const [registerData, setRegisterData] = useState({ ...registerDataDefault });
  const [registerDataErrors, setRegisterDataErrors] = useState([]);

  const [registerGoogleInitLoading, setRegisterGoogleInitLoading] = useState<boolean>(false);
  const [registerGoogleLoadingError, setRegisterGoogleLoadingError] = useState(false);
  const [registerFacebookInitLoading, setRegisterFacebookInitLoading] = useState<boolean>(false);

  const [registerSettingsLoading, setRegisterSettingsLoading] = useState<boolean>(true);
  const [registerSettingsLoadingError, setRegisterSettingsLoadingError] = useState<boolean>(false);

  const loadRegisterSettings = () => {
    setRegisterSettingsLoading(true);
    setRegisterSettingsLoadingError(false);

    getSignUpData()
      .then((response) => {
        setRegisterSettingsLoading(false);

        if (response.data.data) {
          setRegisterData({
            ...registerData,
            tpl_signup: response.data.data.tpl || null,
            act_levels: response.data.data.act_levels.map((activity) => ({
              ...activity,
              checked: false,
            })) || [],
            ignore_cuisine_ids: response.data.data.cuisines.map((cuisine) => ({
              ...cuisine,
              checked: false,
            })) || [],
            diseases: response.data.data.diseases.map((disease) => ({
              ...disease,
              checked: false,
            })) || [],

          });
        }
      })
      .catch((error) => {
        setRegisterSettingsLoading(false);
        setRegisterSettingsLoadingError(true);
      });
  };

  useEffect(() => {
    initGoogleAuth(setRegisterGoogleInitLoading, setRegisterGoogleLoadingError);
    initFacebookAuth(setRegisterFacebookInitLoading);
    loadRegisterSettings();
  }, []);

  useEffect(() => {
    if (props.measurement) {
      setRegisterData({
        ...registerData,
        measurement: props.measurement,
      });
    }
  }, [props.measurement]);

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

        <RegisterV2Tpl
          registerData={registerData}
          setRegisterData={setRegisterData}
          registerDataErrors={registerDataErrors}
          setRegisterDataErrors={setRegisterDataErrors}
          history={props.history}
        />

        {/*<RegisterModal
          isOpen
          registerData={registerData}
          setRegisterData={setRegisterData}
          registerDataErrors={registerDataErrors}
          setRegisterDataErrors={setRegisterDataErrors}
          facebookInitLoading={registerFacebookInitLoading}
          googleLoadingError={registerGoogleLoadingError}
          googleInitLoading={registerGoogleInitLoading}
          history={props.history}
        />*/}
      </ContentLoading>
    </>
  );
};

export default WithTranslate(
  connect(
    (state: any) => ({
      measurement: state.settings.measurement,
    }),
    null,
  )
(RegisterView));
