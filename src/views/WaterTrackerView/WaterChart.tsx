import React, { useEffect, useState, createRef } from 'react';

import Chart from "chart.js";
import { chartConfig as chartConfig } from "./chartConfig";

type LineChartProps = {
  options?: any,
  labels: any,
  data: any
};

const WaterChart = ({ options = chartConfig.options, data, labels }: LineChartProps) => {

  const [chartContainer] = useState(createRef<HTMLCanvasElement>());

  useEffect(() => {
    new Chart(chartContainer.current.getContext('2d'),
      {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              data: data,
              backgroundColor: ["rgba(255, 255, 255, 0)"],
              borderWidth: 2,
              pointBackgroundColor: "#3283EB",
              pointBorderColor: '#fff',
              pointHoverRadius: 10,
            }
          ]
        },
        options
      }
    );
  }, [data,labels]);

  return (
    <canvas ref={chartContainer} />
  )
}

export default WaterChart;