import React from 'react';
import { getTranslate } from 'utils';
import moment from 'moment';
import classNames from 'classnames';

// Components
import LineChart from 'components/common/charts/LineChart';

import './DietExpectationsChart.sass';

import { data as chartData, options as chartOptions } from './expectationsChartConfig';

type ChartProps = {
  predictedDate: number;
  measurement: 'us' | 'si';
  weight: number;
  weightGoal: number;
  localePhrases: any;
};

const DietExpectationsChart = ({
  predictedDate,
  measurement,
  weight,
  weightGoal,
  localePhrases,
}: ChartProps) => {
  const t = (code: string, placeholders?: any) =>
    getTranslate(localePhrases, code, placeholders);

  const I18N_MEASUREMENT = measurement === 'si' ? 'common.kg' : 'common.lbs';

  const getShortDate = (dateStr: string) => {
    let monthLocale = new Date(dateStr).toLocaleString(window.navigator.language, { month: 'short' });
    monthLocale = monthLocale.charAt(0).toUpperCase() + monthLocale.slice(1);

    return `${moment(new Date(dateStr)).format('DD')} ${monthLocale}`;
  };

  const getChartLabels = () => ([
    moment(new Date()).format('MM.DD.YYYY'),
    moment(new Date()).format('MM.DD.YYYY'),
    moment(new Date(predictedDate * 1000)).format('MM.DD.YYYY'),
    moment(new Date(predictedDate * 1000)).format('MM.DD.YYYY'),
    moment(new Date(predictedDate * 1000)).format('MM.DD.YYYY'),
  ]);

  const getChartData = () => {
    let data = [];

    // imitate graph rising/falling
    if (weight > weightGoal) {
      data = [
        Number(weight),
        Number(weight),
        Number(weightGoal) / 2.2,
        Number(weightGoal) / 2.2,
        Number(weightGoal) / 2.2,
        Number(weightGoal) / 2.2,
        Math.max(Number(weightGoal), Number(weight)) * 1.7,
      ];
    } else {
      data = [
        Number(weight) * 1.22,
        Number(weight) * 1.22,
        Number(weightGoal) / 0.84,
        Number(weightGoal) / 0.84,
        Number(weightGoal) / 0.84,
        Number(weightGoal) / 0.84,
        Math.max(Number(weightGoal), Number(weight)) * 1.3,
      ];
    }

    return data;
  };

  const getChartCommonData = () => {
    let data = [];

    // imitate graph rising/falling
    if (weight > weightGoal) {
      data = [
        Number(weight) * 1.05,
        Number(weight) * 1.1,
        Number(weight) * 0.8,
        Number(weight) * 0.99,
        Number(weight) * 0.8,
      ];
    } else {
      data = [
        Number(weight) * 1.25,
        Number(weight) * 1.27,
        Number(weight) * 1.25,
        Number(weight) * 1.29,
        Number(weight) * 1.27,
      ];
    }

    return {
      ...chartData,
      labels: getChartLabels(),
      datasets: [{
        ...chartData.datasets[0],
        data: getChartData(),
      }, {
        borderColor: '#CDCDCD',
        borderWidth: 2,
        backgroundColor: 'transparent',
        data,
      }],
    };
  };

  const getChartCommonOptions = () => ({
    ...chartOptions,
    tooltips: {
      ...chartOptions.tooltips,
      callbacks: {
        title: (tooltipItem) => {
          if (tooltipItem.length > 0) {
            if (tooltipItem[0].datasetIndex > 0) {
              return null;
            }

            if (tooltipItem[0].index === 1) {
              return t('signup.chart_today.label');
            }

            if (tooltipItem[0].index === 3) {
              return getShortDate(tooltipItem[0].label);
            }

            return null;
          }

          return null;
        },
        label: (tooltipItem) => {
          if (tooltipItem.datasetIndex > 0) {
            return null;
          }

          if (tooltipItem.index === 1) {
            return t(I18N_MEASUREMENT, { COUNT: weight });
          }

          if (tooltipItem.index === 3) {
            return t(I18N_MEASUREMENT, { COUNT: weightGoal });
          }

          return null;
        },
      },
    },
  });

  const getPredictedDate = () => {
    let monthLocale = new Date(predictedDate * 1000).toLocaleString(window.navigator.language, { month: 'long' });
    monthLocale = monthLocale.charAt(0).toUpperCase() + monthLocale.slice(1);

    return `${monthLocale} ${moment(new Date(predictedDate * 1000)).format('DD')}`;
  };

  return (
    <div className='dietExpectation__chart_wrap'>
      <span
        className={classNames('dietExpectation__chart_standart-plan-label', {
          chart_raise: weight < weightGoal,
        })}
      >
        {t('signup.chart.standart_plan_label')}
      </span>

      <span
        className='dietExpectation__chart_fitlope-plan-label'
        dangerouslySetInnerHTML={{ __html: t('signup.chart.fitlope_plan_label') }}
      />

      <LineChart
        className='dietExpectation__chart'
        data={getChartCommonData()}
        options={getChartCommonOptions()}
      />
    </div>
  );
};

export default DietExpectationsChart;
