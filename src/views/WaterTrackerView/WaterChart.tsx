import React, { useEffect, useRef, useState } from 'react';

import Chart from "chart.js";
import { chartConfig as chartConfig } from "./chartConfig";

const WaterChart = ( props ) => {
  // const data = props.data
  // const labels = props.labels
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  
  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

  // useEffect(() => {
  //   const updateDataset = (datasetIndex, newData) => {
  //     chartInstance.data.datasets[datasetIndex].data = newData;
  //     chartInstance.update();
  //   };
  //   updateDataset(0,[10,10,10,10])
  // },[])

  return (
    <canvas ref={chartContainer}></canvas>
  )
}

export default WaterChart;