import axios from 'utils/axios';
import { userAcknowledge, loadPhrases, getAppSettings } from 'api';
import { setLocaleLang, setLocalePhrases, setAppSetting } from 'store/actions';

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const SET_AUTH_CHECKING = 'SET_AUTH_CHECKING';
export const SET_USER_DATA = 'SET_USER_DATA';

export const setAuthChecking = (isAuthChecking: boolean) => (
  { type: SET_AUTH_CHECKING, isAuthChecking }
);
export const userLogin = (token: string) => ({ type: USER_LOGIN, token });

export const authCheck = () => (dispatch) => {
  const token = localStorage.getItem('authToken');

  dispatch(setAuthChecking(true));

  if (token) {
    userAcknowledge(token).then((response) => {
      if (response.data && response.data.access_token) {
        localStorage.setItem('authToken', token);
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        dispatch(userLogin(response.data.access_token));
      }

      dispatch(setAuthChecking(false));
    }).catch((error) => {
      dispatch(setAuthChecking(false));
    });
  } else {
    dispatch(setAuthChecking(false));
  }
};

export const initApp = () => (dispatch) => {
  const LOCALIZATION_DEV = true;

  const localeLang = localStorage.getItem('localeLang');
  let localePhrases = localStorage.getItem('localePhrases');
  localePhrases = localePhrases ? JSON.parse(localePhrases) : null;

  const userLang = window.navigator.language;

  dispatch(setAuthChecking(true));

  getAppSettings()
    .then(response => {
      if (response.data && response.data.data) {
        dispatch(setAppSetting(response.data.data));

        if (!LOCALIZATION_DEV && localePhrases && userLang === localeLang) {
          dispatch(setLocaleLang(userLang));
          dispatch(setLocalePhrases(localePhrases));

          dispatch(authCheck());
        } else {
          loadPhrases(userLang).then((response) => {
            if (response.data.success && response.data.data) {
              dispatch(setLocalePhrases(response.data.data));

              localStorage.setItem('localeLang', userLang);
              localStorage.setItem('localePhrases', JSON.stringify(response.data.data));
            }

            dispatch(authCheck());
          }).catch((error) => {
            dispatch(setAuthChecking(false));
          });
        }
      } else {
        dispatch(setAuthChecking(false));
      }
    })
    .catch(error => {
      dispatch(setAuthChecking(false));
    });
};

export const userLogout = () => {
  localStorage.removeItem('authToken');

  return { type: USER_LOGOUT };
};
