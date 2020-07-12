import React from 'react';

// Components
import Header from 'components/Header';
import Footer from 'components/Footer';
import MainContent from 'components/hoc/MainContent';

import './Layout.sass';

// fixme: remove default
const Layout = ({ children }: any) => (
  <div className="layoutMainWrapper">
    <Header />

    <MainContent>{children}</MainContent>

    <Footer />
  </div>
);

export default Layout;
