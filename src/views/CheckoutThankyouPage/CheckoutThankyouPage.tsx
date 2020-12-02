import React, { useEffect } from 'react';
import moment from 'moment';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  getTranslate,
  getImagePath,
  convertTime,
} from 'utils';
import { getUserInviteLink } from 'api';

// Components
import WithTranslate from 'components/hoc/WithTranslate';
import Button from 'components/common/Forms/Button';
import InviteEmail from 'components/common/Forms/InviteEmail';
import ShareButtons from 'components/ShareButtons';

import './CheckoutThankyouPage.sass';

const CheckoutThankyouPage = ({
  paid_until,
  localePhrases,
  location,
}: any) => {
  let orderAmount: number = null;
  let orderTransactionId: string = null;
  const t = (code: string, placeholders?: any) =>
    getTranslate(localePhrases, code, placeholders);

  const getTariffDate = (date) => {
    let dateStr = '';

    if (moment(new Date(date * 1000)).format('YYYY') === moment().format('YYYY')) {
      dateStr = moment(new Date(date * 1000)).format('DD.MM');
    } else {
      dateStr = moment(new Date(date * 1000)).format('DD.MM.YYYY');
    }

    return dateStr;
  };

  useEffect(() => {
    orderAmount = location.orderAmount;
    orderTransactionId = location.orderNumber;

    setTimeout(() => {
      window.history.pushState(null, null, '#');
    }, 100);
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
                {paid_until > 0 ? (
                  <h2
                    dangerouslySetInnerHTML={{
                      __html: t('checkout.thankyou.trial_info', {
                        PERIOD: getTariffDate(paid_until),
                      }),
                    }}
                  />
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
      paid_until: state.settings.paid_until,
    }),
    null,
  )(CheckoutThankyouPage),
);
