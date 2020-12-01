/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import { getApiBaseUrl } from 'utils';
import queryString from 'query-string';

const baseURL = getApiBaseUrl();

const axiosInstanceConfig: any = {
  baseURL,
};

if (process.env.REACT_APP_ENV === 'production') {
  axiosInstanceConfig.headers = {
    common: {
      'set-cookie': document.cookie,
    },
  };

  axiosInstanceConfig.withCredentials = true;
}

const instance = axios.create(axiosInstanceConfig);

instance.interceptors.request.use((request) => {
  const queryParametersObj = queryString.parse(window.location.search);

  request.params = request.params || {};

  if (queryParametersObj.lang && queryParametersObj._by_ip) {
    request.params['lang'] = queryParametersObj.lang;
    request.params['_by_ip'] = queryParametersObj._by_ip;
  } else if (queryParametersObj.lang) {
    request.params['lang'] = queryParametersObj.lang;
  } else if (queryParametersObj._by_ip) {
    request.params['_by_ip'] = queryParametersObj._by_ip;
  }

  return request;
}, (error) => {
  throw error;
});

export default instance;
