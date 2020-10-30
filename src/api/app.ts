import axios from 'utils/axios';

export const getRecallsData = () =>
  axios.get('/app/recalls');
