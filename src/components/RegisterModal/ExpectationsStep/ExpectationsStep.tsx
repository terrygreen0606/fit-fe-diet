import React, { useEffect } from 'react';
import { getTranslate } from 'utils';

// Components
import LineChart from 'components/common/charts/LineChart';
import Button from 'components/common/Forms/Button';

const chartData = {
  labels: ['19.06.20', '19.06.20', '19.06.20', '19.06.20', '19.06.20'],
  datasets: [
    {
      label: 'Weight',
      lineTension: 0.5,
      pointRadius: 7,
      backgroundColor: '#FFEBB4',
      borderColor: '#5B9DFF',
      borderWidth: 2,
      data: [55, 57, 80, 81, 56],
    },
    {
      label: 'Purpose',
      lineTension: 0.5,
      pointRadius: 7,
      backgroundColor: '#FFEBB4',
      borderColor: '#CDFFD3',
      borderWidth: 2,
      data: [155, 47, 20, 231, 56],
    },
  ],
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

  return (
    <div className="text-center">
      <h5 className="mb-4 fw-regular">Based on your answer, you'll be</h5>

      <h4 className="mb-5 text-steel-blue">65 kg. by October 15</h4>

      <LineChart data={chartData} />

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

