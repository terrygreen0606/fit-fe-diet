import React from 'react';

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
          <li><a href="#" className="profile-menu-list-item active"><UserEditIcon className="profile-menu-list-icon" />Personal data</a></li>
          <li><a href="#" className="profile-menu-list-item"><SettingsIcon className="profile-menu-list-icon" />Diet plan settings</a></li>
          <li><a href="#" className="profile-menu-list-item"><CutleryIcon className="profile-menu-list-icon" />Change your meal plan</a></li>
          <li><a href="#" className="profile-menu-list-item"><UsersIcon className="profile-menu-list-icon" />Family members</a></li>
        </ul>
      </div>

      <div className="profile-menu-card card-bg mt-3">
        <h5 className="profile-menu-title">Payments</h5>

        <ul className="profile-menu-list">
          <li><a href="#" className="profile-menu-list-item active"><WalletIcon className="profile-menu-list-icon" />Extend your service life</a></li>
          <li><a href="#" className="profile-menu-list-item"><ClockIcon className="profile-menu-list-icon" />Payment history</a></li>
        </ul>
      </div>

      <div className="profile-menu-card card-bg mt-3">
        <h5 className="profile-menu-title">Help and customer support</h5>

        <ul className="profile-menu-list">
          <li><a href="#" className="profile-menu-list-item active"><QuestionIcon className="profile-menu-list-icon" />FAQ</a></li>
          <li><a href="#" className="profile-menu-list-item"><LeafIcon className="profile-menu-list-icon" />Freeware</a></li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileSidebar;
