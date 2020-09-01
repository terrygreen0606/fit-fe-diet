import React, { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import classnames from 'classnames';
import Helmet from 'react-helmet';
import uuid from 'react-uuid';
import { toast } from 'react-toastify';

import { getTranslate, openShareLink } from 'utils';
import {
  getShoppingList,
  setShoppingRowBought,
  searchIngredients,
  addIngredientInShoppingList,
  deleteFromShoppingList,
  getUserSettings,
  getPublicShopListUrl,
  fetchUserProfile,
} from 'api';

import WithTranslate from 'components/hoc/WithTranslate';
import CustomCheckbox from 'components/common/Forms/CustomCheckbox';
import SelectInput from 'components/common/Forms/SelectInput';
import Spinner from 'components/common/Spinner';
import SiteTour from 'components/SiteTour/SiteTour';
import Button from 'components/common/Forms/Button';
import Breadcrumb from 'components/Breadcrumb';
import { MAIN, routes } from 'constants/routes';

import { ReactComponent as FileDyskIcon } from 'assets/img/icons/file-dysk-icon.svg';
import { ReactComponent as PrintIcon } from 'assets/img/icons/print-icon.svg';
import { ReactComponent as ShareIcon } from 'assets/img/icons/share-icon.svg';
import { ReactComponent as TrashIcon } from 'assets/img/icons/trash-icon.svg';
import { ReactComponent as TwitterLogo } from 'assets/img/icons/twitter-logo-icon.svg';
import { ReactComponent as FacebookLogo } from 'assets/img/icons/facebook-logo-icon.svg';
import { ReactComponent as TelegramLogo } from 'assets/img/icons/telegram-logo-icon.svg';
import { ReactComponent as WhatsappLogo } from 'assets/img/icons/whatsapp-logo-icon.svg';

import './ShoppingListView.sass';

import { colourStylesSelect, mockData } from './dataForShoppingList';

const ShoppingListView: React.FC = (props: any) => {
  const { localePhrases } = props;
  const [userName, setUserName] = useState(null);
  const [measurement, setMeasurement] = useState(null);
  const [publicShopListUrl, setPublicShopListUrl] = useState(null);
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ingredientId, setIngredientId] = useState<string>('');
  const [ingredientWeight, setIngredientWeight] = useState('');
  const [quantity, setQuantity] = useState(null);
  const [slideStep, setSlideStep] = useState(1);
  const [shareListPopup, setShareListPopup] = useState(false);

  const t = (code: string, placeholders?: any) => getTranslate(
    localePhrases,
    code,
    placeholders,
  );

  const quantityOptions = (measure) => (
    measure === 'si'
      ? [{ value: t('common.gr'), label: t('common.gr') }]
      : [{ value: t('common.oz'), label: t('common.oz') }]
  );

  const onAction = () => {
    setSlideStep(0);
  };

  const filterIngredients = async (inputValue: string) => {
    const filteredListOfIngredients: Array<any> = [];
    try {
      const response = await searchIngredients(inputValue);
      const listOfIngredients = response.data.data;
      for (const prop in listOfIngredients) {
        filteredListOfIngredients.push({
          value: prop,
          label: listOfIngredients[prop],
        });
      }
      return filteredListOfIngredients;
    } catch {
      return filteredListOfIngredients;
    }
  };

  const inputValueIngredient = (inputValue: string) => new Promise((resolve) => {
    resolve(filterIngredients(inputValue));
  });

  const addIngredient = async () => {
    if (!ingredientWeight || !ingredientId) toast.warn('Product name and quantity should be filled');
    else {
      await addIngredientInShoppingList(
        ingredientId,
        ingredientWeight ? +ingredientWeight : undefined,
      );
      await getShoppingList()
        .then((res) => setItems(res.data.data.list));
    }
  };

  const deleteIngredient = async (item) => {
    await deleteFromShoppingList(item.id)
      .catch((error) => toast.error(error.message));
    await getShoppingList()
      .then((res) => setItems(res.data.data.list))
      .catch((error) => toast.error(error.message));
  };

  const onChangeHandler = async (e, item) => {
    e.persist();
    e.target.parentElement.style.cursor = 'wait';
    document.body.style.cursor = 'wait';

    await setShoppingRowBought(item.id, e.target.checked)
      .catch((error) => toast.error(error.message));
    await getShoppingList()
      .then((res) => setItems(res.data.data.list))
      .catch((error) => toast.error(error.message));

    e.target.parentElement.style.cursor = 'pointer';
    document.body.style.cursor = 'auto';
  };

  const namingEditor = (item) => {
    const weight = measurement === 'si'
      ? `${item.weight} ${t('common.gr')}`
      : `${item.weight} ${t('common.oz')}`;

    return `${item.name_i18n} (${weight})`;
  };

  const saveShopList = async () => {
    await getPublicShopListUrl(1)
      .then((res) => window.location.assign(res.data.data.url));
  };

  useEffect(() => {
    getShoppingList()
      .then((res) => setItems(res.data.data.list));
    getUserSettings()
      .then((res) => {
        setMeasurement(res.data.data.measurement);
        setQuantity(quantityOptions(res.data.data.measurement)[0]);
      });
    fetchUserProfile()
      .then((res) => setUserName(res.data.data.name));
    getPublicShopListUrl()
      .then((res) => setPublicShopListUrl(res.data.data.url));
  }, []);

  useEffect(() => {
    if (items) {
      items.forEach((item) => setCategories(
        (prev) => (prev.includes(item.cuisine_name_i18n)
          ? prev
          : [...prev, item.cuisine_name_i18n]),
      ));
    }
  }, [items]);

  if (!items.length && !categories.length) return <Spinner color='#0FC1A1' />;

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
                url: routes[MAIN],
                name: MAIN,
              },
            ]}
            currentPage='Shopping list'
          />

          <div className='row'>
            <ul className='page-tabs mx-4 mx-md-0'>
              <li
                role='presentation'
                className='page-tabs-item active'
              >
                {t('recipe.saved.shopping_list')}
              </li>
            </ul>
          </div>
          <div className='row px-3 px-md-0'>
            <div className='shopping_list_container'>
              <div className='shopping_list_header'>
                <h3 className='shopping_list_header_title'>
                  {t('recipe.saved.shopping_list')}
                </h3>
                <p className='shopping_list_header_text'>
                  {t('shop_list.subtitle', { name: userName })}
                </p>
              </div>
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
                    className='page-sub-tabs-controls-icon'
                    onClick={() => setShareListPopup(!shareListPopup)}
                  />
                  {
                    shareListPopup && (
                      <div className='sharing_socials'>
                        <button
                          type='button'
                          className='sharing_socials_item'
                          disabled={!items || !items.length}
                          onClick={() => openShareLink(
                            `https://twitter.com/intent/tweet?text=${t('shop_list.sharing')} ${publicShopListUrl}`,
                          )}
                        >
                          <TwitterLogo />
                        </button>
                        <button
                          type='button'
                          className='sharing_socials_item'
                          disabled={!items || !items.length}
                          onClick={() => openShareLink(
                            `https://www.facebook.com/sharer/sharer.php?u=${publicShopListUrl}&t=${t('shop_list.sharing')}`,
                          )}
                        >
                          <FacebookLogo />
                        </button>
                        <button
                          type='button'
                          className='sharing_socials_item'
                          disabled={!items || !items.length}
                          onClick={() => openShareLink(
                            `https://t.me/share/url?url=${publicShopListUrl}&text=${t('shop_list.sharing')}`,
                          )}
                        >
                          <TelegramLogo />
                        </button>
                        <button
                          type='button'
                          className='sharing_socials_item'
                          disabled={!items || !items.length}
                          onClick={() => openShareLink(
                            `https://wa.me/?text=${t('shop_list.sharing')} ${publicShopListUrl}`,
                          )}
                        >
                          <WhatsappLogo />
                        </button>
                      </div>
                    )
                  }
                </div>
              </div>
              <div className='shopping_list_body'>
                {
                  categories.map((category) => (
                    <div
                      className='shopping_list_body_sect'
                      key={uuid()}
                      style={{ gridRow: `span ${items.filter((item) => item.cuisine_name_i18n === category).length}` }}
                    >
                      <div className='shopping_list_body_sect_category'>
                        {category}
                      </div>
                      {
                        items
                          .filter((item) => item.cuisine_name_i18n === category)
                          .map((item) => (
                            <div
                              className={classnames('shopping_list_body_sect_item', {
                                active: item.is_bought,
                              })}
                              key={item.id}
                            >
                              <CustomCheckbox
                                label={namingEditor(item)}
                                checked={item.is_bought}
                                onChange={(e) => onChangeHandler(e, item)}
                                className='shopping_list_body_sect_item_checkbox'
                                inline
                              />
                              <span
                                role='presentation'
                                className='shopping_list_body_sect_item_trash'
                                onClick={() => deleteIngredient(item)}
                              >
                                <TrashIcon />
                              </span>
                            </div>
                          ))
                      }
                    </div>
                  ))
                }
              </div>
              <div className='shopping_list_footer'>
                <div className='shopping_list_footer_ingredient'>
                  <span className='shopping_list_footer_ingredient_text'>
                    {t('ingr.add')}
                  </span>
                  <div className='shopping_list_footer_ingredient_input_sect'>
                    <AsyncSelect
                      cacheOptions
                      loadOptions={inputValueIngredient}
                      placeholder={t('common.product_name')}
                      onChange={(e) => setIngredientId(e.value)}
                      styles={colourStylesSelect}
                      noOptionsMessage={() => t('shop_list.no_ingredient')}
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
                      onChange={(e) => setIngredientWeight(e.target.value)}
                    />
                    <SelectInput
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

export default WithTranslate(ShoppingListView);
