import React from 'react';

import styles from './MainContent.module.sass';

const MainContent = ({ children }) => (
  <main className={styles.mainContentWrapper}>
    {children}
  </main>
);

export default MainContent;
