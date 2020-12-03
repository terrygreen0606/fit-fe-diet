import { TOGGLE_SETTING, CHANGE_SETTING, SET_STORAGE_SETTINGS } from '../actions';

const initialSettings = {
  isFullscreen: false,
  isActiveMealPlanTutorial: true,
  isActiveMealPlanBanner: true,
  isActiveShoppingListBanner: true,
  isActiveWaterTrackerBanner: true,
  isAfterSignup: false,
  afterSignupName: null,
  afterSignupGoal: null,
  afterSignupWeight: null,
  afterSignupWeightGoal: null,
  afterSignupPredictDate: null,
  afterSignupNameFirstSection: null,
  activeTariffIdToPay: null,
};

const storageReducer = (state = initialSettings, action) => {
  switch (action.type) {
    case TOGGLE_SETTING:
      return {
        ...state,
        [action.name]: !state[action.name],
      };

    case CHANGE_SETTING:
      return {
        ...state,
        [action.name]: action.value,
      };

    case SET_STORAGE_SETTINGS:
      return {
        ...state,
        ...action.settings,
      };

    default:
      return state;
  }
};

export default storageReducer;
