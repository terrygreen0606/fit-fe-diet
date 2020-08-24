/* eslint-disable react/jsx-curly-newline */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable comma-dangle */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
  getTranslate,
} from 'utils';
import FormValidator from 'utils/FormValidator';
import {
  userInviteFriendByEmail,
  getUserInviteLink,
  getUserInfo,
  getUserFamily,
} from 'api';

// Components
import InputField from 'components/common/Forms/InputField';
import ProfileLayout from 'components/hoc/ProfileLayout';
import Button from 'components/common/Forms/Button';
import WithTranslate from 'components/hoc/WithTranslate';

import './SettingsFamilyView.sass';

// Icons
import { ReactComponent as CloseIcon } from 'assets/img/icons/close-icon.svg';

const SettingsFamilyView = (props: any) => {
  const t = (code: string, placeholders?: any) =>
    getTranslate(props.localePhrases, code, placeholders);

  const [inviteLink, setInviteLink] = useState('');

  const [inviteEmailForm, setInviteEmailForm] = useState({
    email: '',
  });

  const [userInfo, setUserInfo] = useState({
    name: '',
    surname: '',
  });

  const [userFamily, setUserFamily] = useState([]);

  useEffect(() => {
    getUserFamily().then((response) => {
      setUserFamily(response.data.data.list);
      // console.log('response', response);
      // console.log('userFamily', userFamily);
    });

    getUserInfo().then((response) => {
      setUserInfo(response.data.data);
    });

    getUserInviteLink().then((response) => {
      setInviteLink(response.data.data.url);
    });
  }, []);

  const [inviteEmailErrors, setInviteEmailErrors] = useState([]);

  const validateOnChange = (name: string, value: any, event) => {
    validateFieldOnChange(
      name,
      value,
      event,
      inviteEmailForm,
      setInviteEmailForm,
      inviteEmailErrors,
      setInviteEmailErrors
    );
  };

  const getFieldErrors = (field: string) =>
    getFieldErrorsUtil(field, inviteEmailErrors);

  const inviteEmailSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const inputs = [...form.elements].filter((i) =>
      ['INPUT', 'SELECT', 'TEXTAREA'].includes(i.nodeName)
    );

    const { errors, hasError } = FormValidator.bulkValidate(inputs);

    setInviteEmailErrors([...errors]);

    if (!hasError) {
      userInviteFriendByEmail(inviteEmailForm.email)
        .then((response) => {
          setInviteEmailForm({ ...inviteEmailForm, email: '' });
          toast.success(t('referral.email_sent'));
          return response.data.data;
        })
        .catch(() => {
          toast.error(t('referral.error'));
        });
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('app.title.family')}</title>
      </Helmet>
      <ProfileLayout>
        <div className='family card-bg'>
          <h2 className='family__title'>{t('family.invite_link.title')}</h2>
          <div className='family__invite-link'>
            <p className='family__invite-link-desc'>
              {t('family.invite_link.desc')}
            </p>
            <Button
              type='button'
              className='family__invite-link-input'
              onClick={() => navigator.clipboard.writeText(inviteLink)}
            >
              {inviteLink}
            </Button>
          </div>
          <div className='family__separator'>
            <span className='family__separator-text'>{t('common.or')}</span>
          </div>
          <form
            onSubmit={(e) => inviteEmailSubmit(e)}
            className='family__invite-email'
          >
            <div className='family__invite-email-input-wrap'>
              <InputField
                name='email'
                data-validate='["email"]'
                errors={getFieldErrors('email')}
                value={inviteEmailForm.email}
                onChange={(e) => validateOnChange('email', e.target.value, e)}
                label={t('family.invite_email.desc')}
                className='family__invite-email-input'
              />
            </div>
            <div className='family__invite-email-button-wrap'>
              <Button
                type='submit'
                color='secondary'
                size='lg'
                className='family__invite-email-button'
              >
                {t('family.invite_email.button')}
              </Button>
            </div>
          </form>
          <div>
            <h2 className='family__title'>{t('family.invite.title')}</h2>
            <div className='family__user'>
              <span className='family__user-name'>
                {`${userInfo.name} ${userInfo.surname}`}
              </span>
              {t('common.you')}
            </div>
            <div className='family__list'>
              <div className='family__list-item'>
                <div className='family__list-item-media'>
                  <img
                    src='https://fitstg.s3.eu-central-1.amazonaws.com/anna_t.png'
                    alt=''
                  />
                </div>
                <div className='family__list-item-desc'>
                  <div className='family__list-item-desc-name'>
                    Gabriel Martinez
                  </div>
                  <a
                    href='mailto:gabi34555@gmail.com'
                    className='family__list-item-desc-email'
                  >
                    gabi34555@gmail.com
                  </a>
                  <div className='family__list-item-desc-way'>
                    {t('family.link_sent')}
                  </div>
                </div>
                <button type='button' className='family__list-item-close'>
                  <CloseIcon />
                </button>
              </div>
            </div>
            <div className='family__referral-button-wrap'>
              <Link to='/referral' className='family__referral-button-link'>
                <Button color='secondary'>{t('family.referral_page')}</Button>
              </Link>
            </div>
          </div>
        </div>
      </ProfileLayout>
    </>
  );
};

export default WithTranslate(connect(null)(SettingsFamilyView));
