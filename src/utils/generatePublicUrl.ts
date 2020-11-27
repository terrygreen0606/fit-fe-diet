export const generatePublicUrl = (route: string) => {
  if (process.env.REACT_APP_ENV === 'production') {
    return `https://fitlope.com/${route}`;
  }
  return `https://stgby.fitlope.com/${route}`;
};
