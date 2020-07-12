import React from 'react';

import './MainContent.sass';

const MainContent = ({ children }) => (
  <main className="mainContentWrapper">
    {children}
  </main>
);

export default MainContent;
