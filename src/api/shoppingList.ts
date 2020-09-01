import axios from 'utils/axios';

export const getShoppingList = () => axios.get('/shopping-list');

export const getPublicShopListUrl = (txt: number = 0) => axios.get(`/user/shopping-list-url?txt=${txt}`);

export const setShoppingRowBought = (id: string, is_bought: boolean) => axios.put(`/shopping-list/${id}`, {
  is_bought,
});

export const addIngredientInShoppingList = (id: string, weight: number = 1) => axios.put(`/shopping-list/ingredient/${id}`, {
  weight,
});

export const addToShoppingListByRecipes = (recipe_ids: string[], servings_cnt: number = 1) => axios.put('/shopping-list/recipes', {
  recipe_ids,
  servings_cnt,
});

export const deleteFromShoppingList = (id: string) => axios.delete(`/shopping-list/${id}`);
