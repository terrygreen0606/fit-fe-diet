import React from 'react';
import { NavLink } from 'react-router-dom';
import { getTranslate } from 'utils';

import WithTranslate from 'components/hoc/WithTranslate';

import './ProfileSidebar.sass';

import { ReactComponent as UserEditIcon } from 'assets/img/icons/user-edit-icon.svg';
import { ReactComponent as SettingsIcon } from 'assets/img/icons/settings-icon.svg';
import { ReactComponent as CutleryIcon } from 'assets/img/icons/cutlery-icon.svg';
import { ReactComponent as UsersIcon } from 'assets/img/icons/users-icon.svg';
import { ReactComponent as WalletIcon } from 'assets/img/icons/wallet-icon.svg';
import { ReactComponent as ClockIcon } from 'assets/img/icons/clock-history-icon.svg';
import { ReactComponent as QuestionIcon } from 'assets/img/icons/question-circle-icon.svg';
import { ReactComponent as LeafIcon } from 'assets/img/icons/leaf-icon.svg';

const ProfileSidebar = (props: any) => {

  const t = (code: string) => getTranslate(props.localePhrases, code);

  return (
    <div className="profile-menu-sidebar">
      <div className="profile-menu-card card-bg">
        <h5 className="profile-menu-title">{t('profile.menu_title_payments')}</h5>

        <ul className="profile-menu-list">
          <li>
            <NavLink 
              to="/settings/personal"
              activeClassName="active" 
              exact
              className="profile-menu-list-item"
            >
              <UserEditIcon className="profile-menu-list-icon" /> {t('personal.menu_personal')}
            </NavLink>
          </li>

          <li>
            <NavLink 
              to="/settings"
              activeClassName="active" 
              exact
              className="profile-menu-list-item"
            >
              <SettingsIcon className="profile-menu-list-icon" /> {t('personal.menu_diet')}
            </NavLink>
          </li>

          <li>
            <NavLink 
              to="/settings"
              activeClassName="active" 
              exact
              className="profile-menu-list-item"
            >
              <CutleryIcon className="profile-menu-list-icon" /> {t('personal.menu_meal_plan')}
            </NavLink>
          </li>

          <li>
            <NavLink 
              to="/settings"
              activeClassName="active" 
              exact
              className="profile-menu-list-item"
            >
              <UsersIcon className="profile-menu-list-icon" /> {t('personal.menu_family')}
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="profile-menu-card card-bg mt-3">
        <h5 className="profile-menu-title">{t('profile.menu_title_settings')}</h5>

        <ul className="profile-menu-list">
          <li>
            <NavLink 
              to="/settings"
              activeClassName="active" 
              exact
              className="profile-menu-list-item"
            >
              <WalletIcon className="profile-menu-list-icon" /> {t('personal.menu_service_extend')}
            </NavLink>
          </li>

          <li>
            <NavLink 
              to="/settings"
              activeClassName="active" 
              exact
              className="profile-menu-list-item"
            >
              <ClockIcon className="profile-menu-list-icon" /> {t('personal.menu_pay_history')}
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="profile-menu-card card-bg mt-3">
        <h5 className="profile-menu-title">{t('profile.menu_title_support')}</h5>

        <ul className="profile-menu-list">
          <li>
            <a
              href="https://stgby.fitlope.com/faq"
              className="profile-menu-list-item"
            >
              <QuestionIcon className="profile-menu-list-icon" /> {t('personal.menu_faq')}
            </a>
          </li>

          <li>
            <NavLink 
              to="/settings"
              activeClassName="active" 
              exact
              className="profile-menu-list-item"
            >
              <LeafIcon className="profile-menu-list-icon" /> {t('personal.menu_freeware')}
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WithTranslate(ProfileSidebar);
