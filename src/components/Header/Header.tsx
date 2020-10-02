import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { userLogout } from 'store/actions';
import { getTranslate } from 'utils';
import { routes } from 'constants/routes';

// Components
import WithTranslate from 'components/hoc/WithTranslate';
import Button from 'components/common/Forms/Button';
import ShoppingListPopup from 'components/ShoppingListPopup';
import useOutsideClick from 'components/hooks/useOutsideClick';

import './Header.sass';

import { ReactComponent as BurgerIcon } from 'assets/img/icons/burger-icon.svg';
import { ReactComponent as ShoppingCartIcon } from 'assets/img/icons/shopping-cart-icon.svg';

const Header = (props: any) => {
  const {
    isAuthenticated,
    location,
    localePhrases,
    settings,
  } = props;

  const t = (code: string) => getTranslate(localePhrases, code);

  const toggleSideMenu = () => {
    document.body.classList.toggle('mobile-menu-opened');
  };

  const [shoppingListLength, setShoppingListLength] = useState<number>(0);

  const { changedBlockRef, isBlockActive, setIsBlockActive } = useOutsideClick(false);

  const updateShoppingListLength = (value) => {
    setShoppingListLength(value);
  };

  useEffect(() => {
    setShoppingListLength(settings.shopping_list_count);
  }, [settings.shopping_list_count]);

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
                    <Link to="/login" className="link-raw">
                      <Button className='mobile-auth-btn' color='secondary' outline>
                        {t('login.submit')}
                      </Button>
                    </Link>

                    <Link to="/register" className="link-raw">
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
                <NavLink
                  to='/trainings'
                  className='mainHeader_menuList_item'
                  activeClassName='mainHeader_menuList_item_active'
                >
                  {t('header.menu_trainings')}
                </NavLink>

                <NavLink
                  to='/recipes'
                  className='mainHeader_menuList_item'
                  activeClassName='mainHeader_menuList_item_active'
                >
                  {t('header.menu_recipes')}
                </NavLink>

                <NavLink
                  to={routes.changeMealSettings}
                  className='mainHeader_menuList_item'
                  activeClassName='mainHeader_menuList_item_active'
                >
                  {t('mp.change.title')}
                </NavLink>

                <NavLink
                  to='/nutrition/plan'
                  className='mainHeader_menuList_item'
                  activeClassName='mainHeader_menuList_item_active'
                >
                  {t('nutrition.title')}
                </NavLink>

                {isAuthenticated ? (
                  <>
                    <div
                      ref={changedBlockRef}
                      className='mainHeader_menuList_shopping_cart_wrap'
                    >
                      <button
                        type='button'
                        className='mainHeader_menuList_shopping_cart'
                        onClick={() => {
                          if (!location.pathname.includes(routes.shoppingList)) {
                            setIsBlockActive(!isBlockActive);
                          }
                        }}
                      >
                        <ShoppingCartIcon />
                        <div className='mainHeader_menuList_shopping_cart_count'>
                          {shoppingListLength}
                        </div>
                      </button>
                      {(isBlockActive && !window.location.href.includes(routes.shoppingList)) && (
                        <ShoppingListPopup updateShoppingListLength={updateShoppingListLength} />
                      )}
                    </div>

                    <button
                      type='button'
                      className='mainHeader_menuList_item'
                      onClick={() => props.userLogout()}
                    >
                      {t('common.logout')}
                    </button>
                  </>
                ) : (
                    <>
                      <NavLink
                        to='/login'
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
