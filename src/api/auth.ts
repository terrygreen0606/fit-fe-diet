import axios from 'utils/axios';
import { 
  UserAuthProfileType, 
  UserFacebookSignUpParams, 
  UserGoogleSignUpParams, 
  UserSignupParams 
} from 'types/auth';


export const getSignUpData = () => 
  axios.get('/app/signup-data');

export const userAcknowledge = (token: string) => 
  axios.post('/user/ack', {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const userFacebookSignIn = (token: string) => 
  axios.post('/user/signin-facebook', {
    token,
  });

export const userFacebookSignUp = (params: UserFacebookSignUpParams) => 
  axios.post('/user/signup-facebook', params);

export const userGoogleSignIn = (id_token: string) => 
  axios.post('/user/signin-google', {
    id_token,
  });

export const userGoogleSignUp = (params: UserGoogleSignUpParams) => 
  axios.post('/user/signup-google', params);

export const userLogin = (email: string, password: string) => 
  axios.post('/user/login', {
    email,
    password,
  });

export const userSignup = (params: UserSignupParams) => 
  axios.post('/user/signup', {
    ...params,
  });

export const resetPassword = (email: string) =>
  axios.put(`/user/reset-password?email=${email}`, {
    email
  });

export const saveResetPassword = (password: string, token: string) =>
  axios.put('/user/save-reset-password', {
    password,
    token
  });
