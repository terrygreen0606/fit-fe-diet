import axios from 'axios';

let baseURL = null;

if (process.env.NODE_ENV !== 'development') {
  baseURL = 'https://stgby.fitlope.com/api';
} else {
  baseURL = 'http://localhost:8080/api';
}

const instance = axios.create({
  baseURL,
});

export default instance;
