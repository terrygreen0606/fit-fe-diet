/* eslint-disable no-underscore-dangle */
/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-indent */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable react/no-danger */
import React, {
  useState,
  useEffect,
} from 'react';
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
  getPublicShopListUrl,
  getShoppingList,
  setShoppingRowBought,
  deleteFromShoppingList,
  addIngredientInShoppingList,
  syncShoppingList,
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

  const [addIngredientForm, setAddIngredientForm] = useState({
    id: '',
    weight: null,
  });
  const [addIngredientErrors, setAddIngredientErrors] = useState<Array<any>>([]);

  const [dateSync, setDateSync] = useState<number>(0);

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
    getPublicShopListUrl(1).then((response) =>
      window.location.assign(response.data.data.url));
  };

  const setIndgredient = (e: any) => {
    getIngredient(e.value).then((response) => {
      setAddIngredientForm({
        ...addIngredientForm,
        id: response.data.data._id,
      });
    });
  };

  const getShoppingListFunc = () => {
    getShoppingList(2, dateSync).then((response) => {
      const { list } = response.data.data;

      setShoppingList(list);

      if (dateSync === 0) setDateSync(response.data.data.date_sync);

      setSpinnerActive(false);
    });
  };

  useEffect(() => {
    getShoppingListFunc();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      syncShoppingList(dateSync).then((response) => {
        const { list } = response.data.data;

        const syncFromResponse = response.data.data.data_sync;

        setDateSync(response.data.data.date_sync);

        if (syncFromResponse !== dateSync) {
          const updatedShoppingList = [...shoppingList];

          if (list.length === updatedShoppingList.length) {
            list.forEach((item) => {
              updatedShoppingList.find((findItem) => {
                if (item[0] === findItem.id) {
                  const newWeight = item[1];
                  const newIsBought = item[2];

                  findItem.weight = newWeight;
                  findItem.is_bought = newIsBought;
                }
              });
            });
          } else {
            getShoppingListFunc();
          }

          setShoppingList([...updatedShoppingList]);
        }
      });
    }, (5000));
    return () => clearInterval(interval);
  });

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

    if (!addIngredientForm.id) {
      toast.error(t('shop_list.ingr.empty_error'), {
        autoClose: 3000,
      });
      return;
    }

    if (!hasError) {
      addIngredientInShoppingList(
        addIngredientForm.id,
        addIngredientForm.weight,
        dateSync,
      ).then(() => {
        getShoppingListFunc();
      }).catch(() => {
        toast.error(t('shop_list.update.error'), {
          autoClose: 3000,
        });
      });
    }
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
                  {t('shop_list.to_buy', { number: shoppingList.length })}
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
                  {shoppingList.map((item, itemIndex) => (
                    <React.Fragment key={item.id}>
                      {item.column === 1 && (
                        <div
                          className='shop-list__item'
                        >
                          {itemIndex === 0 ? (
                            <div className='shop-list__item-category'>
                              {item.cuisine_name_i18n}
                            </div>
                          ) : (
                              shoppingList[itemIndex].cuisine_name_i18n !==
                              shoppingList[itemIndex - 1].cuisine_name_i18n
                              && (
                                <div className='shop-list__item-category'>
                                  {item.cuisine_name_i18n}
                                </div>
                              )
                            )}
                          <div
                            className='shop-list__item-ingr'
                          >
                            <CustomCheckbox
                              label={`${t(getWeigthUnit(settings.measurement),
                                { number: item.weight })} ${item.name_i18n}`}
                              checked={item.is_bought}
                              onChange={() => {
                                const updatedShoppingList = [...shoppingList];

                                updatedShoppingList[itemIndex].is_bought = !updatedShoppingList[itemIndex].is_bought;

                                setShoppingList([...updatedShoppingList]);

                                setShoppingRowBought(
                                  item.id,
                                  updatedShoppingList[itemIndex].is_bought,
                                  dateSync,
                                ).catch(() => {
                                  updatedShoppingList[itemIndex].is_bought = !updatedShoppingList[itemIndex].is_bought;

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
                                const prevShoppingList = [...shoppingList];

                                updatedShoppingList.splice(itemIndex, 1);

                                setShoppingList([...updatedShoppingList]);

                                deleteFromShoppingList(item.id, dateSync)
                                  .catch(() => {
                                    toast.error(t('shop_list.update.error'), {
                                      autoClose: 3000,
                                    });

                                    setShoppingList([...prevShoppingList]);
                                  });
                              }}
                              className='shop-list__item-ingr-delete'
                            >
                              <TrashIcon />
                            </button>
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <div className='shop-list__column'>
                  {shoppingList.map((item, itemIndex) => (
                    <React.Fragment key={item.id}>
                      {item.column === 2 && (
                        <div
                          className='shop-list__item'
                        >
                          {shoppingList[itemIndex].cuisine_name_i18n !==
                            shoppingList[itemIndex - 1].cuisine_name_i18n
                            && (
                              <div className='shop-list__item-category'>
                                {item.cuisine_name_i18n}
                              </div>
                            )}
                          <div
                            className='shop-list__item-ingr'
                          >
                            <CustomCheckbox
                              label={`${t(getWeigthUnit(settings.measurement),
                                { number: item.weight })} ${item.name_i18n}`}
                              checked={item.is_bought}
                              onChange={() => {
                                const updatedShoppingList = [...shoppingList];

                                updatedShoppingList[itemIndex].is_bought = !updatedShoppingList[itemIndex].is_bought;

                                setShoppingList([...updatedShoppingList]);

                                setShoppingRowBought(
                                  item.id,
                                  updatedShoppingList[itemIndex].is_bought,
                                  dateSync,
                                ).catch(() => {
                                  updatedShoppingList[itemIndex].is_bought = !updatedShoppingList[itemIndex].is_bought;

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
                                const prevShoppingList = [...shoppingList];

                                updatedShoppingList.splice(itemIndex, 1);

                                setShoppingList([...updatedShoppingList]);

                                deleteFromShoppingList(item.id, dateSync)
                                  .catch(() => {
                                    toast.error(t('shop_list.update.error'), {
                                      autoClose: 3000,
                                    });

                                    setShoppingList([...prevShoppingList]);
                                  });
                              }}
                              className='shop-list__item-ingr-delete'
                            >
                              <TrashIcon />
                            </button>
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <form
                onSubmit={(e) => createRecipeSubmit(e)}
                className='shop-list__footer'
              >
                <div className='shop-list__footer-search'>
                  <AsyncSelect
                    async
                    loadOptions={inputValueIngredient}
                    onChange={(e) => setIndgredient(e)}
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
                    data-validate='["min", "required"]'
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
                        label: settings.measurement === 'si' ? t('common.gr_label') : t('common.oz_label'),
                        value: settings.measurement === 'si' ? t('common.gr_label') : t('common.oz_label'),
                      },
                    ]}
                    placeholder={settings.measurement === 'si' ? t('common.gr_label') : t('common.oz_label')}
                  />
                </div>
                <Button
                  type='submit'
                  color='primary'
                  className='shop-list__footer-btn'
                >
                  {t('common.add')}
                </Button>
              </form>
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
