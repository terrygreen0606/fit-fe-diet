import React from 'react';

// Components
import Header from 'components/Header';
import Footer from 'components/Footer';
import MainContent from 'components/hoc/MainContent';

import styles from './Layout.module.sass';

// fixme: remove default
const Layout = ({ children }: any) => (
  <div className={styles.layoutMainWrapper}>
    <Header />

    <MainContent>{children}</MainContent>

    <Footer />
  </div>
);

export default Layout;
