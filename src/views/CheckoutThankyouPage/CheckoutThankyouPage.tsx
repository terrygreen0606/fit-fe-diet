import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  getTranslate,
  getImagePath,
  convertTime,
} from 'utils';
import { getUserInviteLink, getPaymentStatus } from 'api';

// Components
import WithTranslate from 'components/hoc/WithTranslate';
import Button from 'components/common/Forms/Button';
import InviteEmail from 'components/common/Forms/InviteEmail';
import ShareButtons from 'components/ShareButtons';
import ContentLoading from 'components/hoc/ContentLoading';

import './CheckoutThankyouPage.sass';

const CheckoutThankyouPage = ({
  settings,
  localePhrases,
  location,
}: any) => {
  let orderAmount: number = null;
  let orderTransactionId: string = null;

  const t = (code: string, placeholders?: any) =>
    getTranslate(localePhrases, code, placeholders);

  const [tariffUntilTs, setTariffUntilTs] = useState<string>(null);
  const [isLoadingTariff, setIsLoadingTariff] = useState<boolean>(true);
  const [isLoadingTariffError, setIsLoadingTariffError] = useState<boolean>(false);

  const getTariffDate = (date) => {
    const today = moment().unix();

    if (
      convertTime(today, settings.language, { year: 'numeric' }) ===
      convertTime(date, settings.language, { year: 'numeric' })
      ) {
        return convertTime(date, settings.language, { day: '2-digit', month: '2-digit' });
    }

    return convertTime(date, settings.language);
  };

  const getPaymentStatusUser = () => {
    if (location.orderId) {
      setIsLoadingTariff(true);
      setIsLoadingTariffError(false);

      getPaymentStatus(location.orderId)
        .then(({ data }) => {
          setIsLoadingTariff(false);
          if (data.success && data.data) {
            setTariffUntilTs(data.data.tariff_until_ts);
          } else {
            setIsLoadingTariffError(true);
          }
        })
        .catch(() => {
          setIsLoadingTariff(false);
          setIsLoadingTariffError(true);
        });
    }
  };

  useEffect(() => {
    orderAmount = location.orderAmount;
    orderTransactionId = location.orderNumber;

    setTimeout(() => {
      window.history.pushState(null, null, '#');
    }, 100);

    if (location.orderId) {
      getPaymentStatusUser();
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('app.title.checkout_thankyou')}</title>
      </Helmet>

      <section className='text-center'>
        <div className='container'>
          <div className='row'>
            <div className='col-xl-10 offset-xl-1'>

              <h4 className='sect-subtitle'>{t('checkout.thankyou.header_title')}</h4>
              <p>{t('checkout.thankyou.header_descr')}</p>

              <div className='mt-4 mt-sm-5 pt-lg-5'>
                {location.orderId ? (
                  <ContentLoading
                    isLoading={isLoadingTariff}
                    isError={isLoadingTariffError}
                    fetchData={() => getPaymentStatusUser()}
                    spinSize='lg'
                  >
                    <h2
                      dangerouslySetInnerHTML={{
                        __html: t('checkout.thankyou.trial_info', {
                          PERIOD: getTariffDate(tariffUntilTs),
                        }),
                      }}
                    />
                  </ContentLoading>
                ) : (
                    <h2>{t('checkout.thankyou.trial_info.waiting')}</h2>
                  )}
              </div>

              <p>{t('checkout.thankyou.trial_subscr')}</p>

              <Link to='/' className='link-raw'>
                <Button className='mt-4 mt-sm-5' size='lg' color='primary' block style={{ maxWidth: '580px' }}>
                  {t('checkout.thankyou.button.dashboard')}
                </Button>
              </Link>

            </div>
          </div>
        </div>
      </section>

      <section>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-5'>

              <div className='after-checkout-app-sect-img-wrap'>
                <img
                  src={getImagePath('woman-ball-gym-2.png')}
                  alt=''
                  className='after-checkout-app-sect-img-1'
                />
                <img
                  src={getImagePath('food/food-serving-img-3.png')}
                  alt=''
                  className='after-checkout-app-sect-img-2'
                />
                <img
                  src={getImagePath('food/food-serving-img-4.png')}
                  alt=''
                  className='after-checkout-app-sect-img-3'
                />
                <img
                  src={getImagePath('phone-frame-img.png')}
                  alt=''
                  className='after-checkout-app-sect-phone-img'
                />
                <span className='after-checkout-app-sect-rect' />
                <span className='after-checkout-app-sect-dotted-rect' />
              </div>

            </div>
            <div className='col-lg-6 offset-lg-1 after-checkout-app-sect-col-2 text-center'>

              <h2 className='mb-5 pb-4'>{t('checkout.thankyou.application_title')}</h2>

              <img src={getImagePath('point-arrow-yellow.png')} alt='' className='after-checkout-app-sect-arrow' />

              <div className='app-market-img__list'>
                <a href='/' target='_blank' className='app-market-img__list_item'>
                  <img src={getImagePath('gplay-img.png')} alt='' className='app-market-img' />
                </a>

                <a href='/' target='_blank' className='app-market-img__list_item'>
                  <img src={getImagePath('appstore-img.png')} alt='' className='app-market-img' />
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-5 order-lg-2'>

              <div className='after-checkout-referral-sect-img-wrap'>
                <img src={getImagePath('friends-img.png')} alt='' className='after-checkout-referral-sect-img' />
                <span className='after-checkout-referral-sect-rect' />
                <span className='after-checkout-referral-sect-dotted-rect' />
              </div>

            </div>
            <div className='col-lg-7 order-lg-1 mt-5 mt-lg-0 text-center'>

              <div className='after-checkout__invite_email__wrap'>
                <h2 className='mb-5 text-steel-blue'>{t('checkout.thankyou.share_title')}</h2>
                <InviteEmail className='after-checkout__invite_email' />
              </div>

              <div className='referral__separator mt-5'>
                <span className='referral__separator-text'>
                  {t('common.or')}
                </span>
              </div>

              <ShareButtons
                visible
                fetchData={() => getUserInviteLink().then((response) => ({
                  link: response.data.data.url,
                }))}
              />

              <div className='mt-5 pt-md-5'>
                <Link to='/' className='link-raw'>
                  <Button
                    className='after-checkout__dashboard_btn'
                    size='lg'
                    color='primary'
                    block
                    style={{ maxWidth: '700px' }}
                  >
                    {t('checkout.thankyou.button.personal_dashboard')}
                  </Button>
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WithTranslate(
  connect(
    (state: any) => ({
      settings: state.settings,
    }),
    null,
  )(CheckoutThankyouPage),
);
