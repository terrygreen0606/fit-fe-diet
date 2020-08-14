import React, { useEffect, useState, createRef } from 'react';

import Chart from 'chart.js';

const ProgressChart = () => {
  const [chartContainer] = useState(createRef<HTMLCanvasElement>());

  useEffect(() => {
    // eslint-disable-next-line no-new
    new Chart(chartContainer.current.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['', '', '', '', ''],
        datasets: [
          {
            data: [12, 19, 31, 17, 22],
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
      options: {
        scales: {
          yAxes: [
            {
              gridLines: {
                display: true,
                tickMarkLength: 4,
                borderDash: [4, 4],
                drawTicks: false,
              },
              ticks: {
                beginAtZero: true,
                fontColor: '#878787',
                fontSize: 10,
                padding: 15,
                callback() {
                  return '13.05';
                },
              },
            },
          ],
          xAxes: [
            {
              display: false,
            },
          ],
        },
        legend: {
          display: false,
        },
      },
    });
  });

  return <canvas ref={chartContainer} />;
};

export default ProgressChart;
