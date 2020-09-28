/* eslint-disable no-underscore-dangle */
/* eslint-disable operator-linebreak */
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
import { setAppSetting } from 'store/actions';

// Components
import WithTranslate from 'components/hoc/WithTranslate';
import Breadcrumb from 'components/Breadcrumb';
import CustomCheckbox from 'components/common/Forms/CustomCheckbox';
import SelectInput from 'components/common/Forms/SelectInput';
import InputField from 'components/common/Forms/InputField';
import Button from 'components/common/Forms/Button';
import Spinner from 'components/common/Spinner';
import ShareButtons from 'components/ShareButtons';
import useOutsideClick from 'components/hooks/useOutsideClick';
import useInterval from 'components/hooks/useInterval';

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
  const [isBannerActive, setIsBannerActive] = useState<boolean>(true);

  const [isSpinnerActive, setIsSpinnerActive] = useState<boolean>(true);

  const [shoppingList, setShoppingList] = useState<any[]>([]);

  const [isNoAccess, setIsNoAccess] = useState<boolean>(false);

  const [addIngredientForm, setAddIngredientForm] = useState({
    id: '',
    weight: null,
  });

  const [selectedIngedient, setSelectedIngedient] = useState<any[]>([null]);

  const [addIngredientErrors, setAddIngredientErrors] = useState<any[]>([]);

  const [dateSync, setDateSync] = useState<number>(0);
  const [isSyncResponseActive, setIsSyncResponseActive] = useState<boolean>(true);

  const { changedBlockRef, isBlockActive, setIsBlockActive } = useOutsideClick(false);

  const [sharePublicUrl, setSharePublicUrl] = useState<string>('');

  const filterIngredients = async (inputValue: string) => {
    if (inputValue.length < 2) return;
    const filteredListOfIngredients: Array<any> = [];
    try {
      const response = await searchIngredients(inputValue);
      const listOfIngredients = response.data.data;
      Object.entries(listOfIngredients).forEach(([value, label]) => {
        filteredListOfIngredients.push({
          value,
          label,
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
      const { data } = response.data;
      setAddIngredientForm({
        ...addIngredientForm,
        id: data._id,
      });
    });
  };

  const syncNumberInShopCart = (array = []) => {
    const notBoughtIngredients = (array.length > 0 ? array : shoppingList).filter((item) => !item.is_bought).length;
    props.setAppSetting({
      ...settings,
      shopping_list_count: notBoughtIngredients,
    });
  };

  const getShoppingListFunc = () => {
    setIsSyncResponseActive(false);
    getShoppingList(2, dateSync).then((response) => {
      const { list } = response.data.data;

      list.map((item) => {
        item.is_disable = false;
      });

      syncNumberInShopCart(list);

      setShoppingList(list);

      setDateSync(response.data.data.date_sync);
    }).finally(() => {
      setIsSyncResponseActive(true);
      setIsSpinnerActive(false);
    });
  };

  useEffect(() => {
    let cleanComponent = false;
    if (settings.is_private) {
      if (settings.paid_until > 0) {
        getShoppingListFunc();
        if (!cleanComponent) setIsNoAccess(false);
      } else {
        if (!cleanComponent) setIsNoAccess(true);
        if (!cleanComponent) setIsSpinnerActive(false);
      }
    }

    return () => cleanComponent = true;
  }, [settings.paid_until, settings.is_private]);

  useInterval(() => {
    if (settings.paid_until > 0) {
      syncShoppingList(dateSync).then((response) => {
        const { list } = response.data.data;
        const syncFromResponse = response.data.data.date_sync;

        if (syncFromResponse !== dateSync) {
          setDateSync(response.data.data.date_sync);
          let updatedShoppingList = [...shoppingList];

          if (list.length === updatedShoppingList.length) {
            updatedShoppingList.forEach((item) => {
              list.find((findItem) => {
                if (findItem[0] === item.id) {
                  const newWeight = findItem[1];
                  const newIsBought = findItem[2];

                  item.weight = newWeight;
                  item.is_bought = newIsBought;
                }
              });
            });
          } else if (list.length < updatedShoppingList.length) {
            const filteredShoppingList = [];
            updatedShoppingList.forEach((item) => {
              list.find((findItem) => {
                if (findItem[0] === item.id) {
                  const newWeight = findItem[1];
                  const newIsBought = findItem[2];

                  item.weight = newWeight;
                  item.is_bought = newIsBought;

                  filteredShoppingList.push(item);
                }
              });
            });
            updatedShoppingList = [...filteredShoppingList];
          } else {
            getShoppingListFunc();
          }
          setShoppingList([...updatedShoppingList]);
        }
      });
    }
  }, isSyncResponseActive ? 5000 : null);

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
        const isFound = shoppingList.find((findItem, findItemIndex) => {
          if (findItem.ingredient_id === addIngredientForm.id) {
            const updatedShoppingList = [...shoppingList];
            updatedShoppingList[findItemIndex].weight += +addIngredientForm.weight;
            setShoppingList([...updatedShoppingList]);

            return findItem;
          }
        });
        if (!isFound) {
          getShoppingListFunc();
        }
        setSelectedIngedient([null]);
        setAddIngredientForm({
          ...addIngredientForm,
          weight: null,
        });
      }).catch(() => {
        toast.error(t('shop_list.update.error'), {
          autoClose: 3000,
        });
      });
    }
  };

  return (
    <>
      <section>
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
              {isNoAccess ? (
                <div>
                  <span className='sect-subtitle'>
                    {t('common.no_access')}
                  </span>
                </div>
              ) : (
                  <>
                    <div>
                      <span className='sect-subtitle'>
                        {t('app.title.shopping_list')}
                      </span>
                    </div>
                    <div className='shop-list card-bg'>
                      <div className='shop-list__header'>
                        <h5 className='shop-list__header-title'>
                          {t('shop_list.to_buy', { COUNT: shoppingList.filter((item) => !item.is_bought).length })}
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
                          <div ref={changedBlockRef}>
                            <button
                              type='button'
                              onClick={() => {
                                setIsBlockActive(!isBlockActive);
                                getPublicShopListUrl().then((response) => {
                                  setSharePublicUrl(response.data.data.url);
                                });
                              }}
                              className='shop-list__header-buttons-item'
                            >
                              <ShareIcon />
                            </button>
                            {isBlockActive && (
                              <div className='shop-list__header-buttons-share'>
                                <ShareButtons shareLink={sharePublicUrl} />
                              </div>
                            )}
                          </div>
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
                                      shoppingList[itemIndex]?.cuisine_name_i18n !==
                                      shoppingList[itemIndex - 1]?.cuisine_name_i18n
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
                                        { COUNT: item.weight })} ${item.name_i18n}`}
                                      checked={item.is_bought}
                                      disabled={item.is_disable}
                                      onChange={() => {
                                        const updatedShoppingList = [...shoppingList];

                                        updatedShoppingList[itemIndex].is_bought
                                          = !updatedShoppingList[itemIndex].is_bought;

                                        updatedShoppingList[itemIndex].is_disable = true;

                                        setShoppingList([...updatedShoppingList]);

                                        setIsSyncResponseActive(false);

                                        setShoppingRowBought(
                                          item.id,
                                          updatedShoppingList[itemIndex].is_bought,
                                          dateSync,
                                        ).then((response) => {
                                          setDateSync(response.data.data.date_sync);
                                        }).catch(() => {
                                          updatedShoppingList[itemIndex].is_bought =
                                            !updatedShoppingList[itemIndex].is_bought;

                                          setShoppingList([...updatedShoppingList]);

                                          toast.error(t('shop_list.update.error'), {
                                            autoClose: 3000,
                                          });
                                        }).finally(() => {
                                          setIsSyncResponseActive(true);

                                          setTimeout(() => {
                                            updatedShoppingList[itemIndex].is_disable = false;
                                            setShoppingList([...updatedShoppingList]);
                                          }, 500);

                                          syncNumberInShopCart();
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

                                        setIsSyncResponseActive(false);

                                        deleteFromShoppingList(item.id, dateSync)
                                          .then((response) => {
                                            setDateSync(response.data.data.date_sync);
                                            syncNumberInShopCart(updatedShoppingList);
                                          })
                                          .catch(() => {
                                            toast.error(t('shop_list.update.error'), {
                                              autoClose: 3000,
                                            });

                                            setShoppingList([...prevShoppingList]);
                                          }).finally(() => setIsSyncResponseActive(true));
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
                                  {shoppingList[itemIndex]?.cuisine_name_i18n !==
                                    shoppingList[itemIndex - 1]?.cuisine_name_i18n
                                    && (
                                      <div className='shop-list__item-category'>
                                        {item?.cuisine_name_i18n}
                                      </div>
                                    )}
                                  <div
                                    className='shop-list__item-ingr'
                                  >
                                    <CustomCheckbox
                                      label={`${t(getWeigthUnit(settings.measurement),
                                        { COUNT: item.weight })} ${item.name_i18n}`}
                                      checked={item.is_bought}
                                      disabled={item.is_disable}
                                      onChange={() => {
                                        const updatedShoppingList = [...shoppingList];

                                        updatedShoppingList[itemIndex].is_bought
                                          = !updatedShoppingList[itemIndex].is_bought;

                                        updatedShoppingList[itemIndex].is_disable = true;

                                        setShoppingList([...updatedShoppingList]);

                                        setIsSyncResponseActive(false);

                                        setShoppingRowBought(
                                          item.id,
                                          updatedShoppingList[itemIndex].is_bought,
                                          dateSync,
                                        ).then((response) => {
                                          setDateSync(response.data.data.date_sync);
                                        }).catch(() => {
                                          updatedShoppingList[itemIndex].is_bought =
                                            !updatedShoppingList[itemIndex].is_bought;

                                          setShoppingList([...updatedShoppingList]);

                                          toast.error(t('shop_list.update.error'), {
                                            autoClose: 3000,
                                          });
                                        }).finally(() => {
                                          setIsSyncResponseActive(true);

                                          setTimeout(() => {
                                            updatedShoppingList[itemIndex].is_disable = false;
                                            setShoppingList([...updatedShoppingList]);
                                          }, 500);

                                          syncNumberInShopCart();
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

                                        setIsSyncResponseActive(false);

                                        deleteFromShoppingList(item.id, dateSync)
                                          .then((response) => {
                                            setDateSync(response.data.data.date_sync);
                                            syncNumberInShopCart(updatedShoppingList);
                                          })
                                          .catch(() => {
                                            toast.error(t('shop_list.update.error'), {
                                              autoClose: 3000,
                                            });

                                            setShoppingList([...prevShoppingList]);
                                          })
                                          .finally(() => setIsSyncResponseActive(true));
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
                            value={selectedIngedient}
                            loadOptions={inputValueIngredient}
                            onChange={(e) => {
                              setIndgredient(e);
                              setSelectedIngedient(e);
                            }}
                            label={t('ingr.add')}
                            styles={colourStylesSelect}
                            placeholder={t('recipe.create.ingredient_search')}
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
                            isSearchable={false}
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
                  </>
                )}
              {
                isBannerActive && (
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
                          setIsBannerActive(false);
                          return;
                        }
                        setBannerStep((prev) => prev + 1);
                      }}
                    >
                      {t('banner.next')}
                    </Button>
                    <button
                      type='button'
                      onClick={() => setIsBannerActive(false)}
                      className='shop-list__banner-btn-skip'
                    >
                      {t('common.skip')}
                    </button>
                  </div>
                )
              }
            </div>
          )}
      </section>
    </>
  );
};

export default WithTranslate(connect((state: any) => ({
  settings: state.settings,
}), { setAppSetting })(ShoppingListView));
