/* eslint-disable no-shadow */
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { userLogout } from 'store/actions';
import { getTranslate } from 'utils';
import { routes } from 'constants/routes';
import { pageTitles } from 'constants/pageTitles';

// Components
import WithTranslate from 'components/hoc/WithTranslate';
import Button from 'components/common/Forms/Button';
import ShoppingListCart from 'components/ShoppingListCart';

import './Header.sass';

import { ReactComponent as BurgerIcon } from 'assets/img/icons/burger-icon.svg';
import { ReactComponent as MobileLogoIcon } from 'assets/img/icons/logo-header-mobile-icon.svg';
import { ReactComponent as ArrowBackIcon } from 'assets/img/icons/arrow-back-icon.svg';

const Header = (props: any) => {
  const {
    isAuthenticated,
    localePhrases,
    settings,
    location,
    userLogout,
    history,
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
              <Link to={routes.main} className='mainHeader_logo' />
              {location?.pathname === routes.main ? (
                <Link to={routes.main} className='mainHeader_logo-mobile'>
                  <MobileLogoIcon />
                </Link>
              ) : (
                  <button
                    type='button'
                    onClick={() => history.goBack()}
                    className='mainHeader_back-button'
                  >
                    <ArrowBackIcon />
                  </button>
                )}
            </div>

            <div className='col-8 text-center d-xl-none'>
              <div className='mainHeader_page-title'>
                {t(pageTitles[location?.pathname] || null)}
              </div>
            </div>

            <div className='col-2 col-xl-10 text-right'>
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

                {isAuthenticated ? (
                  <>
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
                    <button
                      type='button'
                      className='mainHeader_menuList_item'
                      onClick={() => userLogout()}
                    >
                      {t('common.logout')}
                    </button>
                  </>
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
