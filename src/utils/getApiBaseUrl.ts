export const getApiBaseUrl = () => {
  let apiBaseURL = 'https://stgby.fitlope.com/api';

  // switch (process.env.REACT_APP_ENV) {
  //   case 'development':
  //     apiBaseURL = 'http://localhost:8080/api';
  //     break;

  //   case 'staging':
  //     apiBaseURL = 'https://stgby.fitlope.com/api';
  //     break;

  //   case 'production':
  //     apiBaseURL = 'https://fitlope.com/api';
  //     break;

  //   default:
  //     apiBaseURL = 'https://fitlope.com/api';
  // }

  return apiBaseURL;
};
