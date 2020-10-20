import React, { useState, useEffect, useRef } from 'react';

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

  const bannerRef = useRef(null);
  const [isBannerActive, setIsBannerActive] = useState<boolean>(true);
  const [bannerStep, setBannerStep] = useState<number>(0);
  const [bannerAnimationClean, setBannerAnimationClean] = useState(null);

  useEffect(() => {
    clearTimeout(bannerAnimationClean);

    if (bannerRef.current) {
      bannerRef.current.classList.remove('fadeInOut');

      setTimeout(() => {
        bannerRef.current.classList.add('fadeInOut');
      }, 0);

      const timeout = setTimeout(() => {
        if (bannerRef.current) {
          bannerRef.current.classList.remove('fadeInOut');
        }
      }, 3000);

      setBannerAnimationClean(timeout);
    }
  }, [bannerStep]);

  return (
    isBannerActive && (
      <div ref={bannerRef} className='banner card-bg'>
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
