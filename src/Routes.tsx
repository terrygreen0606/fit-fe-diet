/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import BasePage from 'components/hoc/BasePage';
import Layout from 'components/hoc/Layout';
import PrivateRoute from 'components/common/PrivateRoute';
import AuthRoute from 'components/common/AuthRoute';

import {
  routes,
  MAIN,
  TRAININGS,
  NUTRITION_PLAN,
  NUTRITION_PLAN_WEIGHTS,
  RECIPE_CREATE,
  MEAL_PLAN_LIST,
  RECIPES,
  WATER_TRACKER,
  PLAN_CHANGE_MEAL,
  SETTINGS_PERSONAL,
  RECIPES_SAVED,
  RECIPES_FAVOURITES,
  DASHBOARD,
  SETTINGS_FAQ,
  REFERRAL,
  SETTINGS_FAMILY,
  ADD_TESTIMONIALS,
  CANCELLATION,
  LOGIN,
  REGISTER,
} from 'constants/routes';

// Views
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import NutritionPlanView from './views/NutritionPlanView';
import TrainingsView from './views/TrainingsView';
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
      path={routes[MAIN]}
      component={(props: any) => (
        <Layout {...props}>
          <MainView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes[TRAININGS]}
      component={(props: any) => (
        <Layout {...props}>
          <TrainingsView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes[NUTRITION_PLAN]}
      component={(props: any) => (
        <Layout {...props}>
          <NutritionPlanView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes[NUTRITION_PLAN_WEIGHTS]}
      component={(props: any) => (
        <Layout {...props}>
          <WeightGraphicsPage {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes[RECIPE_CREATE]}
      component={(props: any) => (
        <Layout {...props}>
          <CreateRecipeView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes[MEAL_PLAN_LIST]}
      component={(props: any) => (
        <Layout {...props}>
          <FoodPlanView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes[RECIPES]}
      component={(props: any) => (
        <Layout {...props}>
          <RecipesView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes[WATER_TRACKER]}
      component={(props: any) => (
        <Layout {...props}>
          <WaterTrackerView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes[PLAN_CHANGE_MEAL]}
      component={(props: any) => (
        <Layout {...props}>
          <ChangeMealPlanView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes[SETTINGS_PERSONAL]}
      component={(props: any) => (
        <Layout {...props}>
          <SettingsPersonalView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes[RECIPES_SAVED]}
      component={(props: any) => (
        <Layout {...props}>
          <SavedRecipesView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes[RECIPES_FAVOURITES]}
      component={(props: any) => (
        <Layout {...props}>
          <FavouriteRecipesView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes[DASHBOARD]}
      component={(props: any) => (
        <Layout {...props}>
          <DashboardView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes[SETTINGS_FAQ]}
      component={(props: any) => (
        <Layout {...props}>
          <SettingsFaqView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes[REFERRAL]}
      component={(props: any) => (
        <Layout {...props}>
          <ReferralView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes[SETTINGS_FAMILY]}
      component={(props: any) => (
        <Layout {...props}>
          <SettingsFamilyView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes[ADD_TESTIMONIALS]}
      component={(props: any) => (
        <Layout {...props}>
          <TestimonialsFormView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path={routes[CANCELLATION]}
      component={(props: any) => (
        <Layout {...props}>
          <CancellationFormView {...props} />
        </Layout>
      )}
      exact
    />

    <AuthRoute
      path={routes[LOGIN]}
      component={(props: any) => (
        <BasePage {...props}>
          <LoginView {...props} />
        </BasePage>
      )}
      exact
    />

    <AuthRoute
      path={routes[REGISTER]}
      component={(props: any) => (
        <BasePage {...props} hideHeader>
          <RegisterView {...props} />
        </BasePage>
      )}
      exact
    />

    <Route component={(props: any) => <NotFound {...props} />} />
  </Switch>
);

export default withRouter(Routes);
