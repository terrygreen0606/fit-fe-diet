import axios from 'utils/axios';

export const searchIngredients = (name: string) => {
  return axios.get(`/ingredient/search/${name}`);
};

export const getIngredient = ( id: string) => {
  return axios.get(`/ingredient/${id}`);
};
