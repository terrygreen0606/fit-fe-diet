import axios from 'axios';

export const baseURL = 'https://stgby.fitlope.com/api';

const instance = axios.create({
  baseURL,
});

// instance.interceptors.request.use(config => {
//   config.headers['set-cookie'] = document.cookie;
//   return config;
// });

export default instance;
