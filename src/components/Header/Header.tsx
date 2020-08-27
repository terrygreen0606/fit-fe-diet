import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { userLogout } from 'store/actions';
import { getTranslate } from 'utils';

// Components
import WithTranslate from 'components/hoc/WithTranslate';
import Button from 'components/common/Forms/Button';

import './Header.sass';

import { ReactComponent as BurgerIcon } from 'assets/img/icons/burger-icon.svg';

const Header = (props: any) => {
  const { isAuthenticated } = props;
  const t = (code: string) => getTranslate(props.localePhrases, code);

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
                <Button className='mobile-auth-btn' color='primary' outline>
                  {t('login.submit')}
                </Button>
                <Button className='mobile-auth-btn ml-2 mr-4' color='primary'>
                  {t('button.sign_up')}
                </Button>

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
                  to='/plan/change-meal'
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
                  <span
                    role='presentation'
                    className='mainHeader_menuList_item'
                    onClick={() => props.userLogout()}
                  >
                    {t('common.logout')}
                  </span>
                ) : (
                  <>
                    <NavLink 
                      to='/login' 
                      className='mainHeader_menuList_item' 
                      activeClassName='mainHeader_menuList_item_active'
                    >
                      {t('login.submit')}
                    </NavLink>

                    <NavLink to='/register' className="link-raw">
                      <Button color="primary">{t('button.register')}</Button>
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
