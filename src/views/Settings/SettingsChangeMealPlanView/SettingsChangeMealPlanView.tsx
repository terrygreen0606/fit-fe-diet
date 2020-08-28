import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { routes, MAIN } from 'constants/routes';
import { getTranslate } from 'utils';

// Components
import ProfileLayout from 'components/hoc/ProfileLayout';
import WithTranslate from 'components/hoc/WithTranslate';
import Breadcrumb from 'components/Breadcrumb';

import './SettingsChangeMealPlanView.sass';

const SettingsChangeMealPlanView = (props: any) => {
  const t = (code: string, placeholders?: any) =>
    getTranslate(props.localePhrases, code, placeholders);

  return (
    <>
      <Helmet>
        <title>{t('app.title.family')}</title>
      </Helmet>
      <div className='container'>
        <Breadcrumb
          routes={[
            {
              url: routes[MAIN],
              name: MAIN,
            },
          ]}
          currentPage={t('app.title.family')}
        />
      </div>
      <ProfileLayout>123</ProfileLayout>
    </>
  );
};

export default WithTranslate(connect(null)(SettingsChangeMealPlanView));
