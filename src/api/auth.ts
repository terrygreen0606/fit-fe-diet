import axios from 'utils/axios';
import { UserAuthProfileType } from 'types/auth';

export const getSignUpData = () => axios.get('/app/signup-data');

export const userAcknowledge = (token: string) => axios.post('/user/ack', {}, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const userFacebookSignIn = (token: string) => axios.post('/user/signin-facebook', {
  token,
});

type UserFacebookSignUpParams = {
  token: string,
  profile: UserAuthProfileType
};

export const userFacebookSignUp = (params: UserFacebookSignUpParams) => axios.post('/user/signup-facebook', params);

export const userGoogleSignIn = (id_token: string) => axios.post('/user/signin-google', {
  id_token,
});

type UserGoogleSignUpParams = {
  id_token: string,
  profile: UserAuthProfileType
};

export const userGoogleSignUp = (params: UserGoogleSignUpParams) => axios.post('/user/signup-google', params);

export const userLogin = (email: string, password: string) => axios.post('/user/login', {
  email,
  password,
});

interface UserSignupParams extends UserAuthProfileType {
  email: string;
  password: string;
}

export const userSignup = (params: UserSignupParams) => axios.post('/user/signup', {
  ...params,
});
