import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import classnames from 'classnames';

import { routes } from 'constants/routes';
import { costLevelLabel } from 'constants/costLevelLabel';
import { getTranslate } from 'utils';
import {
  getRecipeCuisines,
  getRecipesList,
  likeRecipe,
  prepareRecipe,
  addToShoppingListByRecipes,
} from 'api';

// Components
import InputField from 'components/common/Forms/InputField';
import NutritionPlanCard from 'components/NutritionPlanCard';
import WithTranslate from 'components/hoc/WithTranslate';
import Breadcrumb from 'components/Breadcrumb';
import ContentLoading from 'components/hoc/ContentLoading';
import Pagination from 'components/common/Pagination';
import useDebounce from 'components/hooks/useDebounce';

import './RecipesView.sass';

import { selectStyles } from './selectData';

const RecipesView = (props: any) => {
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

  const [isLoadingPage, setLoadingPage] = useState<boolean>(true);

  const [paramsToGetRecipes, setParamsToGetRecipes] = useState<any>({
    privateRecipes: 0,
    liked: 0,
    cuisinesIds: [],
    page: 1,
    filterType: 0,
    filter: '',
  });

  const debouncedSearch = useDebounce(paramsToGetRecipes.filter, 500);

  const t = (code: string, placeholders?: any) =>
    getTranslate(props.localePhrases, code, placeholders);

  useEffect(() => {
    getRecipeCuisines().then((response) => {
      setCuisinesList([...response.data.data]);
    });
  }, []);

  useEffect(() => {
    getRecipesList(
      paramsToGetRecipes.privateRecipes,
      paramsToGetRecipes.liked,
      paramsToGetRecipes.cuisinesIds,
      paramsToGetRecipes.page,
      paramsToGetRecipes.filterType,
      paramsToGetRecipes.filter,
    ).then((response) => {
      const { data } = response.data;

      setRecipesList([...data.recipes]);

      setRecipesListPageInfo({
        ...recipesListPageInfo,
        page: data.page,
        total: data.total,
        total_pages: data.total_pages,
      });

      setLoadingPage(false);
    });
  }, [debouncedSearch]);

  useEffect(() => {
    getRecipesList(
      paramsToGetRecipes.privateRecipes,
      paramsToGetRecipes.liked,
      paramsToGetRecipes.cuisinesIds,
      paramsToGetRecipes.page,
      paramsToGetRecipes.filterType,
      paramsToGetRecipes.filter,
    ).then((response) => {
      const { data } = response.data;

      setRecipesList([...data.recipes]);

      setRecipesListPageInfo({
        ...recipesListPageInfo,
        page: data.page,
        total: data.total,
        total_pages: data.total_pages,
      });

      setLoadingPage(false);
    });
  }, [
    paramsToGetRecipes.privateRecipes,
    paramsToGetRecipes.liked,
    paramsToGetRecipes.cuisinesIds,
    paramsToGetRecipes.page,
    paramsToGetRecipes.filterType,
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
          <div className='recipes-header'>
            <ul className='recipes-header-tabs page-tabs'>
              <Link to={routes.recipes} className='page-tabs-item active'>
                {t('common.everything')}
              </Link>
              <Link to={routes.savedRecipes} className='page-tabs-item'>
                {t('common.saved')}
              </Link>
              <Link to={routes.favouritesRecipes} className='page-tabs-item'>
                {t('common.favourites')}
              </Link>
            </ul>
            <div className='recipes-header-create-recipe'>
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
                    placeholder={t('recipe.search_by_recipes')}
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
                <Pagination
                  currentItem={1}
                  lastPage={recipesListPageInfo.total_pages}
                  getClickedPage={getClickedPage}
                  quantityButtons={recipesListPageInfo.total_pages > 5 ? 5 : recipesListPageInfo.total_pages}
                />
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

export default WithTranslate(connect(null)(RecipesView));
