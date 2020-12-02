import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { routes } from 'constants/routes';

const AuthRoute = ({ component, ...rest }: any) => (
  <Route
    {...rest}
    render={(props) => (!rest.isAuthenticated
      ? component(props)
      : (
        <Redirect
          to={{
            pathname: routes.main,
            search: rest.location.state ? rest.location.state.nextSearch : '',
          }}
        />
      )
    )}
  />
);

export default connect(
  (state: any) => ({
    isAuthenticated: state.auth.isAuthenticated,
  }),
  null,
)(AuthRoute);
