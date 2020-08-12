import React from 'react';

// Components
import Header from 'components/Header';
import Footer from 'components/Footer';
import SideMenu from 'components/SideMenu';
import MainContent from 'components/hoc/MainContent';

import './Layout.sass';

// fixme: remove default
const Layout = ({ children }: any) => (
  <div className="layoutMainWrapper">
    <Header />
    <SideMenu />
    <MainContent>{children}</MainContent>
    <Footer />
  </div>
);

export default Layout;
