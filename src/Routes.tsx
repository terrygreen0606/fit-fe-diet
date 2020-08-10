import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import PrivateRoute from './components/common/PrivateRoute';
import AuthRoute from './components/common/AuthRoute';

// Views
import BasePage from 'components/hoc/BasePage';
import Layout from 'components/hoc/Layout';
import LoginView from './views/LoginView';
import NutritionPlanView from './views/NutritionPlanView';
import WeightGraphicsPage from './views/WeightGraphicsPage';
import RecipesView from './views/RecipesView';
import CreateRecipeView from './views/CreateRecipeView';
import WaterTrackerView from './views/WaterTrackerView';
import ChangeMealPlanView from 'views/ChangeMealPlanView';
import SettingsPersonalView from 'views/Settings/SettingsPersonalView';
import NotFound from './views/NotFound';

const Routes = () => (
  <Switch>
    <PrivateRoute
      path='/'
      component={(props: any) => (
        <Layout {...props}></Layout>
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

    <AuthRoute
      path='/login'
      component={(props: any) => (
        <BasePage {...props}>
          <LoginView {...props} />
        </BasePage>
      )}
      exact
    />

    <Route component={(props: any) => <NotFound {...props} />} />
  </Switch>
);

export default withRouter(Routes);
