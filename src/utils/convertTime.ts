import { getLocaleByLang } from 'utils';

export const convertTime = (unixTsNumber: number, language: string, options?: object) =>
  new Date(unixTsNumber * 1000).toLocaleDateString(getLocaleByLang(language), options);
