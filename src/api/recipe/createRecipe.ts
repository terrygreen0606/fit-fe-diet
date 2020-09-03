import axios from 'utils/axios';

export const createRecipe = (
  name: string,
  preparation: string,
  ingredients: Array<object>,
  measurement: string,
  servings_cnt: number,
  cuisine?: Array<string>,
  image_ids?: Array<string>,
  time?: number,
  total_weight?: number,
  cost_level?: number,
  video_url?: string,
) =>
  axios.post(
    '/recipe/create',
    {
      name_i18n: name,
      preparation_i18n: preparation,
      ingredients,
      measurement,
      servings_cnt,
      cuisine_ids: cuisine,
      image_ids,
      time,
      weight: total_weight,
      cost_level,
      video_url,
    },
    {},
  );
