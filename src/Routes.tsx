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
import RecipesView from './views/RecipesView';
import FoodPlanView from './views/FoodPlanView';
import CreateRecipeView from './views/CreateRecipeView';
import WaterTrackerView from './views/WaterTrackerView';
import ChangeMealPlanView from './views/ChangeMealPlanView';
import SettingsPersonalView from './views/Settings/SettingsPersonalView';
import NotFound from './views/NotFound';
import SavedRecipesView from './views/SavedRecipesView';
import FavouriteRecipesView from './views/FavouriteRecipesView';
import DashboardView from './views/DashboardView';
import SettingsFaqView from './views/Settings/SettingsFaqView';
import SettingsFamilyView from './views/Settings/SettingsFamilyView';
import ReferralView from './views/ReferralView';
import MainView from './views/MainView';
import TestimonialsFormView from './views/Forms/TestimonialsFormView';
import CancellationFormView from './views/Forms/CancellationFormView';

const Routes = () => (
  <Switch>
    <PrivateRoute
      path={routes.main.url}
      component={(props: any) => (
        <Layout {...props}>
          <MainView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.shoppingList.url}
      component={(props: any) => (
        <Layout {...props}>
          <ShoppingListView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.trainings.url}
      component={(props: any) => (
        <Layout {...props}>
          <TrainingsView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.nutritionPlan.url}
      component={(props: any) => (
        <Layout {...props}>
          <NutritionPlanView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.nutritionPlanWeight.url}
      component={(props: any) => (
        <Layout {...props}>
          <WeightGraphicsPage {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.createRecipe.url}
      component={(props: any) => (
        <Layout {...props}>
          <CreateRecipeView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.mealPlanList.url}
      component={(props: any) => (
        <Layout {...props}>
          <FoodPlanView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.recipes.url}
      component={(props: any) => (
        <Layout {...props}>
          <RecipesView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.waterTracker.url}
      component={(props: any) => (
        <Layout {...props}>
          <WaterTrackerView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.changeMeal.url}
      component={(props: any) => (
        <Layout {...props}>
          <ChangeMealPlanView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.personalSettings.url}
      component={(props: any) => (
        <Layout {...props}>
          <SettingsPersonalView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.savedRecipes.url}
      component={(props: any) => (
        <Layout {...props}>
          <SavedRecipesView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.favouritesRecipes.url}
      component={(props: any) => (
        <Layout {...props}>
          <FavouriteRecipesView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.dashboard.url}
      component={(props: any) => (
        <Layout {...props}>
          <DashboardView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.faqSettings.url}
      component={(props: any) => (
        <Layout {...props}>
          <SettingsFaqView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.referral.url}
      component={(props: any) => (
        <Layout {...props}>
          <ReferralView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.familySettings.url}
      component={(props: any) => (
        <Layout {...props}>
          <SettingsFamilyView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.addTestimonial.url}
      component={(props: any) => (
        <Layout {...props}>
          <TestimonialsFormView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes.cancellation.url}
      component={(props: any) => (
        <Layout {...props}>
          <CancellationFormView {...props} />
        </Layout>
      )}
      exact
    />

    <AuthRoute
      path={routes.login.url}
      component={(props: any) => (
        <BasePage {...props}>
          <LoginView {...props} />
        </BasePage>
      )}
      exact
    />

    <AuthRoute
      path={routes.register.url}
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
