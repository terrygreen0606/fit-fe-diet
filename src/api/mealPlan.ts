import axios from 'utils/axios';

export const getMealPlan = () => axios.get('meal-plan/list');

export const changeRecipeInMealPlan = (date_ts: number, recipe_id: string) =>
  axios.put('meal-plan/change-recipe', {
    date_ts,
    recipe_id,
  });

export const getMealPlanText = () =>
  axios.get('meal-plan/text');
