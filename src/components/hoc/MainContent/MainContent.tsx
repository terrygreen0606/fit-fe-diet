import React from 'react';

// Components
import Footer from 'components/Footer';

import './MainContent.sass';

const MainContent = ({ children }) => (
  <div className="mainContentWrapper">
    {children}

    <Footer />
  </div>
);

export default MainContent;
