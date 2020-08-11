import axios from 'utils/axios';

export const userGoogleSignIn = (id_token: string) => axios.post('/user/signin-google', {
  id_token,
});
