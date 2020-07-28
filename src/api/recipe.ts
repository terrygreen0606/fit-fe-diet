import axios from 'utils/axios';

export const createRecipe = (
  token: string,
  name: string,
  preparation: string,
  ingredients: Array<object>,
  cuisine?: Array<string>,
  image_ids?: Array<string>,
  cost_level?: number,
  time_min?: number,
  time_max?: number,
  ) => {
  return axios.post(`/recipe/create`, {
    name_i18n: name,
    preparation_i18n: preparation,
    ingredients: ingredients,
    cuisine_ids: cuisine,
    image_ids: image_ids,
    cost_level: cost_level,
    time_min: time_min,
    time_max: time_max,
  }, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });
};
