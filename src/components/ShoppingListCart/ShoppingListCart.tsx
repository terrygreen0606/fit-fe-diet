import React from 'react';
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

  const { changedBlockRef, isBlockActive, setIsBlockActive } = useOutsideClick(false);

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
          {settings.shopping_list_count > 99 ? '99+' : settings.shopping_list_count}
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
