import React from 'react';

import './BasePage.sass';

const BasePage = ({ children }: any) => (
  <section className="basePageLayoutWrapper">
    <div className="basePageMainContentWrapper">
      {children}
    </div>
  </section>
);

export default BasePage;
