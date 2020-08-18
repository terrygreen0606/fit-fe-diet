import axios from 'utils/axios';

export const createRecipe = (
  name: string,
  preparation: string,
  ingredients: Array<object>,
  measurement: string,
  cuisine?: Array<string>,
  image_ids?: Array<string>,
  servings_cnt?: number,
  time_min?: number,
  time_max?: number,
  total_weight?: string,
) => axios.post('/recipe/create', {
  name_i18n: name,
  preparation_i18n: preparation,
  ingredients,
  measurement,
  cuisine_ids: cuisine,
  image_ids,
  servings_cnt,
  time_min,
  time_max,
  weight: total_weight,
}, {});
