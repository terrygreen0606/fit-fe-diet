import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userLogout } from 'store/actions';

// Components
import Button from 'components/common/Forms/Button';

import './Header.sass';

const Header = (props: any) => {
  return (
    <>  
      <header className="mainHeader">
        <div className="container">
          <div className="row">
            <div className="col-2">
              
              <span className="mainHeader_logo"></span>

            </div>
            <div className="col-10 text-right">
              
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

              {!props.isAuthenticated ? (
                <Button className="ml-5" color="primary">Register</Button>
              ) : null}

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
