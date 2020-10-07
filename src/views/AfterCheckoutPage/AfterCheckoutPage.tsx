import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { getTranslate, getImagePath } from 'utils';
import { getActiveAppTariff, getUserInviteLink } from 'api';

// Components
import WithTranslate from 'components/hoc/WithTranslate';
import ContentLoading from 'components/hoc/ContentLoading';
import Button from 'components/common/Forms/Button';
import InviteEmail from 'components/InviteEmail';
import ShareButtons from 'components/ShareButtons';

import './AfterCheckoutPage.sass';

const AfterCheckoutPage = (props: any) => {

  const t = (code: string, placeholders?: any) => 
    getTranslate(props.localePhrases, code, placeholders);

  const [activeTariffData, setActiveTariffData] = useState({
    next_apply_in_days: null,
    tariff_until_ts: null,
    next_price_text: null
  });

  const [tariffLoading, setTariffLoading] = useState<boolean>(true);
  const [tariffLoadingError, setTariffLoadingError] = useState<boolean>(false);

  const [inviteLink, setInviteLink] = useState('');

  const getActiveTariff = () => {
    setTariffLoading(true);
    setTariffLoadingError(false);

    getActiveAppTariff()
      .then(response => {
        setTariffLoading(false);

        const { data } = response;

        if (data.success && data.data) {
          setActiveTariffData({
            next_apply_in_days: data.data.next_tariff.apply_in_days,
            tariff_until_ts: data.data.tariff_until_ts,
            next_price_text: data.data.next_tariff.price_text
          });
        } else {
          setTariffLoadingError(true);
        }
      })
      .catch(error => {
        setTariffLoading(false);
        setTariffLoadingError(true);
      });
  };

  useEffect(() => {
    let cleanComponent = false;

    getUserInviteLink().then(response => {
      if (!cleanComponent) setInviteLink(response.data.data.url);
    });

    getActiveTariff();

    return () => cleanComponent = true;
  }, []);

  const getTariffDate = date => {
    let dateStr = '';

    if (moment(date).format('YYYY') === moment(new Date()).format('YYYY')) {
      dateStr = moment(date).format('DD.MM.YYYY');
    } else {
      dateStr = moment(date).format('DD.MM');
    }

    return dateStr;
  };

  return (
    <>
      <section className="text-center">
        <div className="container">
          <div className="row">
            <div className="col-xl-10 offset-xl-1">
                
              <h4 className="sect-subtitle">{t('checkout.thankyou.header_title')}</h4>
              <p>{t('checkout.thankyou.header_descr')}</p>

              <div className="mt-4 mt-sm-5 pt-lg-5" >
                <ContentLoading
                  isLoading={tariffLoading}
                  isError={tariffLoadingError}
                  fetchData={() => getActiveTariff()}
                >
                  <h4 
                    dangerouslySetInnerHTML={{ 
                      __html: t('checkout.thankyou.trial_info', { 
                        COUNT: `<span class="text-steel-blue">${getTariffDate(activeTariffData.tariff_until_ts)}</span>`, 
                        AMOUNT: 'Y',
                        PERIOD: t('common.days', { COUNT: activeTariffData.next_apply_in_days })
                      }) 
                    }}
                  />
                </ContentLoading>
              </div>
              
              <p>{t('checkout.thankyou.trial_subscr')}</p>
              
              <Button className="mt-4 mt-sm-5" size="lg" color="primary" block style={{ maxWidth: '580px' }}>
                {t('checkout.thankyou.button.dashboard')}
              </Button>

            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-5">

              <div className="after-checkout-app-sect-img-wrap">
                <img src={getImagePath('woman-ball-gym-2.png')} alt="" className="after-checkout-app-sect-img-1" />
                <img src={getImagePath('food/food-serving-img-3.png')} alt="" className="after-checkout-app-sect-img-2" />
                <img src={getImagePath('food/food-serving-img-4.png')} alt="" className="after-checkout-app-sect-img-3" />
                <img src={getImagePath('phone-frame-img.png')} alt="" className="after-checkout-app-sect-phone-img" />
                <span className="after-checkout-app-sect-rect" />
                <span className="after-checkout-app-sect-dotted-rect" />
              </div>

            </div>
            <div className="col-lg-6 offset-lg-1 after-checkout-app-sect-col-2 text-center">
              
              <h4 className="mb-5 pb-4">{t('checkout.thankyou.application_title')}</h4>

              <img src={getImagePath('point-arrow-yellow.png')} alt="" className="after-checkout-app-sect-arrow" />

              <div className="app-market-img__list">
                <a href="#" target="_blank" className="app-market-img__list_item">
                  <img src={getImagePath('gplay-img.png')} alt="" className="app-market-img" />
                </a>

                <a href="#" target="_blank" className="app-market-img__list_item">
                  <img src={getImagePath('appstore-img.png')} alt="" className="app-market-img" />
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-5 order-lg-2">
              
              <div className="after-checkout-referral-sect-img-wrap">
                <img src={getImagePath('friends-img.png')} alt="" className="after-checkout-referral-sect-img" />
                <span className="after-checkout-referral-sect-rect" />
                <span className="after-checkout-referral-sect-dotted-rect" />
              </div>

            </div>
            <div className="col-lg-7 order-lg-1 mt-5 mt-lg-0 text-center">

              <div className="after-checkout__invite_email__wrap">
                <h4 className="mb-5 text-steel-blue">{t('checkout.thankyou.share_title')}</h4>
                <InviteEmail className="after-checkout__invite_email" />
              </div>

              <div className='referral__separator mt-5'>
                <span className='referral__separator-text'>
                  {t('common.or')}
                </span>
              </div>

              <div className='referral__socials'>
                <ShareButtons
                  shareLink={inviteLink}
                  visible
                />
              </div>

              <div className="mt-5 pt-md-5">
                <Button className="after-checkout__dashboard_btn" size="lg" color="primary" block style={{ maxWidth: '700px' }}>
                  {t('checkout.thankyou.button.personal_dashboard')}
                </Button>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WithTranslate(AfterCheckoutPage);
