import React from 'react';

// Components
import Header from 'components/Header';
import SideMenu from 'components/SideMenu';
import MainContent from 'components/hoc/MainContent';

import './Layout.sass';

// fixme: remove default
const Layout = ({ children }: any) => (
  <div className="layoutMainWrapper">
    <Header />

    <main>
      <SideMenu />
      <MainContent>{children}</MainContent>
    </main>
  </div>
);

export default Layout;
