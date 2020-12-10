import React from 'react';
import classNames from 'classnames';

// Components
import Header from 'components/Header';
import FooterShort from 'components/FooterShort';
import SideMenu from 'components/SideMenu';

import './BasePage.sass';

type BasePageProps = {
  children: Node;
  hideHeader?: boolean;
  hideFooter?: boolean;
  color?: string;
};

const BasePageDefaultProps = {
  hideHeader: false,
  hideFooter: false,
  color: 'default',
};

const BasePage = ({
  children,
  hideHeader,
  hideFooter,
  color,
}: BasePageProps) => (
  <div
    className={classNames('basePageLayoutWrapper', {
      hide_header: hideHeader,
      hide_footer: hideFooter,
    })}
  >
    {!hideHeader && (
      <>
        <Header />
        <SideMenu />
      </>
    )}

    <div className='basePageMainContentWrapper'>
      {children}
    </div>

    {!hideFooter && <FooterShort color={color} />}
  </div>
);

BasePage.defaultProps = BasePageDefaultProps;

export default BasePage;
