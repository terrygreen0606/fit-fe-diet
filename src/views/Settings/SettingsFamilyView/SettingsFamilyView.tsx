import React from 'react';

// Components
import InputField from 'components/common/Forms/InputField';
import ProfileLayout from 'components/hoc/ProfileLayout';
import Button from 'components/common/Forms/Button';

import './SettingsFamilyView.sass';

// Icons
import { ReactComponent as CloseIcon } from 'assets/img/icons/close-icon.svg';

const SettingsFamilyView = () => {
  return (
    <>
      <ProfileLayout>
        <div className='family card-bg'>
          <h2 className='family__title'>Invite your friends</h2>
          <div className='family__invite-link'>
            <p className='family__invite-link-desc'>
              Copy the link and send it to person you want to invite
            </p>
            <InputField
              disabled
              value='http://website.com/invite/famoly/?token'
              className='family__invite-link-input'
            />
          </div>
          <div className='family__separator'>
            <span className='family__separator-text'>or</span>
          </div>
          <div className='family__invite-email'>
            <div className='family__invite-email-input-wrap'>
              <InputField
                label='Invite with email'
                className='family__invite-email-input'
              />
            </div>
            <div className='family__invite-email-button-wrap'>
              <Button
                color='secondary'
                size='lg'
                className='family__invite-email-button'
              >
                Send
              </Button>
            </div>
          </div>
          <div>
            <h2 className='family__title'>Invite your family</h2>
            <div className='family__user'>
              <span className='family__user-name'>Viktory Mayer</span>
              You
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
                  <div className='family__list-item-desc-way'>Link sent</div>
                </div>
                <button type='button' className='family__list-item-close'>
                  <CloseIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </ProfileLayout>
    </>
  );
};

export default SettingsFamilyView;
