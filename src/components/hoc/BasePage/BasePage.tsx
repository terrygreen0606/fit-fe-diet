import React from 'react';

// Components
import Header from 'components/Header';
import SideMenu from 'components/SideMenu';

import './BasePage.sass';

const BasePage = ({ children }: any) => (
  <div className="basePageLayoutWrapper">
    <Header />
    <SideMenu />

    <div className="basePageMainContentWrapper">
      {children}
    </div>
  </div>
);

export default BasePage;
