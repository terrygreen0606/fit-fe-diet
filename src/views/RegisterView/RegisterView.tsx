import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {
  initGoogleAuth,
  initFacebookAuth,
  getTranslate,
} from 'utils';
import { UserAuthProfileType } from 'types/auth';
import { getSignUpTpl, getRecipeCuisines } from 'api';

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

  const [registerTplLoading, setRegisterTplLoading] = useState<boolean>(true);
  const [registerTplLoadingError, setRegisterTplLoadingError] = useState<boolean>(false);

  const [recipeCuisinesLoading, setRecipeCuisinesLoading] = useState<boolean>(false);
  const [recipeCuisinesLoadingError, setRecipeCuisinesLoadingError] = useState<boolean>(false);

  const loadRegisterTpl = () => {
    setRegisterTplLoading(true);
    setRegisterTplLoadingError(false);

    getSignUpTpl()
      .then((response) => {
        setRegisterTplLoading(false);

        if (response.data.data && response.data.data.tpl) {
          setRegisterData({
            ...registerData,
            tpl_signup: response.data.data.tpl,
          });
        }
      }).catch((error) => {
        setRegisterTplLoading(false);
        setRegisterTplLoadingError(true);
      });
  };

  const fetchRecipeCuisines = () => {
    setRecipeCuisinesLoading(true);
    setRecipeCuisinesLoadingError(false);

    getRecipeCuisines().then((response) => {
      setRecipeCuisinesLoading(false);

      if (response.data && response.data.data) {
        setRegisterData({
          ...registerData,
          ignore_cuisine_ids: response.data.data,
        });
      }
    }).catch((error) => {
      setRecipeCuisinesLoading(false);
      setRecipeCuisinesLoadingError(true);
    });
  };

  useEffect(() => {
    initGoogleAuth(setRegisterGoogleInitLoading, setRegisterGoogleLoadingError);
    initFacebookAuth(setRegisterFacebookInitLoading);
    loadRegisterTpl();
  }, []);

  useEffect(() => {
    if (registerData.tpl_signup !== null) {
      fetchRecipeCuisines();
    }
  }, [registerData.tpl_signup]);

  return (
    <>
      <Helmet>
        <title>{t('app.title.register')}</title>
      </Helmet>

      <ContentLoading
        isLoading={registerTplLoading}
        isError={registerTplLoadingError}
        fetchData={() => loadRegisterTpl()}
        spinSize='lg'
      >
        <AuthSocialHelmet />

        <RegisterV2Tpl />

        {/*<RegisterModal
          isOpen
          registerData={registerData}
          setRegisterData={setRegisterData}
          cuisinesLoading={recipeCuisinesLoading}
          cuisinesLoadingError={recipeCuisinesLoadingError}
          fetchRecipeCuisines={fetchRecipeCuisines}
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
