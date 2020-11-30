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

  const syncTariffPriceFontSizes = () => {
    const pricesContainer = tariffPlanList?.current?.querySelectorAll('.tariff-plan__item') || [];
    const pricesRadio = tariffPlanList?.current?.querySelectorAll('.tariff-plan__item-radio__wrap') || [];
    const pricesDescr = tariffPlanList?.current?.querySelectorAll('.tariff-plan__item-text') || [];
    const pricesText = tariffPlanList?.current?.querySelectorAll('.tariff-plan__item-price-now-count') || [];

    const checkingElements = [];

    for (let i = 0; i < pricesContainer.length; i++) {
      checkingElements.push({
        container: pricesContainer[i],
        radio: pricesRadio[i],
        descr: pricesDescr[i],
        price: pricesText[i],
      });
    }

    const getItemWidth = (item) =>
      item?.radio?.clientWidth + item?.descr?.clientWidth + item?.price?.clientWidth;

    const getItemMaxWidth = (item) => {
      const computedStyle = getComputedStyle(item.container);
      return item?.container?.clientWidth -
        parseFloat(computedStyle?.paddingLeft) -
        parseFloat(computedStyle?.paddingRight);
    };

    let shouldChangeFontSize: boolean = false;

    checkingElements.forEach((item, itemIndex) => {
      if (getItemWidth(item) > getItemMaxWidth(item)) {
        shouldChangeFontSize = true;
      }

      for (let i = 1; getItemWidth(item) > getItemMaxWidth(item); i++) {
        item.price.style.fontSize = `${40 - i}px`;
      }
    });

    if (shouldChangeFontSize) {
      const minFonSize = Math.min(...checkingElements.map((item) => parseFloat(getComputedStyle(item.price).fontSize)));

      checkingElements.forEach(({ price }) => {
        price.style.fontSize = `${minFonSize}px`;
      });
    }
  };

  useEffect(() => {
    if (tariffPlanList.current && tariffPlanList.current?.children?.length > 0) {
      syncTariffPriceFontSizes();
    }
  }, [tariffPlanList.current?.children?.length, debounceWindowWidth]);

  const getTariffValue = (tariffId, fieldKey) => {
    let tariffValue = '';

    const tariffSelected = tariffs.find(({ tariff }) => tariff === tariffId);

    if (tariffSelected?.country === 'br') {
      let fieldKeyInstallments = '';

      switch (fieldKey) {
        case 'months':
          fieldKeyInstallments = 'parts';
          break;

        case 'price_old_weekly_text':
          fieldKeyInstallments = 'price_old_monthly_text';
          break;

        case 'price_weekly_text':
          fieldKeyInstallments = 'price_monthly_text';
          break;

        default:
          fieldKeyInstallments = fieldKey;
          break;
      }

      tariffValue = tariffSelected?.installments?.[fieldKeyInstallments] || '';
    } else {
      tariffValue = tariffSelected?.[fieldKey] || '';
    }

    return tariffValue;
  };

  const isBrazillianTariffs = () =>
    tariffs?.[0]?.country === 'br';

  const getPaycycleI18nCode = (tariffId) => {
    let paycycleI18nCode = '';

    if (tariffId === 'm3') {
      paycycleI18nCode = 'tariff.m3.paycycle';
    } else if (tariffId === 'm12') {
      paycycleI18nCode = 'tariff.m12.paycycle';
    }

    return paycycleI18nCode;
  };

  const getTariffsList = () => {
    if (isBrazillianTariffs()) {
      return tariffs.slice(0, 2);
    }

    return [...tariffs];
  };

  return (
    <div
      className={classNames('tariff-plan__list', {
        not_selected: !value,
      })}
      ref={tariffPlanList}
    >
      {getTariffsList().map(({ tariff }, tariffIndex) => (
        <label key={tariff} className='tariff-plan__item-label'>
          <input
            type='radio'
            className='tariff-plan__item-label-input'
            name='tariff_plan_radio'
            value={tariff}
            defaultChecked={value === tariff}
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

              {!isBrazillianTariffs() && (
                <div className='tariff-plan__item-text-desc'>
                  {t('checkout.plan_descr', { COUNT: getTariffValue(tariff, 'months') })}
                </div>
              )}
            </div>

            <div className='tariff-plan__item-price'>
              <div className='tariff-plan__item-price-old'>
                {isBrazillianTariffs()
                  ? `${getTariffValue(tariff, 'months')} x ${getTariffValue(tariff, 'price_old_weekly_text')}`
                  : `${getTariffValue(tariff, 'price_old_weekly_text')} / ${t('common.week').toLowerCase()}`}
              </div>

              <div className='tariff-plan__item-price-now'>
                <div className='tariff-plan__item-price-now-count-wrap'>
                  <div className='tariff-plan__item-price-now-count'>
                    {isBrazillianTariffs() && `${getTariffValue(tariff, 'months')} x `}
                    {getTariffValue(tariff, 'price_weekly_text')}
                  </div>
                </div>
              </div>

              <div className='tariff-plan__item-price-together'>
                {isBrazillianTariffs()
                  ? t(getPaycycleI18nCode(tariff))
                  : t('common.paycycle_period', { PERIOD: t('common.week').toLowerCase() })}
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
