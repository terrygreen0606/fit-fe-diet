import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { toast } from 'react-toastify';
import uuid from 'react-uuid';
import { getTranslate, openShareLink } from 'utils';
import {
  getShoppingList,
  setShoppingRowBought,
  deleteFromShoppingList,
  getUserSettings,
  getPublicShopListUrl,
} from 'api';

import CustomCheckbox from 'components/common/Forms/CustomCheckbox';
import Spinner from 'components/common/Spinner';

import { ReactComponent as FileDyskIcon } from 'assets/img/icons/file-dysk-icon.svg';
import { ReactComponent as PrintIcon } from 'assets/img/icons/print-icon.svg';
import { ReactComponent as ShareIcon } from 'assets/img/icons/share-icon.svg';
import { ReactComponent as TrashIcon } from 'assets/img/icons/trash-icon.svg';
import { ReactComponent as TwitterLogo } from 'assets/img/icons/twitter-logo-icon.svg';
import { ReactComponent as FacebookLogo } from 'assets/img/icons/facebook-logo-icon.svg';
import { ReactComponent as TelegramLogo } from 'assets/img/icons/telegram-logo-icon.svg';
import { ReactComponent as WhatsappLogo } from 'assets/img/icons/whatsapp-logo-icon.svg';

const ShoppingListPopup = (props: any) => {
  const [items, setItems] = useState(null);
  const [categories, setCategories] = useState([]);
  const [measurement, setMeasurement] = useState(null);
  const [publicShopListUrl, setPublicShopListUrl] = useState(null);
  const [shareListPopup, setShareListPopup] = useState(false);

  const t = (code: string, placeholders?: any) => getTranslate(
    props.localePhrases,
    code,
    placeholders,
  );

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
      .then((res) => setMeasurement(res.data.data.measurement));
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

  return (
    <div className='popup'>
      {
        items && categories.length ? (
          <>
            <div className='popup_header'>
              <h4 className='popup_header_title'>
                {t('shop_list.to_buy', { number: items.filter((item) => !item.is_bought).length })}
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
            {
              categories.map((category) => (
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
          </>
        ) : <Spinner color='#0FC1A1' />
      }
    </div>
  );
};

export default ShoppingListPopup;