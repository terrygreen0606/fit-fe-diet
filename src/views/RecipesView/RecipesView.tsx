import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Components
import Button from 'components/common/Forms/Button';
import InputField from 'components/common/Forms/InputField';
import NutritionPlanCard from 'components/NutritionPlanCard';

import './RecipesView.sass';

const RecipesView = () => {
  const [recipesSearch, setRecipesSearch] = useState('');

  return (
    <>
      <section className="recipes-head-sect">
        <div className="container">
          <div className="row">
            <div className="col-6">

              <ul className="page-tabs">
                <li className="page-tabs-item active">Everything</li>
                <li className="page-tabs-item">Saved</li>
                <li className="page-tabs-item">Favourites</li>
              </ul>

            </div>
            <div className="col-6 text-right">

              <Link to='/recipe/create' className='page-create-btn'>Create your recipe</Link>

            </div>
          </div>
        </div>
      </section>

      <section className="recipes-search-sect">
        <div className="container">
          <div className="row">
            <div className="col-12">

              <h4>Look for recipes in our recipe database</h4>

              <div className="recipes-search-wrap">
                <InputField value={recipesSearch} onChange={(e) => setRecipesSearch(e.target.value)} searchBar block placeholder="Search by ingredients" />
              </div>

              <div className="search-tags-list">
                <div className="search-tags-list-item">
                  <Button className="search-tags-list-btn">Magustoidud</Button>
                </div>

                <div className="search-tags-list-item">
                  <Button className="search-tags-list-btn">Magustoidud</Button>
                </div>

                <div className="search-tags-list-item">
                  <Button className="search-tags-list-btn">Magustoidud</Button>
                </div>

                <div className="search-tags-list-item">
                  <Button className="search-tags-list-btn">Magustoidud</Button>
                </div>

                <div className="search-tags-list-item">
                  <Button className="search-tags-list-btn">Magustoidud</Button>
                </div>

                <div className="search-tags-list-item">
                  <Button className="search-tags-list-btn">Magustoidud</Button>
                </div>

                <div className="search-tags-list-item">
                  <Button className="search-tags-list-btn">Magustoidud</Button>
                </div>

                <div className="search-tags-list-item">
                  <Button className="search-tags-list-btn">Magustoidud</Button>
                </div>

                <div className="search-tags-list-item">
                  <Button className="search-tags-list-btn">Magustoidud</Button>
                </div>

                <div className="search-tags-list-item">
                  <Button className="search-tags-list-btn">Magustoidud</Button>
                </div>

                <div className="search-tags-list-item">
                  <Button className="search-tags-list-btn">Magustoidud</Button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section className="recipes-list-sect nutrition-plan-list">
        <div className="container">
          <div className="row">
            <div className="col-4">

              <NutritionPlanCard />

            </div>
            <div className="col-4">

              <NutritionPlanCard type="active" favorite />

            </div>
            <div className="col-4">

              <NutritionPlanCard type="active" favorite />

            </div>
            <div className="col-4">

              <NutritionPlanCard />

            </div>
            <div className="col-4">

              <NutritionPlanCard type="active" favorite />

            </div>
            <div className="col-4">

              <NutritionPlanCard type="active" favorite />

            </div>
            <div className="col-4">

              <NutritionPlanCard />

            </div>
            <div className="col-4">

              <NutritionPlanCard type="active" favorite />

            </div>
            <div className="col-4">

              <NutritionPlanCard type="active" favorite />

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RecipesView;
