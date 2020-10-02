import React, { useState } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

import { routes } from 'constants/routes';
import { getTranslate } from 'utils';

// Components
import Button from 'components/common/Forms/Button';
import InputField from 'components/common/Forms/InputField';
import NutritionPlanCard from 'components/NutritionPlanCard';
import WithTranslate from 'components/hoc/WithTranslate';
import Breadcrumb from 'components/Breadcrumb';
import SelectInput from 'components/common/Forms/SelectInput';

import './RecipesView.sass';

import { selectStyles } from './selectStyles';

const RecipesView = (props: any) => {
  const [recipesSearch, setRecipesSearch] = useState('');

  const t = (code: string, placeholders?: any) =>
    getTranslate(props.localePhrases, code, placeholders);

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
            <div className='col-6'>
              <ul className='page-tabs'>
                <Link to='/recipes' className='page-tabs-item active'>
                  {t('common.everything')}
                </Link>
                <Link to='/recipes/saved' className='page-tabs-item'>
                  {t('common.saved')}
                </Link>
                <Link to='/recipes/favourites' className='page-tabs-item'>
                  {t('common.favourites')}
                </Link>
              </ul>
            </div>
            <div className='col-6 text-right'>
              <Link to='/recipe/create' className='page-create-btn'>
                {t('recipe.create.title')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className='recipes-search-sect'>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <h4 className='recipes-search-sect-title'>
                {t('recipe.search.header')}
              </h4>

              <div className='recipes-search-wrap'>
                <InputField
                  value={recipesSearch}
                  onChange={(e) => setRecipesSearch(e.target.value)}
                  searchBar
                  block
                  placeholder='Search by ingredients'
                  className='recipes-search-wrap-input'
                />
                <div className='recipes-search-wrap-select'>
                  <Select
                    block
                    styles={selectStyles}
                  />
                </div>
              </div>

              <div className='search-tags-list'>
                <div className='search-tags-list-item'>
                  <Button className='search-tags-list-btn'>Magustoidud</Button>
                </div>

                <div className='search-tags-list-item'>
                  <Button className='search-tags-list-btn'>Magustoidud</Button>
                </div>

                <div className='search-tags-list-item'>
                  <Button className='search-tags-list-btn'>Magustoidud</Button>
                </div>

                <div className='search-tags-list-item'>
                  <Button className='search-tags-list-btn'>Magustoidud</Button>
                </div>

                <div className='search-tags-list-item'>
                  <Button className='search-tags-list-btn'>Magustoidud</Button>
                </div>

                <div className='search-tags-list-item'>
                  <Button className='search-tags-list-btn'>Magustoidud</Button>
                </div>

                <div className='search-tags-list-item'>
                  <Button className='search-tags-list-btn'>Magustoidud</Button>
                </div>

                <div className='search-tags-list-item'>
                  <Button className='search-tags-list-btn'>Magustoidud</Button>
                </div>

                <div className='search-tags-list-item'>
                  <Button className='search-tags-list-btn'>Magustoidud</Button>
                </div>

                <div className='search-tags-list-item'>
                  <Button className='search-tags-list-btn'>Magustoidud</Button>
                </div>

                <div className='search-tags-list-item'>
                  <Button className='search-tags-list-btn'>Magustoidud</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='recipes-list-sect nutrition-plan-list'>
        <div className='container'>
          <div className='row'>
            <div className='col-4'>
              <NutritionPlanCard />
            </div>
            <div className='col-4'>
              <NutritionPlanCard type='active' favorite />
            </div>
            <div className='col-4'>
              <NutritionPlanCard type='active' favorite />
            </div>
            <div className='col-4'>
              <NutritionPlanCard />
            </div>
            <div className='col-4'>
              <NutritionPlanCard type='active' favorite />
            </div>
            <div className='col-4'>
              <NutritionPlanCard type='active' favorite />
            </div>
            <div className='col-4'>
              <NutritionPlanCard />
            </div>
            <div className='col-4'>
              <NutritionPlanCard type='active' favorite />
            </div>
            <div className='col-4'>
              <NutritionPlanCard type='active' favorite />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WithTranslate(connect(null)(RecipesView));
