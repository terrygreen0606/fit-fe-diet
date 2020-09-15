import { SET_APP_SETTING } from '../actions';

const initialSettings = {
  language: null,
  measurement: null,
  paid_until: null,
  google_id: null,
  fb_app_id: null,
  checksum: null,
  shopping_list_count: null,
};

const settingsReducer = (state = initialSettings, action) => {
  switch (action.type) {
    case SET_APP_SETTING:
      return {
        ...state,
        ...action.settings,
      };

    default:
      return state;
  }
};

export default settingsReducer;
