import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import LocaleContext from 'utils/localeContext';

import { initApp } from 'store/actions';

// Routes
import Routes from './Routes';
import FullPageLoader from './components/common/FullPageLoader';

import './assets/sass/styles.sass';

const App = (props: any) => {
  const { phrases, isAuthChecking } = props;

  useEffect(() => {
    props.initApp();
  }, []);

  return (
    <BrowserRouter>
      <LocaleContext.Provider value={phrases}>
        {isAuthChecking ? <FullPageLoader /> : <Routes />}
      </LocaleContext.Provider>
    </BrowserRouter>
  );
};

export default connect(
  (state: any) => ({
    isAuthChecking: state.auth.isAuthChecking,
    phrases: state.locale.phrases,
  }),
  { initApp },
)(App);
