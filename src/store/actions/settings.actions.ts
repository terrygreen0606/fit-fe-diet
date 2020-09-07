export const SET_APP_SETTING = 'SET_APP_SETTING';

export const setAppSetting = (_settings: any) => {
  const settings = _settings || {};
  return { type: SET_APP_SETTING, settings };
};
