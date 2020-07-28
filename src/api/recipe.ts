import axios from 'utils/axios';

export const createRecipe = (token: string) => {
  return axios.post(`/recipe/create`, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });
};
