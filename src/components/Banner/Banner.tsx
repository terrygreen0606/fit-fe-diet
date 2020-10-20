import React, { useState } from 'react';

import { getTranslate } from 'utils';

import WithTranslate from 'components/hoc/WithTranslate';
import Button from 'components/common/Forms/Button';

import './Banner.sass';

type BannerProps = {
  items: [
    {
      title: string,
      desc: string,
      image: string,
    }
  ];
  localePhrases: [];
};

const Banner = ({
  items,
  localePhrases,
}: BannerProps) => {
  const t = (code: string, placeholders?: any) => getTranslate(
    localePhrases,
    code,
    placeholders,
  );

  const [isBannerActive, setIsBannerActive] = useState<boolean>(true);
  const [bannerStep, setBannerStep] = useState<number>(0);

  return (
    isBannerActive && (
      <div className='banner card-bg'>
        <div className='banner-text'>
          <div
            dangerouslySetInnerHTML={{ __html: t(items[bannerStep].title) }}
            className='banner-text-title'
          />
          <div className='banner-text-desc'>
            {t(items[bannerStep].desc)}
          </div>
        </div>
        <div
          style={{
            backgroundImage: `url(${items[bannerStep].image})`,
          }}
          className='banner-media'
        />
        <Button
          color='primary'
          className='banner-btn'
          onClick={() => {
            if (items.length - 1 === bannerStep) {
              setIsBannerActive(false);
              return;
            }
            setBannerStep((prev) => prev + 1);
          }}
        >
          {t('banner.next')}
        </Button>
        <button
          type='button'
          onClick={() => setIsBannerActive(false)}
          className='banner-btn-skip'
        >
          {t('common.skip')}
        </button>
      </div>
    )
  );
};

export default WithTranslate(Banner);
