import React from 'react';

// Components
import Button from 'components/common/Forms/Button';

import './SideMenu.sass';

import { ReactComponent as CrossIcon } from 'assets/img/icons/cross-icon.svg';

const SideMenu = () => {

  const closeSideMenu = () => {
    document.body.classList.remove('mobile-menu-opened');
  };

  return (
    <>
      <div className="mobile-side-menu-backdrop" onClick={e => closeSideMenu()}></div>

      <div id="mobileSideMenu" className="mobile-side-menu">
        <CrossIcon
          onClick={e => closeSideMenu()}
          className="mobile-side-menu-close-icon"
        />

        <ul className="mobile-menu-list">
          <li><span className="mobile-menu-list-item">Retseptid</span></li>
          <li><span className="mobile-menu-list-item">Edulood</span></li>
          <li><span className="mobile-menu-list-item">Blogi</span></li>
          <li><span className="mobile-menu-list-item">E-Pood</span></li>
        </ul>

        <Button block outline>Login</Button>
        <Button className="mt-3" block outline>Register</Button>
      </div>
    </>
  );
};

export default SideMenu;
