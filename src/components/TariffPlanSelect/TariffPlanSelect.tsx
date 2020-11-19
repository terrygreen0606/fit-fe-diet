import React, { useRef, useEffect } from 'react';
import classNames from 'classnames';
import { getTranslate } from 'utils';
import useWindowSize from 'components/hooks/useWindowSize';
import useDebounce from 'components/hooks/useDebounce';

import './TariffPlanSelect.sass';

type TariffType = {
  id: string;
  priceWeek: string;
  priceOldWeek: string;
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
  const { width: windowWidth } = useWindowSize();
  const debounceWindowWidth = useDebounce(windowWidth, 500);

  const t = (code: string, placeholders?: any) =>
    getTranslate(localePhrases, code, placeholders);

  const tariffPlanList = useRef(null);

  useEffect(() => {
    if (tariffPlanList.current && tariffPlanList.current?.children?.length > 0) {
      const pricesTextWrap = tariffPlanList?.current?.querySelectorAll('.tariff-plan__item-price') || [];
      const pricesText = tariffPlanList?.current?.querySelectorAll('.tariff-plan__item-price-now-count') || [];

      const checkingElements = [];

      for (let i = 0; i < pricesTextWrap.length; i++) {
        checkingElements.push({
          parent: pricesTextWrap[i],
          child: pricesText[i],
        });
      }

      checkingElements.forEach((item) => {
        if (item?.child?.innerText) {
          for (let i = 1; item.child.clientWidth < item.parent.clientWidth; i++) {
            if (debounceWindowWidth <= 400 && 16 + i > 30) {
              item.child.style.fontSize = `${30}px`;
              break;
            }

            item.child.style.fontSize = `${16 + i}px`;
            if (item.child.clientWidth >= item.parent.clientWidth) {
              item.child.style.fontSize = `${16 + i - 1}px`;
              break;
            }
          }
        }
      });
    }
  }, [tariffPlanList.current?.children?.length, debounceWindowWidth]);

  return (
    <div className='tariff-plan__list' ref={tariffPlanList}>
      {tariffs.map(({
        id,
        months,
        priceWeek,
        priceOldWeek,
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
                <div className='tariff-plan__item-price-old'>
                  {`${priceOldWeek} / ${t('common.week').toLowerCase()}`}
                </div>

                <div className='tariff-plan__item-price-now'>
                  <div className='tariff-plan__item-price-now-count-wrap'>
                    <div className='tariff-plan__item-price-now-count'>{priceWeek}</div>
                  </div>
                </div>

                <div className='tariff-plan__item-price-together'>
                  {t('common.paycycle_period', { PERIOD: t('common.week').toLowerCase() })}
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
