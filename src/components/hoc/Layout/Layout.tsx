import React, { useState } from 'react';
import { connect } from 'react-redux';

// Components
import Header from 'components/Header';
import HeaderPromo from 'components/HeaderPromo';
import Footer from 'components/Footer';
import SideMenu from 'components/SideMenu';
import MainContent from 'components/hoc/MainContent';
import WithTranslate from 'components/hoc/WithTranslate';

import './Layout.sass';

type LayoutProps = {
  headerType: 'default' | 'promo';
  [propName: string]: any;
};

// fixme: remove default
const Layout = ({
  headerType,
  children, 
  location, 
  shopping_list_count
}: LayoutProps) => {
  
  const [popup, setPopup] = useState(false);  
  const [shoppingListCount, setShoppingListCount] = useState(shopping_list_count);

  const getHeader = () => {
    if (headerType === 'promo') {
      return <HeaderPromo />;
    } else {
      return (
        <Header
          location={location}
          shoppingListCount={shoppingListCount}
        />
      );
    }
  };

  return (
    <div className='layoutMainWrapper'>
      {getHeader()}
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
