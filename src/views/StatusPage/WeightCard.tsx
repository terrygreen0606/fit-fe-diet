import React from 'react';
import classnames from 'classnames';

import { getTranslate } from 'utils';
import {
  bmiStatus,
  OVERWEIGHT,
  NORMAL,
  UNDERWEIGHT,
} from 'constants/bmiStatus';

import WithTranslate from 'components/hoc/WithTranslate';

const WeightCard = ({ localePhrases, bmiValue }: any) => {
  const t = (code: string, placeholders?: any) =>
    getTranslate(localePhrases, code, placeholders);

  const overweightClasses = classnames({
    'abnormal-weight-active': bmiStatus(bmiValue) === OVERWEIGHT,
    'over-weight-active': bmiStatus(bmiValue) === OVERWEIGHT,
  });
  const normalWeightClasses = classnames({ 'normal-weight-active': bmiStatus(bmiValue) === NORMAL });
  const underweightClasses = classnames({
    'abnormal-weight-active': bmiStatus(bmiValue) === UNDERWEIGHT,
    'under-weight-active': bmiStatus(bmiValue) === OVERWEIGHT,
  });

  const bmi = (
    <h1 className='m-0 text-left'>
      <p className='value m-0'>{bmiValue}</p>
      <p className='bmi-name m-0'>{t('status.bmichar.subtitle')}</p>
    </h1>
  );

  return (
    <div className='status-card weight-summary mt-1 mr-2 mb-3'>
      <div className={`weight-section ${overweightClasses}`}>
        {bmiStatus(bmiValue) === OVERWEIGHT && bmi}
        <span>{t('status.overweight.subtitle')}</span>
      </div>
      <div className={`weight-section normal-weight-section ${normalWeightClasses}`}>
        {bmiStatus(bmiValue) === NORMAL && bmi}
        <span>{t('status.normal.subtitle')}</span>
      </div>
      <div className={`weight-section ${underweightClasses}`}>
        {bmiStatus(bmiValue) === UNDERWEIGHT && bmi}
        <span>{t('status.underweight.subtitle')}</span>
      </div>
    </div>
  );
};

export default WithTranslate(WeightCard);
