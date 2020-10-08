import React, { useEffect } from 'react';
import useWindowSize from 'components/hooks/useWindowSize';
import useDebounce from 'components/hooks/useDebounce';

import './MainContent.sass';

const MainContent = ({ children }: any) => {
  const { width } = useWindowSize();
  const debouncedWidth = useDebounce(width, 500);

  useEffect(() => {
    const footerHeight = document.querySelector('footer').clientHeight;
    const headerHeight = document.querySelector('header').clientHeight;

    document.getElementById('mainContentWrapper').style.setProperty('--footerHeight', `${footerHeight}px`);
    document.getElementById('mainContentWrapper').style.setProperty('--headerHeight', `${headerHeight}px`);
  }, [debouncedWidth]);

  return (
    <main className='mainContentWrapper' id='mainContentWrapper'>
      {children}
    </main>
  );
};

export default MainContent;
