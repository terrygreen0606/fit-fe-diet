import React, { useState } from 'react';
import { connect } from 'react-redux';

// Components
import Header from 'components/Header';
import Footer from 'components/Footer';
import SideMenu from 'components/SideMenu';
import MainContent from 'components/hoc/MainContent';
import WithTranslate from 'components/hoc/WithTranslate';

import './Layout.sass';

// fixme: remove default
const Layout = ({
  children, location, shopping_list_count,
}: any) => {
  const [shoppingListCount, setShoppingListCount] = useState(shopping_list_count);

  return (
    <div className='layoutMainWrapper'>
      <Header
        location={location}
        shoppingListCount={shoppingListCount}
      />
      <SideMenu />
      <MainContent>
        {React.cloneElement(children, { setShoppingListCount })}
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
