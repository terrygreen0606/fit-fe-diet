import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { routes } from 'constants/routes';
import { getTranslate } from 'utils';
import { acceptInviteToFamily } from 'api';

// Components
import WithTranslate from 'components/hoc/WithTranslate';
import ContentLoading from 'components/hoc/ContentLoading';

const JoinFamilyView = (props: any) => {
  const t = (code: string, placeholders?: any) =>
    getTranslate(props.localePhrases, code, placeholders);

  const { history, isAuth } = props;

  const [isLoadingPage, setIsLoadingPage] = useState(true);

  useEffect(() => {
    const pathName = history.location.pathname.split('/');
    const familyCode = pathName[pathName.length - 1];

    if (isAuth) {
      acceptInviteToFamily(familyCode).then(({ data }) => {
        if (data.success) {
          setIsLoadingPage(false);
        }
      }).catch(() => toast.error(t('common.error')));
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
      >
        <h1>
          {t('family.accept.success')}
        </h1>
      </ContentLoading>
    </section>
  );
};

export default WithTranslate(connect((state: any) => ({
  isAuth: state.auth.isAuthenticated,
}), null)(JoinFamilyView));
