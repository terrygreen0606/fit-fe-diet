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
  mealtimes?: Array<string>,
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
      mealtimes,
    },
    {},
  );

export const getRecipeCuisines = () => axios.get('/recipe/cuisines-list');

export const getRecipeData = (
  id: string,
  withSimilar: boolean = false,
  withNote: boolean = false,
  withWines: boolean = false,
  ext_ingredients: boolean = false,
) =>
  axios.get(
    `/recipe/${id}?with_similar=${withSimilar}&with_note=${withNote}&with_wines=${withWines}
    &ext_ingredients=${ext_ingredients}`,
  );

export const likeRecipe = (recipeId: string) => axios.put(`/recipe/like/${recipeId}`);

export const preparedRecipe = (recipeId: string) => axios.put(`/recipe/prepared/${recipeId}`);

export const deleteRecipe = (recipeId: string) => axios.delete(`/recipe/${recipeId}`);

export const addRecipeNote = (
  recipeId: string,
  noteText: string,
) =>
  axios.post(
    `/recipe/note/${recipeId}`,
    {
      note: noteText,
    },
  );

export const getMealTimes = () => axios.get('recipe/mealtimes');
