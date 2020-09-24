import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import classnames from 'classnames';

import { routes } from 'constants/routes';
import { getTranslate, convertTime } from 'utils';
import { getPaymentHistory } from 'api';

// Components
import ProfileLayout from 'components/hoc/ProfileLayout';
import WithTranslate from 'components/hoc/WithTranslate';
import Breadcrumb from 'components/Breadcrumb';
import Spinner from 'components/common/Spinner';

import './SettingsPaymentHistoryView.sass';

const SettingsPaymentHistoryView = (props: any) => {
  const t = (code: string) => getTranslate(props.localePhrases, code);

  const [isSpinnerActive, setIsSpinnerActive] = useState<boolean>(true);

  const [paymentHistory, setPaymentHistory] = useState<Array<any>>([]);

  useEffect(() => {
    let cleanComponent = false;
    getPaymentHistory().then((response) => {
      if (!cleanComponent) setPaymentHistory([...response.data.data]);
    }).finally(() => {
      if (!cleanComponent) setIsSpinnerActive(false);
    });
    return () => cleanComponent = true;
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('app.title.payment.history')}</title>
      </Helmet>
      <div className='container'>
        <Breadcrumb
          routes={[
            {
              url: routes.main,
              name: t('breadcrumb.main'),
            },
          ]}
          currentPage={t('app.title.payment.history')}
        />
      </div>
      <ProfileLayout>
        <div className='payment-history card-bg'>
          {isSpinnerActive ? (
            <div className='text-center'>
              <Spinner
                size='lg'
                color='#0FC1A1'
              />
            </div>
          ) : (
              <>
                {paymentHistory.length === 0 ? (
                  <h5 className='payment-history__title without-mg'>
                    {t('payment.history.empty')}
                  </h5>
                ) : (
                    <>
                      <h5 className='payment-history__title'>
                        {t('app.title.payment.history')}
                      </h5>
                      <div className='payment-history__table'>
                        <div
                          className='
                        payment-history__table-row
                        payment-history__table-head'
                        >
                          <div className='payment-history__table-number'>
                            {t('payment.history.number')}
                          </div>
                          <div className='payment-history__table-date'>
                            {t('payment.history.date')}
                          </div>
                          <div className='payment-history__table-amount'>
                            {t('payment.history.amount')}
                          </div>
                          <div className='payment-history__table-status'>
                            {t('payment.history.status')}
                          </div>
                        </div>
                        {paymentHistory.map((item) => (
                          <div
                            key={item.number}
                            className={classnames('payment-history__table-row', {
                              active: item.status_code === 'order.status.active',
                              ended: item.status_code === 'order.status.ended',
                              pending: item.status_code === 'order.status.pending',
                            })}
                          >
                            <div className='payment-history__table-number'>
                              {item.number}
                            </div>
                            <div className='payment-history__table-date'>
                              {convertTime(item.created_ts)}
                            </div>
                            <div className='payment-history__table-amount'>
                              {item.amount}
                            </div>
                            <div className='payment-history__table-status'>
                              {t(item.status_code)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
              </>
            )}
        </div>
      </ProfileLayout>
    </>
  );
};

export default WithTranslate((SettingsPaymentHistoryView));
