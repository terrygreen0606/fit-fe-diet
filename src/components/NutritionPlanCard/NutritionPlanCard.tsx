import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import { getTranslate } from 'utils';

import WithTranslate from 'components/hoc/WithTranslate';
import ContentLoading from 'components/hoc/ContentLoading';

import './NutritionPlanCard.sass';

import { ReactComponent as ReloadGrayIcon } from 'assets/img/icons/reload-gray-icon.svg';
import { ReactComponent as ShoppingCartIcon } from 'assets/img/icons/shopping-cart-icon.svg';
import { ReactComponent as CheckedIcon } from 'assets/img/icons/checked-icon.svg';
import { ReactComponent as HeartIcon } from 'assets/img/icons/heart-filled-icon.svg';
import { ReactComponent as CursorTouchIcon } from 'assets/img/icons/cursor-touch-icon.svg';

type NutritionPlanCardProps = {
  imgSrc: string,
  title: string,
  linkToRecipe: string | object,
  localePhrases: [];
  type?: 'active' | 'cross' | 'default',
  onClickFavourite?: () => void,
  onClickReload?: () => void,
  onClickShopCart?: () => void,
  onClickChecked?: () => void,
  favouriteActive?: boolean,
  reloadActive?: boolean,
  shopCartActive?: boolean,
  checkedActive?: boolean,
  mobileStyle?: 'horizontal-mobile' | '',
  time?: number,
  desc?: string,
  costLevel?: string,
  isLoadingShopBtn?,
};

const NutritionPlanCardDefaultProps = {
  type: 'default',
  onClickFavourite: null,
  onClickReload: false,
  onClickShopCart: false,
  onClickChecked: false,
  favouriteActive: false,
  reloadActive: false,
  shopCartActive: false,
  checkedActive: false,
  mobileStyle: '',
  time: 0,
  desc: '',
  costLevel: '',
  isLoadingShopBtn: false,
};

const NutritionPlanCard = ({
  imgSrc,
  title,
  linkToRecipe,
  localePhrases,
  type,
  onClickFavourite,
  onClickReload,
  onClickShopCart,
  onClickChecked,
  favouriteActive,
  reloadActive,
  shopCartActive,
  checkedActive,
  mobileStyle,
  time,
  desc,
  costLevel,
  isLoadingShopBtn,
}: NutritionPlanCardProps) => {
  const t = (code: string, placeholders?: any) => getTranslate(
    localePhrases,
    code,
    placeholders,
  );

  return (
    <div className={`nutrition-plan-card card-bg ${type} ${mobileStyle}`}>
      <Link
        to={linkToRecipe}
        className='nutrition-plan-card-image'
        style={{ backgroundImage: `url(${imgSrc})` }}
      >
        <div className='nutrition-plan-card-image-touch-icon'>
          <CursorTouchIcon />
        </div>
      </Link>

      <div className={`${mobileStyle}-div`}>
        <div className='nutrition-plan-card-head'>
          <Link to={linkToRecipe} className='nutrition-plan-card-title'>
            {title}
          </Link>
          {onClickFavourite && (
            <button
              type='button'
              onClick={onClickFavourite}
              className={classnames('nutrition-plan-card-heart', {
                active: favouriteActive,
              })}
            >
              <HeartIcon />
            </button>
          )}
        </div>
        <div className='nutrition-plan-card-descr'>
          <span>
            {desc}
          </span>
        </div>

        <div className='nutrition-plan-card-bottom'>
          {time ? (
            <>
              <span className='nutrition-plan-card-time'>
                {t('common.min', { COUNT: time })}
              </span>
              <span className='nutrition-plan-card-mark' />
            </>
          ) : null}
          {costLevel && (
            <span className='nutrition-plan-card-price'>
              {costLevel}
            </span>
          )}
        </div>
        <div className='nutrition-plan-card-controls'>
          {onClickReload && (
            <button
              type='button'
              onClick={onClickReload}
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
          {onClickShopCart && (
            <button
              type='button'
              onClick={onClickShopCart}
              className={classnames('nutrition-plan-card-controls-item', {
                active: shopCartActive,
              })}
            >
              <div className='
                nutrition-plan-card-controls-item-icon
                nutrition-plan-card-controls-item-icon-shop'
              >
                <ContentLoading
                  isLoading={isLoadingShopBtn}
                  isError={false}
                  spinSize='xs'
                >
                  <ShoppingCartIcon />
                </ContentLoading>
              </div>
            </button>
          )}
          {onClickChecked && (
            <button
              type='button'
              onClick={onClickChecked}
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
};

NutritionPlanCard.defaultProps = NutritionPlanCardDefaultProps;

export default WithTranslate(NutritionPlanCard);
