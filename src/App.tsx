import React, { Suspense, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import LocaleContext from 'utils/localeContext';

import { initApp } from 'store/actions';

// Routes
import Routes from './Routes';
import FullPageLoader from './components/common/FullPageLoader';
import RouteComponent from './components/hoc/RouteComponent';

import './assets/sass/styles.sass';

const App = (props: any) => {
  const { phrases, isAuthChecking } = props;

  useEffect(() => {
    props.initApp();
  }, []);

  return (
    <Suspense fallback={<FullPageLoader />}>
      <BrowserRouter>
        <RouteComponent>
          <LocaleContext.Provider value={phrases}>
            {isAuthChecking ? <FullPageLoader /> : <Routes />}
          </LocaleContext.Provider>
        </RouteComponent>
      </BrowserRouter>
    </Suspense>
  );
};

export default connect(
  (state: any) => ({
    isAuthChecking: state.auth.isAuthChecking,
    phrases: state.locale.phrases,
  }),
  { initApp },
)(App);
