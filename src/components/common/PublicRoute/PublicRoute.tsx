/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route } from 'react-router-dom';

const PublicRoute = ({ component, ...rest }: any) => (
  <Route
    {...rest}
    render={(props) => component(props)}
  />
);

export default PublicRoute;
