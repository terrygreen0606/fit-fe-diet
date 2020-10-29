import React from 'react';
import classNames from 'classnames';
import { getTranslate } from 'utils';

// Components
import WithTranslate from 'components/hoc/WithTranslate';

import './ReviewsWidget.sass';

import { ReactComponent as ProofIcon } from 'assets/img/icons/proof-icon.svg';
import { ReactComponent as StarIcon } from 'assets/img/icons/star-yellow-icon.svg';

type ReviewsWidgetProps = {
  active: boolean;
  fadeAnimation: boolean;
  image: string;
  name: string;
  text: string;
  localePhrases: any;
};

const ReviewsWidget = ({
  active,
  fadeAnimation,
  image,
  name,
  text,
  localePhrases,
}: ReviewsWidgetProps) => {
  const t = (code: string) =>
    getTranslate(localePhrases, code);

  return (
    <div
      className={classNames('reviews-widget', {
        active,
        hide: fadeAnimation,
      })}
    >
      <div
        className='reviews-widget__media'
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
      </div>
      <div className='reviews-widget__text'>
        <div className='reviews-widget__text-name'>
          {name}
        </div>
        <div className='reviews-widget__text-desc'>
          {text}
        </div>
        <div className='reviews-widget__text-footer'>
          <div className='reviews-widget__text-footer-stars'>
            <div className='reviews-widget__text-footer-stars-item'>
              <StarIcon />
            </div>
            <div className='reviews-widget__text-footer-stars-item'>
              <StarIcon />
            </div>
            <div className='reviews-widget__text-footer-stars-item'>
              <StarIcon />
            </div>
            <div className='reviews-widget__text-footer-stars-item'>
              <StarIcon />
            </div>
            <div className='reviews-widget__text-footer-stars-item'>
              <StarIcon />
            </div>
          </div>
          <div className='reviews-widget__text-footer-proof'>
            <div className='reviews-widget__text-footer-proof-img'>
              <ProofIcon />
            </div>
            {t('checkout.proof_service')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithTranslate(ReviewsWidget);
