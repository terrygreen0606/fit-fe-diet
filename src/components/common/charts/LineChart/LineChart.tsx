import React, { useState, useEffect, createRef } from 'react';
import Chart from 'chart.js';

import './LineChart.sass';

const optionsDefault = {
  scales: {
    xAxes: [{
      gridLines: {
        borderDash: [8, 4],
      },
      ticks: {
        stepSize: 15,
        fontSize: 14,
      },
    }],
    yAxes: [{
      gridLines: {
        borderDash: [8, 4],
      },
      ticks: {
        stepSize: 55,
        fontSize: 14,
      },
    }],
  },
};

type LineChartProps = {
  options?: any,
  data: any
};

const LineChart = ({ options = optionsDefault, data }: LineChartProps) => {
  const [chartRef] = useState(createRef<HTMLCanvasElement>());

  useEffect(() => {
    new Chart(chartRef.current.getContext('2d'), {
      type: 'line',
      data,
      options,
    });
  }, [data]);

  return (
    <canvas ref={chartRef} />
  );
};

export default LineChart;
