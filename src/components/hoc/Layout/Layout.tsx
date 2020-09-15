import React, { useState } from 'react';
import { connect } from 'react-redux';

// Components
import Header from 'components/Header';
import Footer from 'components/Footer';
import SideMenu from 'components/SideMenu';
import MainContent from 'components/hoc/MainContent';
import WithTranslate from 'components/hoc/WithTranslate';

import ShoppingListPopup from 'views/ShoppingListView/ShoppingListPopup';

import './Layout.sass';

// fixme: remove default
const Layout = ({
  children, localePhrases, location, shopping_list_count,
}: any) => {
  const [popup, setPopup] = useState(false);
  const [shoppingListCount, setShoppingListCount] = useState(shopping_list_count);

  return (
    <div className='layoutMainWrapper'>
      <Header setPopup={setPopup} popup={popup} location={location} shoppingListCount={shoppingListCount} />
      <SideMenu />
      <MainContent>
        {React.cloneElement(children, { setShoppingListCount })}
        { popup && <ShoppingListPopup localePhrases={localePhrases} />}
      </MainContent>
      <Footer />
    </div>
  );
};

export default WithTranslate(connect(
  (state: any) => ({
    shopping_list_count: state.settings.shopping_list_count,
  }),
)(Layout));
