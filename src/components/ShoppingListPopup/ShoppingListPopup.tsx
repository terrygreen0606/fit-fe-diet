import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { toast } from 'react-toastify';
import uuid from 'react-uuid';
import { getTranslate } from 'utils';
import {
  getShoppingList,
  setShoppingRowBought,
  deleteFromShoppingList,
  getPublicShopListUrl,
} from 'api';

import CustomCheckbox from 'components/common/Forms/CustomCheckbox';
import Spinner from 'components/common/Spinner';
import ShareButtons from 'components/ShareButtons';

import { ReactComponent as FileDyskIcon } from 'assets/img/icons/file-dysk-icon.svg';
import { ReactComponent as PrintIcon } from 'assets/img/icons/print-icon.svg';
import { ReactComponent as ShareIcon } from 'assets/img/icons/share-icon.svg';
import { ReactComponent as TrashIcon } from 'assets/img/icons/trash-icon.svg';

import './ShoppingListPopup.sass';

const ShoppingListPopup = (props: any) => {
  const {
    localePhrases,
    settings,
    setShoppingListPopup,
    isAuthenticated,
  } = props;
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [measurement, setMeasurement] = useState(null);
  const [publicShopListUrl, setPublicShopListUrl] = useState(null);
  const [shareListPopup, setShareListPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getShoppingList()
      .then((res) => {
        setIsLoading(false);
        setItems(res.data.data.list);
      });
    setMeasurement(settings.measurement);
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

  const t = (code: string, placeholders?: any) => getTranslate(
    localePhrases,
    code,
    placeholders,
  );

  const deleteIngredient = (item, e) => {
    e.currentTarget.classList.add('disabled');
    deleteFromShoppingList(item.id)
      .then(() => getShoppingList()
        .then((res) => setItems(res.data.data?.list))
        .catch((error) => toast.error(error.message)))
      .catch((error) => toast.error(error.message));
  };

  const onChangeHandler = (e, item) => {
    e.persist();
    e.target.parentElement.style.cursor = 'wait';
    document.body.style.cursor = 'wait';

    setShoppingRowBought(item.id, e.target.checked)
      .then(() => {
        getShoppingList()
          .then((res) => setItems(res.data.data.list))
          .catch((error) => toast.error(error.message));
        e.target.parentElement.style.cursor = 'pointer';
        document.body.style.cursor = 'auto';
      })
      .catch((error) => {
        toast.error(error.message);
        e.target.parentElement.style.cursor = 'pointer';
        document.body.style.cursor = 'auto';
      });
  };

  const namingEditor = (item) => {
    const weight = measurement === 'si'
      ? `${item.weight} ${t('common.gr_label')}`
      : `${item.weight} ${t('common.oz_label')}`;

    return `${item.name_i18n} (${weight})`;
  };

  const saveShopList = () => {
    getPublicShopListUrl(1)
      .then((res) => window.location.assign(res.data.data.url))
      .catch((error) => toast.error(error.message));
  };

  const outsideCLickListener = (e) => {
    const popupEl = document.querySelector('.popup');
    const linkToShoppingListEl = document.querySelector('.popup_cart_empty_link');
    const shoppingCartEl = document.querySelector('.shopping_cart');
    let targetElement = e.target; // clicked element

    do {
      if (targetElement === popupEl || targetElement === shoppingCartEl) {
        // This is a click inside. Do nothing, just return.
        return;
      }
      if (targetElement === linkToShoppingListEl) {
        setTimeout(() => setShoppingListPopup(false), 0);
      }
      // If user click on link at popup to go to the shopping list

      // Go up the DOM
      targetElement = targetElement.parentNode;
    } while (targetElement);

    // This is a click outside.
    if (isAuthenticated) setShoppingListPopup(false);
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

  const sharingHandler = () => {
    setShareListPopup(!shareListPopup);
    if (!publicShopListUrl) {
      getPublicShopListUrl()
        .then((res) => setPublicShopListUrl(res.data.data.url));
    }
  };

  useEffect(() => {
    document.addEventListener('click', outsideCLickListener, true);
    document.addEventListener('click', outsideSocialsCLickListener, true);
    return () => {
      document.removeEventListener('click', outsideCLickListener, true);
      document.removeEventListener('click', outsideSocialsCLickListener, true);
    };
  }, []);

  if (isLoading) {
    return (
      <div className='popup popup-loading'>
        <Spinner color='#0FC1A1' />
      </div>
    );
  }

  return (
    <div className='popup'>
      {
        items.length && categories.length ? (
          <>
            <div className='popup_header'>
              <h4 className='popup_header_title'>
                {t('shop_list.to_buy', { COUNT: items.filter((item) => !item.is_bought).length })}
              </h4>
              <div className='popup_header_icons'>
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
                  shareListPopup && <ShareButtons shareLink={publicShopListUrl} classes='sharing_socials' />
                }
              </div>
            </div>
            {
              categories.map((category) => {
                if (items.filter((item) => item.cuisine_name_i18n === category).length) {
                  return (
                    <div
                      className='popup_body'
                      key={uuid()}
                    >
                      <div className='popup_body_category'>
                        {category}
                      </div>
                      {
                        items
                          .filter((item) => item.cuisine_name_i18n === category)
                          .map((item) => (
                            <div
                              className={classnames('popup_body_item', {
                                active: item.is_bought,
                              })}
                              key={item.id}
                            >
                              <CustomCheckbox
                                label={namingEditor(item)}
                                checked={item.is_bought}
                                onChange={(e) => onChangeHandler(e, item)}
                                className='popup_body_item_checkbox'
                                inline
                              />
                              <span
                                role='presentation'
                                className='popup_body_item_trash'
                                onClick={(e) => deleteIngredient(item, e)}
                              >
                                <TrashIcon />
                              </span>
                            </div>
                          ))
                      }
                    </div>
                  );
                }
              })
            }
          </>
        ) : (
          <div className='popup_cart_empty'>
            <span>{t('shop_list.empty_cart')}</span>
            <div className='popup_cart_empty_2'>
              <span>
                {t('shop_list.add_ingredient')}
                &nbsp;
              </span>
              <Link to='/shopping-list' className='popup_cart_empty_link'>
                {t('shop_list.add_ingredient_here_link')}
              </Link>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default connect(
  (state: any) => ({
    settings: state.settings,
    isAuthenticated: state.auth.isAuthenticated,
  }),
)(ShoppingListPopup);
