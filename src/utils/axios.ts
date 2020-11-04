import axios from 'axios';

let baseURL = 'https://fitlope.com/api';

if (process.env.REACT_APP_ENV === 'development') {
  baseURL = 'http://localhost:8080/api';
} else if (process.env.REACT_APP_ENV === 'staging') {
  baseURL = 'https://stgby.fitlope.com/api';
} else if (process.env.REACT_APP_ENV === 'production') {
  baseURL = 'https://fitlope.com/api';
}

const instance = axios.create({
  baseURL,
});

export default instance;
