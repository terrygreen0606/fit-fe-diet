import axios from 'utils/axios';
import { UserAuthProfileType } from 'types/auth';

type UserGoogleSignUpParams = {
  id_token: string,
  profile: UserAuthProfileType
};

export const userGoogleSignUp = (params: UserGoogleSignUpParams) => {
  return axios.post('/user/signup-google', params);
};
