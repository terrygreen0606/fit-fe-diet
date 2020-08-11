import axios from 'utils/axios';

export const searchIngredients = (name: string) => axios.get(`/ingredient/search/${name}`);

export const getIngredient = (id: string) => axios.get(`/ingredient/${id}`);
