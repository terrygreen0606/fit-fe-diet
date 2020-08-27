import axios from 'utils/axios';

export const getUserWeightChart = () => {
  return axios.get('/user/weight-chart');
};
