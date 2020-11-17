import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTranslate } from 'utils';
import { routes } from 'constants/routes';

import WithTranslate from 'components/hoc/WithTranslate';

import './ProfileSidebar.sass';

import { ReactComponent as UserEditIcon } from 'assets/img/icons/user-edit-icon.svg';
import { ReactComponent as CutleryIcon } from 'assets/img/icons/cutlery-icon.svg';
import { ReactComponent as UsersIcon } from 'assets/img/icons/users-icon.svg';
import { ReactComponent as WalletIcon } from 'assets/img/icons/wallet-icon.svg';
import { ReactComponent as ClockIcon } from 'assets/img/icons/clock-history-icon.svg';
import { ReactComponent as QuestionIcon } from 'assets/img/icons/question-circle-icon.svg';
import { ReactComponent as LeafIcon } from 'assets/img/icons/leaf-icon.svg';

const ProfileSidebar = (props: any) => {
  const t = (code: string) => getTranslate(props.localePhrases, code);

  const { paidUntil } = props;

  return (
    <div className='profile-menu-sidebar'>
      <div className='profile-menu-card card-bg'>
        <h2 className='profile-menu-title'>
          {t('profile.menu_title_settings')}
        </h2>

        <ul className='profile-menu-list'>
          <li>
            <NavLink
              to={routes.personalSettings}
              activeClassName='active'
              exact
              className='profile-menu-list-item'
            >
              <UserEditIcon className='profile-menu-list-icon' />
              {t('personal.menu_personal')}
            </NavLink>
          </li>

          <li>
            <NavLink
              to={routes.changeMealSettings}
              activeClassName='active'
              exact
              className='profile-menu-list-item'
            >
              <CutleryIcon className='profile-menu-list-icon' />
              {t('personal.menu_meal_plan')}
            </NavLink>
          </li>

          <li>
            <NavLink
              to={routes.familySettings}
              activeClassName='active'
              exact
              className='profile-menu-list-item'
            >
              <UsersIcon className='profile-menu-list-icon' />
              {t('personal.menu_family')}
            </NavLink>
          </li>
        </ul>
      </div>

      <div className='profile-menu-card card-bg mt-3'>
        <h2 className='profile-menu-title'>
          {t('profile.menu_title_payments')}
        </h2>

        <ul className='profile-menu-list'>
          <li>
            <NavLink
              to={routes.subscriptionPlanSettings}
              activeClassName='active'
              exact
              className='profile-menu-list-item'
            >
              <WalletIcon className='profile-menu-list-icon' />
              {t('personal.menu_service_extend')}
            </NavLink>
          </li>

          {paidUntil > 0 && (
            <li>
              <NavLink
                to={routes.paymentHistorySettings}
                activeClassName='active'
                exact
                className='profile-menu-list-item'
              >
                <ClockIcon className='profile-menu-list-icon' />
                {t('personal.menu_pay_history')}
              </NavLink>
            </li>
          )}
        </ul>
      </div>

      <div className='profile-menu-card card-bg mt-3'>
        <h2 className='profile-menu-title'>
          {t('profile.menu_title_support')}
        </h2>

        <ul className='profile-menu-list'>
          <li>
            <NavLink
              to={routes.faqSettings}
              className='profile-menu-list-item'
            >
              <QuestionIcon className='profile-menu-list-icon' />
              {t('personal.menu_faq')}
            </NavLink>
          </li>

          <li>
            <NavLink
              to='/settings'
              activeClassName='active'
              exact
              className='profile-menu-list-item'
            >
              <LeafIcon className='profile-menu-list-icon' />
              {t('personal.menu_freeware')}
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WithTranslate(
  connect(
    (state: any) => ({
      paidUntil: state.settings.paid_until,
    }),
  )(ProfileSidebar),
);
