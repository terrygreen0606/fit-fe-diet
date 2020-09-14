import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

import { routes } from 'constants/routes';
import { getTranslate } from 'utils';

// Components
import DayPicker from 'react-day-picker';
import Button from 'components/common/Forms/Button';
import WithTranslate from 'components/hoc/WithTranslate';
import Breadcrumb from 'components/Breadcrumb';

import '../SavedRecipesView/SavedRecipesView.sass';

// Icons
import { ReactComponent as CursorTouchIcon } from 'assets/img/icons/cursor-touch-icon.svg';
import { ReactComponent as HeartBorderIcon } from 'assets/img/icons/heart-border-icon.svg';
import { ReactComponent as CalendarButtonIcon } from 'assets/img/icons/calendar-button-icon.svg';
import { ReactComponent as CartButtonIcon } from 'assets/img/icons/cart-button-icon.svg';
import { ReactComponent as TrasnIcon } from 'assets/img/icons/trash-icon.svg';
import { ReactComponent as BreakfastIcon } from 'assets/img/icons/breakfast-icon.svg';
import { ReactComponent as LunchIcon } from 'assets/img/icons/lunch-icon.svg';
import { ReactComponent as SnackIcon } from 'assets/img/icons/snack-icon.svg';
import { ReactComponent as DinnerIcon } from 'assets/img/icons/dinner-icon.svg';
import { ReactComponent as CloseIcon } from 'assets/img/icons/close-icon.svg';

