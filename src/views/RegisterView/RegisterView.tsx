import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { getTranslate } from 'utils';
import { UserAuthProfileType } from 'types/auth';
import queryString from 'query-string';
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
  act_levels: [],
  meal_counts: [],
};

const RegisterView = ({
  history,
  location,
  measurement,
  localePhrases,
}: any) => {
  const t = (code: string, placeholders?: any) => getTranslate(
    localePhrases,
    code,
    placeholders,
  );

  const [registerData, setRegisterData] = useState({ ...registerDataDefault });
  const [registerDataErrors, setRegisterDataErrors] = useState([]);

  const [registerSettings, setRegisterSettings] = useState(null);
  const [registerSettingsLoading, setRegisterSettingsLoading] = useState<boolean>(true);
  const [registerSettingsLoadingError, setRegisterSettingsLoadingError] = useState<boolean>(false);

  const loadRegisterSettings = () => {
    setRegisterSettingsLoading(true);
    setRegisterSettingsLoadingError(false);

    getSignUpData()
      .then(({ data: responseData }) => {
        const { data, success } = responseData;

        setRegisterSettingsLoading(false);

        if (success && data) {
          setRegisterSettings(data);

          setRegisterData({
            ...registerData,
            // tpl_signup: data.tpl || null,
            tpl_signup: queryString.parse(location.search).tpl === '2' ? 2 : 1,
            act_levels: data.act_levels && data.act_levels.length ?
              data.act_levels.map((activity) => ({
                ...activity,
                checked: false,
              }))
            : [],
            ignore_cuisine_ids: data.cuisines && data.cuisines.length ?
              data.cuisines.map((cuisine) => ({
                ...cuisine,
                checked: false,
              }))
            : [],
            diseases: data.diseases && data.diseases.length ?
              data.diseases.map((disease) => ({
                ...disease,
                checked: false,
              }))
            : [],
            meal_counts: data.meal_counts && data.meal_counts.length ?
              data.meal_counts.map((meal_count) => ({
                ...meal_count,
                checked: false,
              }))
            : [],
          });
        }
      })
      .catch(() => {
        setRegisterSettingsLoading(false);
        setRegisterSettingsLoadingError(true);
      });
  };

  useEffect(() => {
    loadRegisterSettings();
  }, []);

  useEffect(() => {
    if (measurement) {
      setRegisterData({
        ...registerData,
        measurement,
      });
    }
  }, [measurement]);

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

      {queryString.parse(location.search).tpl === '2' ? (
        <RegisterV2Tpl
          registerData={registerData}
          setRegisterData={setRegisterData}
          registerDataErrors={registerDataErrors}
          setRegisterDataErrors={setRegisterDataErrors}
          location={location}
          history={history}
        />
      ) : (
        <RegisterModal
          isOpen
          registerData={registerData}
          setRegisterData={setRegisterData}
          registerDataErrors={registerDataErrors}
          setRegisterDataErrors={setRegisterDataErrors}
          location={location}
          history={history}
        />
      )}
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
