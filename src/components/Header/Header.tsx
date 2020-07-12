import React, { useState } from 'react';
import { connect } from 'react-redux';
import { userLogout } from 'store/actions';

// Components
import RegisterModal from 'components/RegisterModal';
import Button from 'components/common/Forms/Button';

import './Header.sass';

const Header = (props: any) => {

  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

  return (
    <>
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setRegisterModalOpen(false)}
      />
  
      <header className="mainHeader">
        <div className="container">
          <div className="row">
            <div className="col-2">
              
              <span className="mainHeader_logo"></span>

            </div>
            <div className="col-10 text-right">
              
              <nav className="mainHeader_menuList">
                <a href="#" className="mainHeader_menuList_item">Retseptid</a>
                <a href="#" className="mainHeader_menuList_item">Edulood</a>
                <a href="#" className="mainHeader_menuList_item">E-Pood</a>
                <span className="mainHeader_menuList_item" onClick={e => props.userLogout()}>Logout</span>
              </nav>

              <Button className="ml-5" color="primary" onClick={() => setRegisterModalOpen(true)}>Register</Button>

            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default connect(
  null,
  { userLogout }
)(Header);
