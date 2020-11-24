/* eslint-disable max-len */
import axios from 'utils/axios';

type CreateRecipeParams = {
  name_i18n: string,
  preparation_i18n: string,
  ingredients: Array<object>,
  measurement: 'si' | 'us' | string,
  servings_cnt: number,
  cuisine_ids?: Array<string>,
  image_ids?: Array<string>,
  time?: number,
  weight?: number,
  cost_level?: number,
  video_url?: string,
  mealtimes?: Array<string>,
};

export const createRecipe = (params: CreateRecipeParams) =>
  axios.post('/recipe/create', params);

export const getRecipeCuisines = (
  ignorable: number = 1,
  primary: number = 0,
) =>
  axios.get(`/recipe/cuisines-list?primary=${primary}&ignorable=${ignorable}`);

export const getRecipeData = (
  id: string,
  withSimilar: boolean = false,
  withNote: boolean = false,
  withWines: boolean = false,
  ext_ingredients: boolean = false,
) =>
  axios.get(
    `/recipe/${id}?with_similar=${withSimilar}&with_note=${withNote}&with_wines=${withWines}&ext_ingredients=${ext_ingredients}`,
  );

export const likeRecipe = (recipeId: string) =>
  axios.put(`/recipe/like/${recipeId}`);

export const deleteRecipe = (recipeId: string) =>
  axios.delete(`/recipe/${recipeId}`);

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

export const getMealTimes = () =>
  axios.get('recipe/mealtimes');

export const getRecipesList = (
  privateRecipes: 0 | 1 = 0,
  liked: 0 | 1 = 0,
  cuisinesIds: any[] = [],
  page: number = 1,
  filterType: 0 | 1 = 0,
  filter: string | string[] = '',
) => {
  if (cuisinesIds.length === 0) {
    return axios.get(
      `recipe?private=${privateRecipes}&liked=${liked}&page=${page}&filter_type=${filterType}&filter=${filter}`,
    );
  }

  let cuisineIdsQuery = '';
  cuisinesIds.forEach((cuisineId, cuisineIdIndex) => {
    if (cuisineIdIndex === 0) {
      cuisineIdsQuery += `cuisines_ids[]=${cuisineId}`;
    } else {
      cuisineIdsQuery += `&cuisines_ids[]=${cuisineId}`;
    }
  });

  return axios.get(
    `recipe?${cuisineIdsQuery}&private=${privateRecipes}&liked=${liked}&page=${page}&filter_type=${filterType}&filter=${filter}`,
  );
};

export const deleteRecipeNote = (recipeId: string) =>
  axios.delete(`/recipe/note/${[recipeId]}`);
