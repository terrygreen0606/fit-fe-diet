import React from 'react';
import { connect } from 'react-redux';
import { getTranslate, getLocaleByLang } from 'utils';
import moment from 'moment';
import classNames from 'classnames';

// Components
import LineChart from 'components/common/charts/LineChart';

import './DietExpectationsChart.sass';

import { data as chartData, options as chartOptions } from './expectationsChartConfig';

type ChartProps = {
  color?: 'orange' | 'blue' | string;
  predictedDate: number;
  measurement: 'us' | 'si';
  weight: number;
  weightGoal: number;
  localePhrases: any;
  language: any;
};

const ChartPropsDefault = {
  color: 'orange',
};

const DietExpectationsChart = ({
  color,
  predictedDate,
  measurement,
  weight,
  weightGoal,
  localePhrases,
  language,
}: ChartProps) => {
  const t = (code: string, placeholders?: any) =>
    getTranslate(localePhrases, code, placeholders);

  const I18N_MEASUREMENT = measurement === 'si' ? 'common.kg' : 'common.lbs';

  const getShortDate = (dateStr: string) => {
    let predictedDateFormatted = '';

    if (new Date(dateStr).getFullYear() === new Date().getFullYear()) {
      predictedDateFormatted = new Date(dateStr).toLocaleDateString(
        getLocaleByLang(language), { day: 'numeric', month: 'short' }
      );
    } else {
      predictedDateFormatted = new Date(dateStr).toLocaleDateString(
        getLocaleByLang(language), { day: 'numeric', month: 'short', year: 'numeric' }
      );
    }

    return predictedDateFormatted;
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

  const getChartColors = () => {
    let chartColors = {};

    switch (color) {
      case 'orange':
        chartColors = {
          pointBackgroundColor1: '#F5827D',
          pointBackgroundColor2: '#0FC1A1',
          pointBorderColor: '#fff',
          backgroundColor: '#FFEBB4',
          borderColor: '#106EE8',
        };
        break;

      case 'blue':
        chartColors = {
          pointBackgroundColor1: '#F5827D',
          pointBackgroundColor2: '#0FC1A1',
          pointBorderColor: '#fff',
          backgroundColor: '#106EE8',
          borderColor: '#106EE8',
        };
        break;

      default:
        chartColors = {
          pointBackgroundColor1: '#F5827D',
          pointBackgroundColor2: '#0FC1A1',
          pointBorderColor: '#fff',
          backgroundColor: '#FFEBB4',
          borderColor: '#106EE8',
        };
    }

    return chartColors;
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

    const chartCommonData = chartData(getChartColors());

    return {
      ...chartCommonData,
      labels: getChartLabels(),
      datasets: [{
        ...chartCommonData.datasets[0],
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

  return (
    <div
      className={classNames('dietExpectation__chart_wrap', {
        chart_raise: weight < weightGoal,
      })}
    >
      <span
        className={classNames('dietExpectation__chart_standart-plan-label', {
          chart_raise: weight < weightGoal,
        })}
      >
        {t('signup.chart.standart_plan_label')}
      </span>

      <span
        className={classNames('dietExpectation__chart_fitlope-plan-label', `color_${color}`)}
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

DietExpectationsChart.defaultProps = ChartPropsDefault;

export default connect(
  (state: any) => ({
    language: state.settings.language,
  }),
)(DietExpectationsChart);
