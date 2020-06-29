import { combineReducers } from 'redux';

import authReducer from './authentication.reducer';
import storageReducer from './storage.reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  storage: storageReducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
