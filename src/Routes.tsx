import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import BasePage from 'components/hoc/BasePage';
import Layout from 'components/hoc/Layout';
import PrivateRoute from 'components/common/PrivateRoute';
import AuthRoute from 'components/common/AuthRoute';

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

const Routes = () => (
  <Switch>
    <PrivateRoute
      path='/'
      component={(props: any) => <Layout {...props} />}
      exact
    />

    <PrivateRoute
      path='/trainings'
      component={(props: any) => (
        <Layout {...props}>
          <TrainingsView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path='/nutrition/plan'
      component={(props: any) => (
        <Layout {...props}>
          <NutritionPlanView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path='/nutrition/plan/weights'
      component={(props: any) => (
        <Layout {...props}>
          <WeightGraphicsPage {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path='/recipe/create'
      component={(props: any) => (
        <Layout {...props}>
          <CreateRecipeView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path='/meal-plan/list'
      component={(props: any) => (
        <Layout {...props}>
          <FoodPlanView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path='/recipes'
      component={(props: any) => (
        <Layout {...props}>
          <RecipesView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path='/water-tracker'
      component={(props: any) => (
        <Layout {...props}>
          <WaterTrackerView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path='/plan/change-meal'
      component={(props: any) => (
        <Layout {...props}>
          <ChangeMealPlanView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path='/settings/personal'
      component={(props: any) => (
        <Layout {...props}>
          <SettingsPersonalView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path='/recipes/saved'
      component={(props: any) => (
        <Layout {...props}>
          <SavedRecipesView {...props} />
        </Layout>
      )}
      exact
    />

    <PrivateRoute
      path='/recipes/favourites'
      component={(props: any) => (
        <Layout {...props}>
          <FavouriteRecipesView {...props} />
          
    <PrivateRoute
      path='/dashboard'
      component={(props: any) => (
        <Layout {...props}>
          <DashboardView {...props} />
        </Layout>
      )}
      exact
    />

    <AuthRoute
      path='/login'
      component={(props: any) => (
        <BasePage {...props}>
          <LoginView {...props} />
        </BasePage>
      )}
      exact
    />

    <AuthRoute
      path='/register'
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
