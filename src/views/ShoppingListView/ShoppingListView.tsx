/* eslint-disable react/jsx-indent */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable react/no-danger */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { routes } from 'constants/routes';
import {
  getTranslate,
  getWeigthUnit,
} from 'utils';
import {
  searchIngredients,
  getIngredient,
  getShoppingList,
} from 'api';

// Components
import WithTranslate from 'components/hoc/WithTranslate';
import Breadcrumb from 'components/Breadcrumb';
import CustomCheckbox from 'components/common/Forms/CustomCheckbox';
import SelectInput from 'components/common/Forms/SelectInput';
import InputField from 'components/common/Forms/InputField';
import Button from 'components/common/Forms/Button';
import Spinner from 'components/common/Spinner';

import './ShoppingListView.sass';

// Icons
import { ReactComponent as FileDyskIcon } from 'assets/img/icons/file-dysk-icon.svg';
import { ReactComponent as PrintIcon } from 'assets/img/icons/print-icon.svg';
import { ReactComponent as ShareIcon } from 'assets/img/icons/share-icon.svg';
import { ReactComponent as TrashIcon } from 'assets/img/icons/trash-icon.svg';

import { mockData } from './dataForShoppingList';

const ShoppingListView = (props: any) => {
  const t = (code: string, placeholders?: any) => getTranslate(props.localePhrases, code, placeholders);

  const { settings } = props;

  const [bannerStep, setBannerStep] = useState<number>(0);
  const [isBannerActive, setBannerActive] = useState<boolean>(true);

  const [isSpinnerActive, setSpinnerActive] = useState<boolean>(true);

  const [shoppingList, setShoppingList] = useState<Array<any>>([]);

  const [shoppingListLength, setShoppingListLength] = useState<number>(0);

  const filterIngredients = async (inputValue: string) => {
    if (inputValue.length < 2) return;
    const filteredListOfIngredients: Array<any> = [];
    try {
      const response = await searchIngredients(inputValue);
      const listOfIngredients = response.data.data;
      Object.entries(listOfIngredients).forEach((prop) => {
        filteredListOfIngredients.push({
          value: prop[0],
          label: prop[1],
        });
      });
      return filteredListOfIngredients;
    } catch {
      return filteredListOfIngredients;
    }
  };

  const inputValueIngredient = (inputValue: string) =>
    new Promise((resolve) => {
      resolve(filterIngredients(inputValue));
    });

  const addIndgredient = (e: any) => {
    getIngredient(e.value).then((response) => {
      const { data } = response.data;

      console.log('data', data);
      // if (
      //   createRecipeForm.ingredients.find(
      //     (item) => item.ingredient_id === data._id,
      //   )
      // ) {
      //   toast.error(t('recipe.create.duplication_error'), {
      //     autoClose: 3000,
      //   });
      //   return;
      // }
      // const filteredData = {
      //   ingredient_id: data._id,
      //   cost_level: data.cost_level,
      //   name_i18n: data.name_i18n,
      //   weight: null,
      //   is_opt: false,
      //   calorie: data.calorie / 100,
      //   fat: data.fat / 100,
      //   carbohydrate: data.carbohydrate / 100,
      //   protein: data.protein / 100,
      //   sugar: data.sugar / 100,
      //   salt: data.salt / 100,
      //   isFullBlock: true,
      //   image_url: data.image_url,
      // };

      // setCreateRecipeForm({
      //   ...createRecipeForm,
      //   ingredients: [...createRecipeForm.ingredients, filteredData],
      // });
    });
  };

  useEffect(() => {
    getShoppingList(2).then((response) => {
      const { list } = response.data.data;

      setShoppingListLength(list.length);

      const sortedShoppingList = [];
      if (
        sortedShoppingList.length === 0
        && list.length > 0
      ) {
        sortedShoppingList.push({
          category: list[0]?.cuisine_name_i18n,
          column: list[0].column,
          ingredientsList: [list[0]],
        });
      }

      list.forEach((item, itemIndex) => {
        if (itemIndex === 0) return;
        sortedShoppingList.find((findItem, findItemIndex) => {
          if (findItem.category === item.cuisine_name_i18n) {
            findItem.ingredientsList = [...findItem.ingredientsList, item];
            return;
          }

          if (findItemIndex === sortedShoppingList.length - 1) {
            sortedShoppingList.push({
              category: item.cuisine_name_i18n,
              column: item.column,
              ingredientsList: [item],
            });
          }
        });
      });
      setShoppingList([...sortedShoppingList]);
      setSpinnerActive(false);
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('app.title.shopping_list')}</title>
      </Helmet>
      {isSpinnerActive ? (
        <div className='container text-center mb-5'>
          <Spinner
            size='lg'
            color='#0FC1A1'
          />
        </div>
      ) : (
          <div className='container'>
            <Breadcrumb
              routes={[
                {
                  url: routes.main,
                  name: t('breadcrumb.main'),
                },
              ]}
              currentPage={t('app.title.shopping_list')}
            />
            <div>
              <span className='sect-subtitle'>
                {t('app.title.shopping_list')}
              </span>
            </div>
            <div className='shop-list card-bg'>
              <div className='shop-list__header'>
                <h5 className='shop-list__header-title'>
                  {t('shop_list.to_buy', { number: shoppingListLength })}
                </h5>
                <div className='shop-list__header-buttons'>
                  <button
                    type='button'
                    className='shop-list__header-buttons-item'
                  >
                    <FileDyskIcon />
                  </button>
                  <button
                    type='button'
                    className='shop-list__header-buttons-item'
                  >
                    <PrintIcon />
                  </button>
                  <button
                    type='button'
                    className='shop-list__header-buttons-item'
                  >
                    <ShareIcon />
                  </button>
                </div>
              </div>
              <div className='shop-list__body'>
                <div className='shop-list__column'>
                  {shoppingList.map((item, itemIndex) => {
                    if (item.column !== 1) return;
                    return (
                      <div
                        key={item.category}
                        className='shop-list__item'
                      >
                        <div className='shop-list__item-category'>
                          {item.category}
                        </div>
                        {shoppingList[itemIndex].ingredientsList.map((ingredient) => (
                          <div
                            key={ingredient.id}
                            className='shop-list__item-ingr'
                          >
                            <CustomCheckbox
                              label={`${t(getWeigthUnit(settings.measurement),
                                { number: ingredient.weight })} ${ingredient.name_i18n}`}
                            />
                            <button
                              type='button'
                              className='shop-list__item-ingr-delete'
                            >
                              <TrashIcon />
                            </button>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
                <div className='shop-list__column'>
                  {shoppingList.map((item, itemIndex) => {
                    if (item.column !== 2) return;
                    return (
                      <div
                        key={item.category}
                        className='shop-list__item'
                      >
                        <div className='shop-list__item-category'>
                          {item.category}
                        </div>
                        {shoppingList[itemIndex].ingredientsList.map((ingredient) => (
                          <div
                            key={ingredient.id}
                            className='shop-list__item-ingr'
                          >
                            <CustomCheckbox
                              label={`${t(getWeigthUnit(settings.measurement),
                                { number: ingredient.weight })} ${ingredient.name_i18n}`}
                            />
                            <button
                              type='button'
                              className='shop-list__item-ingr-delete'
                            >
                              <TrashIcon />
                            </button>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className='shop-list__footer'>
                <div className='shop-list__footer-search'>
                  <SelectInput
                    async
                    value=''
                    loadOptions={inputValueIngredient}
                    onChange={addIndgredient}
                    label={t('ingr.add')}
                    placeholder={t('recipe.create.ingredient_search')}
                  />
                </div>
                <div className='shop-list__footer-quantity'>
                  <InputField
                    type='number'
                    label={t('common.quantity')}
                    height='md'
                    border='light'
                  />
                </div>
                <div className='shop-list__footer-measurement'>
                  <SelectInput
                    options={[
                      {
                        label: t('common.kg_label'),
                        value: t('common.kg_label'),
                      },
                    ]}
                  />
                </div>
                <Button
                  color='primary'
                  className='shop-list__footer-btn'
                >
                  {t('common.add')}
                </Button>
              </div>
            </div>
            {isBannerActive && (
              <div className='shop-list__banner card-bg'>
                <div className='shop-list__banner-text'>
                  <div
                    dangerouslySetInnerHTML={{ __html: t(mockData[bannerStep].title) }}
                    className='shop-list__banner-text-title'
                  />
                  <div className='shop-list__banner-text-desc'>
                    {t(mockData[bannerStep].text)}
                  </div>
                </div>
                <div className='shop-list__banner-media'>
                  <img src={mockData[bannerStep].image} alt='' />
                </div>
                <Button
                  color='primary'
                  className='shop-list__banner-btn'
                  onClick={() => {
                    if (mockData.length - 1 === bannerStep) {
                      setBannerActive(false);
                      return;
                    }
                    setBannerStep((prev) => prev + 1);
                  }}
                >
                  {t('banner.next')}
                </Button>
                <button
                  type='button'
                  onClick={() => setBannerActive(false)}
                  className='shop-list__banner-btn-skip'
                >
                  {t('common.skip')}
                </button>
              </div>
            )}
          </div>
        )}
    </>
  );
};

export default WithTranslate(connect((state: any) => ({
  settings: state.settings,
}))(ShoppingListView));
