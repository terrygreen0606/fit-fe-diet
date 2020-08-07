import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userLogout } from 'store/actions';

// Components
import Button from 'components/common/Forms/Button';

import './Header.sass';

import { ReactComponent as BurgerIcon } from 'assets/img/icons/burger-icon.svg';

const Header = (props: any) => {
  
  const toggleSideMenu = () => {
    document.body.classList.toggle('mobile-menu-opened');
  };

  return (
    <>  
      <header className="mainHeader">
        <div className="container">
          <div className="row">
            <div className="col-2">
              
              <span className="mainHeader_logo"></span>

            </div>
            <div className="col-10 text-right">

              <span className="header-controls">
                <Button className="mobile-auth-btn" color="primary" outline>Log in</Button>
                <Button className="mobile-auth-btn ml-2 mr-4" color="primary">Sign up</Button>

                <BurgerIcon className="menu-toggle-icon" onClick={e => toggleSideMenu()} />
              </span>
              
              <nav className="mainHeader_menuList">
                <a href="/" className="mainHeader_menuList_item">Retseptid</a>
                <a href="/" className="mainHeader_menuList_item">Edulood</a>
                <a href="/" className="mainHeader_menuList_item">E-Pood</a>
                {props.isAuthenticated ? (
                  <span className="mainHeader_menuList_item" onClick={e => props.userLogout()}>Logout</span>
                ) : (
                  <Link to="/login" className="mainHeader_menuList_item">Login</Link>
                )}
              </nav>

            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default connect(
  (state: any) => ({
    isAuthenticated: state.auth.isAuthenticated
  }),
  { userLogout }
)(Header);
