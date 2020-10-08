import { TOGGLE_SETTING, CHANGE_SETTING } from '../actions';

const initialSettings = {
  isFullscreen: false,
  afterSignup: false,
  completedMealPlanTraining: false,
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

    default:
      return state;
  }
};

export default storageReducer;
