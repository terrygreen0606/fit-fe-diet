import axios from 'utils/axios';

export const getShoppingList = (columns: number = 1) => axios.get(`/shopping-list?columns=${columns}`);

export const getPublicShopListUrl = (txt: number = 0) => axios.get(`/user/shopping-list-url?txt=${txt}`);

export const setShoppingRowBought = (id: string, is_bought: boolean) => axios.put(`/shopping-list/${id}`, {
  is_bought,
});

export const addIngredientInShoppingList = (id: string, weight: number = 1) =>
  axios.put(`/shopping-list/ingredient/${id}`, {
    weight,
  });

export const addToShoppingListByRecipes = (recipe_ids: string[], servings_cnt: number = 1) => {
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

export const deleteFromShoppingList = (id: string) => axios.delete(`/shopping-list/${id}`);
