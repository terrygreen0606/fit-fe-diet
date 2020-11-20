import {
  USER_LOGIN,
  USER_LOGOUT,
  SET_AUTH_CHECKING,
  SET_USER_DATA,
} from '../actions';

const initialState = {
  isAuthenticated: false,
  userToken: '',
  userData: {},
  isAuthChecking: true, // default true when app loads
};

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_CHECKING:
      return {
        ...state,
        isAuthChecking: action.isAuthChecking ? action.isAuthChecking : false,
      };

    case USER_LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        userToken: action.token,
      };

    case USER_LOGOUT:
      return {
        ...initialState,
        isAuthenticated: false,
        isAuthChecking: false,
      };

    case SET_USER_DATA:
      return {
        ...state,
        userData: {
          ...state.userData,
          ...action.userData,
        },
      };

    default:
      return state;
  }
};

export default authenticationReducer;
