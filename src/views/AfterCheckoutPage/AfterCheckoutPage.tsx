import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTranslate, getImagePath } from 'utils';
import { getUserInviteLink } from 'api';

// Components
import WithTranslate from 'components/hoc/WithTranslate';
import ContentLoading from 'components/hoc/ContentLoading';
import Button from 'components/common/Forms/Button';
import InviteEmail from 'components/InviteEmail';
import ShareButtons from 'components/ShareButtons';

import './AfterCheckoutPage.sass';

const AfterCheckoutPage = (props: any) => {

  const [inviteLink, setInviteLink] = useState('');

  useEffect(() => {
    let cleanComponent = false;

    getUserInviteLink().then(response => {
      if (!cleanComponent) setInviteLink(response.data.data.url);
    });

    return () => cleanComponent = true;
  }, []);

  const t = (code: string, placeholders?: any) => 
    getTranslate(props.localePhrases, code, placeholders);

  return (
    <>
      <section className="text-center">
        <div className="container">
          <div className="row">
            <div className="col-xl-10 offset-xl-1">
                
              <h4 className="sect-subtitle">Congratulations!</h4>
              <p>sulle ja su perele sulle ja su perelesulle ja su perelesulle ja su perelesulle ja su perelesulle ja su perelesulle ja su perelesulle ja su perelesulle ja su perele  sulle ja su perele sulle ja su perelesulle ja su perelesulle ja su perelesulle ja su perelesulle ja su perelesulle ja su perelesulle ja su perelesulle ja su perele</p>
              <h4 className="mt-4 mt-sm-5 pt-lg-5">Your trial is valid from today until <span className="text-steel-blue">X</span>, and you will be charged Y for the full plan in 7 days.</h4>
              <p>Check your email for your login details.</p>
              <Button className="mt-4 mt-sm-5" size="lg" color="primary" block style={{ maxWidth: '580px' }}>Continue to dashboard</Button>

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
              
              <h4 className="mb-5 pb-4">Please click one of the two buttons below to add our mobile app to your home screen</h4>

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
                <h4 className="mb-5 text-steel-blue">Share your membership with your friends</h4>
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
                <Button className="after-checkout__dashboard_btn" size="lg" color="primary" block style={{ maxWidth: '700px' }}>Continue to your personal dashboard</Button>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WithTranslate(AfterCheckoutPage);
