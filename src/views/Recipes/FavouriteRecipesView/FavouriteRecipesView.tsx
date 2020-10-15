import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import classnames from 'classnames';
import queryString from 'query-string';
import { toast } from 'react-toastify';

import { routes } from 'constants/routes';
import { costLevelLabel } from 'constants/costLevelLabel';
import { getTranslate } from 'utils';
import {
  getRecipesList,
  likeRecipe,
  addToShoppingListByRecipes,
} from 'api';

// Components
import WithTranslate from 'components/hoc/WithTranslate';
import Breadcrumb from 'components/Breadcrumb';
import Button from 'components/common/Forms/Button';
import ContentLoading from 'components/hoc/ContentLoading';
import Pagination from 'components/Pagination';

import './FavouriteRecipesView.sass';

import { ReactComponent as CursorTouchIcon } from 'assets/img/icons/cursor-touch-icon.svg';
import { ReactComponent as ShoppingCartIcon } from 'assets/img/icons/shopping-cart-icon.svg';
import { ReactComponent as HeartFilledIcon } from 'assets/img/icons/heart-filled-icon.svg';

const FavouriteRecipesView = (props: any) => {
  const { localePhrases, settings } = props;

  const t = (code: string, placeholders?: any) => getTranslate(
    localePhrases,
    code,
    placeholders,
  );

  const [isLoadingRecipes, setIsLoadingRecipes] = useState<boolean>(true);

  const [recipesList, setRecipesList] = useState<any[]>([]);

  const [recipesListPageInfo, setRecipesListPageInfo] = useState<{
    page: number,
    total: number,
    total_pages: number,
  }>({
    page: null,
    total: null,
    total_pages: null,
  });

  const [paramsToGetRecipes, setParamsToGetRecipes] = useState<any>({
    privateRecipes: 0,
    liked: 1,
    cuisinesIds: [],
    page: 1,
    filterType: 0,
    filter: '',
  });

  const firstRender = useRef(true);

  const getRecipesListFunc = () => {
    const queryParametersObj = queryString.parse(window.location.search);

    if (+queryParametersObj.page) {
      getRecipesList(
        paramsToGetRecipes.privateRecipes,
        paramsToGetRecipes.liked,
        paramsToGetRecipes.cuisinesIds,
        +queryParametersObj.page,
        paramsToGetRecipes.filterType,
        paramsToGetRecipes.filter,
      ).then((response) => {
        if (response.data.success && response.data.data) {
          const { data } = response.data;

          if (queryParametersObj.page > data.total_pages) {
            queryParametersObj.page = data.page;
            window.history.pushState(null, null, `?${queryString.stringify(queryParametersObj)}`);
          }

          setRecipesList([...data.recipes]);

          setRecipesListPageInfo({
            ...recipesListPageInfo,
            page: data.page,
            total: data.total,
            total_pages: data.total_pages,
          });

          setParamsToGetRecipes({
            ...paramsToGetRecipes,
            page: +queryParametersObj.page,
          });

          const $recipesList = document.querySelector('.favourites-recipes__list');

          if (!firstRender.current) {
            $recipesList.scrollIntoView({ behavior: 'smooth' });
          }

          setIsLoadingRecipes(false);

          firstRender.current = false;
        }
      }).catch(() => { });
    } else {
      getRecipesList(
        paramsToGetRecipes.privateRecipes,
        paramsToGetRecipes.liked,
        paramsToGetRecipes.cuisinesIds,
        paramsToGetRecipes.page,
        paramsToGetRecipes.filterType,
        paramsToGetRecipes.filter,
      ).then((response) => {
        if (response.data.success && response.data.data) {
          const { data } = response.data;

          const queryParameters = {
            page: paramsToGetRecipes.page,
          };
          window.history.pushState(null, null, `?${queryString.stringify(queryParameters)}`);

          setRecipesList([...data.recipes]);

          setRecipesListPageInfo({
            ...recipesListPageInfo,
            page: data.page,
            total: data.total,
            total_pages: data.total_pages,
          });

          firstRender.current = false;
        }
      }).catch(() => { });

      setIsLoadingRecipes(false);
    }
  };

  useEffect(() => {
    let cleanComponent = false;
    if (!cleanComponent) getRecipesListFunc();

    return () => cleanComponent = true;
  }, [
    window.location.search,
  ]);

  const checkMeasurement = () => {
    if (settings.measurement === 'si') {
      return t('common.gr_label');
    }

    return t('common.oz_label');
  };

  const getClickedPage = (value: number) => {
    const queryParameters = queryString.parse(window.location.search);
    queryParameters.page = `${value}`;
    window.history.pushState(null, null, `?${queryString.stringify(queryParameters)}`);

    setParamsToGetRecipes({
      ...paramsToGetRecipes,
      page: value,
    });
  };

  return (
    <>
      <Helmet>
        <title>{t('app.title.favourite_recipes')}</title>
      </Helmet>
      <section className='favourites-recipes'>
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
          <div className='favourites-recipes__head'>
            <div className='row'>
              <div className='col-xl-6'>
                <ul className='recipes-header-tabs page-tabs'>
                  <li className='page-tabs-list-item'>
                    <Link to={routes.recipes} className='page-tabs-item'>
                      {t('common.everything')}
                    </Link>
                  </li>
                  <li className='page-tabs-list-item'>
                    <Link to={routes.favouritesRecipes} className='page-tabs-item active'>
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
          <div className='favourites-recipes__banner'>
            {t('recipe.favourites.banner')}
          </div>
          <ContentLoading
            isLoading={isLoadingRecipes}
            isError={false}
            spinSize='lg'
          >
            <div className='favourites-recipes__list'>
              {recipesList.map((item) => (
                <div
                  key={item.id}
                  className='favourites-recipes__list-item'
                >
                  <div className='favourites-recipes__list-item-media'>
                    <Link
                      to={routes.getRecipeFullView(item.id)}
                      style={{
                        backgroundImage: `url(${item.image_url})`,
                      }}
                      className='favourites-recipes__list-item-media-img'
                    >
                      <CursorTouchIcon className='favourites-recipes__list-item-media-touch' />
                    </Link>
                    <button
                      type='button'
                      onClick={() => {
                        likeRecipe(item.id).then((response) => {
                          if (response.data.success && response.data.data) {
                            getRecipesListFunc();
                          }
                        }).catch(() => { });
                      }}
                      className={classnames('favourites-recipes__list-item-media-like', {
                        active: item.is_liked,
                      })}
                    >
                      <HeartFilledIcon />
                    </button>
                  </div>
                  <div className='favourites-recipes__list-item-text'>
                    <div className='d-flex flex-wrap'>
                      <div className='favourites-recipes__list-item-text-info'>
                        <Link
                          to={routes.getRecipeFullView(item.id)}
                          className='favourites-recipes__list-item-text-info-title'
                        >
                          {item.name_i18n}
                        </Link>
                        <div className='favourites-recipes__list-item-text-info-meals'>
                          {item.mealtime_codes.map((mealTimeItem) => (
                            <span key={mealTimeItem.code}>
                              {t(mealTimeItem.i18n_code)}
                            </span>
                          ))}
                        </div>
                        <div className='favourites-recipes__list-item-text-info-footer'>
                          {item.time && (
                            <div className='favourites-recipes__list-item-text-info-footer-item'>
                              {t('common.min', { COUNT: item.time })}
                            </div>
                          )}
                          {item.cost_level && (
                            <div className='favourites-recipes__list-item-text-info-footer-item'>
                              {costLevelLabel[item.cost_level]}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className='favourites-recipes__list-item-text-desc'>
                        <div className='favourites-recipes__list-item-text-desc-preparation'>
                          {item.preparation_i18n?.length >= 50 ? (
                            `${item.preparation_i18n.substr(0, 50)}...`
                          ) : (
                              item.preparation_i18n
                            )}
                        </div>
                        <div className='favourites-recipes__list-item-text-desc-composition'>
                          <div className='favourites-recipes__list-item-text-desc-composition-item'>
                            <span>
                              {t('common.fat')}
                            </span>
                            <span>
                              {`${item.fat} ${checkMeasurement()}`}
                            </span>
                          </div>
                          <div className='favourites-recipes__list-item-text-desc-composition-item'>
                            <span>
                              {t('common.protein')}
                            </span>
                            <span>
                              {`${item.protein} ${checkMeasurement()}`}
                            </span>
                          </div>
                          <div className='favourites-recipes__list-item-text-desc-composition-item'>
                            <span>
                              {t('common.carbohydrate')}
                            </span>
                            <span>
                              {`${item.carbohydrate} ${checkMeasurement()}`}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='favourites-recipes__list-item-text-shop-list'>
                      <Button
                        color='gray'
                        onClick={() => {
                          addToShoppingListByRecipes([item.id]).then((response) => {
                            if (response.data.success && response.data.data) {
                              toast.success(t('recipe.update_shopping_list.success'));
                            }
                          });
                        }}
                        className='favourites-recipes__list-item-text-shop-list-btn'
                      >
                        <ShoppingCartIcon />
                        {t('recipe.favourites.shopping_list')}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              {recipesListPageInfo.total_pages > 1 && (
                <Pagination
                  currentItem={recipesListPageInfo.page}
                  lastPage={recipesListPageInfo.total_pages}
                  getClickedPage={getClickedPage}
                  quantityButtons={recipesListPageInfo.total_pages > 5 ? 5 : recipesListPageInfo.total_pages}
                />
              )}
            </div>
          </ContentLoading>
        </div>
      </section>
    </>
  );
};

export default WithTranslate(
  connect(
    (state: any) => ({
      settings: state.settings,
    }),
  )(FavouriteRecipesView),
);
