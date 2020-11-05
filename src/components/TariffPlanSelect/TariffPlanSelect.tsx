import React from 'react';
import classNames from 'classnames';
import { getTranslate } from 'utils';

import './TariffPlanSelect.sass';

type TariffType = {
  id: string;
  priceMonth: string;
  priceOldMonth: string;
  price: string;
  months: string;
};

type TariffPlanSelectProps = {
  tariffs: TariffType[];
  onChange: (any) => void;
  value: string;
  specialOfferIndex?: number;
  localePhrases: any;
};

const TariffPlanSelectDefaultProps = {
  specialOfferIndex: null,
};

const TariffPlanSelect = ({
  tariffs,
  onChange,
  value,
  specialOfferIndex,
  localePhrases,
}: TariffPlanSelectProps) => {
  const t = (code: string, placeholders?: any) =>
    getTranslate(localePhrases, code, placeholders);

  return (
    <div className='tariff-plan__list'>
      {tariffs.map(({
        id,
        months,
        price,
        priceMonth,
        priceOldMonth,
      }, tariffIndex) => (
        <label key={id} className='tariff-plan__item-label'>
          <input
            type='radio'
            className='tariff-plan__item-label-input'
            name='tariff_plan_radio'
            value={id}
            checked={value === id}
            onChange={(e) => onChange(e.target.value)}
          />

          <div
            className={classNames('tariff-plan__item', {
              'special-offer': specialOfferIndex === tariffIndex,
            })}
          >
            <div className='tariff-plan__item-radio' />

            <div className='tariff-plan__item-text'>
              <h3 className='tariff-plan__item-text-title'>{t('checkout.plan_title', { COUNT: months })}</h3>
              <div className='tariff-plan__item-text-desc'>{t('checkout.plan_descr', { COUNT: months })}</div>
            </div>

            <div className='tariff-plan__item-price'>
              <div className='tariff-plan__item-price-old'>{priceOldMonth}</div>

              <div className='tariff-plan__item-price-now'>
                <div className='tariff-plan__item-price-now-count-wrap'>
                  <div className='tariff-plan__item-price-now-count'>{priceMonth}</div>
                </div>

                <div className='tariff-plan__item-price-now-paycycle-wrap'>
                  <div className='tariff-plan__item-price-now-paycycle'>{t('common.months_reduction')}</div>
                </div>
              </div>

              <div className='tariff-plan__item-price-together'>
                {t('checkout.plan.total_price', { AMOUNT: price })}
              </div>
            </div>

            {specialOfferIndex === tariffIndex && (
              <div className='tariff-plan__item-sale'>{t('checkout.plan.special_offer.label')}</div>
            )}
          </div>
        </label>
      ))}
    </div>
  );
};

TariffPlanSelect.defaultProps = TariffPlanSelectDefaultProps;

export default TariffPlanSelect;