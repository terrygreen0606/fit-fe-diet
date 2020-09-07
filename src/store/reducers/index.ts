import { combineReducers } from 'redux';

import authReducer from './authentication.reducer';
import storageReducer from './storage.reducer';
import localeReducer from './locale.reducer';
import settingsReducer from './settings.reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  storage: storageReducer,
  locale: localeReducer,
  settings: settingsReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
