import axios from 'utils/axios';

export const fetchUserProfile = () => {
  return axios.get('/user/proile');
};
