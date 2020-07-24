import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import PrivateRoute from './components/common/PrivateRoute';
import AuthRoute from './components/common/AuthRoute';

// Views
import BasePage from 'components/hoc/BasePage';
import Layout from 'components/hoc/Layout';
import LoginView from './views/LoginView';
import MainView from './views/MainView';
import NutritionPlanView from './views/NutritionPlanView';
import CreateRecipesView from './views/CreateRecipesView';
import NotFound from './views/NotFound';

const Routes = () => (
    <Switch>
      <PrivateRoute
        path="/"
        component={(props: any) => (
          <Layout {...props}><MainView {...props} /></Layout>
        )}
        exact
      />

      <PrivateRoute
        path="/nutrition/plan"
        component={(props: any) => (
          <Layout {...props}><NutritionPlanView {...props} /></Layout>
        )}
        exact
      />

      <PrivateRoute
        path="/recipes/create"
        component={(props: any) => (
          <Layout {...props}><CreateRecipesView {...props} /></Layout>
        )}
        exact
      />

      {/* <PrivateRoute
        path="/recipes"
        component={(props: any) => (
          <Layout {...props}><RecipesView {...props} /></Layout>
        )}
        exact
      /> */}

      <AuthRoute 
        path="/login" 
        component={(props: any) => (
          <BasePage {...props}><LoginView {...props} /></BasePage>
        )}
        exact
      />

      <Route component={(props: any) => <NotFound {...props} />} />
    </Switch>
);

export default withRouter(Routes);
