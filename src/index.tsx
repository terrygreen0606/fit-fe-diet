import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Helmet from 'react-helmet';

import App from './App';

import * as serviceWorker from './serviceWorker';

import configureStore from './store/store';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Helmet>
      <title>helmet title</title>
      <meta name='description' content='helmet desc' />
    </Helmet>
    <App />
    <ToastContainer autoClose={1700} />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
