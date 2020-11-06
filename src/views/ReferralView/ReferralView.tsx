import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import uuid from 'react-uuid';
import { toast } from 'react-toastify';

import { routes } from 'constants/routes';
import { getTranslate, convertTime } from 'utils';
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

  const getInviteLink = () => {
    getUserInviteLink().then(({ data }) => {
      if (data.success && data.data) {
        setInviteLink(data.data.url);
      } else {
        toast.error(t('common.error'));
      }
    }).catch(() => toast.error(t('common.error')));
  };

  const getUserProfile = () => {
    fetchUserProfile().then(({ data }) => {
      if (data.success && data.data) {
        setUserName(`${data.data.name} ${data.data.surname || ''}`);
      } else {
        toast.error(t('common.error'));
      }
    }).catch(() => toast.error(t('common.error')));
  };

  const getInvitedFriends = () => {
    getUserInvitedFriends().then(({ data }) => {
      if (data.success && data.data) {
        data.data.list.map((item) => {
          item.id = uuid();

          item.date = convertTime(item.invited_ts);
        });

        console.log('data.data.list', data.data.list);
        setInvitedMembers([...data.data.list]);
      } else {
        toast.error(t('common.error'));
      }
    }).catch(() => toast.error(t('common.error')));
  };

  useEffect(() => {
    let cleanComponent = false;
    if (!cleanComponent) {
      getInviteLink();

      getUserProfile();

      getInvitedFriends();
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
                <InviteEmail onCompleted={() => getInvitedFriends()} />
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
              {t('referral.invite.title', { NAME: userName })}
            </h2>
            <div className='referral__invited-list'>
              <div className='referral__invited-list-head'>
                <div className='referral__invited-list-item'>
                  {t('referral.invite.email')}
                </div>
                <div className='referral__invited-list-item'>
                  {t('referral.invite.user')}
                </div>
                <div className='referral__invited-list-item'>
                  {t('referral.invite.paid')}
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
                  <div className='referral__invited-list-item'>
                    <div className='referral__invited-list-user-info'>
                      <div
                        className='referral__invited-list-user-info-media'
                        style={{
                          backgroundImage: `url(${item.image})`,
                        }}
                      />
                      <div className='referral__invited-list-user-info-desc'>
                        <div className='referral__invited-list-user-info-desc-name'>
                          {item.name}
                        </div>
                        <div className='referral__invited-list-user-info-desc-date'>
                          {item.date}
                        </div>
                        <div className='referral__invited-list-user-info-desc-status'>
                          {t(item.status_i18n)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='referral__invited-list-item'>
                    <div className={classnames('referral__invited-list-paid', {
                      active: item.is_paid,
                    })}
                    >
                      {item.is_paid ? (
                        t('common.yes')
                      ) : (
                        t('common.no')
                      )}
                    </div>
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
