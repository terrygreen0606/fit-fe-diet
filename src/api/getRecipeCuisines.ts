import axios from 'utils/axios';

export const getRecipeCuisines = () => {
  return axios.get('/recipe/cuisines-list');
};
