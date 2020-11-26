import axios from 'axios';
import { getApiBaseUrl } from 'utils';

const baseURL = getApiBaseUrl();

let axiosInstanceConfig: any = {
  baseURL,
};

if (process.env.NODE_ENV !== 'development') {
  axiosInstanceConfig.headers = {
    common: {
      'set-cookie': document.cookie,
    },
  };

  axiosInstanceConfig.withCredentials = true;
}

const instance = axios.create(axiosInstanceConfig);

export default instance;
