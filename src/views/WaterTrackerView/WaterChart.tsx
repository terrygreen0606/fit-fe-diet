import React, { useEffect, useState, createRef } from 'react';

import Chart from "chart.js";
import { chartConfig as chartConfig } from "./chartConfig";

type LineChartProps = {
  options?: any,
  labels: any,
  data: any
};

const optionsDefault = chartConfig.options

const WaterChart = ({ options = optionsDefault, data, labels }: LineChartProps) => {

  const dataChart = {
    labels: labels,
    datasets: [
      {
        steppedLine: false,
        data: data,
        backgroundColor: ["rgba(255, 255, 255, 0)"],
        borderColor: ["rgba(188, 213, 247, 0.4)"],
        borderWidth: 3,
        pointBackgroundColor: "#3283EB",
        pointBorderWidth: 4,
        pointBorderColor: '#fff',
        pointHoverRadius: 10,
      }
    ]
  }

  const [chartContainer] = useState(createRef<HTMLCanvasElement>());

  useEffect(() => {
    new Chart(chartContainer.current.getContext('2d'),
      {
        type: 'line',
        data: dataChart,
        options
      }
    );
  }, [data, chartContainer]);

  return (
    <canvas ref={chartContainer} />
  )
}

export default WaterChart;