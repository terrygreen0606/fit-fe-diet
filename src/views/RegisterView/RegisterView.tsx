import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {
  initGoogleAuth,
  initFacebookAuth
} from 'utils';
import { getSignUpTpl, getRecipeCuisines } from 'api';

// Components
import AuthSocialHelmet from 'components/AuthSocialHelmet';
import RegisterModal from 'components/RegisterModal';
import ContentLoading from 'components/hoc/ContentLoading';

import './RegisterView.sass';

const RegisterView = (props: any) => {

  const [registerGoogleInitLoading, setRegisterGoogleInitLoading] = useState<boolean>(false);
  const [registerGoogleLoadingError, setRegisterGoogleLoadingError] = useState(false);
  const [registerFacebookInitLoading, setRegisterFacebookInitLoading] = useState<boolean>(false);

  const [registerTpl, setRegisterTpl] = useState(null);
  const [registerTplLoading, setRegisterTplLoading] = useState<boolean>(true);
  const [registerTplLoadingError, setRegisterTplLoadingError] = useState<boolean>(false);

  const [recipeCuisines, setRecipeCuisines] = useState([]);
  const [recipeCuisinesLoading, setRecipeCuisinesLoading] = useState<boolean>(false);
  const [recipeCuisinesLoadingError, setRecipeCuisinesLoadingError] = useState<boolean>(false);

  useEffect(() => {
    initGoogleAuth(setRegisterGoogleInitLoading, setRegisterGoogleLoadingError);
    initFacebookAuth(setRegisterFacebookInitLoading);
    loadRegisterTpl();
    fetchRecipeCuisines();
  }, []);

  const loadRegisterTpl = () => {
    setRegisterTplLoading(true);
    setRegisterTplLoadingError(false);

    getSignUpTpl().then((response) => {
      setRegisterTplLoading(false);

      if (response.data.data && response.data.data.tpl) {
        setRegisterTpl(response.data.data.tpl);
      }
    }).catch((error) => {
      setRegisterTplLoading(false);
      setRegisterTplLoadingError(true);
    });
  };

  const fetchRecipeCuisines = () => {
    setRecipeCuisinesLoading(true);
    setRecipeCuisinesLoadingError(false);

    getRecipeCuisines().then(response => {
      setRecipeCuisinesLoading(false);

      if (response.data && response.data.data) {
        console.log(response.data.data)
        setRecipeCuisines(response.data.data);
      }
    }).catch(error => {
      setRecipeCuisinesLoading(false);
      setRecipeCuisinesLoadingError(true);
    });
  };

  return (
    <ContentLoading
      isLoading={registerTplLoading}
      isError={registerTplLoadingError}
      fetchData={() => loadRegisterTpl()}
      spinSize='lg'
    >
      <AuthSocialHelmet />

      <RegisterModal
        isOpen={true}
        tpl={registerTpl}
        cuisines={recipeCuisines}
        cuisinesLoading={recipeCuisinesLoading}
        cuisinesLoadingError={recipeCuisinesLoadingError}
        fetchRecipeCuisines={fetchRecipeCuisines}
        facebookInitLoading={registerFacebookInitLoading}
        googleLoadingError={registerGoogleLoadingError}
        googleInitLoading={registerGoogleInitLoading}
      />
    </ContentLoading>
  );
};

export default RegisterView;
