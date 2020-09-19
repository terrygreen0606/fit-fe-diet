/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-indent */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable react/no-danger */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { toast } from 'react-toastify';
import AsyncSelect from 'react-select/async';

import { routes } from 'constants/routes';
import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
  getTranslate,
  getWeigthUnit,
} from 'utils';
import {
  searchIngredients,
  getIngredient,
  getShoppingList,
  getPublicShopListUrl,
  setShoppingRowBought,
  deleteFromShoppingList,
  addIngredientInShoppingList,
} from 'api';
import FormValidator from 'utils/FormValidator';

// Components
import WithTranslate from 'components/hoc/WithTranslate';
import Breadcrumb from 'components/Breadcrumb';
import CustomCheckbox from 'components/common/Forms/CustomCheckbox';
import SelectInput from 'components/common/Forms/SelectInput';
import InputField from 'components/common/Forms/InputField';
import Button from 'components/common/Forms/Button';
import Spinner from 'components/common/Spinner';
import ShareButtons from 'components/ShareButtons';

import './ShoppingListView.sass';

// Icons
import { ReactComponent as FileDyskIcon } from 'assets/img/icons/file-dysk-icon.svg';
import { ReactComponent as PrintIcon } from 'assets/img/icons/print-icon.svg';
import { ReactComponent as ShareIcon } from 'assets/img/icons/share-icon.svg';
import { ReactComponent as TrashIcon } from 'assets/img/icons/trash-icon.svg';

import { mockData, colourStylesSelect } from './dataForShoppingList';

