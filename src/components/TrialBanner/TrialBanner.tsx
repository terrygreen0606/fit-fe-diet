import React from 'react';
import classnames from 'classnames';
import { getImagePath } from 'utils';

import Button from 'components/common/Forms/Button';

import './TrialBanner.sass';

type TrialBannerProps = {
  positionImage?: 'default' | 'right';
};

const TrialBanner = ({ positionImage }: TrialBannerProps) => (
  <>
    <div className='trial-banner'>
      <h1 className='trial-banner_title'>Nutrition plan 3 days free</h1>
      <ul className='trial-banner_list'>
        <li>
          Over healthy
          {' '}
          <span>690</span>
          {' '}
          recipes
        </li>
        <li>A shopping list that saves you time and money</li>
        <li>You can join the whole family in the plan</li>
      </ul>
      <div className='trial-banner_button-wrap'>
        <Button className='trial-banner_button' color='primary'>
          Register as an user
        </Button>
      </div>
      <img
        src={getImagePath('food/food-serving-img-2.png')}
        alt=''
        className={classnames('trial-banner-img', {
          [`position-${positionImage}`]: positionImage,
        })}
      />
    </div>
  </>
);

export default TrialBanner;
