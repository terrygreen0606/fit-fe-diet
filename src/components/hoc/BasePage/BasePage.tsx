import React from 'react';

import styles from './BasePage.module.sass';

const BasePage = ({ children }: any) => (
  <section className={styles.basePageLayoutWrapper}>
    <div className={styles.basePageMainContentWrapper}>
      {children}
    </div>
  </section>
);

export default BasePage;
