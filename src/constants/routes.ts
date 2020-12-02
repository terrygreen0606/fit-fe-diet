export const routes = {
  main: '/',
  trainings: '/trainings',
  mealPlan: '/meal-plan',
  nutritionPlanWeight: '/nutrition/plan/weights',
  shoppingList: '/shopping-list',
  createRecipe: '/recipe/create',
  mealPlanList: '/meal-plan/list',
  recipes: '/recipes',
  waterTracker: '/water-tracker',
  changeMealSettings: '/settings/change-meal-plan',
  personalSettings: '/settings/personal',
  favouritesRecipes: '/recipes/favourites',
  faqSettings: '/settings/faq',
  referral: '/referral',
  familySettings: '/settings/family',
  addTestimonial: '/add_testimonial',
  cancellation: '/cancellation',
  login: '/login',
  register: '/register',
  resetPasword: '/reset-password',
  saveNewPasword: '/reset-password/:token',
  recipeFullView: '/recipe/:recipeId',
  registerWelcome: '/welcome',
  checkout: '/checkout',
  checkoutThankyou: '/checkout/thankyou',
  getRecipeFullView: (recipeId: string) => `/recipe/${recipeId}`,
  paymentHistorySettings: '/settings/payment-history',
  subscriptionPlanSettings: '/settings/subscription-plan',
  joinFamily: '/join-family/:id',
  logout: '/logout',
};
