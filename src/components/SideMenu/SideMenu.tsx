import React from 'react';
import { Link } from 'react-router-dom';
import { getTranslate } from 'utils';

// Components
import WithTranslate from 'components/hoc/WithTranslate';
import Button from 'components/common/Forms/Button';

import './SideMenu.sass';

import { ReactComponent as CrossIcon } from 'assets/img/icons/cross-icon.svg';

const SideMenu = (props: any) => {
  const closeSideMenu = () => {
    document.body.classList.remove('mobile-menu-opened');
  };

  const t = (code: string) => getTranslate(props.localePhrases, code);

  return (
    <>
      <div
        role="presentation"
        className="mobile-side-menu-backdrop"
        onClick={(e) => closeSideMenu()}
      />

      <div id="mobileSideMenu" className="mobile-side-menu">
        <CrossIcon
          onClick={(e) => closeSideMenu()}
          className="mobile-side-menu-close-icon"
        />

        <ul className="mobile-menu-list">
          <li>
            <Link to='/trainings' className='mobile-menu-list-item'>
              {t('header.menu_trainings')}
            </Link>
          </li>
          <li>
            <Link to='/recipes' className='mobile-menu-list-item'>
              {t('header.menu_recipes')}
            </Link>
          </li>
          <li>
            <Link to='/plan/change-meal' className='mobile-menu-list-item'>
              {t('mp.change.title')}
            </Link>
          </li>
          <li>
            <Link to='/nutrition/plan' className='mobile-menu-list-item'>
              {t('nutrition.title')}
            </Link>
          </li>
        </ul>

        <Link to='/login' className='bttn bttn_default bttn_md bttnWeight_default bttnBlock bttnOutline'>
          {t('login.submit')}
        </Link>
        <Link to='/login' className='mt-3 bttn bttn_default bttn_md bttnWeight_default bttnBlock bttnOutline'>
          {t('button.register')}
        </Link>
      </div>
    </>
  );
};

export default WithTranslate(SideMenu);
