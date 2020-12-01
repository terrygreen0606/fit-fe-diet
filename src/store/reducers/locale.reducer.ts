import { SET_LOCALE_PHRASES } from '../actions';

const initialSettings = {
  phrases: {},
};

const localeReducer = (state = initialSettings, action) => {
  switch (action.type) {
    case SET_LOCALE_PHRASES:
      return {
        ...state,
        phrases: action.phrases ? { ...action.phrases } : {},
      };

    default:
      return state;
  }
};

export default localeReducer;
