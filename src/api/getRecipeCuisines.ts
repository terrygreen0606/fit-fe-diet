import axios from 'utils/axios';

export const getRecipeCuisines = () => axios.get('/recipe/cuisines-list');
