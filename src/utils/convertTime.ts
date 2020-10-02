export const convertTime = (unixTsNumber: number) =>
  new Date(unixTsNumber * 1000).toLocaleDateString('en-US');
