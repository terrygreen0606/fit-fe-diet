import axios from 'axios';
import { statuses } from 'constants/statuses';
import { routes } from 'constants/routes';

export const baseURL = 'https://stgby.fitlope.com/api';

const instance = axios.create({
  baseURL,
});

instance.interceptors.response.use((response) => response, (error) => {
  if (error.response.status === statuses[403]) {
    sessionStorage.setItem('redirectedToPayView', 'true');
    window.location.assign(routes.checkout);
  }
});

export default instance;
