import axios from 'utils/axios';

export const searchIngredients = (token: string, name: string) => {
  return axios.get(`/ingredient/search/${name}`);
};

export const getIngredient = (token: string, id: string) => {
  return axios.get(`/ingredient/${id}`);
};
