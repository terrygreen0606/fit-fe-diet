import React from 'react';
import { Helmet } from 'react-helmet';

export default () => (
  <Helmet>
    <script src="https://apis.google.com/js/platform.js" async />
    <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js" />
  </Helmet>
);
