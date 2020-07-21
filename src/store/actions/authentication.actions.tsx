import axios from 'utils/axios';
import { userAcknowledge } from 'api';

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const SET_AUTH_CHECKING = 'SET_AUTH_CHECKING';
export const SET_USER_DATA = 'SET_USER_DATA';

export const setAuthChecking = (isAuthChecking: boolean) => ({ type: SET_AUTH_CHECKING, isAuthChecking });
export const userLogin = (token: string) => ({ type: USER_LOGIN, token });

export const authCheck = () => {
  return dispatch => {
    const token = localStorage.getItem('authToken');

    if (token) {
      dispatch(setAuthChecking(true));

      userAcknowledge(token).then(response => {
        if (response.data && response.data.access_token) {
          localStorage.setItem('authToken', token);
          axios.defaults.headers.common.Authorization = `Bearer ${token}`;
          dispatch(userLogin(response.data.access_token));
        }
        
        dispatch(setAuthChecking(false));
      }).catch(error => {
        dispatch(setAuthChecking(false));
      });
    } else {
      dispatch(setAuthChecking(false));
    }
  };
};

export const userLogout = () => {
  localStorage.removeItem('authToken');

  return { type: USER_LOGOUT };
};
