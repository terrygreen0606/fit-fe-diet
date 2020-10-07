import axios from 'utils/axios';

export const getActivityLevels = () => 
  axios.get('/app/act-levels');
