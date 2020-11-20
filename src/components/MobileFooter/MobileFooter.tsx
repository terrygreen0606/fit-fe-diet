import React from 'react';
import { NavLink } from 'react-router-dom';

import { routes } from 'constants/routes';

import { ReactComponent as DumbbellIcon } from 'assets/img/icons/dumbbell-icon.svg';
import { ReactComponent as WaterTrackerIcon } from 'assets/img/icons/water-tracker-icon.svg';
import { ReactComponent as GraphIcon } from 'assets/img/icons/graph-icon.svg';
import { ReactComponent as PurchaseIcon } from 'assets/img/icons/purchase-icon.svg';
import { ReactComponent as CutleryIcon } from 'assets/img/icons/cutlery-icon-white.svg';

import './MobileFooter.sass';

const MobileFooter = () => (
  <footer className='mobileFooter'>
    <ul className='mobileFooter_list'>
      <li>
        <NavLink
          to={routes.mealPlan}
          className='mobileFooter_list_item'
          activeClassName='active'
          exact
        >
          <CutleryIcon />
        </NavLink>
      </li>
      <li>
        <NavLink
          to={routes.shoppingList}
          className='mobileFooter_list_item'
          activeClassName='active'
          exact
        >
          <PurchaseIcon />
        </NavLink>
      </li>
      <li>
        <NavLink
          to={routes.recipes}
          className='mobileFooter_list_item'
          activeClassName='active'
          exact
        >
          <DumbbellIcon />
        </NavLink>
      </li>
      <li>
        <NavLink
          to={routes.nutritionPlanWeight}
          className='mobileFooter_list_item'
          activeClassName='active'
          exact
        >
          <GraphIcon />
        </NavLink>
      </li>
      <li>
        <NavLink
          to={routes.waterTracker}
          className='mobileFooter_list_item'
          activeClassName='active'
          exact
        >
          <WaterTrackerIcon />
        </NavLink>
      </li>
    </ul>
  </footer>
);

export default MobileFooter;
