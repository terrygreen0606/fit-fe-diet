/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
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
  debouncePromise,
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
import FormValidatorUtil from 'utils/FormValidator';
import { setAppSetting, toggleSetting } from 'store/actions';

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
import Banner from 'components/Banner';

import './ShoppingListView.sass';

// Icons
import { ReactComponent as FileDyskIcon } from 'assets/img/icons/file-dysk-icon.svg';
import { ReactComponent as PrintIcon } from 'assets/img/icons/print-icon.svg';
import { ReactComponent as ShareIcon } from 'assets/img/icons/share-icon.svg';
import { ReactComponent as TrashIcon } from 'assets/img/icons/trash-icon.svg';

import { mockData, colourStylesSelect } from './dataForShoppingList';

const ShoppingListView = (props: any) => {
  const t = (code: string, placeholders?: any) => getTranslate(props.localePhrases, code, placeholders);

  const {
    settings,
    storage,
    toggleSetting,
  } = props;

  const [isSpinnerActive, setIsSpinnerActive] = useState<boolean>(true);

  const [shoppingList, setShoppingList] = useState<any[]>([]);

  const [isNoAccess, setIsNoAccess] = useState<boolean>(false);

  const [addIngredientForm, setAddIngredientForm] = useState({
    id: '',
    weight: null,
  });

  const [selectedIngedient, setSelectedIngedient] = useState<any[]>([null]);

  const [addIngredientErrors, setAddIngredientErrors] = useState<any[]>([]);

  const [dateSync, setDateSync] = useState<number>(null);
  const [isSyncResponseActive, setIsSyncResponseActive] = useState<boolean>(true);

  const { changedBlockRef, isBlockActive, setIsBlockActive } = useOutsideClick(false);

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

  const inputValueIngredient = debouncePromise((inputValue: string) =>
    new Promise((resolve) => {
      resolve(filterIngredients(inputValue));
    }), 500);

  const saveFileShoppingList = () => {
    getPublicShopListUrl(1).then((response) => {
      if (response.data.success && response.data.data) {
        window.location.assign(response.data.data.url);
      }
    }).catch(() => { });
  };

  const setIndgredient = (e: any) => {
    getIngredient(e.value).then((response) => {
      if (response.data.success && response.data.data) {
        const { data } = response.data;
        setAddIngredientForm({
          ...addIngredientForm,
          id: data._id,
        });
      }
    }).catch(() => { });
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
      if (response.data.success && response.data.data) {
        const { list } = response.data.data;

        list.map((item) => {
          item.is_disable = false;
        });

        syncNumberInShopCart(list);

        setShoppingList(list);

        setDateSync(response.data.data.date_sync);
      }
    }).catch(() => { }).finally(() => {
      setIsSyncResponseActive(true);
      setIsSpinnerActive(false);
    });
  };

  useEffect(() => {
    let cleanComponent = false;
    if (settings.is_private && !cleanComponent) {
      getShoppingListFunc();
      setIsNoAccess(false);
    }

    return () => cleanComponent = true;
  }, [settings.paid_until, settings.is_private]);

  useInterval(() => {
    syncShoppingList(dateSync).then((response) => {
      if (response.data.success && response.data.data) {
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
      }
    }).catch(() => { });
  }, isSyncResponseActive ? 15000 : null);

  const toggleCheckbox = (itemIndex: number, itemId: string) => {
    const updatedShoppingList = [...shoppingList];

    updatedShoppingList[itemIndex].is_bought
      = !updatedShoppingList[itemIndex].is_bought;

    updatedShoppingList[itemIndex].is_disable = true;

    setShoppingList([...updatedShoppingList]);

    setIsSyncResponseActive(false);

    setShoppingRowBought(
      itemId,
      updatedShoppingList[itemIndex].is_bought,
      dateSync,
    ).then((response) => {
      if (response.data.success && response.data.data) {
        setDateSync(response.data.data.date_sync);
      }
    }).catch(() => {
      updatedShoppingList[itemIndex].is_bought =
        !updatedShoppingList[itemIndex].is_bought;

      setShoppingList([...updatedShoppingList]);

      toast.error(t('common.error'));
    }).finally(() => {
      setIsSyncResponseActive(true);

      setTimeout(() => {
        updatedShoppingList[itemIndex].is_disable = false;
        setShoppingList([...updatedShoppingList]);
      }, 500);

      syncNumberInShopCart();
    });
  };

  const deleteIngredient = (itemIndex: number, itemId: string) => {
    const updatedShoppingList = [...shoppingList];
    const prevShoppingList = [...shoppingList];

    updatedShoppingList.splice(itemIndex, 1);

    setShoppingList([...updatedShoppingList]);

    setIsSyncResponseActive(false);

    deleteFromShoppingList(itemId, dateSync)
      .then((response) => {
        if (response.data.success && response.data.data) {
          setDateSync(response.data.data.date_sync);
          syncNumberInShopCart(updatedShoppingList);
        }
      })
      .catch(() => {
        toast.error(t('common.error'));

        setShoppingList([...prevShoppingList]);
      }).finally(() => setIsSyncResponseActive(true));
  };

  const FormValidator = FormValidatorUtil(props.localePhrases);

  const validateOnChange = (name: string, value: any, event, element?) => {
    validateFieldOnChange(
      name,
      value,
      event,
      addIngredientForm,
      setAddIngredientForm,
      addIngredientErrors,
      setAddIngredientErrors,
      props.localePhrases,
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
      toast.error(t('shop_list.ingr.empty_error'));
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
        toast.error(t('common.error'));
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
                    <div className='shop-list__title'>
                      <span className='sect-subtitle'>
                        {t('app.title.shopping_list')}
                      </span>
                    </div>
                    <div className='shop-list card-bg'>
                      <div className='shop-list__header'>
                        <h2 className='shop-list__header-title'>
                          {t('shop_list.to_buy', { COUNT: shoppingList.filter((item) => !item.is_bought).length })}
                        </h2>
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
                              onClick={() => setIsBlockActive(!isBlockActive)}
                              className='shop-list__header-buttons-item'
                            >
                              <ShareIcon />
                            </button>
                            <ShareButtons
                              visible={isBlockActive}
                              fetchData={() => getPublicShopListUrl().then((response) => {
                                if (response.data.success && response.data.data) {
                                  return {
                                    link: response.data.data.url,
                                  };
                                }
                              }).catch(() => { })}
                              className='shop-list__header-buttons-share'
                            />
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
                                      onChange={() => toggleCheckbox(itemIndex, item.id)}
                                    />
                                    <button
                                      type='button'
                                      onClick={() => deleteIngredient(itemIndex, item.id)}
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
                                      onChange={() => toggleCheckbox(itemIndex, item.id)}
                                    />
                                    <button
                                      type='button'
                                      onClick={() => deleteIngredient(itemIndex, item.id)}
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
              {storage.isActiveShoppingListBanner && (
                <Banner items={mockData} onAction={() => toggleSetting('isActiveShoppingListBanner')} />
              )}
            </div>
          )}
      </section>
    </>
  );
};

export default WithTranslate(connect((state: any) => ({
  settings: state.settings,
  storage: state.storage,
}), { setAppSetting, toggleSetting })(ShoppingListView));
