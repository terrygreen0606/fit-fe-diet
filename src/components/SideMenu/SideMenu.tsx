import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userLogout } from 'store/actions';
import { getTranslate } from 'utils';

import { routes } from 'constants/routes';

// Components
import WithTranslate from 'components/hoc/WithTranslate';

import './SideMenu.sass';

import { ReactComponent as CrossIcon } from 'assets/img/icons/cross-icon.svg';

const SideMenu = ({ localePhrases, isAuthenticated, userLogout: userAuthLogout }: any) => {
  const closeSideMenu = () => {
    document.body.classList.remove('mobile-menu-opened');
  };

  const t = (code: string) => getTranslate(localePhrases, code);

  return (
    <>
      <div
        role='presentation'
        className='mobile-side-menu-backdrop'
        onClick={(e) => closeSideMenu()}
      />

      <div id='mobileSideMenu' className='mobile-side-menu'>
        <CrossIcon
          onClick={(e) => closeSideMenu()}
          className='mobile-side-menu-close-icon'
        />

        <ul className='mobile-menu-list'>
          <li>
            <Link to={routes.trainings} className='mobile-menu-list-item'>
              {t('header.menu_trainings')}
            </Link>
          </li>
          <li>
            <Link to={routes.recipes} className='mobile-menu-list-item'>
              {t('header.menu_recipes')}
            </Link>
          </li>
          <li>
            <Link to={routes.changeMealSettings} className='mobile-menu-list-item'>
              {t('mp.change.title')}
            </Link>
          </li>
          <li>
            <Link to={routes.mealPlan} className='mobile-menu-list-item'>
              {t('mp.title')}
            </Link>
          </li>
        </ul>

        {!isAuthenticated ? (
          <>
            <Link
              to='/login'
              className='bttn bttn_default bttn_md bttnWeight_default bttnBlock bttnOutline'
            >
              {t('login.submit')}
            </Link>
            <Link
              to='/register'
              className='mt-3 bttn bttn_default bttn_md bttnWeight_default bttnBlock bttnOutline'
            >
              {t('button.register')}
            </Link>
          </>
        ) : (
          <button
            className='bttn bttn_default bttn_md bttnWeight_default bttnBlock bttnOutline'
            type='button'
            onClick={() => userAuthLogout()}
          >
            {t('common.logout')}
          </button>
        )}
      </div>
    </>
  );
};

export default WithTranslate(
  connect(
    (state: any) => ({
      isAuthenticated: state.auth.isAuthenticated,
    }),
    { userLogout },
  )(SideMenu),
);

