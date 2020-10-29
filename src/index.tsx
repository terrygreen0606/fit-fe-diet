import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import chartConfig from 'utils/chartConfig';
import TagManager from 'react-gtm-module';

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import App from './App';

import * as serviceWorker from './serviceWorker';

import configureStore from './store/store';

const store = configureStore();

chartConfig();

if (process.env.NODE_ENV !== 'development') {
  Sentry.init({
    dsn: 'https://cae1d1cda83d48fe8d39302cc41f90cd@sentry.io/1509568',
    integrations: [new Integrations.BrowserTracing()],

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  });
}

const tagManagerArgs = {
  gtmId: 'GTM-5BF52MF',
};

TagManager.initialize(tagManagerArgs);

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
