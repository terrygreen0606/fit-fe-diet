import React, { useRef, useEffect } from 'react';
import classNames from 'classnames';
import { getTranslate } from 'utils';
import useWindowSize from 'components/hooks/useWindowSize';
import useDebounce from 'components/hooks/useDebounce';

import './TariffPlanSelect.sass';

type TariffPlanSelectProps = {
  tariffs: any[];
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

      checkingElements.forEach((item, itemIndex) => {
        if (item?.child?.innerText) {
          for (let i = 1; item.child.clientWidth < item.parent.clientWidth; i++) {
            if (debounceWindowWidth >= 1200 && 16 + i > 40) {
              if (itemIndex === 1 && 16 + i > 46) {
                item.child.style.fontSize = `${46}px`;
              } else {
                item.child.style.fontSize = `${40}px`;
              }

              break;
            }

            if (debounceWindowWidth < 1200 && 16 + i > 36) {
              item.child.style.fontSize = `${36}px`;
              break;
            }

            if (debounceWindowWidth < 992 && 16 + i > 28) {
              item.child.style.fontSize = `${28}px`;
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

  const getTariffValue = (tariffId, fieldKey) => {
    let tariffValue = '';

    const tariffSelected = tariffs.find(({ tariff }) => tariff === tariffId);

    if (tariffSelected?.country === 'br' || true) {
      const fieldKeyInstallments = fieldKey === 'months' ? 'parts' : fieldKey;
      tariffValue = tariffSelected?.installments?.[fieldKeyInstallments] || '';
    } else {
      tariffValue = tariffSelected?.[fieldKey] || '';
    }

    return tariffValue;
  };

  return (
    <div
      className={classNames('tariff-plan__list', {
        not_selected: !value,
      })}
      ref={tariffPlanList}
    >
      {tariffs.map(({ tariff }, tariffIndex) => (
        <label key={tariff} className='tariff-plan__item-label'>
          <input
            type='radio'
            className='tariff-plan__item-label-input'
            name='tariff_plan_radio'
            value={tariff}
            checked={value === tariff}
            onChange={(e) => onChange(e.target.value)}
          />

          <div
            className={classNames('tariff-plan__item', {
              'special-offer': specialOfferIndex === tariffIndex,
            })}
          >
            <div className='tariff-plan__item-radio__wrap'>
              <div className='tariff-plan__item-radio' />
            </div>

            <div className='tariff-plan__item-text'>
              <h3 className='tariff-plan__item-text-title'>
                {t('checkout.plan_title', { COUNT: getTariffValue(tariff, 'months') })}
              </h3>
              <div className='tariff-plan__item-text-desc'>
                {t('checkout.plan_descr', { COUNT: getTariffValue(tariff, 'months') })}
              </div>
            </div>

            <div className='tariff-plan__item-price'>
              <div className='tariff-plan__item-price-old'>
                {`${getTariffValue(tariff, 'price_old_weekly_text')} / ${t('common.week').toLowerCase()}`}
              </div>

              <div className='tariff-plan__item-price-now'>
                <div className='tariff-plan__item-price-now-count-wrap'>
                  <div className='tariff-plan__item-price-now-count'>
                    {getTariffValue(tariff, 'price_weekly_text')}
                   </div>
                </div>
              </div>

              <div className='tariff-plan__item-price-together'>
                {t('common.paycycle_period', { PERIOD: t('common.week').toLowerCase() })}
              </div>
            </div>

            {specialOfferIndex === tariffIndex && (
              <div className='tariff-plan__item-sale'>
                {t('checkout.plan.special_offer.label')}
              </div>
            )}
          </div>
        </label>
      ))}
    </div>
  );
};

TariffPlanSelect.defaultProps = TariffPlanSelectDefaultProps;

export default TariffPlanSelect;
