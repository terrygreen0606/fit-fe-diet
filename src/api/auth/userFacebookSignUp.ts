import axios from 'utils/axios';
import { UserAuthProfileType } from 'types/auth';

type UserFacebookSignUpParams = {
  token: string,
  profile: UserAuthProfileType
};

export const userFacebookSignUp = (params: UserFacebookSignUpParams) => {
  return axios.post('/user/signup-facebook', params);
};
