import React, { useEffect, useState, createRef } from 'react';

import Chart from 'chart.js';
import chartConfig from './chartConfig';

type LineChartProps = {
  options?: Object;
  data: Array<number>;
  labels: Array<any>;
};

const ProgressChart = ({
  options = chartConfig.options,
  data,
  labels,
}: LineChartProps) => {
  const [chartContainer] = useState(createRef<HTMLCanvasElement>());

  useEffect(() => {
    // eslint-disable-next-line no-new
    new Chart(chartContainer.current.getContext('2d'), {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: [
              '#106EE8',
              '#106EE8',
              '#106EE8',
              '#106EE8',
              '#106EE8',
            ],
            barPercentage: [0.12, 0.12, 0.12, 0.12, 0.12],
          },
        ],
      },
      options,
    });
  });

  return <canvas ref={chartContainer} />;
};

export default ProgressChart;
