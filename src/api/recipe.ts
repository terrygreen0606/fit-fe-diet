import axios from 'utils/axios';

export const createRecipe = (
  name: string,
  preparation: string,
  ingredients: Array<object>,
  measurement: 'si' | 'us' | string,
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

export const getRecipeCuisines = () => axios.get('/recipe/cuisines-list');

export const getRecipeData = (id: string) => axios.get(`/recipe/${id}`);

export const likeRecipe = (recipeId: string) => axios.put(`/recipe/like/${recipeId}`);

export const preparedRecipe = (recipeId: string) => axios.put(`/recipe/prepared/${recipeId}`);

export const deleteRecipe = (recipeId: string) => axios.delete(`/recipe/${recipeId}`);
