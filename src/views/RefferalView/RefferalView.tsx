/* eslint-disable comma-dangle */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
  getTranslate,
} from 'utils';
import FormValidator from 'utils/FormValidator';
import { userInviteFriendByEmail } from 'api';

// Components
import InputField from 'components/common/Forms/InputField';
import WithTranslate from 'components/hoc/WithTranslate';

import './RefferalView.sass';

// Icons
import { ReactComponent as ArrowRight } from 'assets/img/icons/arrow-right-gray-icon.svg';
import { ReactComponent as TwitterLogo } from 'assets/img/icons/twitter-logo-icon.svg';
import { ReactComponent as WhatsAppLogo } from 'assets/img/icons/whatsapp-logo-icon.svg';
import { ReactComponent as FacebookLogo } from 'assets/img/icons/facebook-logo-icon.svg';
import { ReactComponent as InstagramLogo } from 'assets/img/icons/instagram-logo-icon.svg';
import { ReactComponent as TelegramLogo } from 'assets/img/icons/telegram-logo-icon.svg';

const RefferalView = (props: any) => {
  const t = (code: string) => getTranslate(props.localePhrases, code);

  const [inviteFriendsForm, setInviteFriendsForm] = useState({
    email: '',
  });

  const [inviteFriendsErrors, setInviteFriendsErrors] = useState([]);

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
    // eslint-disable-next-line implicit-arrow-linebreak
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
          toast.success('Email sent successfully!');
          return response.data.data;
        })
        .catch((reject) => {
          console.log(reject);
          toast.error('Error!');
        });
    }
  };

  return (
    <section className='refferal'>
      <div className='container'>
        <div className='row align-items-center'>
          <div className='col-7 position-static'>
            <div className='refferal__text-content'>
              <h1 className='refferal__title'>{t('refferal.title')}</h1>
              <h2 className='refferal__subtitle'>{t('refferal.subtitle')}</h2>
              <div className='refferal__bonus'>{t('refferal.bonus')}</div>
              <p className='refferal__description'>
                {t('refferal.description')}
              </p>
              <form
                onSubmit={(e) => inviteFriendsSubmit(e)}
                className='refferal__container-input'
              >
                <InputField
                  name='email'
                  data-validate='["email"]'
                  errors={getFieldErrors('email')}
                  value={inviteFriendsForm.email}
                  onChange={(e) => validateOnChange('email', e.target.value, e)}
                  block
                  placeholder={t('refferal.enter_email')}
                  height='lg'
                  className='refferal__input card-bg'
                />
                <button type='submit' className='refferal__invite-button'>
                  <span className='refferal__invite-button-text'>
                    {t('refferal.invite')}
                  </span>
                  <div className='refferal__invite-button-container-icon'>
                    <ArrowRight className='refferal__invite-button-icon' />
                  </div>
                </button>
              </form>
            </div>
          </div>
          <div className='col-5'>
            <div className='refferal__container-media'>
              <img
                src='https://fitstg.s3.eu-central-1.amazonaws.com/friends.png'
                alt=''
                className='refferal__media'
              />
            </div>
          </div>
        </div>
        <div className='refferal__socials'>
          <a href='https://www.twitter.com/' className='refferal__socials-item'>
            <TwitterLogo />
          </a>
          <a
            href='https://www.whatsapp.com/'
            className='refferal__socials-item'
          >
            <WhatsAppLogo />
          </a>
          <a
            href='https://www.facebook.com/'
            className='refferal__socials-item'
          >
            <FacebookLogo />
          </a>
          <a
            href='https://www.instagram.com/'
            className='refferal__socials-item'
          >
            <InstagramLogo />
          </a>
          <a
            href='https://web.telegram.org/'
            className='refferal__socials-item'
          >
            <TelegramLogo />
          </a>
        </div>
      </div>
    </section>
  );
};

export default WithTranslate(connect(null)(RefferalView));
