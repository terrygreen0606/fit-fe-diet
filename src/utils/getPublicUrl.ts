export const getPublicUrl = (route: string) => (process.env.NODE_ENV === 'development' ? `https://stgby.fitlope.com/${route}` : '');
