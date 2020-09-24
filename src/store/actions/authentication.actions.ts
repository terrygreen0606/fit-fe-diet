import axios from 'utils/axios';
import { 
  userAcknowledge,
  loadPhrases,
  getAppSettings,
  getAppPublicSettings,
} from 'api';
import { setLocaleLang, setLocalePhrases, setAppSetting } from 'store/actions';

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const SET_AUTH_CHECKING = 'SET_AUTH_CHECKING';
export const SET_USER_DATA = 'SET_USER_DATA';

export const setUserData = (userData: any) => ({ type: SET_USER_DATA, userData });

export const setAuthChecking = (isAuthChecking: boolean) => (
  { type: SET_AUTH_CHECKING, isAuthChecking }
);
export const userLogin = (token: string) => ({ type: USER_LOGIN, token });

export const loadLocales = () => {
  return dispatch => {
    const LOCALIZATION_DEV = true;

    const localeLang = localStorage.getItem('localeLang');
    let localePhrases = localStorage.getItem('localePhrases');
    localePhrases = localePhrases ? JSON.parse(localePhrases) : null;

    const userLang = window.navigator.language;

    if (!LOCALIZATION_DEV && localePhrases && userLang === localeLang) {
      dispatch(setLocaleLang(userLang));
      dispatch(setLocalePhrases(localePhrases));
    } else {
      loadPhrases(userLang).then((response) => {
        dispatch(setAuthChecking(false));

        if (response.data.success && response.data.data) {
          dispatch(setLocalePhrases(response.data.data));

          localStorage.setItem('localeLang', userLang);
          localStorage.setItem('localePhrases', JSON.stringify(response.data.data));
        }
      }).catch((error) => {
        dispatch(setAuthChecking(false));
      });
    }
  };
};

export const appSetting = (isAuthenticated: boolean, localesLoad: boolean = true) => {
  return dispatch => {
    if (isAuthenticated) {
      getAppSettings()
        .then(response => {
          if (response.data.success && response.data.data) {
            dispatch(setAppSetting(response.data.data));

            if (localesLoad) {
              dispatch(loadLocales());
            }
          }
        })
        .catch(error => {
          dispatch(setAuthChecking(false));
        });
    } else {
      getAppPublicSettings()
        .then(response => {
          if (response.data.success && response.data.data) {
            dispatch(setAppSetting(response.data.data));

            if (localesLoad) {
              dispatch(loadLocales());
            }
          }
        })
        .catch(error => {
          dispatch(setAuthChecking(false));
        })
    }
  };
};

export const authCheck = () => dispatch => {
  const token = localStorage.getItem('authToken');

  dispatch(setAuthChecking(true));

  if (token) {
    userAcknowledge(token).then((response) => {
      if (response.data && response.data.access_token) {
        localStorage.setItem('authToken', token);
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;

        dispatch(userLogin(response.data.access_token));

        dispatch(appSetting(true));
      }
    }).catch((error) => {
      dispatch(appSetting(false));
    });
  } else {
    dispatch(appSetting(false));
  }
};

export const initApp = () => dispatch => {
  dispatch(authCheck());
};

export const userLogout = () => {
  localStorage.removeItem('authToken');

  return { type: USER_LOGOUT };
};
