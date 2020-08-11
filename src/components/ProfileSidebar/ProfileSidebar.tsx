import React from 'react';
import { NavLink } from 'react-router-dom';

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
  return (
    <div className="profile-menu-sidebar">
      <div className="profile-menu-card card-bg">
        <h5 className="profile-menu-title">Settings</h5>

        <ul className="profile-menu-list">
          <li>
            <NavLink 
              to="/settings/personal"
              activeClassName="active" 
              exact
              className="profile-menu-list-item"
            >
              <UserEditIcon className="profile-menu-list-icon" />Personal data
            </NavLink>
          </li>

          <li>
            <NavLink 
              to="/settings"
              activeClassName="active" 
              exact
              className="profile-menu-list-item"
            >
              <SettingsIcon className="profile-menu-list-icon" />Diet plan settings
            </NavLink>
          </li>

          <li>
            <NavLink 
              to="/settings"
              activeClassName="active" 
              exact
              className="profile-menu-list-item"
            >
              <CutleryIcon className="profile-menu-list-icon" />Change your meal plan
            </NavLink>
          </li>

          <li>
            <NavLink 
              to="/settings"
              activeClassName="active" 
              exact
              className="profile-menu-list-item"
            >
              <UsersIcon className="profile-menu-list-icon" />Family members
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="profile-menu-card card-bg mt-3">
        <h5 className="profile-menu-title">Payments</h5>

        <ul className="profile-menu-list">
          <li>
            <NavLink 
              to="/settings"
              activeClassName="active" 
              exact
              className="profile-menu-list-item"
            >
              <WalletIcon className="profile-menu-list-icon" />Extend your service life
            </NavLink>
          </li>

          <li>
            <NavLink 
              to="/settings"
              activeClassName="active" 
              exact
              className="profile-menu-list-item"
            >
              <ClockIcon className="profile-menu-list-icon" />Payment history
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="profile-menu-card card-bg mt-3">
        <h5 className="profile-menu-title">Help and customer support</h5>

        <ul className="profile-menu-list">
          <li>
            <NavLink 
              to="/settings"
              activeClassName="active" 
              exact
              className="profile-menu-list-item"
            >
              <QuestionIcon className="profile-menu-list-icon" />FAQ
            </NavLink>
          </li>

          <li>
            <NavLink 
              to="/settings"
              activeClassName="active" 
              exact
              className="profile-menu-list-item"
            >
              <LeafIcon className="profile-menu-list-icon" />Freeware
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileSidebar;
