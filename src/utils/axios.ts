import axios from 'axios';
import { getApiBaseUrl } from 'utils';

const baseURL = getApiBaseUrl();

const axiosInstanceConfig: any = {
  baseURL,
};

if (process.env.REACT_APP_ENV !== 'production') {
  axiosInstanceConfig.withCredentials = true;
}

const instance = axios.create(axiosInstanceConfig);

export default instance;
