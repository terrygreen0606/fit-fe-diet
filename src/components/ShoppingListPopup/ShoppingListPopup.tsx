import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import classnames from 'classnames';

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
import { setAppSetting } from 'store/actions';

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
import { ReactComponent as ShareIcon } from 'assets/img/icons/share-icon.svg';
import { ReactComponent as TrashIcon } from 'assets/img/icons/trash-icon.svg';

const ShoppingListPopup = ({
  visible,
  ...props
}: any) => {
  const t = (code: string, placeholders?: any) =>
    getTranslate(props.localePhrases, code, placeholders);

  const { settings } = props;

  const [shoppingList, setShoppingList] = useState<any[]>([]);

  const [isSpinnerActive, setIsSpinnerActive] = useState<boolean>(true);

  const [dateSync, setDateSync] = useState<number>(0);

  const saveFileShoppingList = () => {
    getPublicShopListUrl(1).then((response) => {
      if (response.data.success && response.data.data) {
        window.location.assign(response.data.data.url);
      }
    }).catch(() => { });
  };

  const { changedBlockRef, isBlockActive, setIsBlockActive } = useOutsideClick(false);

  useEffect(() => {
    let cleanComponent = false;
    if (visible && settings.is_private && !cleanComponent) {
      getShoppingList(2, dateSync).then((response) => {
        if (response.data.success && response.data.data) {
          const { list } = response.data.data;

          list.map((item) => {
            item.is_disable = false;
          });

          setShoppingList([...list]);

          setDateSync(response.data.data.date_sync);
        }
      }).catch(() => { }).finally(() => {
        setIsSpinnerActive(false);
      });
    }
    return () => cleanComponent = true;
  }, [visible, settings.paid_until, settings.is_private]);

  const syncNumberInShopCart = (array = []) => {
    const notBoughtIngredients = (array.length > 0 ? array : shoppingList).filter((item) => !item.is_bought).length;
    props.setAppSetting({
      ...settings,
      shopping_list_count: notBoughtIngredients,
    });
  };

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
      if (response.data.success && response.data.data) {
        setDateSync(response.data.data.date_sync);
      }
    }).catch(() => {
      updatedShoppingList[itemIndex].is_bought = !updatedShoppingList[itemIndex].is_bought;

      setShoppingList([...updatedShoppingList]);

      toast.error(t('shop_list.update.error'));
    }).finally(() => {
      setTimeout(() => {
        updatedShoppingList[itemIndex].is_disable = false;
        setShoppingList([...updatedShoppingList]);
      }, 500);

      syncNumberInShopCart(updatedShoppingList);
    });
  };

  const deleteIngredient = (itemIndex: number, itemId: string) => {
    const updatedShoppingList = [...shoppingList];
    const prevShoppingList = [...shoppingList];

    updatedShoppingList.splice(itemIndex, 1);

    setShoppingList([...updatedShoppingList]);

    deleteFromShoppingList(itemId, dateSync)
      .then((response) => {
        if (response.data.success && response.data.data) {
          setDateSync(response.data.data.date_sync);
        }
      })
      .catch(() => {
        toast.error(t('shop_list.update.error'));

        setShoppingList([...prevShoppingList]);
      }).finally(() => {
        syncNumberInShopCart(updatedShoppingList);
      });
  };

  return (
    <div className={classnames('shop-list-popup', {
      visible,
    })}
    >
      {isSpinnerActive ? (
        <div className='container text-center mb-5'>
          <Spinner
            size='lg'
            color='#0FC1A1'
          />
        </div>
      ) : (
          <>
            <div className='shop-list-popup__header'>
              <h2 className='shop-list-popup__header-title'>
                {t('shop_list.to_buy', { COUNT: shoppingList.filter((item) => !item.is_bought).length })}
              </h2>
              <div className='shop-list-popup__header-buttons'>
                <button
                  type='button'
                  onClick={() => saveFileShoppingList()}
                  className='shop-list-popup__header-buttons-item'
                >
                  <FileDyskIcon />
                </button>
                <div ref={changedBlockRef}>
                  <button
                    type='button'
                    onClick={() => {
                      setIsBlockActive(!isBlockActive);
                    }}
                    className='shop-list-popup__header-buttons-item'
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
                    className='shop-list-popup__header-buttons-share'
                  />
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
    </div>
  );
};

export default WithTranslate(connect((state: any) => ({
  settings: state.settings,
}), { setAppSetting })(ShoppingListPopup));
