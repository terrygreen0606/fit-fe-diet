import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { userLogout } from 'store/actions';
import { getTranslate } from 'utils';
import { routes } from 'constants/routes';

// Components
import WithTranslate from 'components/hoc/WithTranslate';
import Button from 'components/common/Forms/Button';
import ShoppingListPopup from 'components/ShoppingListPopup/ShoppingListPopup';

import './Header.sass';

import { ReactComponent as BurgerIcon } from 'assets/img/icons/burger-icon.svg';
import { ReactComponent as ShoppingCartIcon } from 'assets/img/icons/shopping-cart-icon.svg';

const Header = (props: any) => {
  const {
    isAuthenticated,
    shoppingListCount,
    location,
    localePhrases,
  } = props;
  const t = (code: string) => getTranslate(localePhrases, code);
  const [shoppingListPopup, setShoppingListPopup] = useState(false);

  const toggleSideMenu = () => {
    document.body.classList.toggle('mobile-menu-opened');
  };

  const openShopListPopupHandler = () => {
    if (!location.pathname.includes('shopping-list')) setShoppingListPopup(!shoppingListPopup);
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
                {isAuthenticated && (
                  <>
                    <Button className='mobile-auth-btn' color='secondary' outline>
                      {t('login.submit')}
                    </Button>
                    <Button className='mobile-auth-btn ml-2 mr-4' color='secondary'>
                      {t('button.sign_up')}
                    </Button>
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

                {isAuthenticated && (
                  <NavLink
                    to='/shopping-list'
                    className='mainHeader_menuList_item'
                    activeClassName='mainHeader_menuList_item_active'
                  >
                    {t('recipe.saved.shopping_list')}
                  </NavLink>
                )}

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
                    <span
                      role='presentation'
                      className='mainHeader_menuList_item shopping_cart'
                      onClick={openShopListPopupHandler}
                    >
                      <ShoppingCartIcon className='mainHeader_menuList_item_icon' />
                      <span className={`shopping_cart_icon_count ${shoppingListCount !== 0 ? 'visible' : ''}`}>
                        {shoppingListCount}
                      </span>
                    </span>
                    {shoppingListPopup && (
                      <ShoppingListPopup localePhrases={localePhrases} setShoppingListPopup={setShoppingListPopup} />
                    )}

                    <span
                      role='presentation'
                      className='mainHeader_menuList_item'
                      onClick={() => props.userLogout()}
                    >
                      {t('common.logout')}
                    </span>
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
    }),
    { userLogout },
  )(Header),
);
