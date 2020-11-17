import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { userLogout } from 'store/actions';
import { getTranslate } from 'utils';
import { routes } from 'constants/routes';

// Components
import WithTranslate from 'components/hoc/WithTranslate';
import Button from 'components/common/Forms/Button';
import ShoppingListCart from 'components/ShoppingListCart';

import './Header.sass';

import { ReactComponent as BurgerIcon } from 'assets/img/icons/burger-icon.svg';

const Header = (props: any) => {
  const {
    isAuthenticated,
    localePhrases,
    settings,
  } = props;

  const t = (code: string) => getTranslate(localePhrases, code);

  const toggleSideMenu = () => {
    document.body.classList.toggle('mobile-menu-opened');
  };

  return (
    <>
      <header className='mainHeader'>
        <div className='container'>
          <div className='row'>
            <div className='col-2'>
              <Link to='/' className='mainHeader_logo' />
            </div>

            <div className='col-10 text-right'>
              <span className='header-controls'>
                {!isAuthenticated && (
                  <>
                    <Link to='/login' className='link-raw'>
                      <Button className='mobile-auth-btn' color='secondary' outline>
                        {t('login.submit')}
                      </Button>
                    </Link>

                    <Link to='/register' className='link-raw'>
                      <Button className='mobile-auth-btn ml-2 mr-4' color='secondary'>
                        {t('button.sign_up')}
                      </Button>
                    </Link>
                  </>
                )}

                <BurgerIcon
                  className='menu-toggle-icon'
                  onClick={() => toggleSideMenu()}
                />
              </span>

              <nav className='mainHeader_menuList'>

                {settings.paid_until > 0 && (
                  <>
                    <NavLink
                      to={routes.mealPlan}
                      className='mainHeader_menuList_item'
                      activeClassName='mainHeader_menuList_item_active'
                    >
                      {t('header.menu_mp')}
                    </NavLink>

                    <NavLink
                      to={routes.recipes}
                      className='mainHeader_menuList_item'
                      activeClassName='mainHeader_menuList_item_active'
                    >
                      {t('header.menu_recipes')}
                    </NavLink>

                    <NavLink
                      to={routes.waterTracker}
                      className='mainHeader_menuList_item'
                      activeClassName='mainHeader_menuList_item_active'
                    >
                      {t('header.menu_wt')}
                    </NavLink>
                  </>
                )}

                <NavLink
                  to={routes.personalSettings}
                  className='mainHeader_menuList_item'
                  activeClassName='mainHeader_menuList_item_active'
                >
                  {t('header.menu_settings')}
                </NavLink>

                <ShoppingListCart visible={isAuthenticated && settings.paid_until} />

                {isAuthenticated ? (
                  <button
                    type='button'
                    className='mainHeader_menuList_item'
                    onClick={() => props.userLogout()}
                  >
                    {t('common.logout')}
                  </button>
                ) : (
                    <>
                      <NavLink
                        to={routes.login}
                        className='mainHeader_menuList_item'
                        activeClassName='mainHeader_menuList_item_active'
                      >
                        {t('login.submit')}
                      </NavLink>

                      <NavLink to='/register' className='link-raw'>
                        <Button color='primary'>{t('button.register')}</Button>
                      </NavLink>
                    </>
                  )}
              </nav>

            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default WithTranslate(
  connect(
    (state: any) => ({
      isAuthenticated: state.auth.isAuthenticated,
      settings: state.settings,
    }),
    { userLogout },
  )(Header),
);
