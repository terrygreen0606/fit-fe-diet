import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as DumbbellIcon } from 'assets/img/icons/dumbbell-icon.svg';
import { ReactComponent as BurgerIcon } from 'assets/img/icons/burger-icon-white.svg';
import { ReactComponent as GraphIcon } from 'assets/img/icons/graph-icon.svg';
import { ReactComponent as PurchaseIcon } from 'assets/img/icons/purchase-icon.svg';
import { ReactComponent as CutleryIcon } from 'assets/img/icons/cutlery-icon.svg';

const MobileFooter = () => (
  <footer className="mobileFooter">
    <ol className="mobileFooter_list">
      <li className="mobileFooter_list_item active">
        <Link to="/">
          <CutleryIcon />
        </Link>
      </li>
      <li className="mobileFooter_list_item">
        <Link to="/">
          <PurchaseIcon />
        </Link>
      </li>
      <li className="mobileFooter_list_item">
        <Link to="/">
          <DumbbellIcon />
        </Link>
      </li>
      <li className="mobileFooter_list_item">
        <Link to="/">
          <GraphIcon />
        </Link>
      </li>
      <li className="mobileFooter_list_item">
        <Link to="/">
          <BurgerIcon />
        </Link>
      </li>
    </ol>
  </footer>
);

export default MobileFooter;
