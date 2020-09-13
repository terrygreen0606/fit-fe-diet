import React from 'react';
import classnames from 'classnames';

import { openShareLink } from 'utils';

import './ShareButtons.sass';

import { ReactComponent as TwitterLogo } from 'assets/img/icons/twitter-logo-icon.svg';
import { ReactComponent as FacebookLogo } from 'assets/img/icons/facebook-logo-icon.svg';
import { ReactComponent as WhatsappLogo } from 'assets/img/icons/whatsapp-logo-icon.svg';
import { ReactComponent as TelegramLogo } from 'assets/img/icons/telegram-logo-icon.svg';

type ShareButtonsProps = {
  shareLink: string;
  classes?: string;
};

const ShareButtons = ({ shareLink, classes }: ShareButtonsProps) => (
  <div className={classnames('share-buttons-list', classes)}>
    <button
      type='button'
      className='share-button'
      onClick={() => openShareLink(`https://twitter.com/intent/tweet?text=${shareLink}`)}
    >
      <TwitterLogo />
    </button>
    <button
      type='button'
      className='share-button'
      onClick={() => openShareLink(`https://www.facebook.com/sharer/sharer.php?u=${shareLink}`)}
    >
      <FacebookLogo />
    </button>
    <button
      type='button'
      className='share-button'
      onClick={() => openShareLink(`https://t.me/share/url?url=${shareLink}`)}
    >
      <TelegramLogo />
    </button>
    <button
      type='button'
      className='share-button'
      onClick={() => openShareLink(`https://wa.me/?text=${shareLink}`)}
    >
      <WhatsappLogo />
    </button>
  </div>
);

export default ShareButtons;
