import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
} from 'react';
import Select from 'react-select';
import classnames from 'classnames';
import Helmet from 'react-helmet';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';

import { getTranslate } from 'utils';
import {
  getShoppingList,
  setShoppingRowBought,
  searchIngredients,
  addIngredientInShoppingList,
  deleteFromShoppingList,
  getPublicShopListUrl,
  syncShoppingList,
} from 'api';

import WithTranslate from 'components/hoc/WithTranslate';
import CustomCheckbox from 'components/common/Forms/CustomCheckbox';
import SelectInput from 'components/common/Forms/SelectInput';
import Spinner from 'components/common/Spinner';
import SiteTour from 'components/SiteTour/SiteTour';
import Button from 'components/common/Forms/Button';
import Breadcrumb from 'components/Breadcrumb';
import ShareButtons from 'components/ShareButtons';
import { routes } from 'constants/routes';

import { ReactComponent as FileDyskIcon } from 'assets/img/icons/file-dysk-icon.svg';
import { ReactComponent as PrintIcon } from 'assets/img/icons/print-icon.svg';
import { ReactComponent as ShareIcon } from 'assets/img/icons/share-icon.svg';
import { ReactComponent as TrashIcon } from 'assets/img/icons/trash-icon.svg';

import './ShoppingListView.sass';

import { colourStylesSelect, mockData } from './dataForShoppingList';

