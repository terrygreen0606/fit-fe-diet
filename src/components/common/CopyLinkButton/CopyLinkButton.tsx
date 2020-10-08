import React, { useState } from 'react';

import {
  getTranslate,
  copyTextInBuffer,
} from 'utils';

// Components
import WithTranslate from 'components/hoc/WithTranslate';
import Button from '../Forms/Button';

import './CopyLinkButton.sass';

type CopyLinkButtonProps = {
  text: string,
  localePhrases: [],
};

const CopyLinkButton = ({
  localePhrases,
  text,
}: CopyLinkButtonProps) => {
  const t = (code: string) => getTranslate(localePhrases, code);

  const [isActiveCopiedBlock, setActiveCopiedBlock] = useState<boolean>(false);

  return (
    <div className='copy-link'>
      <Button
        type='button'
        className='copy-link__button'
        onClick={() => {
          copyTextInBuffer('.copy-link__button');
          setActiveCopiedBlock(true);
          setTimeout(() => {
            setActiveCopiedBlock(false);
          }, 2000);
        }}
      >
        {text}
      </Button>
      {isActiveCopiedBlock && (
        <div className='copy-link__copied'>
          {t('referral.copied')}
        </div>
      )}
    </div>
  );
};

export default WithTranslate((CopyLinkButton));
