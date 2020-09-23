import React, { useEffect } from 'react';
import { getTranslate } from 'utils';
import moment from 'moment';

// Components
import LineChart from 'components/common/charts/LineChart';
import Button from 'components/common/Forms/Button';

import { data as chartData, options as chartOptions } from './expectationsChartConfig';

const ExpectationsStep = (props: any) => {

  const t = (code: string) => getTranslate(props.localePhrases, code);

  useEffect(() => {
    let currStepTitles = [...props.stepTitlesDefault];
    currStepTitles[0] = t('register.step_workout');
    currStepTitles[1] = t('register.expect_step');
    currStepTitles[2] = t('register.step_confirm');

    props.setStepTitles([...currStepTitles]);

    return () => {
      props.setStepTitles([...props.stepTitlesDefault]);
    };
  }, []);

  const getChartLabels = () => {
    const { predicted_date } = props.registerData;

    return [
      moment(new Date()).format('MM.DD.YYYY'), 
      moment(new Date()).format('MM.DD.YYYY'),
      moment(new Date(predicted_date * 1000)).format('MM.DD.YYYY'),
      moment(new Date(predicted_date * 1000)).format('MM.DD.YYYY'),
      moment(new Date(predicted_date * 1000)).format('MM.DD.YYYY')
    ];
  };

  const getChartData = () => {
    const { weight, weight_goal } = props.registerData;

    return [
      Number(weight), 
      Number(weight), 
      Number(weight) + (Number(weight_goal) - Number(weight)) / 2, 
      Number(weight_goal), 
      Number(weight_goal), 
      30, 
      Math.max(Number(weight_goal), Number(weight)) * 1.8
    ];
  };

  const getPredictedDate = () => {
    let monthLocale = new Date(predicted_date * 1000).toLocaleString(window.navigator.language, { month: 'long' });
    monthLocale = monthLocale.charAt(0).toUpperCase() + monthLocale.slice(1);

    return `${monthLocale} ${moment(new Date(predicted_date * 1000)).format('DD')}`;
  };

  const getShortDate = (dateStr: string) => {
    let monthLocale = new Date(dateStr).toLocaleString(window.navigator.language, { month: 'short' });
    monthLocale = monthLocale.charAt(0).toUpperCase() + monthLocale.slice(1);

    return `${moment(new Date(dateStr)).format('DD')} ${monthLocale}`;
  };

  const { weight, weight_goal, predicted_date } = props.registerData;

  return (
    <div className="text-center">
      <h5 className="mb-xl-4 mb-2 fw-regular">{t('register.expect_title')}</h5>

      <h4 className="mb-xl-5 mb-3 text-steel-blue">{weight_goal} {t('common.kg_label')} {t('register.expect_date_by')} {getPredictedDate()}</h4>

      <div className="register_expectation_chart">
        <LineChart 
          data={{
            ...chartData,
            labels: getChartLabels(),
            datasets: [{
              ...chartData.datasets[0],
              data: getChartData()
            }]
          }}
          options={{
            ...chartOptions,
            tooltips: {
              ...chartOptions.tooltips,
              callbacks: {
                title: function(tooltipItem, data) {
                  if (tooltipItem.length > 0) {
                    if (tooltipItem[0].index === 1 || tooltipItem[0].index === 3) {
                      return getShortDate(tooltipItem[0].label);
                    } else {
                      return null;
                    }
                  } else {
                    return null;
                  }
                },
                label: function(tooltipItem, data) {
                  if (tooltipItem.index === 1 || tooltipItem.index === 3) {
                    return `${tooltipItem.value} ${t('common.kg_label')}`;
                  } else {
                    return null;
                  }
                }
              },
            }
          }}
        />
      </div>

      <div className="text-center mt-xl-5 mt-3">
        <Button
          style={{ maxWidth: '355px' }}
          color="primary"
          type="submit"
          size="lg"
          block
          onClick={() => props.setRegisterView('JOIN')}
        >
          {t('button.continue')}
        </Button>
      </div>
    </div>
  );
};

export default ExpectationsStep;

