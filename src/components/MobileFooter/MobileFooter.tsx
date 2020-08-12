import React from 'react';
import { NavLink } from 'react-router-dom';

import { ReactComponent as DumbbellIcon } from 'assets/img/icons/dumbbell-icon.svg';
import { ReactComponent as BurgerIcon } from 'assets/img/icons/burger-icon-white.svg';
import { ReactComponent as GraphIcon } from 'assets/img/icons/graph-icon.svg';
import { ReactComponent as PurchaseIcon } from 'assets/img/icons/purchase-icon.svg';
import { ReactComponent as CutleryIcon } from 'assets/img/icons/cutlery-icon-white.svg';

import './MobileFooter.sass';

const MobileFooter = () => (
  <footer className="mobileFooter">
    <ul className="mobileFooter_list">
      <li>
        <NavLink
          to="/"
          className="mobileFooter_list_item"
          activeClassName="active"
          exact
        >
          <CutleryIcon />
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/"
          className="mobileFooter_list_item"
          activeClassName="active"
          exact
        >
          <PurchaseIcon />
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/trainings"
          className="mobileFooter_list_item"
          activeClassName="active"
          exact
        >
          <DumbbellIcon />
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/"
          className="mobileFooter_list_item"
          activeClassName="active"
          exact
        >
          <GraphIcon />
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/"
          className="mobileFooter_list_item"
          activeClassName="active"
          exact
        >
          <BurgerIcon />
        </NavLink>
      </li>
    </ul>
  </footer>
);

export default MobileFooter;
