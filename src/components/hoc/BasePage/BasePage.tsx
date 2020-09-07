import React from 'react';

// Components
import Header from 'components/Header';
import FooterShort from 'components/FooterShort';
import SideMenu from 'components/SideMenu';

import './BasePage.sass';

const BasePage = ({ children }: any) => (
  <div className="basePageLayoutWrapper">
    <Header />
    <SideMenu />

    <div className="basePageMainContentWrapper">
      {children}
    </div>

    <FooterShort />
  </div>
);

export default BasePage;
