import React, { useEffect, useState, createRef } from 'react';

import Chart from "chart.js";
import { chartConfig as chartConfig } from "./chartConfig";

type LineChartProps = {
  options?: any,
  data: any
};

const WaterChart = ({ options = chartConfig.options, data }: LineChartProps) => {

  const [chartContainer] = useState(createRef<HTMLCanvasElement>());

  useEffect(() => {
    new Chart(chartContainer.current.getContext('2d'),
      {
        type: 'line',
        data: data,
        options
      }
    );
  }, [data]);

  return (
    <canvas ref={chartContainer} />
  )
}

export default WaterChart;