import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { routes } from 'constants/routes';
import { acceptInviteToFamily } from 'api';

// Components
import ContentLoading from 'components/hoc/ContentLoading';

const JoinFamilyView = (props: any) => {
  const { history, isAuth } = props;

  const [isLoadingPage] = useState(true);

  useEffect(() => {
    const pathName = history.location.pathname.split('/');
    const familyCode = pathName[pathName.length - 1];

    if (isAuth) {
      acceptInviteToFamily(familyCode).then(({ data }) => {
        if (data.success) {
          history.push({
            pathname: routes.main,
            joinFamily: true,
          });
        }
      }).catch(() => {
        history.push({
          pathname: routes.main,
          joinFamily: false,
        });
      });
    } else {
      document.cookie = `acceptFamilyCode=${familyCode}`;
      history.push(routes.login);
    }
  }, []);

  return (
    <section className='container'>
      <ContentLoading
        isLoading={isLoadingPage}
        isError={false}
        spinSize='lg'
        color='#106EE8'
      />
    </section>
  );
};

export default connect((state: any) => ({
  isAuth: state.auth.isAuthenticated,
}), null)(JoinFamilyView);
