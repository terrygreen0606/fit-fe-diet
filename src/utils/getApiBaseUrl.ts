export const getApiBaseUrl = () => {
  let apiBaseURL = '';

  switch (process.env.REACT_APP_ENV) {
    case 'development':
      // apiBaseURL = 'http://localhost:8080/api';
      apiBaseURL = 'https://stgby.fitlope.com/api';
      break;

    case 'staging':
      apiBaseURL = 'https://stgby.fitlope.com/api';
      break;

    case 'production':
      apiBaseURL = 'https://fitlope.com/api';
      break;

    default:
      apiBaseURL = 'https://fitlope.com/api';
  }

  return apiBaseURL;
};
