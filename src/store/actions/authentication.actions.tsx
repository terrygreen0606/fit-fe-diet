export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const SET_AUTH_CHECKING = 'SET_AUTH_CHECKING';
export const SET_USER_DATA = 'SET_USER_DATA';

export const setAuthChecking = (isAuthChecking: boolean) => ({ type: SET_AUTH_CHECKING, isAuthChecking });
export const userLogin = (token: string) => ({ type: USER_LOGIN, token });

export const authCheck = () => {
  return dispatch => {
    dispatch(setAuthChecking(true));

    setTimeout(() => {
      dispatch(setAuthChecking(false));
      dispatch(userLogin('token777'));
    }, 500);
  };
};