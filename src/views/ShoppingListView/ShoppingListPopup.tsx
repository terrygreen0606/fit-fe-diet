import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { toast } from 'react-toastify';
import uuid from 'react-uuid';
import { getTranslate, openShareLink } from 'utils';
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

const ShoppingListPopup = (props: any) => {
  const { localePhrases, settings } = props;
  const [items, setItems] = useState(null);
  const [categories, setCategories] = useState([]);
  const [measurement, setMeasurement] = useState(null);
  const [publicShopListUrl, setPublicShopListUrl] = useState(null);
  const [shareListPopup, setShareListPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const t = (code: string, placeholders?: any) => getTranslate(
    localePhrases,
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
      .then((res) => {
        setIsLoading(false);
        setItems(res.data.data.list);
      });
    setMeasurement(settings.measurement);
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

  if (isLoading) {
    return (
      <div className='popup'>
        <Spinner color='#0FC1A1' />
      </div>
    );
  }

  return (
    <div className='popup'>
      {
        items && items.length !== 0 && categories.length ? (
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
                  shareListPopup && <ShareButtons shareLink={publicShopListUrl} classes='sharing_socials' />
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
        ) : (
            <div className='popup_cart_empty'>
              <span>{t('shop_list.empty_cart')}</span>
              <div className='popup_cart_empty_2'>
                <span>{`${t('shop_list.add_ingredient')} `}</span>
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
  }),
)(ShoppingListPopup);
