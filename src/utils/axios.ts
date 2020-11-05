import axios from 'axios';

let baseURL = '';

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:8080/api';
} else if (window.location.origin === 'https://appstgby.fitlope.com') {
    baseURL = 'https://stgby.fitlope.com/api';
  } else {
    baseURL = 'https://fitlope.com/api';
  }

const instance = axios.create({
  baseURL,
});

export default instance;
