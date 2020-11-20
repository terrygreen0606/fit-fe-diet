import React from 'react';
import { NavLink } from 'react-router-dom';

import { getTranslate } from 'utils';
import { routes } from 'constants/routes';

// Components
import WithTranslate from 'components/hoc/WithTranslate';

import { ReactComponent as ChefHatIcon } from 'assets/img/icons/chef-hat-icon.svg';
import { ReactComponent as WaterTrackerIcon } from 'assets/img/icons/water-tracker-icon.svg';
import { ReactComponent as CupIcon } from 'assets/img/icons/cup-icon.svg';
import { ReactComponent as PurchaseIcon } from 'assets/img/icons/purchase-icon.svg';
import { ReactComponent as CutleryIcon } from 'assets/img/icons/cutlery-icon-white.svg';

import './MobileFooter.sass';

const MobileFooter = (props: any) => {
  const t = (code: string) => getTranslate(props.localePhrases, code);

  return (
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
            <div className='mobileFooter_list_item-desc'>
              {t('app.title.meal_plan')}
            </div>
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
            <div className='mobileFooter_list_item-desc'>
              {t('app.title.shopping_list')}
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={routes.recipes}
            className='mobileFooter_list_item'
            activeClassName='active'
            exact
          >
            <ChefHatIcon />
            <div className='mobileFooter_list_item-desc'>
              {t('app.title.recipes')}
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={routes.nutritionPlanWeight}
            className='mobileFooter_list_item'
            activeClassName='active'
            exact
          >
            <CupIcon />
            <div className='mobileFooter_list_item-desc'>
              {t('app.title.goals')}
            </div>
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
            <div className='mobileFooter_list_item-desc'>
              {t('app.title.water_tracker')}
            </div>
          </NavLink>
        </li>
      </ul>
    </footer>
  );
};

export default WithTranslate(MobileFooter);
