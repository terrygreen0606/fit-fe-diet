import axios from 'utils/axios';

export const getShoppingList = (
  columns: number = 1,
  date_sync?,
) =>
  axios.get(`/shopping-list?columns=${columns}${date_sync ? `&date_sync=${date_sync}` : ''}`);

export const setShoppingRowBought = (
  id: string,
  is_bought: boolean,
  date_sync?,
) =>
  axios.put(
    `/shopping-list/${id}${date_sync ? `?date_sync=${date_sync}` : ''}`,
    {
      is_bought,
    },
  );

export const addIngredientInShoppingList = (
  id: string,
  weight: number = 1,
  date_sync?,
) =>
  axios.put(`/shopping-list/ingredient/${id}${date_sync ? `?date_sync=${date_sync}` : ''}`, {
    weight,
  });

export const addToShoppingListByRecipes = (
  recipe_ids: string[],
  servings_cnt: number = 1,
) => {
  let recipeIdsQuery = '';

  recipe_ids.forEach((recipeId, recipeIdIndex) => {
    if (recipeIdIndex === 0) {
      recipeIdsQuery += `recipe_ids[]=${recipeId}`;
    } else {
      recipeIdsQuery += `&recipe_ids[]=${recipeId}`;
    }
  });

  const link = `/shopping-list/recipes?${recipeIdsQuery}&servings_cnt=${servings_cnt}`;

  return axios.put(link);
};

export const deleteFromShoppingList = (
  id: string,
  date_sync?,
) =>
  axios.delete(
    `/shopping-list/${id}${date_sync ? `?date_sync=${date_sync}` : ''}`,
  );

export const syncShoppingList = (date_sync: number) =>
  axios.get(`/shopping-list/sync?date_sync=${date_sync}`);
