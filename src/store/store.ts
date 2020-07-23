import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { deepObjectMerge } from 'utils/helpers';
import reducers from './reducers';
import middlewares from './middlewares';
import { persistedState, saveState } from './persisted.store';

export default function configureStore() {
  const createStoreWithMiddleware = compose(
    applyMiddleware(
      thunk,
      ...middlewares
    ),
    // @ts-ignore
    typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__
      // @ts-ignore
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
    // @ts-ignore
  )(createStore);

  const store = createStoreWithMiddleware(
    reducers,
    deepObjectMerge(createStore(reducers).getState(), persistedState) // second argument overrides the initial state
  );

  // add a listener that will be invoked on any state change
  store.subscribe(() => {
    saveState({
      storage: store.getState().storage
    });
  });

  return store;
}
