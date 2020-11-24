import axios from 'utils/axios';
import {
  userAcknowledge,
  loadPhrases,
  getAppSettings,
  getAppPublicSettings,
} from 'api';
import { setLocaleLang, setLocalePhrases, setAppSetting } from 'store/actions';
import { initSentry } from 'utils/initSentry';
import { xhrStatuses } from 'constants/statuses';

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const SET_AUTH_CHECKING = 'SET_AUTH_CHECKING';
export const SET_USER_DATA = 'SET_USER_DATA';

export const setUserData = (userData: any) => ({
  type: SET_USER_DATA,
  userData,
});

export const setAuthChecking = (isAuthChecking: boolean) => ({
  type: SET_AUTH_CHECKING,
  isAuthChecking,
});

export const userLogin = (token: string) => {
  sessionStorage.setItem('FITLOPE_IS_AUTHENTICATED', 'true');
  return { type: USER_LOGIN, token };
};

export const fetchLocales = () => async (dispatch) => {
  const userLang = window.navigator.language;

  await loadPhrases(userLang)
    .then(({ data, headers }) => {
      localStorage.setItem(
        'FITLOPE_CHECKSUM_I18N',
        headers['fitlope-checksum-i18n'],
      );

      if (data.success && data.data) {
        dispatch(setLocalePhrases(data.data));
        localStorage.setItem('FITLOPE_LOCALE_LANG', userLang);
        localStorage.setItem(
          'FITLOPE_LOCALE_PHRASES',
          JSON.stringify(data.data),
        );
      }
    })
    .catch(() => {});
};

export const fetchPublicSettings = () => async (dispatch) => {
  await getAppPublicSettings()
    .then(({ data, headers }) => {
      localStorage.setItem(
        'FITLOPE_CHECKSUM_SETTINGS',
        headers['fitlope-checksum-settings'],
      );

      if (data.success && data.data) {
        dispatch(setAppSetting(data.data));
        localStorage.setItem(
          'FITLOPE_PUBLIC_SETTINGS',
          JSON.stringify(data.data),
        );
      }
    })
    .catch(() => {});
};

export const fetchUserSettings = () => async (dispatch) => {
  await getAppSettings()
    .then(({ data, headers }) => {
      localStorage.setItem(
        'FITLOPE_CHECKSUM_SETTINGS',
        headers['fitlope-checksum-settings'],
      );

      if (data.success && data.data) {
        dispatch(
          setAppSetting({
            ...data.data,
            is_private: true,
          }),
        );
        localStorage.setItem(
          'FITLOPE_USER_SETTINGS',
          JSON.stringify(data.data),
        );
      }
    })
    .catch(() => {});
};

export const loadLocales = (reloadLocales: boolean = false) => async (
  dispatch,
) => {
  const LOCALIZATION_DEV = false;
  const FITLOPE_CHECKSUM_I18N = localStorage.getItem('FITLOPE_CHECKSUM_I18N');
  const FITLOPE_LOCALE_LANG = localStorage.getItem('FITLOPE_LOCALE_LANG');
  const FITLOPE_LOCALE_PHRASES = JSON.parse(
    localStorage.getItem('FITLOPE_LOCALE_PHRASES'),
  );
  const userLang = window.navigator.language;

  if (
    !LOCALIZATION_DEV &&
    FITLOPE_CHECKSUM_I18N &&
    FITLOPE_LOCALE_PHRASES &&
    userLang === FITLOPE_LOCALE_LANG
  ) {
    await dispatch(setLocaleLang(userLang));
    await dispatch(setLocalePhrases(JSON.stringify(FITLOPE_LOCALE_PHRASES)));
  } else {
    await dispatch(fetchLocales());
  }

  axios.interceptors.response.use((response) => {
    if (response.status === xhrStatuses['OK']) {
      const FITLOPE_CHECKSUM_I18N = localStorage.getItem(
        'FITLOPE_CHECKSUM_I18N',
      );
      const FITLOPE_CHECKSUM_I18N_HEADER =
        response.headers['fitlope-checksum-i18n'];

      if (FITLOPE_CHECKSUM_I18N_HEADER !== FITLOPE_CHECKSUM_I18N) {
        localStorage.setItem(
          'FITLOPE_CHECKSUM_I18N',
          FITLOPE_CHECKSUM_I18N_HEADER,
        );

        if (response.config.url === '/i18n/load') {
          return response;
        }

        dispatch(fetchLocales());
      }
    }

    return response;
  });
};

