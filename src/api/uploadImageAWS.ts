import axios from 'axios';

export const uploadImageAWS = (url: string, params: FormData) => {
  return axios.post(url, params);
};
