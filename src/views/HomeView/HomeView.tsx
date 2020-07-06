import React from 'react';
import { connect } from 'react-redux';
import { userLogout } from 'store/actions';

import styles from './HomeView.module.sass';

const HomeView = (props: any) => {
  console.log('home')
  return (
    <>
      <h1>Hello from Home!</h1>
      <button onClick={e => props.userLogout()}>Logout</button>
    </>
  );
};

export default connect(
  null,
  { userLogout }
)(HomeView);