export const appSetting = (
  isAuthenticated: boolean,
  localesLoad: boolean = true,
) => async (dispatch) => {
  const SETTINGS_DEV = false;
  const FITLOPE_CHECKSUM_SETTINGS = localStorage.getItem(
    'FITLOPE_CHECKSUM_SETTINGS',
  );
  const FITLOPE_PUBLIC_SETTINGS: any = JSON.parse(
    localStorage.getItem('FITLOPE_PUBLIC_SETTINGS'),
  );
  const FITLOPE_USER_SETTINGS: any = JSON.parse(
    localStorage.getItem('FITLOPE_USER_SETTINGS'),
  );

  if (isAuthenticated) {
    if (SETTINGS_DEV || !FITLOPE_CHECKSUM_SETTINGS || !FITLOPE_USER_SETTINGS) {
      await dispatch(fetchUserSettings());
    } else {
      dispatch(
        setAppSetting({
          ...FITLOPE_USER_SETTINGS,
          is_private: true,
        }),
      );
    }

    const FITLOPE_USER_SETTINGS_UPDATED: any = JSON.parse(
      localStorage.getItem('FITLOPE_USER_SETTINGS'),
    );

    if (
      FITLOPE_USER_SETTINGS_UPDATED &&
      FITLOPE_USER_SETTINGS_UPDATED.sentry_dsn
    ) {
      initSentry(FITLOPE_USER_SETTINGS_UPDATED.sentry_dsn);
    }

    if (localesLoad) {
      await dispatch(loadLocales());
    }
  } else {
    if (
      SETTINGS_DEV ||
      !FITLOPE_CHECKSUM_SETTINGS ||
      !FITLOPE_PUBLIC_SETTINGS
    ) {
      await dispatch(fetchPublicSettings());
    } else {
      dispatch(setAppSetting(FITLOPE_PUBLIC_SETTINGS));
    }

    const FITLOPE_PUBLIC_SETTINGS_UPDATED: any = JSON.parse(
      localStorage.getItem('FITLOPE_PUBLIC_SETTINGS'),
    );

    if (
      FITLOPE_PUBLIC_SETTINGS_UPDATED &&
      FITLOPE_PUBLIC_SETTINGS_UPDATED.sentry_dsn
    ) {
      initSentry(FITLOPE_PUBLIC_SETTINGS_UPDATED.sentry_dsn);
    }

    if (localesLoad) {
      await dispatch(loadLocales());
    }
  }

  axios.interceptors.response.use((response) => {
    if (response.status === xhrStatuses['OK']) {
      const FITLOPE_IS_AUTHENTICATED = sessionStorage.getItem(
        'FITLOPE_IS_AUTHENTICATED',
      );
      const FITLOPE_CHECKSUM_SETTINGS = localStorage.getItem(
        'FITLOPE_CHECKSUM_SETTINGS',
      );
      const FITLOPE_CHECKSUM_SETTINGS_HEADER =
        response.headers['fitlope-checksum-settings'];

      if (FITLOPE_CHECKSUM_SETTINGS_HEADER !== FITLOPE_CHECKSUM_SETTINGS) {
        localStorage.setItem(
          'FITLOPE_CHECKSUM_SETTINGS',
          FITLOPE_CHECKSUM_SETTINGS_HEADER,
        );
      }

      if (
        response.config.url === '/app/public-settings' ||
        response.config.url === '/app/settings'
      ) {
        return response;
      }

      if (FITLOPE_IS_AUTHENTICATED === 'true') {
        if (FITLOPE_CHECKSUM_SETTINGS_HEADER !== FITLOPE_CHECKSUM_SETTINGS) {
          dispatch(fetchUserSettings());
        }
      } else if (
        !FITLOPE_IS_AUTHENTICATED ||
        FITLOPE_IS_AUTHENTICATED === 'false'
      ) {
        if (FITLOPE_CHECKSUM_SETTINGS_HEADER !== FITLOPE_CHECKSUM_SETTINGS) {
          dispatch(fetchPublicSettings());
        }
      }
    }

    return response;
  });
};

export const authCheck = () => async (dispatch) => {
  const token = localStorage.getItem('FITLOPE_AUTH_TOKEN');

  dispatch(setAuthChecking(true));

  if (token) {
    userAcknowledge(token)
      .then(async ({ data }) => {
        if (data && data.access_token) {
          localStorage.setItem('FITLOPE_AUTH_TOKEN', token);
          axios.defaults.headers.common.Authorization = `Bearer ${token}`;

          dispatch(userLogin(data.access_token));
          await dispatch(appSetting(true));
          dispatch(setAuthChecking(false));
        }
      })
      .catch(async () => {
        await dispatch(appSetting(false));
        dispatch(setAuthChecking(false));
      });
  } else {
    await dispatch(appSetting(false));
    dispatch(setAuthChecking(false));
  }
};

export const initApp = () => (dispatch) => {
  dispatch(authCheck());
};

export const userLogout = () => {
  localStorage.removeItem('FITLOPE_AUTH_TOKEN');
  sessionStorage.setItem('FITLOPE_IS_AUTHENTICATED', 'false');
  return { type: USER_LOGOUT };
};
