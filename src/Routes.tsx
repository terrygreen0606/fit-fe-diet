import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import PrivateRoute from './components/common/PrivateRoute';
import AuthRoute from './components/common/AuthRoute';

// Views
import BasePage from 'components/hoc/BasePage';
import Layout from 'components/hoc/Layout';
import LoginView from './views/LoginView';
import HomeView from './views/HomeView';
import MainView from './views/MainView';
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
