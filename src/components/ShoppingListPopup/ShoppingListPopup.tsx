import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import {
  getTranslate,
  getWeigthUnit,
} from 'utils';
import {
  getPublicShopListUrl,
  getShoppingList,
  setShoppingRowBought,
  deleteFromShoppingList,
} from 'api';
import { routes } from 'constants/routes';

// Components
import WithTranslate from 'components/hoc/WithTranslate';
import ShareButtons from 'components/ShareButtons';
import CustomCheckbox from 'components/common/Forms/CustomCheckbox';
import Spinner from 'components/common/Spinner';
import useOutsideClick from 'components/hooks/useOutsideClick';
import Button from 'components/common/Forms/Button';

import './ShoppingListPopup.sass';

// Icons
import { ReactComponent as FileDyskIcon } from 'assets/img/icons/file-dysk-icon.svg';
import { ReactComponent as PrintIcon } from 'assets/img/icons/print-icon.svg';
import { ReactComponent as ShareIcon } from 'assets/img/icons/share-icon.svg';
import { ReactComponent as TrashIcon } from 'assets/img/icons/trash-icon.svg';

const ShoppingListPopup = (props: any) => {
  const t = (code: string, placeholders?: any) =>
    getTranslate(props.localePhrases, code, placeholders);

  const { settings } = props;

  const [shoppingList, setShoppingList] = useState<any[]>([]);

  const [isSpinnerActive, setIsSpinnerActive] = useState<boolean>(true);

  const [dateSync, setDateSync] = useState<number>(0);

  const [isNoAccess, setIsNoAccess] = useState<boolean>(false);

  const [sharePublicUrl, setSharePublicUrl] = useState<string>('');

  const saveFileShoppingList = () => {
    getPublicShopListUrl(1).then((response) =>
      window.location.assign(response.data.data.url));
  };

  const { changedBlockRef, isBlockActive, setIsBlockActive } = useOutsideClick(false);

  useEffect(() => {
    let cleanComponent = false;
    if (settings.is_private) {
      if (settings.paid_until > 0) {
        getShoppingList(2, dateSync).then((response) => {
          const { list } = response.data.data;

          list.map((item) => {
            item.is_disable = false;
          });

          if (!cleanComponent) setShoppingList(list);

          if (!cleanComponent) setDateSync(response.data.data.date_sync);
        }).finally(() => {
          if (!cleanComponent) setIsSpinnerActive(false);
        });
      } else {
        if (!cleanComponent) setIsNoAccess(true);
        if (!cleanComponent) setIsSpinnerActive(false);
      }
    }
    return () => cleanComponent = true;
  }, [settings]);

  useEffect(() => {
    props.updateShoppingListLength(shoppingList.filter((item) =>
      !item.is_bought).length || settings.shopping_list_count);
  }, [shoppingList]);

  const toggleCheckbox = (itemIndex: number, itemId: string) => {
    const updatedShoppingList = [...shoppingList];

    updatedShoppingList[itemIndex].is_bought = !updatedShoppingList[itemIndex].is_bought;

    updatedShoppingList[itemIndex].is_disable = true;

    setShoppingList([...updatedShoppingList]);

    setShoppingRowBought(
      itemId,
      updatedShoppingList[itemIndex].is_bought,
      dateSync,
    ).then((response) => {
      setDateSync(response.data.data.date_sync);
    }).catch(() => {
      updatedShoppingList[itemIndex].is_bought = !updatedShoppingList[itemIndex].is_bought;

      setShoppingList([...updatedShoppingList]);

      toast.error(t('shop_list.update.error'));
    }).finally(() => {
      setTimeout(() => {
        updatedShoppingList[itemIndex].is_disable = false;
        setShoppingList([...updatedShoppingList]);
      }, 500);
    });
  };

  const deleteIngredient = (itemIndex: number, itemId: string) => {
    const updatedShoppingList = [...shoppingList];
    const prevShoppingList = [...shoppingList];

    updatedShoppingList.splice(itemIndex, 1);

    setShoppingList([...updatedShoppingList]);

    props.updateShoppingListLength(updatedShoppingList.length);

    deleteFromShoppingList(itemId, dateSync)
      .then((response) => setDateSync(response.data.data.date_sync))
      .catch(() => {
        toast.error(t('shop_list.update.error'));

        setShoppingList([...prevShoppingList]);
      });
  };

  return (
    <div className='shop-list-popup'>
      {isSpinnerActive ? (
        <div className='container text-center mb-5'>
          <Spinner
            size='lg'
            color='#0FC1A1'
          />
        </div>
      ) : (
          <>
            {isNoAccess ? (
              <h5 className='shop-list-popup__header-title'>
                {t('common.no_access')}
              </h5>
            ) : (
                <>
                  <div className='shop-list-popup__header'>
                    <h5 className='shop-list-popup__header-title'>
                      {t('shop_list.to_buy', { COUNT: shoppingList.filter((item) => !item.is_bought).length })}
                    </h5>
                    <div className='shop-list-popup__header-buttons'>
                      <button
                        type='button'
                        onClick={() => saveFileShoppingList()}
                        className='shop-list-popup__header-buttons-item'
                      >
                        <FileDyskIcon />
                      </button>
                      <button
                        type='button'
                        onClick={() => window.print()}
                        className='shop-list-popup__header-buttons-item'
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
                          className='shop-list-popup__header-buttons-item'
                        >
                          <ShareIcon />
                        </button>
                        {isBlockActive && (
                          <div className='shop-list-popup__header-buttons-share'>
                            <ShareButtons shareLink={sharePublicUrl} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <NavLink
                    to={routes.shoppingList}
                    className='shop-list-popup__open-page-btn'
                  >
                    <Button
                      color='caribbean'
                      size='sm'
                    >
                      {t('shop_list.open_page')}
                    </Button>
                  </NavLink>
                  <div className='shop-list-popup__body'>
                    {shoppingList.map((item, itemIndex) => (
                      <div
                        key={item.id}
                        className='shop-list-popup__item'
                      >
                        {itemIndex === 0 ? (
                          <div className='shop-list-popup__item-category'>
                            {item.cuisine_name_i18n}
                          </div>
                        ) : (
                            shoppingList[itemIndex]?.cuisine_name_i18n
                            !== shoppingList[itemIndex - 1]?.cuisine_name_i18n
                            && (
                              <div className='shop-list-popup__item-category'>
                                {item.cuisine_name_i18n}
                              </div>
                            )
                          )}
                        <div
                          className='shop-list-popup__item-ingr'
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
                            className='shop-list-popup__item-ingr-delete'
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
          </>
        )}
    </div>
  );
};

export default WithTranslate(connect((state: any) => ({
  settings: state.settings,
}))(ShoppingListPopup));
