import React, { useEffect } from 'react';
import { getTranslate } from 'utils';
import moment from 'moment';

// Components
import LineChart from 'components/common/charts/LineChart';
import Button from 'components/common/Forms/Button';

const chartData = {
  labels: [],
  datasets: [
    {
      lineTension: 0.5,
      pointBackgroundColor: context => {
        const index = context.dataIndex;

        if (index === 1) {
          return '#F5827D';
        } else if (index === 3) {
          return '#0FC1A1';
        } else {
          return 'transparent';
        }
      },
      pointRadius: context => {
        const index = context.dataIndex;

        if (index === 1 || index === 3) {
          return 12;
        } else {
          return 0;
        }
      },
      pointBorderWidth: context => {
        const index = context.dataIndex;

        if (index === 1 || index === 3) {
          return 6;
        } else {
          return 0;
        }
      },
      pointBorderColor:'#fff',
      backgroundColor: '#FFEBB4',
      borderColor: '#FFBE00',
      borderWidth: 2,
      data: []
    }
  ],
};

const chartOptions = {
  legend: {
    display: false
  },
  scales: {
    yAxes: [{
      display: false,
    }],
    xAxes: [{
      display: false,

    }]
  },
  responsive: true
};

const ExpectationsStep = (props: any) => {

  useEffect(() => {
    let currStepTitles = [...props.stepTitlesDefault];
    currStepTitles[1] = 'Expectations';

    props.setStepTitles([...currStepTitles]);

    return () => {
      props.setStepTitles([...props.stepTitlesDefault]);
    };
  }, []);

  const t = (code: string) => getTranslate(props.localePhrases, code);

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
    return moment(new Date(predicted_date * 1000)).format('MMMM DD');
  };

  const { weight, weight_goal, predicted_date } = props.registerData;

  return (
    <div className="text-center">
      <h5 className="mb-4 fw-regular">Based on your answer, you'll be</h5>

      <h4 className="mb-5 text-steel-blue">{weight_goal} kg. by {getPredictedDate()}</h4>

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
          options={chartOptions}
        />
      </div>

      <div className="text-center mt-4">
        <Button
          style={{ width: '355px' }}
          color="secondary"
          type="submit"
          size="lg"
          onClick={() => props.setRegisterView('READY')}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ExpectationsStep;

