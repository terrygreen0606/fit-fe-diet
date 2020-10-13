import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import classnames from 'classnames';
import queryString from 'query-string';

import { routes } from 'constants/routes';
import { costLevelLabel } from 'constants/costLevelLabel';
import { getTranslate, redirectToPayView } from 'utils';
import {
  getRecipeCuisines,
  getRecipesList,
  likeRecipe,
  prepareRecipe,
  addToShoppingListByRecipes,
  getRecipesListByUrl,
} from 'api';

// Components
import InputField from 'components/common/Forms/InputField';
import NutritionPlanCard from 'components/NutritionPlanCard';
import WithTranslate from 'components/hoc/WithTranslate';
import Breadcrumb from 'components/Breadcrumb';
import ContentLoading from 'components/hoc/ContentLoading';
import Pagination from 'components/Pagination';
import useDebounce from 'components/hooks/useDebounce';

import './RecipesView.sass';

import { selectStyles } from './selectData';

const RecipesView = (props: any) => {
  const t = (code: string, placeholders?: any) =>
    getTranslate(props.localePhrases, code, placeholders);

  const { settings } = props;

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

  const [cuisinesList, setCuisinesList] = useState<any[]>([]);

  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true);

  const [inputPlaceholder, setInputPlaceholder] = useState<string>(t('recipe.search_by_recipes'));

  const [paramsToGetRecipes, setParamsToGetRecipes] = useState<any>({
    privateRecipes: 0,
    liked: 0,
    cuisinesIds: [],
    page: 1,
    filterType: 0,
    filter: '',
  });

  const debouncedSearch = useDebounce(paramsToGetRecipes.filter, 500);

  // const generateQueryString = (page: number, filter: string = '') => {
  //   window.history.pushState(null, null, `/recipes/?page=${page}&filter=${filter}`);
  // };

  useEffect(() => {
    getRecipeCuisines(0, 1).then((response) => {
      setCuisinesList([...response.data.data]);
    });
  }, []);

  const firstUpdate = useRef(true);

  useEffect(() => {
    if (settings.paid_until > 0) {
      const queryParametersObj = queryString.parse(window.location.search);
      if (+queryParametersObj.page && firstUpdate.current) {
        getRecipesListByUrl(window.location.search)
          .then((response) => {
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

            setIsLoadingPage(false);
          });
        firstUpdate.current = false;
      } else {
        getRecipesList(
          paramsToGetRecipes.privateRecipes,
          paramsToGetRecipes.liked,
          paramsToGetRecipes.cuisinesIds,
          paramsToGetRecipes.page,
          paramsToGetRecipes.filterType,
          paramsToGetRecipes.filter,
        ).then((response) => {
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

          setIsLoadingPage(false);
        });
        firstUpdate.current = false;
      }
    } else {
      redirectToPayView(props.history, t('tariff.not_paid'));
    }
  }, [
    paramsToGetRecipes.privateRecipes,
    paramsToGetRecipes.liked,
    paramsToGetRecipes.cuisinesIds,
    paramsToGetRecipes.page,
    paramsToGetRecipes.filterType,
    debouncedSearch,
  ]);

  const likeRecipeFunc = (itemIndex: number, recipeId: string) => {
    const updatedRecipesList = [...recipesList];
    updatedRecipesList[itemIndex].is_liked = !updatedRecipesList[itemIndex].is_liked;

    setRecipesList([...updatedRecipesList]);

    likeRecipe(recipeId).catch(() => {
      updatedRecipesList[itemIndex].is_liked = !updatedRecipesList[itemIndex].is_liked;

      setRecipesList([...updatedRecipesList]);
    });
  };

  const prepareRecipeFunc = (itemIndex: number, recipeId: string) => {
    const updatedRecipesList = [...recipesList];
    updatedRecipesList[itemIndex].is_prepared = !updatedRecipesList[itemIndex].is_prepared;

    setRecipesList([...updatedRecipesList]);

    prepareRecipe(recipeId).catch(() => {
      updatedRecipesList[itemIndex].is_prepared = !updatedRecipesList[itemIndex].is_prepared;

      setRecipesList([...updatedRecipesList]);
    });
  };

  const changeCuisineList = (item, itemIndex: number) => {
    const updatedCuisinesList = [...cuisinesList];
    const cuisinesIds = [...paramsToGetRecipes.cuisinesIds];

    if (!item.isActive) {
      updatedCuisinesList[itemIndex].isActive = true;
      setCuisinesList([...updatedCuisinesList]);
      cuisinesIds.push(item.id);
    } else {
      updatedCuisinesList[itemIndex].isActive = false;
      setCuisinesList([...updatedCuisinesList]);
      cuisinesIds.find((findItem, findItemIndex) => {
        if (findItem === item.id) {
          cuisinesIds.splice(findItemIndex, 1);
        }
      });
    }

    setParamsToGetRecipes({
      ...paramsToGetRecipes,
      cuisinesIds: [...cuisinesIds],
    });
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
        <title>{t('app.title.recipes')}</title>
      </Helmet>
      <section className='recipes-head-sect'>
        <div className='container'>
          <Breadcrumb
            routes={[
              {
                url: routes.main,
                name: t('breadcrumb.main'),
              },
            ]}
            currentPage={t('app.title.recipes')}
          />
          <div className='row'>
            <div className='col-xl-6'>
              <ul className='recipes-header-tabs page-tabs'>
                <li className='page-tabs-list-item'>
                  <Link to={routes.recipes} className='page-tabs-item active'>
                    {t('common.everything')}
                  </Link>
                </li>
                <li className='page-tabs-list-item'>
                  <Link to={routes.favouritesRecipes} className='page-tabs-item'>
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
      </section>
      <ContentLoading
        isLoading={isLoadingPage}
        isError={false}
        spinSize='lg'
      >
        <section className='recipes-search-sect'>
          <div className='container'>
            <div className='row'>
              <div className='col-12'>
                <h4 className='recipes-search-sect-title'>
                  {t('recipe.search.header')}
                </h4>

                <div className='recipes-search-wrap'>
                  <InputField
                    value={paramsToGetRecipes.filter}
                    onChange={(e) => {
                      setParamsToGetRecipes({
                        ...paramsToGetRecipes,
                        filter: e.target.value,
                      });
                    }}
                    searchBar
                    block
                    placeholder={inputPlaceholder}
                    className='recipes-search-wrap-input'
                  />
                  <div className='recipes-search-wrap-select'>
                    <Select
                      block
                      styles={selectStyles}
                      isSearchable={false}
                      defaultValue={{
                        label: t('recipe.search_by_recipes'),
                        value: 0,
                      }}
                      options={[
                        {
                          label: t('recipe.search_by_recipes'),
                          value: 0,
                        },
                        {
                          label: t('recipe.search_by_ingredients'),
                          value: 1,
                        },
                      ]}
                      onChange={(e) => {
                        setParamsToGetRecipes({
                          ...paramsToGetRecipes,
                          filterType: e.value,
                        });

                        setInputPlaceholder(e.label);
                      }}
                    />
                  </div>
                </div>

                <div className='recipes-search-tags'>
                  {cuisinesList.map((cuisineItem, cuisineItemIndex) => (
                    <button
                      key={cuisineItem.id}
                      type='button'
                      onClick={() => changeCuisineList(cuisineItem, cuisineItemIndex)}
                      className={classnames('recipes-search-tags-btn', {
                        active: cuisineItem.isActive,
                      })}
                    >
                      <img
                        src={cuisineItem.image}
                        alt=''
                        className='recipes-search-tags-btn-media'
                      />
                      <span>
                        {cuisineItem.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='recipes-list-sect nutrition-plan-list'>
          <div className='container'>
            {recipesList.length > 0 ? (
              <>
                <div className='row'>
                  {recipesList.map((item, itemIndex) => (
                    <div
                      key={item.id}
                      className='col-md-4'
                    >
                      <NutritionPlanCard
                        title={item.name_i18n}
                        desc={item.preparation_i18n ? `${item.preparation_i18n.substr(0, 50)}...` : ''}
                        imgSrc={item.image_url}
                        linkToRecipe={routes.getRecipeFullView(item.id)}
                        time={item.time}
                        costLevel={costLevelLabel[item.cost_level]}
                        favouriteActive={item.is_liked}
                        checkedActive={item.is_prepared}
                        onClickFavourite={() => likeRecipeFunc(itemIndex, item.id)}
                        onClickChecked={() => prepareRecipeFunc(itemIndex, item.id)}
                        onClickShopCart={() => addToShoppingListByRecipes([item.id])}
                      />
                    </div>
                  ))}
                </div>
                {recipesListPageInfo.total_pages > 1 && (
                  <Pagination
                    currentItem={recipesListPageInfo.page}
                    lastPage={recipesListPageInfo.total_pages}
                    getClickedPage={getClickedPage}
                    quantityButtons={recipesListPageInfo.total_pages > 5 ? 5 : recipesListPageInfo.total_pages}
                  />
                )}
              </>
            ) : (
                <h4 className='text-center mb-5'>
                  {t('recipe.not_found')}
                </h4>
              )}
          </div>
        </section>
      </ContentLoading>
    </>
  );
};

export default WithTranslate(connect((state: any) => ({
  settings: state.settings,
}))(RecipesView));
