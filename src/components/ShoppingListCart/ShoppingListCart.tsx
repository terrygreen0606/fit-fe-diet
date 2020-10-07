import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { routes } from 'constants/routes';
import classnames from 'classnames';

// Components
import WithTranslate from 'components/hoc/WithTranslate';
import ShoppingListPopup from 'components/ShoppingListPopup';
import useOutsideClick from 'components/hooks/useOutsideClick';

import './ShoppingListCart.sass';

import { ReactComponent as ShoppingCartIcon } from 'assets/img/icons/shopping-cart-icon.svg';

const ShoppingListCart = ({
  visible,
  ...props
}: any) => {
  const { settings } = props;

  const [shoppingListLength, setShoppingListLength] = useState<number>(0);

  const { changedBlockRef, isBlockActive, setIsBlockActive } = useOutsideClick(false);

  useEffect(() => {
    setShoppingListLength(settings.shopping_list_count);
  }, [settings.shopping_list_count]);

  return (
    <div
      ref={changedBlockRef}
      className={classnames('shopping-cart__wrap', {
        visible,
      })}
    >
      <button
        type='button'
        className='shopping-cart'
        onClick={() => {
          if (!window.location.href.includes(routes.shoppingList)) {
            setIsBlockActive(!isBlockActive);
          }
        }}
      >
        <ShoppingCartIcon />
        <div className='shopping-cart__count'>
          {shoppingListLength > 99 ? 99 : shoppingListLength}
        </div>
      </button>
      <ShoppingListPopup visible={isBlockActive && !window.location.href.includes(routes.shoppingList)} />
    </div>
  );
};

export default WithTranslate(
  connect(
    (state: any) => ({
      settings: state.settings,
    }),
  )(ShoppingListCart),
);
