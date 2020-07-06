import React, { useState } from 'react';
import { connect } from 'react-redux';
import { userLogout } from 'store/actions';

// Components
import RegisterModal from 'components/RegisterModal';
import Button from 'components/common/Forms/Button';

import styles from './HomeView.module.sass';

const HomeView = (props: any) => {
  
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

  return (
    <div style={{ padding: '30px 50px' }}>
      <h1>Hello from Home!</h1>
      
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setRegisterModalOpen(false)}
      />

      <Button className="mt-5" color="primary" onClick={() => setRegisterModalOpen(true)}>Register</Button>

      <br />
      
      <Button className="mt-5" color="secondary" onClick={e => props.userLogout()}>Logout</Button>
    </div>
  );
};

export default connect(
  null,
  { userLogout }
)(HomeView);
