export const getLangUser = () => {
  if (navigator.languages) {
    return navigator.languages[0];
  }
  return navigator.language;
};
