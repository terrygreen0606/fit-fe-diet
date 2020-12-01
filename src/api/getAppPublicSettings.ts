import axios from 'utils/axios';

export const getAppPublicSettings = () =>
  axios.get('/app/public-settings');
