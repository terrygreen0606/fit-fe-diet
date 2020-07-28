import axios from 'utils/axios';

export const searchIngredients = (token: string, name: string) => {
  return axios.get(`/ingredient/search/${name}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};
