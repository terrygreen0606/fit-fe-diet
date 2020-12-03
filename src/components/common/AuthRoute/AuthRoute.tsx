import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({ component, ...rest }: any) => (
  <Route
    {...rest}
    render={(props) => (!rest.isAuthenticated
      ? component(props)
      : (
        <Redirect
          to={{
            pathname: rest.location.state ? rest.location.state.nextPathname : '/',
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