const ShoppingListView = (props: any) => {
  const t = (code: string, placeholders?: any) => getTranslate(props.localePhrases, code, placeholders);

  const { settings } = props;

  const [bannerStep, setBannerStep] = useState<number>(0);
  const [isBannerActive, setBannerActive] = useState<boolean>(true);

  const [isSpinnerActive, setSpinnerActive] = useState<boolean>(true);

  const [isShareButtonActive, setShareButtonActive] = useState<boolean>(false);

  const [shoppingList, setShoppingList] = useState<Array<any>>([]);
  const [shoppingListLength, setShoppingListLength] = useState<number>(0);

  const [addIngredientForm, setAddIngredientForm] = useState({
    ingredientId: '',
    weight: '',
    measurement: '',
  });

  const [addIngredientErrors, setAddIngredientErrors] = useState<Array<any>>([]);

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

  const saveFileShoppingList = () => {
    getPublicShopListUrl(1)
      .then((response) => window.location.assign(response.data.data.url));
  };

  const getIndgredientFunc = (e: any) => {
    getIngredient(e.value).then((response) => {
      const { data } = response.data;

      console.log('data', data);
    });
  };

  const getShoppingListFunc = () => {
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

      list?.forEach((item, itemIndex) => {
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
  };

  useEffect(() => {
    getShoppingListFunc();
  }, []);

  const validateOnChange = (name: string, value: any, event, element?) => {
    validateFieldOnChange(
      name,
      value,
      event,
      addIngredientForm,
      setAddIngredientForm,
      addIngredientErrors,
      setAddIngredientErrors,
      element,
    );
  };

  const getFieldErrors = (field: string) =>
    getFieldErrorsUtil(field, addIngredientErrors);

  const createRecipeSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const inputs: Array<any> = [...form.elements].filter((i) => ['INPUT', 'SELECT', 'TEXTAREA'].includes(i.nodeName));

    const { errors, hasError } = FormValidator.bulkValidate(inputs);

    setAddIngredientErrors([...errors]);

    // if (!hasError) { };
  };

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
                    onClick={() => saveFileShoppingList()}
                    className='shop-list__header-buttons-item'
                  >
                    <FileDyskIcon />
                  </button>
                  <button
                    type='button'
                    onClick={() => window.print()}
                    className='shop-list__header-buttons-item'
                  >
                    <PrintIcon />
                  </button>
                  <button
                    type='button'
                    onClick={() => setShareButtonActive(!isShareButtonActive)}
                    className='shop-list__header-buttons-item'
                  >
                    <ShareIcon />
                  </button>
                  {isShareButtonActive && (
                    <div className='shop-list__header-buttons-share'>
                      <ShareButtons shareLink={window.location.href} />
                    </div>
                  )}
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
                        {shoppingList[itemIndex].ingredientsList.map((ingredient, ingredientIndex) => (
                          <div
                            key={ingredient.id}
                            className='shop-list__item-ingr'
                          >
                            <CustomCheckbox
                              label={`${t(getWeigthUnit(settings.measurement),
                                { number: ingredient.weight })} ${ingredient.name_i18n}`}
                              checked={ingredient.is_bought}
                              onChange={() => {
                                const updatedShoppingList = [...shoppingList];

                                updatedShoppingList[itemIndex].ingredientsList[ingredientIndex].is_bought =
                                  !updatedShoppingList[itemIndex].ingredientsList[ingredientIndex].is_bought;

                                setShoppingList([...updatedShoppingList]);

                                setShoppingRowBought(ingredient.id, !ingredient.is_bought)
                                  .catch(() => {
                                    updatedShoppingList[itemIndex].ingredientsList[ingredientIndex].is_bought =
                                      !updatedShoppingList[itemIndex].ingredientsList[ingredientIndex].is_bought;

                                    setShoppingList([...updatedShoppingList]);

                                    toast.error(t('shop_list.update.error'), {
                                      autoClose: 3000,
                                    });
                                  });
                              }}
                            />
                            <button
                              type='button'
                              onClick={() => {
                                const updatedShoppingList = [...shoppingList];

                                if (updatedShoppingList[itemIndex].ingredientsList.length === 1) {
                                  updatedShoppingList.splice(itemIndex, 1);
                                } else {
                                  updatedShoppingList[itemIndex].ingredientsList.splice(ingredientIndex, 1);
                                }

                                setShoppingList([...updatedShoppingList]);

                                setShoppingListLength((prev) => prev - 1);

                                deleteFromShoppingList(ingredient.id)
                                  .catch(() => {
                                    toast.error(t('shop_list.update.error'), {
                                      autoClose: 3000,
                                    });
                                    getShoppingListFunc();

                                    setShoppingListLength((prev) => prev + 1);
                                  });
                              }}
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
                        {shoppingList[itemIndex].ingredientsList.map((ingredient, ingredientIndex) => (
                          <div
                            key={ingredient.id}
                            className='shop-list__item-ingr'
                          >
                            <CustomCheckbox
                              label={`${t(getWeigthUnit(settings.measurement),
                                { number: ingredient.weight })} ${ingredient.name_i18n}`}
                              checked={ingredient.is_bought}
                              onChange={() => {
                                const updatedShoppingList = [...shoppingList];

                                updatedShoppingList[itemIndex].ingredientsList[ingredientIndex].is_bought =
                                  !updatedShoppingList[itemIndex].ingredientsList[ingredientIndex].is_bought;

                                setShoppingList([...updatedShoppingList]);

                                setShoppingRowBought(ingredient.id, !ingredient.is_bought)
                                  .catch(() => {
                                    updatedShoppingList[itemIndex].ingredientsList[ingredientIndex].is_bought =
                                      !updatedShoppingList[itemIndex].ingredientsList[ingredientIndex].is_bought;

                                    setShoppingList([...updatedShoppingList]);

                                    toast.error(t('shop_list.update.error'), {
                                      autoClose: 3000,
                                    });
                                  });
                              }}
                            />
                            <button
                              type='button'
                              onClick={() => {
                                const updatedShoppingList = [...shoppingList];

                                if (updatedShoppingList[itemIndex].ingredientsList.length === 1) {
                                  updatedShoppingList.splice(itemIndex, 1);
                                } else {
                                  updatedShoppingList[itemIndex].ingredientsList.splice(ingredientIndex, 1);
                                }

                                setShoppingList([...updatedShoppingList]);

                                setShoppingListLength((prev) => prev - 1);

                                deleteFromShoppingList(ingredient.id)
                                  .catch(() => {
                                    toast.error(t('shop_list.update.error'), {
                                      autoClose: 3000,
                                    });
                                    getShoppingListFunc();

                                    setShoppingListLength((prev) => prev + 1);
                                  });
                              }}
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
                  <AsyncSelect
                    async
                    loadOptions={inputValueIngredient}
                    onChange={getIndgredientFunc}
                    label={t('ingr.add')}
                    placeholder={t('recipe.create.ingredient_search')}
                    styles={colourStylesSelect}
                  />
                </div>
                <div className='shop-list__footer-quantity'>
                  <InputField
                    type='number'
                    name='weight'
                    data-param='0'
                    data-validate='["min"]'
                    errors={getFieldErrors('weight')}
                    value={addIngredientForm.weight}
                    onChange={(e) => validateOnChange('weight', e.target.value, e)}
                    min={0}
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
