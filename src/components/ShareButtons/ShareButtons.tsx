/* eslint-disable no-shadow */
import React, { useState } from 'react';
import classnames from 'classnames';
import uuid from 'react-uuid';

import { openShareLink } from 'utils';

import './ShareButtons.sass';

import { ReactComponent as TwitterLogo } from 'assets/img/icons/twitter-logo-icon.svg';
import { ReactComponent as FacebookLogo } from 'assets/img/icons/facebook-logo-icon.svg';
import { ReactComponent as WhatsappLogo } from 'assets/img/icons/whatsapp-logo-icon.svg';
import { ReactComponent as TelegramLogo } from 'assets/img/icons/telegram-logo-icon.svg';
import { ReactComponent as PinterestLogo } from 'assets/img/icons/pinterest-logo-icon.svg';

type SocialType = 'twitter' | 'facebook' | 'telegram' | 'whatsapp' | 'pinterest';

type ShareButtonsProps = {
  shareLink?: string;
  shareText?: string,
  visible?: boolean,
  className?: string;
  disabled?: boolean,
  items?: SocialType[],
  fetchData?: () => Promise<any>,
};

const shareButtonsPropsDefault = {
  shareLink: '',
  shareText: '',
  visible: false,
  className: '',
  disabled: false,
  items: ['twitter', 'facebook', 'whatsapp', 'pinterest'],
  fetchData: null,
};

const ShareButtons = ({
  shareLink,
  shareText,
  visible,
  className,
  disabled,
  items,
  fetchData,
}: ShareButtonsProps) => {
  const [link, setLink] = useState<string>(null);
  const [text, setText] = useState<string>(null);

  const getImage = (item: string) => {
    switch (item) {
      case 'twitter':
        return <TwitterLogo />;
      case 'facebook':
        return <FacebookLogo />;
      case 'telegram':
        return <TelegramLogo />;
      case 'whatsapp':
        return <WhatsappLogo />;
      case 'pinterest':
        return <PinterestLogo />;
      default:
        break;
    }
  };

  const getLink = (item: string) => {
    switch (item) {
      case 'twitter':
        return (shareLink, shareText) => `https://twitter.com/intent/tweet?text=${shareLink}%20${shareText}`;
      case 'facebook':
        return (shareLink) => `https://www.facebook.com/sharer/sharer.php?u=${shareLink}`;
      case 'telegram':
        return (shareLink, shareText) => `https://t.me/share/url?url=${shareLink}&text=${shareText}`;
      case 'whatsapp':
        return (shareLink) => `https://wa.me/?text=${shareLink}`;
      case 'pinterest':
        return () => 'https://www.pinterest.com/pin/create/button/';
      default:
        break;
    }
  };

  const onClick = (item) => {
    if (fetchData) {
      if (!text && !link) {
        fetchData().then((response) => {
          if (!response.text) response.text = '';
          setLink(response.link);
          setText(response.text);
          openShareLink(getLink(item)(response.link, response.text));
        });
      } else {
        openShareLink(getLink(item)(link, text));
      }
      return;
    }
    openShareLink(getLink(item)(shareLink, shareText));
  };

  return (
    <div className={classnames('share-buttons-list', className, {
      visible,
    })}
    >
      {items.map((item) => (
        <button
          key={uuid()}
          type='button'
          className='share-button'
          disabled={disabled}
          onClick={() => onClick(item)}
        >
          {getImage(item)}
        </button>
      ))}
    </div>
  );
};

ShareButtons.defaultProps = shareButtonsPropsDefault;

export default ShareButtons;
