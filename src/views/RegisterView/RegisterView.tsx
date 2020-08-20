import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { initGoogleAuth, initFacebookAuth } from 'utils';
import { getSignUpTpl } from 'api';
import Helmet from 'react-helmet';

import { getTranslate } from 'utils';

// Components
import AuthSocialHelmet from 'components/AuthSocialHelmet';
import RegisterModal from 'components/RegisterModal';
import ContentLoading from 'components/hoc/ContentLoading';
import WithTranslate from 'components/hoc/WithTranslate';

import './RegisterView.sass';

const RegisterView = (props: any) => {
  const t = (code: string, placeholders?: any) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    getTranslate(props.localePhrases, code, placeholders);

  const [registerGoogleInitLoading, setRegisterGoogleInitLoading] = useState<
    boolean
  >(false);
  const [registerGoogleLoadingError, setRegisterGoogleLoadingError] = useState(
    false
  );
  const [
    registerFacebookInitLoading,
    setRegisterFacebookInitLoading,
  ] = useState<boolean>(false);

  const [registerTpl, setRegisterTpl] = useState(null);
  const [registerTplLoading, setRegisterTplLoading] = useState<boolean>(false);
  const [registerTplLoadingError, setRegisterTplLoadingError] = useState<
    boolean
  >(false);

  useEffect(() => {
    initGoogleAuth(setRegisterGoogleInitLoading, setRegisterGoogleLoadingError);
    initFacebookAuth(setRegisterFacebookInitLoading);
    loadRegisterTpl();
  }, []);

  const loadRegisterTpl = () => {
    setRegisterTplLoading(true);
    setRegisterTplLoadingError(false);

    getSignUpTpl()
      .then((response) => {
        setRegisterTplLoading(false);

        if (response.data.data && response.data.data.tpl) {
          setRegisterTpl(response.data.data.tpl);
        }
      })
      .catch((error) => {
        setRegisterTplLoading(false);
        setRegisterTplLoadingError(true);
      });
  };

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

        <RegisterModal
          isOpen={true}
          tpl={registerTpl}
          facebookInitLoading={registerFacebookInitLoading}
          googleLoadingError={registerGoogleLoadingError}
          googleInitLoading={registerGoogleInitLoading}
        />
      </ContentLoading>
    </>
  );
};

export default WithTranslate(connect(null)(RegisterView));
