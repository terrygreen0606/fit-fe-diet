import React from 'react';

// Components
import ProfileSidebar from 'components/ProfileSidebar';

import './ProfileLayout.sass';

const ProfileLayout = ({ children }) => {
  return (
    <section className="profile-layout">
      <div className="container">
        <div className="row">
          <div className="col-xl-4">
            
            <ProfileSidebar />

          </div>
          <div className="col-xl-8 mt-3 mt-xl-0 profile-layout-content-col">

            {children}

          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileLayout;
