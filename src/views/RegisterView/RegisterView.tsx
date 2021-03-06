import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { getTranslate } from 'utils';
import { UserAuthProfileType, InputError } from 'types';
import queryString from 'query-string';
import { getSignUpData } from 'api';

// Components
import ContentLoading from 'components/hoc/ContentLoading';
import WithTranslate from 'components/hoc/WithTranslate';
import RegisterModal from './RegisterModal';
import RegisterV1Tpl from './RegisterV1Tpl';
import RegisterV2Tpl from './RegisterV2Tpl';
import { getFieldErrorMsg } from './getFieldErrorMsg';

import './RegisterView.sass';

interface RegisterDataType extends UserAuthProfileType {
  email: string;
  password: string;
  predicted_date: string;
  token: string;
  feet?: number;
  inches?: number;
  tpl_signup: number;
}

const registerDataDefault: RegisterDataType = {
  email: '',
  password: '1',
  name: '',
  surname: '',
  phone: '',
  token: null,
  age: null,
  gender: null,
  measurement: null,
  height: null,
  weight: null,
  weight_goal: null,
  predicted_date: null,
  tpl_signup: null,
  ignore_cuisine_ids: [],
  diseases: [],
  act_levels: [],
  meal_counts: [],
  feet: null,
  inches: null,
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

  const [registerData, setRegisterData] = useState({
    ...registerDataDefault,
    measurement: measurement || 'si',
  });
  const [registerDataErrors, setRegisterDataErrors] = useState<InputError[]>([]);
  const [registerSettingsLoading, setRegisterSettingsLoading] = useState<boolean>(true);
  const [registerSettingsLoadingError, setRegisterSettingsLoadingError] = useState<boolean>(false);

  const loadRegisterSettings = () => {
    setRegisterSettingsLoading(true);
    setRegisterSettingsLoadingError(false);

    getSignUpData()
      .then(({ data }) => {
        setRegisterSettingsLoading(false);

        if (data.success && data.data) {
          const response = data.data;

          setRegisterData({
            ...registerData,
            tpl_signup: queryString.parse(location.search).tpl === '2' ? 2 : 1,
            act_levels: response.act_levels && response.act_levels.length ?
              response.act_levels.map((activity) => ({
                ...activity,
                checked: null,
              }))
            : [],
            ignore_cuisine_ids: response.cuisines && response.cuisines.length ?
              response.cuisines.map((cuisine) => ({
                ...cuisine,
                checked: null,
              }))
            : [],
            diseases: response.diseases && response.diseases.length ?
              response.diseases.map((disease) => ({
                ...disease,
                checked: null,
              }))
            : [],
            meal_counts: response.meal_counts && response.meal_counts.length ?
              response.meal_counts.map((meal_count) => ({
                ...meal_count,
                checked: null,
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

  const getRegisterDataErrors = React.useCallback(() => {
    return registerDataErrors.map((error) => ({
      ...error,
      message: getFieldErrorMsg(
        error.field,
        registerData.measurement,
        localePhrases,
      ) || error.message,
    }));
  }, [registerDataErrors]);

  const getRegisterView = () => {
    const { tpl } = queryString.parse(location.search);
    let registerView = null;

    switch (tpl) {
      case '1':
        registerView = (
          <RegisterV1Tpl
            registerData={registerData}
            setRegisterData={setRegisterData}
            registerDataErrors={getRegisterDataErrors()}
            setRegisterDataErrors={setRegisterDataErrors}
            location={location}
            history={history}
          />
        );
        break;

      case '2':
        registerView = (
          <RegisterV2Tpl
            registerData={registerData}
            setRegisterData={setRegisterData}
            registerDataErrors={getRegisterDataErrors()}
            setRegisterDataErrors={setRegisterDataErrors}
            location={location}
            history={history}
          />
        );
        break;

      case '3':
        registerView = (
          <RegisterModal
            isOpen
            registerData={registerData}
            setRegisterData={setRegisterData}
            registerDataErrors={getRegisterDataErrors()}
            setRegisterDataErrors={setRegisterDataErrors}
            location={location}
            history={history}
          />
        );
        break;

      default:
        registerView = (
          <RegisterV1Tpl
            registerData={registerData}
            setRegisterData={setRegisterData}
            registerDataErrors={getRegisterDataErrors()}
            setRegisterDataErrors={setRegisterDataErrors}
            location={location}
            history={history}
          />
        );
    }

    return registerView;
  };

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
        {getRegisterView()}
      </ContentLoading>
    </>
  );
};

export default WithTranslate(connect(
  (state: any) => ({
    measurement: state.settings.measurement,
  }),
  null,
)(RegisterView));
