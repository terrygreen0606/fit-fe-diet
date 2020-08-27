import axios from 'utils/axios';

export const getSignUpData = () => {
  return axios.get('/app/signup-data');
};
