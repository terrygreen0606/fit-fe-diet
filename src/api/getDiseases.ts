import axios from 'utils/axios';

export const getDiseases = () => 
  axios.get('/app/diseases');
