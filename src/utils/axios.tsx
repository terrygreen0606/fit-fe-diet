import axios from 'axios';

export const baseURL = process.env.REACT_APP_API_URL || '';

const instance = axios.create({
  baseURL
});

export default instance;
