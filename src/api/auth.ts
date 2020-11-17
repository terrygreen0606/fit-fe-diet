import axios from 'utils/axios';
import queryString from 'query-string';
import {
  UserAuthProfileType,
  UserFacebookSignUpParams,
  UserGoogleSignUpParams,
  UserSignupParams,
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
  axios.post('/user/signup-facebook', {
    ...params,
    reg_url: window.location.href,
    reg_params: Object.keys(queryString.parse(window.location.search)).length > 0
      ? queryString.parse(window.location.search)
      : '',
  });

export const userGoogleSignIn = (id_token: string) =>
  axios.post('/user/signin-google', {
    id_token,
  });

export const userGoogleSignUp = (params: UserGoogleSignUpParams) =>
  axios.post('/user/signup-google', {
    ...params,
    reg_url: window.location.href,
    reg_params: Object.keys(queryString.parse(window.location.search)).length > 0
      ? queryString.parse(window.location.search)
      : '',
  });

export const userLogin = (
  email: string,
  password: string,
  request_hash: string = null,
  ) =>
  axios.post('/user/login', {
    email,
    password,
    request_hash,
  });

export const userSignup = (params: UserSignupParams) =>
  axios.post('/user/signup', {
    ...params,
    reg_url: window.location.href,
    reg_params: Object.keys(queryString.parse(window.location.search)).length > 0
      ? queryString.parse(window.location.search)
      : '',
  });

export const resetPassword = (email: string) =>
  axios.put(`/user/reset-password?email=${email}`, {
    email,
  });

export const saveResetPassword = (password: string, token: string) =>
  axios.put('/user/save-reset-password', {
    password,
    token,
  });
