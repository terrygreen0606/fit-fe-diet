/* eslint-disable react/jsx-curly-newline */
/* eslint-disable function-paren-newline */
/* eslint-disable comma-dangle */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import Helmet from 'react-helmet';

import { routes } from 'constants/routes';
import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
  getTranslate,
  copyTextInBuffer,
  openShareLink,
} from 'utils';
import FormValidator from 'utils/FormValidator';
import { userInviteFriendByEmail, getUserInviteLink } from 'api';

// Components
import InputField from 'components/common/Forms/InputField';
import WithTranslate from 'components/hoc/WithTranslate';
import Button from 'components/common/Forms/Button';
import Breadcrumb from 'components/Breadcrumb';

import './ReferralView.sass';

// Icons
import { ReactComponent as ArrowRight } from 'assets/img/icons/arrow-right-gray-icon.svg';
import { ReactComponent as TwitterLogo } from 'assets/img/icons/twitter-logo-icon.svg';
import { ReactComponent as FacebookLogo } from 'assets/img/icons/facebook-logo-icon.svg';
import { ReactComponent as WhatsappLogo } from 'assets/img/icons/whatsapp-logo-icon.svg';
import { ReactComponent as TelegramLogo } from 'assets/img/icons/telegram-logo-icon.svg';

const ReferralView = (props: any) => {
  const t = (code: string) => getTranslate(props.localePhrases, code);

  const [inviteFriendsForm, setInviteFriendsForm] = useState({
    email: '',
  });

  const [inviteLink, setInviteLink] = useState('');

  const [inviteFriendsErrors, setInviteFriendsErrors] = useState([]);

  const [isActiveCopiedBlock, setActiveCopiedBlock] = useState(false);

  const validateOnChange = (name: string, value: any, event) => {
    validateFieldOnChange(
      name,
      value,
      event,
      inviteFriendsForm,
      setInviteFriendsForm,
      inviteFriendsErrors,
      setInviteFriendsErrors
    );
  };

  const getFieldErrors = (field: string) =>
    getFieldErrorsUtil(field, inviteFriendsErrors);

  const inviteFriendsSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const inputs = [...form.elements].filter((i) =>
      ['INPUT', 'SELECT', 'TEXTAREA'].includes(i.nodeName)
    );

    const { errors, hasError } = FormValidator.bulkValidate(inputs);

    setInviteFriendsErrors([...errors]);

    if (!hasError) {
      userInviteFriendByEmail(inviteFriendsForm.email)
        .then((response) => {
          setInviteFriendsForm({ ...inviteFriendsForm, email: '' });
          toast.success(t('referral.email_sent'));
          return response.data.data;
        })
        .catch(() => {
          toast.error(t('referral.error'));
        });
    }
  };

  getUserInviteLink().then((response) => {
    setInviteLink(response.data.data.url);
  });

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
                url: routes.main.url,
                name: routes.main.title,
              },
            ]}
            currentPage={t('app.title.referral')}
          />
          <div className='row align-items-center'>
            <div className='col-7 position-static'>
              <div className='referral__text-content'>
                <h1 className='referral__title'>{t('referral.title')}</h1>
                <h2 className='referral__subtitle'>{t('referral.subtitle')}</h2>
                <div className='referral__bonus'>{t('referral.bonus')}</div>
                <p className='referral__description'>
                  {t('referral.description')}
                </p>
                <p className='referral__description'>
                  {t('referral.copy_desc')}
                </p>
                <div className='referral__invite-link'>
                  <Button
                    type='button'
                    className='referral__invite-link-input'
                    onClick={() => {
                      copyTextInBuffer('.referral__invite-link-input');
                      setActiveCopiedBlock(true);
                      setTimeout(() => {
                        setActiveCopiedBlock(false);
                      }, 2000);
                    }}
                  >
                    {inviteLink}
                  </Button>
                  {isActiveCopiedBlock && (
                    <div className='referral__invite-link-copied'>
                      {t('referral.copied')}
                    </div>
                  )}
                </div>
                <div className='referral__separator'>
                  <span className='referral__separator-text'>
                    {t('common.or')}
                  </span>
                </div>
                <form
                  onSubmit={(e) => inviteFriendsSubmit(e)}
                  className='referral__container-input'
                >
                  <InputField
                    name='email'
                    data-validate='["email"]'
                    errors={getFieldErrors('email')}
                    value={inviteFriendsForm.email}
                    onChange={(e) =>
                      validateOnChange('email', e.target.value, e)
                    }
                    block
                    placeholder={t('referral.enter_email')}
                    height='lg'
                    className='referral__input card-bg'
                  />
                  <button type='submit' className='referral__invite-button'>
                    <span className='referral__invite-button-text'>
                      {t('referral.invite')}
                    </span>
                    <div className='referral__invite-button-container-icon'>
                      <ArrowRight className='referral__invite-button-icon' />
                    </div>
                  </button>
                </form>
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
          <div className='referral__socials'>
            <button
              type='button'
              className='referral__socials-item'
              onClick={() =>
                openShareLink(
                  `https://twitter.com/intent/tweet?text=${inviteLink}`
                )
              }
            >
              <TwitterLogo />
            </button>
            <button
              type='button'
              className='referral__socials-item'
              onClick={() =>
                openShareLink(
                  `https://www.facebook.com/sharer/sharer.php?u=${inviteLink}`
                )
              }
            >
              <FacebookLogo />
            </button>
            <button
              type='button'
              className='referral__socials-item'
              onClick={() =>
                openShareLink(`https://t.me/share/url?url=${inviteLink}`)
              }
            >
              <TelegramLogo />
            </button>
            <button
              type='button'
              className='referral__socials-item'
              onClick={() => openShareLink(`https://wa.me/?text=${inviteLink}`)}
            >
              <WhatsappLogo />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default WithTranslate(connect(null)(ReferralView));
