import React, { useState } from 'react';

// Components
import Header from 'components/Header';
import Footer from 'components/Footer';
import SideMenu from 'components/SideMenu';
import MainContent from 'components/hoc/MainContent';
import WithTranslate from 'components/hoc/WithTranslate';

import ShoppingListPopup from 'views/ShoppingListView/ShoppingListPopup';

import './Layout.sass';

// fixme: remove default
const Layout = ({ children, localePhrases, location }: any) => {
  const [popup, setPopup] = useState(false);

  return (
    <div className='layoutMainWrapper'>
      <Header setPopup={setPopup} popup={popup} location={location} />
      <SideMenu />
      <MainContent>
        {children}
        { popup && <ShoppingListPopup localePhrases={localePhrases} />}
      </MainContent>
      <Footer />
    </div>
  );
};

export default WithTranslate(Layout);
