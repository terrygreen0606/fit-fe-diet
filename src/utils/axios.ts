import axios from 'axios';

let baseURL = '';

switch (process.env.REACT_APP_ENV) {
  case 'development':
    baseURL = 'http://localhost:8080/api';
    break;

  case 'staging':
    baseURL = 'https://stgby.fitlope.com/api';
    break;

  case 'production':
    baseURL = 'https://fitlope.com/api';
    break;

  default:
    baseURL = 'https://fitlope.com/api';
}

const instance = axios.create({
  baseURL,
});

export default instance;
