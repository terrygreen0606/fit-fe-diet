import { getLangUser } from './getLangUser';

export const convertTime = (unixTsNumber: number) =>
  new Date(unixTsNumber * 1000).toLocaleDateString(getLangUser());
