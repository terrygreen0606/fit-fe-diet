/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import BasePage from 'components/hoc/BasePage';
import Layout from 'components/hoc/Layout';
import PrivateRoute from 'components/common/PrivateRoute';
import AuthRoute from 'components/common/AuthRoute';

import { routes } from 'constants/routes';

// Views
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import NutritionPlanView from './views/NutritionPlanView';
import TrainingsView from './views/TrainingsView';
import ShoppingListView from './views/ShoppingListView';
import WeightGraphicsPage from './views/WeightGraphicsPage';
import RecipesView from './views/Recipes/RecipesView';
import FoodPlanView from './views/FoodPlanView';
import CreateRecipeView from './views/Recipes/CreateRecipeView';
import WaterTrackerView from './views/WaterTrackerView';
import SettingsChangeMealPlanView from './views/Settings/SettingsChangeMealPlanView';
import SettingsPersonalView from './views/Settings/SettingsPersonalView';
import NotFound from './views/NotFound';
import SavedRecipesView from './views/Recipes/SavedRecipesView';
import FavouriteRecipesView from './views/Recipes/FavouriteRecipesView';
import DashboardView from './views/DashboardView';
import SettingsFaqView from './views/Settings/SettingsFaqView';
import SettingsFamilyView from './views/Settings/SettingsFamilyView';
import ReferralView from './views/ReferralView';
import MainView from './views/MainView';
import TestimonialsFormView from './views/Forms/TestimonialsFormView';
import CancellationFormView from './views/Forms/CancellationFormView';
import RecipeFullView from './views/Recipes/RecipeFullView';
import AfterSignupPage from './views/AfterSignupPage';

const Routes = () => (
  <Switch>
    <PrivateRoute
      path={routes.main}
      component={(props: any) => (
        <Layout {...props}>
          <MainView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.afterSignup}
      component={(props: any) => (
        <Layout {...props} headerType="promo">
          <AfterSignupPage {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.shoppingList}
      component={(props: any) => (
        <Layout {...props}>
          <ShoppingListView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.trainings}
      component={(props: any) => (
        <Layout {...props}>
          <TrainingsView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.nutritionPlan}
      component={(props: any) => (
        <Layout {...props}>
          <NutritionPlanView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.nutritionPlanWeight}
      component={(props: any) => (
        <Layout {...props}>
          <WeightGraphicsPage {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.createRecipe}
      component={(props: any) => (
        <Layout {...props}>
          <CreateRecipeView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.mealPlanList}
      component={(props: any) => (
        <Layout {...props}>
          <FoodPlanView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.recipes}
      component={(props: any) => (
        <Layout {...props}>
          <RecipesView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.waterTracker}
      component={(props: any) => (
        <Layout {...props}>
          <WaterTrackerView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.changeMealSettings}
      component={(props: any) => (
        <Layout {...props}>
          <SettingsChangeMealPlanView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.personalSettings}
      component={(props: any) => (
        <Layout {...props}>
          <SettingsPersonalView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.savedRecipes}
      component={(props: any) => (
        <Layout {...props}>
          <SavedRecipesView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.favouritesRecipes}
      component={(props: any) => (
        <Layout {...props}>
          <FavouriteRecipesView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.dashboard}
      component={(props: any) => (
        <Layout {...props}>
          <DashboardView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.faqSettings}
      component={(props: any) => (
        <Layout {...props}>
          <SettingsFaqView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.referral}
      component={(props: any) => (
        <Layout {...props}>
          <ReferralView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.familySettings}
      component={(props: any) => (
        <Layout {...props}>
          <SettingsFamilyView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.addTestimonial}
      component={(props: any) => (
        <Layout {...props}>
          <TestimonialsFormView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.cancellation}
      component={(props: any) => (
        <Layout {...props}>
          <CancellationFormView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.recipeFullView}
      component={(props: any) => (
        <Layout {...props}>
          <RecipeFullView {...props} />
        </Layout>
      )}
      exact
    />

    <AuthRoute
      path={routes.login}
      component={(props: any) => (
        <BasePage {...props}>
          <LoginView {...props} />
        </BasePage>
      )}
      exact
    />

    <AuthRoute
      path={routes.register}
      component={(props: any) => (
        <BasePage {...props}>
          <RegisterView {...props} />
        </BasePage>
      )}
      exact
    />

    <Route component={(props: any) => <NotFound {...props} />} />
  </Switch>
);

export default withRouter(Routes);
