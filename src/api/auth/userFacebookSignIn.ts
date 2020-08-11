import axios from 'utils/axios';

export const userFacebookSignIn = (token: string) => axios.post('/user/signin-facebook', {
  token,
});
