import { locales } from 'constants/locales';

export const getLocaleByLang = (lang: string) => {
  if (!locales[lang]) {
    if (window.navigator.languages) {
      return window.navigator.languages[0];
    }
    return window.navigator.language;
  }
  return locales[lang];
};
