import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { routes } from 'constants/routes';
import { getTranslate } from 'utils';
import { getUserInviteLink } from 'api';

// Components
import WithTranslate from 'components/hoc/WithTranslate';
import Breadcrumb from 'components/Breadcrumb';
import ShareButtons from 'components/ShareButtons';
import InviteEmail from 'components/common/Forms/InviteEmail';
import CopyLinkButton from 'components/common/CopyLinkButton';

import './ReferralView.sass';

const ReferralView = (props: any) => {
  const t = (code: string) => getTranslate(props.localePhrases, code);

  const [inviteLink, setInviteLink] = useState('');

  useEffect(() => {
    let cleanComponent = false;
    getUserInviteLink().then((response) => {
      if (response.data.success && response.data.data) {
        if (!cleanComponent) setInviteLink(response.data.data.url);
      }
    }).catch(() => { });

    return () => cleanComponent = true;
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('app.title.referral')}</title>
      </Helmet>
      <section className='referral'>
        <div className='container'>
          <Breadcrumb
            routes={[
              {
                url: routes.main,
                name: t('breadcrumb.main'),
              },
            ]}
            currentPage={t('app.title.referral')}
          />
          <div className='row'>
            <div className='col-7 position-static'>
              <div className='referral__text-content'>
                <div className='referral__text-content-preparation'>
                  <h1 className='referral__title'>{t('referral.title')}</h1>
                  <h2 className='referral__subtitle'>{t('referral.subtitle')}</h2>
                  <div className='referral__bonus'>{t('referral.bonus')}</div>
                  <p className='referral__description'>
                    {t('referral.description')}
                  </p>
                  <p className='referral__description'>
                    {t('referral.copy_desc')}
                  </p>
                </div>
                <div className='referral__invite-link'>
                  <CopyLinkButton text={inviteLink} />
                </div>
                <div className='referral__separator'>
                  <span className='referral__separator-text'>
                    {t('common.or')}
                  </span>
                </div>
                <InviteEmail />
                <div className='referral__socials'>
                  <ShareButtons
                    shareLink={inviteLink}
                    visible
                  />
                </div>
              </div>
            </div>
            <div className='col-5'>
              <div className='referral__container-media'>
                <img
                  src='https://fitstg.s3.eu-central-1.amazonaws.com/friends.png'
                  alt=''
                  className='referral__media'
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WithTranslate(connect(null)(ReferralView));
