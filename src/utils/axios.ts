import axios from 'axios';
import { getApiBaseUrl, getCookie } from 'utils';

const baseURL = getApiBaseUrl();

const instance = axios.create({
  baseURL,
});

const _by_ip = getCookie('_by_ip');
const _by_currency = getCookie('_by_currency');

if (_by_ip) {
  axios.defaults.headers.common._by_ip = _by_ip;
}

if (_by_currency) {
  axios.defaults.headers.common._by_currency = _by_currency;
}

export default instance;
