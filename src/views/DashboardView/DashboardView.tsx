import React from 'react';

// Icons
import { ReactComponent as SettingsIcon } from 'assets/img/icons/settings-icon.svg';
import { ReactComponent as PenIcon } from 'assets/img/icons/pen-icon.svg';
import { ReactComponent as FirstPlaceIcon } from 'assets/img/icons/first-place-icon.svg';
import { ReactComponent as SecondPlaceIcon } from 'assets/img/icons/second-place-icon.svg';

import ProgressChart from './ProgressChart';

import './DashboardView.sass';

const DashboardView = () => {
  return (
    <div className='container'>
      <div className='dashboard'>
        <div className='dashboard__user card-bg'>
          <div className='dashboard__user-personal-data'>
            <div className='dashboard__user-personal-data-name'>
              <span>Hello #Name#!</span>
              <button
                type='button'
                className='dashboard__user-personal-data-name-settings'
              >
                <SettingsIcon />
              </button>
            </div>
            <div className='dashboard__user-personal-data_container'>
              <div className='dashboard__user-personal-data-media dashboard__user-personal-data-media_online'>
                <img
                  src='https://fitstg.s3.eu-central-1.amazonaws.com/anna_t.png'
                  alt=''
                />
                <button
                  type='button'
                  className='dashboard__user-personal-data-media-edit'
                >
                  <PenIcon />
                </button>
              </div>
              <div className='dashboard__user-personal-data-activity'>
                <div className='dashboard__user-personal-data-activity-last-login'>
                  <div className='dashboard__user-personal-data-activity-last-login-description'>
                    Last login:
                  </div>
                  <div className='dashboard__user-personal-data-activity-last-login-date'>
                    12.05.2020
                  </div>
                </div>
                <div className='dashboard__user-personal-data-activity-subscription'>
                  <div className='dashboard__user-personal-data-activity-subscription-description'>
                    Subscription:
                  </div>
                  <div className='dashboard__user-personal-data-activity-subscription-date'>
                    Ending in
                    <span>20</span>
                    days
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='dashboard__user-progress'>
            <div className='dashboard__user-progress-title'>
              Your point progress
            </div>
            <div className='dashboard__user-progress-chart'>
              <ProgressChart />
            </div>
          </div>
          <div className='dashboard__user-rewards'>
            <div className='dashboard__user-rewards-title'>
              Your last reward:
            </div>
            <div className='dashboard__user-rewards-item'>
              <div className='dashboard__user-rewards-item-media'>
                <FirstPlaceIcon />
              </div>
              <div className='dashboard__user-rewards-item-text'>
                <div className='dashboard__user-rewards-item-text-title'>
                  Trophy 1
                </div>
                <div className='dashboard__user-rewards-item-text-description'>
                  Some description about it
                </div>
              </div>
            </div>
            <div className='dashboard__user-rewards-item'>
              <div className='dashboard__user-rewards-item-media'>
                <SecondPlaceIcon />
              </div>
              <div className='dashboard__user-rewards-item-text'>
                <div className='dashboard__user-rewards-item-text-title'>
                  Trophy 2
                </div>
                <div className='dashboard__user-rewards-item-text-description'>
                  Some description about it
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
