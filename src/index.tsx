import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import chartConfig from 'utils/chartConfig';
import TagManager from 'react-gtm-module';
import ReactGA from 'react-ga';

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import {
  GTM_KEY,
  GA_KEY,
  GA_OPTIMIZE_ID,
} from 'constants/libraryKeys';

import App from './App';

import * as serviceWorker from './serviceWorker';

import configureStore from './store/store';

const store = configureStore();

chartConfig();

const tagManagerArgs = {
  gtmId: GTM_KEY,
};

TagManager.initialize(tagManagerArgs);

ReactGA.initialize(GA_KEY);
ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render(
  <Provider store={store}>
    <App />
    <ToastContainer autoClose={3000} />
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
