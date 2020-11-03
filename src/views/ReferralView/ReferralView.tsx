import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import uuid from 'react-uuid';

import { routes } from 'constants/routes';
import { getTranslate } from 'utils';
import {
  getUserInviteLink,
  fetchUserProfile,
  getUserInvitedFriends,
} from 'api';

// Components
import WithTranslate from 'components/hoc/WithTranslate';
import Breadcrumb from 'components/Breadcrumb';
import ShareButtons from 'components/ShareButtons';
import InviteEmail from 'components/common/Forms/InviteEmail';
import CopyLinkButton from 'components/common/CopyLinkButton';

import './ReferralView.sass';

const ReferralView = (props: any) => {
  const t = (code: string, placeholders?: any) => getTranslate(props.localePhrases, code, placeholders);

  const [inviteLink, setInviteLink] = useState<string>('');

  const [userName, setUserName] = useState<string>('');

  const [invitedMembers, setInvitedMembers] = useState<any[]>([]);

  useEffect(() => {
    let cleanComponent = false;
    if (!cleanComponent) {
      getUserInviteLink().then((response) => {
        if (response.data.success && response.data.data) {
          setInviteLink(response.data.data.url);
        }
      }).catch(() => { });

      fetchUserProfile().then((response) => {
        if (response.data.success && response.data.data) {
          const { data } = response.data;
          setUserName(`${data.name} ${data.surname}`);
        }
      }).catch(() => { });

      getUserInvitedFriends().then((response) => {
        if (response.data.success && response.data.data) {
          response.data.data.list.map((item) => item.id = uuid());
          setInvitedMembers([...response.data.data.list]);
        }
      }).catch(() => { });
    }

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
          <div className='referral__invited'>
            <h2 className='referral__invited-title'>
              {t('referral.invited.title', { NAME: userName })}
            </h2>
            <div className='referral__invited-list'>
              <div className='referral__invited-list-head'>
                <div className='referral__invited-list-item'>
                  {t('referral.invited.email')}
                </div>
                <div className='referral__invited-list-item'>
                  {t('referral.invited.user')}
                </div>
                <div className='referral__invited-list-item'>
                  {t('referral.invited.paid')}
                </div>
              </div>
              {invitedMembers.map((item) => (
                <div
                  key={item.id}
                  className='referral__invited-list-row'
                >
                  <div className='referral__invited-list-item'>
                    <a href={`mailto:${item.email}`} className='referral__invited-list-email'>
                      {item.email}
                    </a>
                  </div>
                  {/* need to integration with BE */}
                  <div className='referral__invited-list-item'>
                    <div className='referral__invited-list-user-info'>
                      <div
                        className='referral__invited-list-user-info-media'
                        style={{
                          backgroundImage: 'url(https://fitstg.s3.eu-central-1.amazonaws.com/anna_t.png)',
                        }}
                      />
                      <div className='referral__invited-list-user-info-desc'>
                        <div className='referral__invited-list-user-info-desc-name'>Gabriel Martinez</div>
                        <div className='referral__invited-list-user-info-desc-date'>15.08.2020</div>
                      </div>
                    </div>
                  </div>
                  <div className='referral__invited-list-item'>
                    <div className='referral__invited-list-paid active'>Yes</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WithTranslate(connect(null)(ReferralView));
