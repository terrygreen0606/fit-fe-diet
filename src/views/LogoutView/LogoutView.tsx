/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { userLogout } from 'store/actions';

const LogoutView = (props: any) => {
  const { userLogout } = props;

  useEffect(() => {
    userLogout();
  }, []);

  return <></>;
};

export default connect(null, { userLogout })(LogoutView);
