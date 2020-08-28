import React from 'react';
import classNames from 'classnames';

// Components
import Header from 'components/Header';
import SideMenu from 'components/SideMenu';

import './BasePage.sass';

const BasePage = ({ children, hideHeader }: any) => (
  <div 
    className={classNames("basePageLayoutWrapper", {
      'hide_header': hideHeader
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
  </div>
);

export default BasePage;
