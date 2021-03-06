import React, { useRef, useEffect } from 'react';
import classNames from 'classnames';
import { getTranslate } from 'utils';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { routes } from 'constants/routes';
import { changeSetting as changeSettingAction } from 'store/actions';
import { PaymentFlowType } from 'types';
import useWindowSize from 'components/hooks/useWindowSize';
import useDebounce from 'components/hooks/useDebounce';

import './TariffPlanSelect.sass';

type TariffPlanSelectProps = {
  tariffs: any[];
  onChange: (any) => void;
  value: string;
  type?: PaymentFlowType;
  specialOfferIndex?: number;
  changeSettingAction: (string, any) => void,
  localePhrases: any;
};

const TariffPlanSelectDefaultProps: Partial<TariffPlanSelectProps> = {
  type: '1',
  specialOfferIndex: null,
};

const TariffPlanSelect = ({
  tariffs,
  onChange,
  value,
  type,
  specialOfferIndex,
  localePhrases,
  changeSettingAction: changeSetting,
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

    checkingElements.forEach((item) => {
      if (getItemWidth(item) > getItemMaxWidth(item)) {
        shouldChangeFontSize = true;
      }

      let initialPriceSize = 25;

      if (type === '3') {
        initialPriceSize = 40;
      }

      for (let i = 1; getItemWidth(item) > getItemMaxWidth(item); i++) {
        item.price.style.fontSize = `${initialPriceSize - i}px`;
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

    if (tariffSelected?.country === 'br' && tariffSelected?.installments) {
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

  const getPriceOldText = (tariff: any) => {
    let text = null;

    if (isBrazillianTariffs()) {
      if (getTariffValue(tariff, 'installments')) {
        text = `${getTariffValue(tariff, 'months')} x ${getTariffValue(tariff, 'price_old_monthly_text')}`;
      } else {
        text = `${getTariffValue(tariff, 'price_old_monthly_text')} / ${t('common.months')}`;
      }
    } else {
      text = `${getTariffValue(tariff, 'price_old_weekly_text')} / ${t('common.week')?.toLowerCase()}`;
    }

    return text;
  };

  const getPriceNowText = (tariff: any) => {
    let text = null;

    if (isBrazillianTariffs()) {
      if (getTariffValue(tariff, 'installments')) {
        text = `${getTariffValue(tariff, 'months')} x ${getTariffValue(tariff, 'price_monthly_text')}`;
      } else {
        text = `${getTariffValue(tariff, 'price_monthly_text')}`;
      }
    } else {
      text = `${getTariffValue(tariff, 'price_weekly_text')}`;
    }

    return text;
  };

  const getPriceLabel = (tariff: any) => {
    let text = null;

    if (isBrazillianTariffs()) {
      if (getTariffValue(tariff, 'installments')) {
        text = t(getPaycycleI18nCode(tariff));
      } else {
        text = t('common.months');
      }
    } else {
      text = t('common.paycycle_period', { PERIOD: t('common.week')?.toLowerCase() });
    }

    return text;
  };

  return (
    <div
      className={classNames('tariff-plan__list', {
        not_selected: !value,
      })}
      ref={tariffPlanList}
    >
      {getTariffsList().map(({ tariff, disabled }, tariffIndex) => (
        <label key={tariff} className='tariff-plan__item-label'>
          <input
            type='radio'
            className='tariff-plan__item-label-input'
            name='tariff_plan_radio'
            value={tariff}
            checked={value === tariff}
            disabled={disabled}
            onChange={(e) => onChange(e.target.value)}
          />

          <div
            className={classNames('tariff-plan__item', `type_${type}`, {
              'special-offer': specialOfferIndex === tariffIndex,
              size_lg: getTariffsList().length <= 2,
            })}
          >
            {specialOfferIndex === tariffIndex && type === '1' ? (
              <div className='ribbon ribbon-top-left'>
                <span>{t('checkout.plan.special_offer.label.type3')}</span>
              </div>
            ) : null}

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
                {getPriceOldText(tariff)}
              </div>

              <div className='tariff-plan__item-price-now'>
                <div className='tariff-plan__item-price-now-count-wrap'>
                  <div className='tariff-plan__item-price-now-count'>
                    {getPriceNowText(tariff)}
                  </div>
                </div>
              </div>

              <div className='tariff-plan__item-price-together'>
                {getPriceLabel(tariff)}
              </div>
            </div>

            {specialOfferIndex === tariffIndex && (
              <Link
                to={routes.checkout}
                className='link-raw'
                onClick={() => {
                  changeSetting('activeTariffIdToPay', tariff);
                }}
              >
                <div className='tariff-plan__item-sale'>
                  {t('checkout.plan.special_offer.label')}
                </div>
              </Link>
            )}
          </div>
        </label>
      ))}
    </div>
  );
};

TariffPlanSelect.defaultProps = TariffPlanSelectDefaultProps;

export default connect(
  null,
  { changeSettingAction },
)(TariffPlanSelect);
