import React from 'react';
import classnames from 'classnames';
import { getImagePath } from 'utils';
import { Link } from 'react-router-dom';

import './NutritionPlanCard.sass';

import { ReactComponent as ReloadGrayIcon } from 'assets/img/icons/reload-gray-icon.svg';
import { ReactComponent as ShoppingCartIcon } from 'assets/img/icons/shopping-cart-icon.svg';
import { ReactComponent as CheckedIcon } from 'assets/img/icons/checked-icon.svg';
import { ReactComponent as HeartIcon } from 'assets/img/icons/heart-filled-icon.svg';
import { ReactComponent as CursorTouchIcon } from 'assets/img/icons/cursor-touch-icon.svg';

type NutritionPlanCardProps = {
  type?: 'active' | 'cross' | 'default',
  favorite?: boolean,
  favouriteActive?: boolean,
  reload?: boolean,
  reloadActive?: boolean,
  shopCart?: boolean,
  shopCartActive?: boolean,
  checked?: boolean,
  checkedActive?: boolean,
  mobileStyle?: 'horizontal-mobile' | '',
};

const NutritionPlanCardDefaultProps = {
  type: 'default',
  favorite: false,
  favouriteActive: false,
  reload: false,
  reloadActive: false,
  shopCart: false,
  shopCartActive: false,
  checked: false,
  checkedActive: false,
  mobileStyle: '',
};

const NutritionPlanCard = ({
  type,
  favorite,
  favouriteActive,
  reload,
  reloadActive,
  shopCart,
  shopCartActive,
  checked,
  checkedActive,
  mobileStyle,
}: NutritionPlanCardProps) => (
    <div className={`nutrition-plan-card card-bg ${type} ${mobileStyle}`}>
      <Link
        to='/'
        className='nutrition-plan-card-image'
        style={{ backgroundImage: `url(${getImagePath('nutrition-plan-preview-img.jpg')})` }}
      >
        <div className='nutrition-plan-card-image-touch-icon'>
          <CursorTouchIcon />
        </div>
      </Link>

      <div className={`${mobileStyle}-div`}>
        <div className='nutrition-plan-card-head'>
          <Link to='/' className='nutrition-plan-card-title'>
            Õhtusöök
          </Link>
          {favorite && (
            <button
              type='button'
              className={classnames('nutrition-plan-card-heart', {
                active: favouriteActive,
              })}
            >
              <HeartIcon />
            </button>
          )}
        </div>

        <div className='nutrition-plan-card-descr'>Õuna-rosina kohupiimavorm</div>

        <div className='nutrition-plan-card-bottom'>
          <span className='nutrition-plan-card-time'>40 min</span>
          <span className='nutrition-plan-card-mark' />
          <span className='nutrition-plan-card-price'>€€</span>
        </div>
        <div className='nutrition-plan-card-controls'>
          {reload && (
            <button
              type='button'
              className={classnames('nutrition-plan-card-controls-item', {
                active: reloadActive,
              })}
            >
              <div className='
                nutrition-plan-card-controls-item-icon
                nutrition-plan-card-controls-item-icon-reload'
              >
                <ReloadGrayIcon />
              </div>
            </button>
          )}
          {shopCart && (
            <button
              type='button'
              className={classnames('nutrition-plan-card-controls-item', {
                active: shopCartActive,
              })}
            >
              <div className='
                nutrition-plan-card-controls-item-icon
                nutrition-plan-card-controls-item-icon-shop'
              >
                <ShoppingCartIcon />
              </div>
            </button>
          )}
          {checked && (
            <button
              type='button'
              className={classnames('nutrition-plan-card-controls-item', {
                active: checkedActive,
              })}
            >
              <div className='
              nutrition-plan-card-controls-item-icon
              nutrition-plan-card-controls-item-icon-checked'
              >
                <CheckedIcon />
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );

NutritionPlanCard.defaultProps = NutritionPlanCardDefaultProps;

export default NutritionPlanCard;
