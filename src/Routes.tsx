import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import PrivateRoute from './components/common/PrivateRoute';
import AuthRoute from './components/common/AuthRoute';

// Views
import BasePage from 'components/hoc/BasePage';
import HomeView from './views/HomeView';
import LoginView from './views/LoginView';
import NotFound from './views/NotFound';

const Routes = () => (
    <Switch>
      <PrivateRoute
        path="/"
        component={(props: any) => (
          <HomeView {...props} />
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
