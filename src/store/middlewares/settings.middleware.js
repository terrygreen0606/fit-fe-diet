import { TOGGLE_SETTING, CHANGE_SETTING } from '../actions';

// Helpers to change class attribute
const updateElementClass = (el, stat, name) => el && el.classList[stat ? 'add' : 'remove'](name);
const updateBodyClass = (stat, name) => updateElementClass(document.body, stat, name);

/**
    When a setting value is changed, detect its value and add/remove
    a classname related with that setting from the target element.
    Export this method to talk directly with the middleware
*/
export const updateClasses = state => {
  updateBodyClass(state.storage.isFullscreen, 'is-layout-fullscreen');
  // updateElementClass(document.querySelector('.toggle-mnu'), state.settings.isSidebarOpened, 'active');
};

/*
    Hook into setting changes in order to change layout.
*/
const settings = store => next => action => {
  const result = next(action);

  if (action.type === TOGGLE_SETTING || action.type === CHANGE_SETTING) {
    updateClasses(store.getState());
  }

  return result;
};

export default settings;
