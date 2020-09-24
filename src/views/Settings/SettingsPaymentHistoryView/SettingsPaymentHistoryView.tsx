import React from 'react';
import Helmet from 'react-helmet';

import { routes } from 'constants/routes';
import { getTranslate } from 'utils';

// Components
import ProfileLayout from 'components/hoc/ProfileLayout';
import WithTranslate from 'components/hoc/WithTranslate';
import Breadcrumb from 'components/Breadcrumb';

import './SettingsPaymentHistoryView.sass';

const SettingsPaymentHistoryView = (props: any) => {
  const t = (code: string) => getTranslate(props.localePhrases, code);

  return (
    <>
      <Helmet>
        <title>{t('app.title.payment_history')}</title>
      </Helmet>
      <div className='container'>
        <Breadcrumb
          routes={[
            {
              url: routes.main,
              name: t('breadcrumb.main'),
            },
          ]}
          currentPage={t('app.title.payment_history')}
        />
      </div>
      <ProfileLayout>
        <div className='payment-history card-bg'>
          <h5 className='payment-history__title'>
            {t('app.title.payment_history')}
          </h5>
          <div className='payment-history__table'>
            <div
              className='
              payment-history__table-row
              payment-history__table-head'
            >

            </div>
          </div>
        </div>
      </ProfileLayout>
    </>
  );
};

export default WithTranslate((SettingsPaymentHistoryView));
