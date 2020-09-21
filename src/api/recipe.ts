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
  primary: number,
  ignorable: number,
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
