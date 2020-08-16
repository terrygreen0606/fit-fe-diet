import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Components
import DayPicker from 'react-day-picker';
import Button from 'components/common/Forms/Button';

import './SavedRecipesView.sass';

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

const SavedRecipesView = () => {
  const [isOpenMealList, setOpenMealList] = useState(false);
  const [isOpenCalendarList, setOpenCalendarList] = useState(false);

  return (
    <div className='saved-recipes'>
      <div className='container'>
        <div className='saved-recipes__head'>
          <div className='row'>
            <div className='col-xl-6'>
              <ul className='saved-recipes__head-tabs'>
                <li>
                  <Link to='/' className='saved-recipes__head-tabs-item'>
                    Everything
                  </Link>
                </li>
                <li>
                  <Link to='/' className='saved-recipes__head-tabs-item'>
                    Saved
                  </Link>
                </li>
                <li>
                  <Link to='/' className='saved-recipes__head-tabs-item'>
                    Favourites
                  </Link>
                </li>
              </ul>
            </div>
            <div className='col-xl-6 text-xl-right'>
              <Link to='/recipe/create' className='page-create-btn'>
                Create your recipe
              </Link>
            </div>
          </div>
        </div>
        <div className='saved-recipes__banner'>
          <p>You have no saved recipes.</p>
          <p>
            You can save a recipe if you have replaced at least one ingredient
            in it.
          </p>
        </div>
        <div className='saved-recipes__list'>
          <div className='saved-recipes__list-item'>
            <div className='row align-items-start'>
              <Link to='/' className='saved-recipes__list-item-media col-lg-4'>
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
                          Breakfast
                        </div>
                        <div className='saved-recipes__list-item-content-head-description'>
                          Õuna-rosina kohupiimavorm
                        </div>
                        <div className='saved-recipes__list-item-content-head-datas'>
                          <div className='saved-recipes__list-item-content-head-datas-block'>
                            40 min
                          </div>
                          <div className='saved-recipes__list-item-content-head-datas-block'>
                            €€
                          </div>
                        </div>
                      </div>
                      <div className='saved-recipes__list-item-content-head-item'>
                        <div className='saved-recipes__list-item-content-head-grams'>
                          <span className='saved-recipes__list-item-content-head-grams-block'>
                            Fat
                          </span>
                          <span className='saved-recipes__list-item-content-head-grams-block'>
                            32g
                          </span>
                        </div>
                        <div className='saved-recipes__list-item-content-head-grams'>
                          <span className='saved-recipes__list-item-content-head-grams-block'>
                            Protein
                          </span>
                          <span className='saved-recipes__list-item-content-head-grams-block'>
                            10g
                          </span>
                        </div>
                        <div className='saved-recipes__list-item-content-head-grams'>
                          <span className='saved-recipes__list-item-content-head-grams-block'>
                            Carbohydrate
                          </span>
                          <span className='saved-recipes__list-item-content-head-grams-block'>
                            24g
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className='saved-recipes__list-item-content-description'>
                      520 g (1.7 pk) selver shrimp salad with herb-sour cream
                      sauce
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
                          Choose date
                        </Button>
                        {isOpenCalendarList && (
                          <div className='saved-recipes__list-item-content-choose-date-list'>
                            <DayPicker className='saved-recipes__list-item-content-calendar' />
                            <Button color='primary'>Done!</Button>
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
                          Meal
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
                                  Breakfast
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
                                  Lunch
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
                                  Snack
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
                                  Dinner
                                </div>
                              </button>
                            </div>
                            <Button color='primary'>Done!</Button>
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
                        Add to menu
                      </Button>
                      <Button
                        color='gray'
                        icon={<CartButtonIcon />}
                        className='saved-recipes__list-item-controls-button'
                      >
                        Shopping list
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='weekly-menu-button'>
          <Button color='secondary'>See you weekly menu</Button>
        </div>
      </div>
    </div>
  );
};

export default SavedRecipesView;