const ShoppingListView: React.FC = (props: any) => {
  const { localePhrases, settings } = props;
  const [measurement, setMeasurement] = useState(null);
  const [publicShopListUrl, setPublicShopListUrl] = useState(null);
  const [items, setItems] = useState(null);
  const [ingredientId, setIngredientId] = useState<string>('');
  const [ingredientWeight, setIngredientWeight] = useState('1');
  const [quantity, setQuantity] = useState(null);
  const [slideStep, setSlideStep] = useState(1);
  const [shareListPopup, setShareListPopup] = useState(false);
  const [ingredientsArray, setIngredientsArray] = useState([]);

  const ingredientSelectEl = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dateFromShopList, setDateFromShopList] = useState(null);

  useEffect(() => {
    getShoppingList(2)
      .then((res) => {
        const { date_sync: dateSync, list } = res.data.data;
        setDateFromShopList(dateSync);
        setItems(list);
      })
      .catch((error) => {
        setItems(null);
        toast.error(error.message);
      });
    setMeasurement(settings.measurement);
  }, []);

  useEffect(() => {
    const actives = document.querySelectorAll('.shopping_list_body_sect_item.active');

    actives.forEach((item) => {
      item.querySelector('input').setAttribute('checked', 'checked');
    });
  });

  const t = (code: string, placeholders?: any) => getTranslate(
    localePhrases,
    code,
    placeholders,
  );

  const quantityOptions = (measure) => (
    measure === 'si'
      ? [{ value: t('common.gr_label'), label: t('common.gr_label') }]
      : [{ value: t('common.oz_label'), label: t('common.oz_label') }]
  );

  useEffect(() => {
    setQuantity(quantityOptions(settings.measurement)[0]);
  }, [localePhrases]);

  const onAction = () => {
    setSlideStep(0);
  };

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

  const inputValueIngredient = (ingredientValue: string) => new Promise((resolve) => {
    resolve(filterIngredients(ingredientValue));
  });

  const changeHandler = (ingredient, { action }) => {
    if (action === 'select-option') {
      setIngredientId(ingredient.value);
    }
  };

  const inputChangeHandler = (inputValue, { action }) => {
    if ((action === 'set-value' || action === 'input-change') && inputValue.length !== 0) {
      inputValueIngredient(inputValue).then((res: Array<any>) =>
        res && res.length !== 0 && setIngredientsArray([...res]));
    }
  };

  const inputChangeHandlerWithDelay = (timer) => {
    let timerId;

    return (inputValue, options) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        if (!ingredientId) {
          document.querySelector('.shopping_list_footer_ingredient_input_sect')?.classList.remove('validate_error');
        }
        inputChangeHandler(inputValue, options);
      }, timer);
    };
  };

  const ingredientWeightChangeHandler = (e) => {
    setIngredientWeight(e.target.value);
    document.querySelector('.shopping_list_footer_quantity_input')?.classList.remove('validate_error');
  };

  const SyncShopListCallback = useCallback((test: any = dateFromShopList) => {
    syncShoppingList(test).then((res) => {
      if (items.length === 0 || res.data.data.date_sync) {
        getShoppingList(2)
          .then((resp) => {
            setItems(resp.data.data.list);
            setDateFromShopList(resp.data.data.date_sync);
            props.setShoppingListCount(resp.data.data.list.length);
          });
      }
      if (res.data.data.date_sync !== test) {
        // shopping list need update
        const { list, date_sync: dateSync } = res.data.data;
        if (list.length) {
          const newItems = items.map((item) => {
            const syncEl = list.filter((syncItem) => syncItem[0] === item.id)[0];
            if (syncEl) {
              const [id, weight, isBought] = syncEl;
              item.is_bought = isBought;
              item.weight = weight;
              return item;
            }
          });
          setItems(newItems.filter((item) => item));
          props.setShoppingListCount(newItems.filter((item) => item).length);
        } else {
          setItems([]);
          props.setShoppingListCount(0);
        }
        setDateFromShopList(dateSync);
      }
      setIsLoading(false);
    });
  }, [items, dateFromShopList]);

  const addIngredient = async () => {
    if (!ingredientWeight || !ingredientId) {
      toast.warn('Product name and quantity should be filled');
      if (!ingredientId) {
        document.querySelector('.shopping_list_footer_ingredient_input_sect').classList.add('validate_error');
      }
      if (!ingredientWeight) {
        document.querySelector('.shopping_list_footer_quantity_input').classList.add('validate_error');
      }
    } else if (items.map((item) => item.ingredient_id).includes(ingredientId)) {
      setIsLoading(true);
      setItems((prev) => {
        const updateItem = prev.filter((prevItem) => prevItem.ingredient_id === ingredientId)[0];
        return [
          ...prev.splice(0, prev.indexOf(updateItem)),
          {
            ...updateItem,
            weight: updateItem.weight + +ingredientWeight,
          },
          ...prev.splice(prev.indexOf(updateItem) + 1),
        ];
      });
      await addIngredientInShoppingList(
        ingredientId,
        ingredientWeight ? +ingredientWeight : undefined,
      ).then((res) => {
        setDateFromShopList(res.data.data.date_sync);
        SyncShopListCallback(res.data.data.date_sync);
        ingredientSelectEl.current.state.value = {};
        setIngredientWeight('');
      });
    } else {
      setIsLoading(true);
      await addIngredientInShoppingList(
        ingredientId,
        ingredientWeight ? +ingredientWeight : undefined,
      ).then((res) => {
        setDateFromShopList(res.data.data.date_sync);
        SyncShopListCallback(res.data.data.date_sync);
      });
      await getShoppingList(2)
        .then((res) => {
          setItems(res.data.data.list);
          props.setShoppingListCount(res.data.data.list.length);
          ingredientSelectEl.current.state.value = {};
          setIngredientWeight('');
        });
    }
  };

  const deleteIngredient = (item, e) => {
    e.currentTarget.classList.add('disabled');
    deleteFromShoppingList(item.id, dateFromShopList)
      .then((res) => {
        setDateFromShopList(res.data.data.date_sync);
        SyncShopListCallback();
      })
      .catch((error) => toast.error(error.message));
  };

  const onChangeHandler = (e, item) => {
    if (e.target.checked) {
      e.target.parentElement.parentElement.classList.add('active');
    } else {
      e.target.parentElement.parentElement.classList.remove('active');
    }

    setShoppingRowBought(item.id, e.target.checked, dateFromShopList)
      .then((res) => {
        setDateFromShopList(res.data.data.date_sync);
        SyncShopListCallback();
      })
      .catch((error) => toast.error(error.message));
  };

  const namingEditor = (item) => {
    const weight = measurement === 'si'
      ? `${item.weight} ${t('common.gr_label')}`
      : `${item.weight} ${t('common.oz_label')}`;

    return `${item.name_i18n} (${weight})`;
  };

  const saveShopList = () => {
    getPublicShopListUrl(1)
      .then((res) => window.location.assign(res.data.data.url));
  };

  const renderItems = () => {
    const firstColumn = [];
    const secondColumn = [];
    const categories = [];

    const filterCategories = (category) => {
      if (!categories.includes(category)) {
        categories.push(category);
        return category;
      } return null;
    };

    items.forEach((item) => {
      if (item.column === 1) {
        firstColumn.push(
          <React.Fragment key={item.id}>
            {
              filterCategories(item.cuisine_name_i18n) && (
                <div className='shopping_list_body_sect_category'>
                  {item.cuisine_name_i18n}
                </div>
              )
            }
            <div
              className={classnames('shopping_list_body_sect_item', {
                active: item.is_bought,
              })}
            >
              <CustomCheckbox
                label={namingEditor(item)}
                defaultChecked={item.is_bought}
                onChange={(e) => onChangeHandler(e, item)}
                className='shopping_list_body_sect_item_checkbox'
                inline
              />
              <span
                role='presentation'
                className='shopping_list_body_sect_item_trash'
                onClick={(e) => deleteIngredient(item, e)}
              >
                <TrashIcon />
              </span>
            </div>
          </React.Fragment>,
        );
      } else {
        secondColumn.push(
          <React.Fragment key={item.id}>
            {
              filterCategories(item.cuisine_name_i18n) && (
                <div className='shopping_list_body_sect_category'>
                  {item.cuisine_name_i18n}
                </div>
              )
            }
            <div
              className={classnames('shopping_list_body_sect_item', {
                active: item.is_bought,
              })}
              key={item.id}
            >
              <CustomCheckbox
                label={namingEditor(item)}
                defaultChecked={item.is_bought}
                onChange={(e) => onChangeHandler(e, item)}
                className='shopping_list_body_sect_item_checkbox'
                inline
              />
              <span
                role='presentation'
                className='shopping_list_body_sect_item_trash'
                onClick={(e) => deleteIngredient(item, e)}
              >
                <TrashIcon />
              </span>
            </div>
          </React.Fragment>,
        );
      }
    });

    return (
      <div className='shopping_list_body_sect'>
        <div className='shopping_list_body_sect_1'>
          {firstColumn.map((item) => item)}
        </div>
        <div className='shopping_list_body_sect_2'>
          {secondColumn.map((item) => item)}
        </div>
      </div>
    );
  };

  const sharingHandler = () => {
    setShareListPopup(!shareListPopup);
    if (!publicShopListUrl) {
      getPublicShopListUrl()
        .then((res) => setPublicShopListUrl(res.data.data.url));
    }
  };

  const outsideSocialsCLickListener = (e) => {
    const socialsEl = document.querySelector('.sharing_socials');
    const sharingEl = document.querySelector('.sharing_icon');
    let targetElement = e.target; // clicked element

    do {
      if (targetElement === socialsEl || targetElement === sharingEl) {
        // This is a click inside. Do nothing, just return.
        return;
      }
      // If user click on link at popup to go to the shopping list

      // Go up the DOM
      targetElement = targetElement.parentNode;
    } while (targetElement);

    // This is a click outside.
    setShareListPopup(false);
  };

  useEffect(() => {
    document.addEventListener('click', outsideSocialsCLickListener, true);
    return () => {
      document.removeEventListener('click', outsideSocialsCLickListener, true);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => SyncShopListCallback(), (5000));
    // destroy interval on unmount
    return () => clearInterval(interval);
  });

  if (!items) return <Spinner color='#0FC1A1' className='d-flex mx-auto' />;

  return (
    <>
      <section>
        <Helmet>
          <title>{t('recipe.saved.shopping_list')}</title>
        </Helmet>
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

          <h1 className='training-plan-title'>
            <span className='training-plan-title-text'>
              {t('recipe.saved.shopping_list')}
            </span>
          </h1>
          <div className='row px-3 px-md-0'>
            <div className='shopping_list_container'>
              <div className='shopping_list_body_title_sect'>
                <h4 className='shopping_list_body_title_sect_text'>
                  {t('shop_list.to_buy', { number: items.filter((item) => !item.is_bought).length })}
                </h4>
                <div className='shopping_list_body_title_sect_icons'>
                  <FileDyskIcon
                    className='page-sub-tabs-controls-icon'
                    onClick={saveShopList}
                  />
                  <PrintIcon
                    className='page-sub-tabs-controls-icon'
                    onClick={() => window.print()}
                  />
                  <ShareIcon
                    className='page-sub-tabs-controls-icon sharing_icon'
                    onClick={sharingHandler}
                  />
                  {
                    shareListPopup && (
                      <ShareButtons
                        shareLink={publicShopListUrl}
                        classes='sharing_socials'
                        disabled={!items || !items.length}
                      />
                    )
                  }
                </div>
              </div>

              <div className='shopping_list_body'>
                {items.length ? renderItems() : t('shop_list.empty')}
              </div>

              <div className='shopping_list_footer'>
                <div className='shopping_list_footer_ingredient'>
                  <span className='shopping_list_footer_ingredient_text'>
                    {t('ingr.add')}
                  </span>
                  <div className='shopping_list_footer_ingredient_input_sect'>
                    <div className='shopping_list_footer_ingredient_input_sect_error'>
                      {t('common.required_field')}
                    </div>
                    <Select
                      isClearable
                      ref={ingredientSelectEl}
                      placeholder={t('common.product_name')}
                      options={ingredientsArray}
                      onInputChange={inputChangeHandlerWithDelay(1e3)}
                      onChange={changeHandler}
                      styles={colourStylesSelect}
                      noOptionsMessage={
                        ingredientsArray.length > 0
                          ? () => t('shop_list.no_ingredient')
                          : () => t('shop_list.empty_field')
                      }
                    />
                  </div>
                </div>
                <div className='shopping_list_footer_quantity'>
                  <span className='shopping_list_footer_quantity_text'>
                    {t('common.quantity')}
                  </span>
                  <div className='shopping_list_footer_quantity_input_sect'>
                    <input
                      className='shopping_list_footer_quantity_input'
                      type='number'
                      min={1}
                      value={ingredientWeight}
                      onChange={ingredientWeightChangeHandler}
                    />
                    <div className='shopping_list_footer_quantity_input_error'>
                      {t('common.required_field')}
                    </div>
                    <SelectInput
                      placeholder=''
                      value={quantity}
                      options={quantityOptions(measurement)}
                      onChange={setQuantity}
                      width={100}
                    />
                    <Button
                      className='shopping_list_footer_quantity_button'
                      type='button'
                      color='primary'
                      onClick={addIngredient}
                      isLoading={isLoading}
                    >
                      {t('common.add')}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {
        slideStep ? (
          <SiteTour
            className='shopping_tour'
            data={mockData}
            localePhrases={localePhrases}
            onAction={onAction}
          />
        ) : null
      }
    </>
  );
};

export default WithTranslate(
  connect(
    (state: any) => ({
      settings: state.settings,
    }),
  )(ShoppingListView),
);
