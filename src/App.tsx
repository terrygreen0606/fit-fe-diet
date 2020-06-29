import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';

import { authCheck } from 'store/actions';

// Routes
import Routes from './Routes';
import FullPageLoader from './components/common/FullPageLoader';

import './assets/sass/styles.sass';

const history = createBrowserHistory();

const App = (props: any) => {
  useEffect(() => {
    props.authCheck();
  }, []);

  return (
    <BrowserRouter>
      {props.isAuthChecking
        ? (
          <FullPageLoader />
        )
        : (
          <Routes />
        )}
    </BrowserRouter>
  );
};

export default connect(
  (state: any) => ({
    isAuthChecking: state.auth.isAuthChecking
  }),
  { authCheck }
)(App);
