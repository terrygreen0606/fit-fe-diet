import axios from 'axios';

export const baseURL = 'https://stgby.fitlope.com/api';

const instance = axios.create({
  baseURL
});

export default instance;
