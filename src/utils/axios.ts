import axios from 'axios';
import { getApiBaseUrl } from 'utils';

const baseURL = getApiBaseUrl();

const instance = axios.create({
  baseURL,
});

export default instance;
