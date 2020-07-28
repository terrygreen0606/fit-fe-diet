import axios from 'utils/axios';

export const userFacebookSignIn = (token: string) => {
  return axios.post('/user/signin-facebook', {
    token
  });
};
