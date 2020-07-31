import axios from 'utils/axios';

export const getTplSignup = () => {
  return axios.put('/user/tpl-signup');
};
