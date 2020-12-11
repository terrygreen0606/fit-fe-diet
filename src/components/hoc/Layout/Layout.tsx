import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

// Components
import Header from 'components/Header';
import HeaderPromo from 'components/HeaderPromo';
import Footer from 'components/Footer';
import FooterShort from 'components/FooterShort';
import SideMenu from 'components/SideMenu';
import MainContent from 'components/hoc/MainContent';
import WithTranslate from 'components/hoc/WithTranslate';

import './Layout.sass';

type LayoutProps = {
  headerType: 'default' | 'promo';
  footerType: 'default' | 'short';
  [propName: string]: any;
  children: Node,
  location: any,
  history: any,
  color?: string,
};

const LayoutDefaultProps = {
  color: 'default',
};

// fixme: remove default
const Layout = ({
  headerType,
  footerType,
  children,
  location,
  history,
  color,
}: LayoutProps) => {
  const getHeader = () => {
    if (headerType === 'promo') {
      return <HeaderPromo history={history} />;
    }
    return (
      <Header
        location={location}
        history={history}
      />
    );
  };

  const getFooter = () => {
    if (footerType === 'short') {
      return <FooterShort color={color} />;
    }
    return <Footer />;
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
      {getFooter()}
    </div>
  );
};

Layout.defaultProps = LayoutDefaultProps;

export default WithTranslate(connect(
  (state: any) => ({
    shopping_list_count: state.settings.shopping_list_count,
  }),
)(Layout));
