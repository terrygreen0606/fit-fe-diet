import React, { useEffect, useRef } from 'react';

// Components
import ProfileSidebar from 'components/ProfileSidebar';
import useWindowSize from 'components/hooks/useWindowSize';
import useDebounce from 'components/hooks/useDebounce';

import './ProfileLayout.sass';

type ProfileLayoutProps = {
  children: any;
};

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  const { width } = useWindowSize();
  const debouncedWidth = useDebounce(width, 500);

  const layoutWrap = useRef(null);

  useEffect(() => {
    if (debouncedWidth < 1200 && children) {
      layoutWrap.current.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
    }
  }, [debouncedWidth, children]);

  return (
    <section className='profile-layout'>
      <div className='container'>
        <div className='row'>
          <div className='col-xl-4'>
            <ProfileSidebar />
          </div>
          <div className='col-xl-8 mt-3 mt-xl-0 profile-layout-content-col' ref={layoutWrap}>

            {children}

          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileLayout;
