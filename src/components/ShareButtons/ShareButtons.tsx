import React from 'react';
import classnames from 'classnames';

import { openShareLink } from 'utils';

import './ShareButtons.sass';

import { ReactComponent as TwitterLogo } from 'assets/img/icons/twitter-logo-icon.svg';
import { ReactComponent as FacebookLogo } from 'assets/img/icons/facebook-logo-icon.svg';
import { ReactComponent as WhatsappLogo } from 'assets/img/icons/whatsapp-logo-icon.svg';
import { ReactComponent as TelegramLogo } from 'assets/img/icons/telegram-logo-icon.svg';

type ShareButtonsProps = {
  shareLink?: string;
  shareText?: string,
  visible?: boolean,
  className?: string;
  disabled?: boolean,
  isTwitterActive?: boolean,
  isFacebookActive?: boolean,
  isTelegramActive?: boolean,
  isWhatsappActive?: boolean,
};

const shareButtonsPropsDefault = {
  shareLink: '',
  shareText: '',
  visible: false,
  className: '',
  disabled: false,
  isTwitterActive: true,
  isFacebookActive: true,
  isTelegramActive: true,
  isWhatsappActive: true,
};

const ShareButtons = ({
  shareLink,
  shareText,
  visible,
  className,
  disabled,
  isTwitterActive,
  isFacebookActive,
  isTelegramActive,
  isWhatsappActive,
}: ShareButtonsProps) => (
    <div className={classnames('share-buttons-list', className, {
      visible,
    })}
    >
      {isTwitterActive && (
        <button
          type='button'
          className='share-button'
          disabled={disabled}
          onClick={() => openShareLink(`https://twitter.com/intent/tweet?text=${shareLink}%20${shareText}`)}
        >
          <TwitterLogo />
        </button>
      )}
      {isFacebookActive && (
        <button
          type='button'
          className='share-button'
          disabled={disabled}
          onClick={() => openShareLink(`https://www.facebook.com/sharer/sharer.php?u=${shareLink}`)}
        >
          <FacebookLogo />
        </button>
      )}
      {isTelegramActive && (
        <button
          type='button'
          className='share-button'
          disabled={disabled}
          onClick={() => openShareLink(`https://t.me/share/url?url=${shareLink}&text=${shareText}`)}
        >
          <TelegramLogo />
        </button>
      )}
      {isWhatsappActive && (
        <button
          type='button'
          className='share-button'
          disabled={disabled}
          onClick={() => openShareLink(`https://wa.me/?text=${shareLink}`)}
        >
          <WhatsappLogo />
        </button>
      )}
    </div>
  );

ShareButtons.defaultProps = shareButtonsPropsDefault;

export default ShareButtons;