const FavouriteRecipesView = (props: any) => {
  const [isOpenMealList, setOpenMealList] = useState(false);
  const [isOpenCalendarList, setOpenCalendarList] = useState(false);

  const t = (code: string, placeholders?: any) => getTranslate(
    props.localePhrases,
    code,
    placeholders,
  );

  return (
    <>
      <Helmet>
        <title>{t('app.title.favourite_recipes')}</title>
      </Helmet>
      <section className='saved-recipes'>
        <div className='container'>
          <Breadcrumb
            routes={[
              {
                url: routes.main,
                name: t('breadcrumb.main'),
              },
              {
                url: routes.recipes,
                name: t('app.title.recipes'),
              },
            ]}
            currentPage={t('app.title.favourite_recipes')}
          />
          <div className='saved-recipes__head'>
            <div className='row'>
              <div className='col-xl-6'>
                <ul className='saved-recipes__head-tabs'>
                  <li>
                    <Link
                      to='/recipes'
                      className='saved-recipes__head-tabs-item'
                    >
                      {t('common.everything')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to='/recipes/saved'
                      className='saved-recipes__head-tabs-item'
                    >
                      {t('common.saved')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to='/recipes/favourites'
                      className='saved-recipes__head-tabs-item active'
                    >
                      {t('common.favourites')}
                    </Link>
                  </li>
                </ul>
              </div>
              <div className='col-xl-6 text-xl-right'>
                <Link to='/recipe/create' className='page-create-btn'>
                  {t('recipe.create.title')}
                </Link>
              </div>
            </div>
          </div>
          <div className='saved-recipes__banner'>
            {t('recipe.favourites.banner')}
          </div>
          <div className='saved-recipes__list'>
            <div className='saved-recipes__list-item'>
              <div className='row align-items-start'>
                <Link
                  to='/'
                  className='saved-recipes__list-item-media col-lg-4'
                >
                  <img
                    src='https://fitstg.s3.eu-central-1.amazonaws.com/nutrition-plan-preview-big.png'
                    alt=''
                  />
                  <CursorTouchIcon className='saved-recipes__list-item-media-touch' />
                  <HeartBorderIcon className='saved-recipes__list-item-media-heart' />
                </Link>
                <div className='saved-recipes__list-item-content col-lg-8 position-static'>
                  <div className='row'>
                    <div className='col-xl-8'>
                      <div className='saved-recipes__list-item-content-head'>
                        <div className='saved-recipes__list-item-content-head-item'>
                          <div className='saved-recipes__list-item-content-head-title'>
                            {t('meal.breakfast')}
                          </div>
                          <div className='saved-recipes__list-item-content-head-description'>
                            {t('recipe.saved.recipe_title')}
                          </div>
                          <div className='saved-recipes__list-item-content-head-datas'>
                            <div className='saved-recipes__list-item-content-head-datas-block'>
                              {t('common.min', { number: 40 })}
                            </div>
                            <div className='saved-recipes__list-item-content-head-datas-block'>
                              €€
                            </div>
                          </div>
                        </div>
                        <div className='saved-recipes__list-item-content-head-item'>
                          <div className='saved-recipes__list-item-content-head-grams'>
                            <span className='saved-recipes__list-item-content-head-grams-block'>
                              {t('common.fat')}
                            </span>
                            <span className='saved-recipes__list-item-content-head-grams-block'>
                              {t('common.gr', { number: 32 })}
                            </span>
                          </div>
                          <div className='saved-recipes__list-item-content-head-grams'>
                            <span className='saved-recipes__list-item-content-head-grams-block'>
                              {t('common.protein')}
                            </span>
                            <span className='saved-recipes__list-item-content-head-grams-block'>
                              {t('common.gr', { number: 10 })}
                            </span>
                          </div>
                          <div className='saved-recipes__list-item-content-head-grams'>
                            <span className='saved-recipes__list-item-content-head-grams-block'>
                              {t('common.carbohydrate')}
                            </span>
                            <span className='saved-recipes__list-item-content-head-grams-block'>
                              {t('common.gr', { number: 24 })}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className='saved-recipes__list-item-content-description'>
                        {t('recipe.saved.recipe_description')}
                      </div>
                      <div className='saved-recipes__list-item-content-buttons'>
                        <div className='saved-recipes__list-item-content-choose-date'>
                          <Button
                            color='secondary'
                            icon={<CalendarButtonIcon />}
                            onClick={() => {
                              setOpenCalendarList(!isOpenCalendarList);
                            }}
                          >
                            {t('recipe.saved.choose_date')}
                          </Button>
                          {isOpenCalendarList && (
                            <div className='saved-recipes__list-item-content-choose-date-list'>
                              <DayPicker className='saved-recipes__list-item-content-calendar' />
                              <Button color='primary'>
                                {t('recipe.saved.done')}
                              </Button>
                              <button
                                type='button'
                                className='saved-recipes__list-item-content-choose-date-list-close'
                                onClick={() => setOpenCalendarList(false)}
                              >
                                <CloseIcon />
                              </button>
                            </div>
                          )}
                        </div>
                        <div className='saved-recipes__list-item-content-meal'>
                          <Button
                            color='secondary'
                            onClick={() => setOpenMealList(!isOpenMealList)}
                          >
                            {t('recipe.saved.meal')}
                          </Button>
                          {isOpenMealList && (
                            <div className='saved-recipes__list-item-content-meal-list'>
                              <div className='saved-recipes__list-item-content-meal-list-wrap'>
                                <button
                                  type='button'
                                  className='saved-recipes__list-item-content-meal-list-block'
                                >
                                  <div className='saved-recipes__list-item-content-meal-list-block-media'>
                                    <BreakfastIcon />
                                  </div>
                                  <div className='saved-recipes__list-item-content-meal-list-block-text'>
                                    {t('meal.breakfast')}
                                  </div>
                                </button>
                                <button
                                  type='button'
                                  className='saved-recipes__list-item-content-meal-list-block'
                                >
                                  <div className='saved-recipes__list-item-content-meal-list-block-media'>
                                    <LunchIcon />
                                  </div>
                                  <div className='saved-recipes__list-item-content-meal-list-block-text'>
                                    {t('meal.lunch')}
                                  </div>
                                </button>
                                <button
                                  type='button'
                                  className='saved-recipes__list-item-content-meal-list-block'
                                >
                                  <div className='saved-recipes__list-item-content-meal-list-block-media'>
                                    <SnackIcon />
                                  </div>
                                  <div className='saved-recipes__list-item-content-meal-list-block-text'>
                                    {t('meal.snack')}
                                  </div>
                                </button>
                                <button
                                  type='button'
                                  className='saved-recipes__list-item-content-meal-list-block'
                                >
                                  <div className='saved-recipes__list-item-content-meal-list-block-media'>
                                    <DinnerIcon />
                                  </div>
                                  <div className='saved-recipes__list-item-content-meal-list-block-text'>
                                    {t('meal.dinner')}
                                  </div>
                                </button>
                              </div>
                              <Button color='primary'>
                                {t('recipe.saved.done')}
                              </Button>
                              <button
                                type='button'
                                className='saved-recipes__list-item-content-meal-list-close'
                                onClick={() => setOpenMealList(false)}
                              >
                                <CloseIcon />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className='col-xl-4 position-static'>
                      <div className='saved-recipes__list-item-controls'>
                        <button
                          type='button'
                          className='saved-recipes__list-item-controls-delete'
                        >
                          <TrasnIcon />
                        </button>
                        <Button
                          color='primary'
                          className='saved-recipes__list-item-controls-button'
                        >
                          {t('recipe.saved.add_to_menu')}
                        </Button>
                        <Button
                          color='gray'
                          icon={<CartButtonIcon />}
                          className='saved-recipes__list-item-controls-button'
                        >
                          {t('recipe.saved.shopping_list')}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='weekly-menu-button'>
            <Button color='secondary'>{t('recipe.saved.weekly_menu')}</Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default WithTranslate(connect(null)(FavouriteRecipesView));
