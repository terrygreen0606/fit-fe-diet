import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (rest.isAuthenticated
        ? component(props)
        : (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                nextPathname: rest.location.pathname,
                nextSearch: rest.location.search
              }
            }}
          />
        )
      )}
  />
);

export default connect(
  (state: any) => ({
    isAuthenticated: state.auth.isAuthenticated
  }),
  null
)(PrivateRoute);
