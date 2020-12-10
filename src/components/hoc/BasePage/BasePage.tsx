import React from 'react';
import classNames from 'classnames';

// Components
import Header from 'components/Header';
import FooterShort from 'components/FooterShort';
import SideMenu from 'components/SideMenu';

import './BasePage.sass';

const BasePage = ({ children, hideHeader, hideFooter, grayFooter }: any) => (
  <div 
    className={classNames("basePageLayoutWrapper", {
      'hide_header': hideHeader,
      'hide_footer': hideFooter,
    })}
  >
    {!hideHeader && (
      <>
        <Header />
        <SideMenu />
      </>
    )}

    <div className="basePageMainContentWrapper">
      {children}
    </div>

    {!hideFooter && <FooterShort grayFooter={grayFooter} />}
  </div>
);

export default BasePage;
