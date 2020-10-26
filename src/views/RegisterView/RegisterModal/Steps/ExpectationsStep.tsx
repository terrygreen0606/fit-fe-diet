import React, { useEffect } from 'react';
import { getTranslate } from 'utils';
import moment from 'moment';

// Components
import LineChart from 'components/common/charts/LineChart';
import Button from 'components/common/Forms/Button';

import { data as chartData, options as chartOptions } from './expectationsChartConfig';

const ExpectationsStep = ({
  registerData,
  setRegisterView,
  stepTitlesDefault,
  setStepTitles,
  localePhrases,
}: any) => {
  const { weight, weight_goal, predicted_date } = registerData;
  const i18n_measurement = registerData.measurement === 'si' ? 'common.kg' : 'common.lbs';

  const t = (code: string, placeholders?: any) =>
    getTranslate(localePhrases, code, placeholders);

  useEffect(() => {
    const currStepTitles = [...stepTitlesDefault];
    currStepTitles[0] = t('register.step_workout');
    currStepTitles[1] = t('register.expect_step');
    currStepTitles[2] = t('register.step_confirm');

    setStepTitles([...currStepTitles]);

    return () => {
      setStepTitles([...stepTitlesDefault]);
    };
  }, []);

  const getShortDate = (dateStr: string) => {
    let monthLocale = new Date(dateStr).toLocaleString(window.navigator.language, { month: 'short' });
    monthLocale = monthLocale.charAt(0).toUpperCase() + monthLocale.slice(1);

    return `${moment(new Date(dateStr)).format('DD')} ${monthLocale}`;
  };

  const getChartLabels = () => ([
    moment(new Date()).format('MM.DD.YYYY'),
    moment(new Date()).format('MM.DD.YYYY'),
    moment(new Date(predicted_date * 1000)).format('MM.DD.YYYY'),
    moment(new Date(predicted_date * 1000)).format('MM.DD.YYYY'),
    moment(new Date(predicted_date * 1000)).format('MM.DD.YYYY'),
  ]);

  const getChartData = () => ([
    Number(weight),
    Number(weight),
    Number(weight_goal) / 2.2, // imitate graph rising/falling
    Number(weight_goal) / 2.2,
    Number(weight_goal) / 2.2,
    Number(weight_goal) / 2.2,
    Math.max(Number(weight_goal), Number(weight)) * 1.7,
  ]);

  const getChartCommonData = () => ({
    ...chartData,
    labels: getChartLabels(),
    datasets: [{
      ...chartData.datasets[0],
      data: getChartData(),
    }, {
      borderColor: '#CDCDCD',
      borderWidth: 2,
      backgroundColor: 'transparent',
      data: [
        Number(weight) * 1.05, // imitate graph rising/falling
        Number(weight) * 1.1,
        Number(weight) * 0.8,
        Number(weight) * 0.99,
        Number(weight) * 0.8,
      ],
    }],
  });

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
            return t(i18n_measurement, { COUNT: weight });
          }

          if (tooltipItem.index === 3) {
            return t(i18n_measurement, { COUNT: weight_goal });
          }

          return null;
        },
      },
    },
  });

  const getPredictedDate = () => {
    let monthLocale = new Date(predicted_date * 1000).toLocaleString(window.navigator.language, { month: 'long' });
    monthLocale = monthLocale.charAt(0).toUpperCase() + monthLocale.slice(1);

    return `${monthLocale} ${moment(new Date(predicted_date * 1000)).format('DD')}`;
  };

  return (
    <div className='text-center'>
      <h5 className='mb-xl-4 mb-2 fw-regular'>{t('register.expect_title')}</h5>

      <h4 className='mb-xl-5 mb-3 text-steel-blue'>
        {t(i18n_measurement, { COUNT: weight_goal })}
        {' '}
        {t('register.expect_date_by')}
        {' '}
        {getPredictedDate()}
      </h4>

      <div className='register_expectation_chart-wrap'>
        <span className='register_expectation_chart-standart-plan-label'>{t('signup.chart.standart_plan_label')}</span>
        <span
          className='register_expectation_chart-fitlope-plan-label'
          dangerouslySetInnerHTML={{ __html: t('signup.chart.fitlope_plan_label') }}
        />

        <LineChart
          className='register_expectation_chart'
          data={getChartCommonData()}
          options={getChartCommonOptions()}
        />
      </div>

      <div className='text-center mt-xl-5 mt-3'>
        <Button
          style={{ maxWidth: '355px' }}
          color='primary'
          type='submit'
          size='lg'
          block
          onClick={() => setRegisterView('JOIN')}
        >
          {t('button.continue')}
        </Button>
      </div>
    </div>
  );
};

export default ExpectationsStep;
