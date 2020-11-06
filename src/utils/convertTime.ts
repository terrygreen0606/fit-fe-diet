import { getLangUser } from './getLangUser';

export const convertTime = (unixTsNumber: number, options?: object) =>
  new Date(unixTsNumber * 1000).toLocaleDateString(getLangUser(), options);
