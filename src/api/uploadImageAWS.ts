import axios from 'axios';

export const uploadImageAWS = (url: string, params: FormData) => 
  axios.post(url, params);
