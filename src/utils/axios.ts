import axios from 'axios';

let baseURL = '';

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:8080/api';
} else {
  baseURL = 'https://stgby.fitlope.com/api';
}

const instance = axios.create({
  baseURL,
});

export default instance;
