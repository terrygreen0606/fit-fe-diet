import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

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
  children: Node,
  location: any,
};

// fixme: remove default
const Layout = ({
  headerType,
  children,
  location,
}: LayoutProps) => {
  const getHeader = () => {
    if (headerType === 'promo') {
      return <HeaderPromo />;
    }
    return (
      <Header
        location={location}
      />
    );
  };

  return (
    <div className={classNames('layoutMainWrapper', {
      'layout-promo': headerType === 'promo',
    })}
    >
      {getHeader()}
      <SideMenu />
      <MainContent>
        {children}
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
