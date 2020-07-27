import React from 'react';
import './Chart.sass';

interface ChartProps {
  firstColor?: string,
  lastColor?: string,
  percent: number,
  id?: number,
}

const Chart = ({firstColor, lastColor, percent, id}: ChartProps) => {

  return (
    <svg className="chart" width="34" height="34" viewBox="0 0 34 34">
      <linearGradient id={`gradient-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
         <stop offset="0" stop-color={firstColor}></stop>
         <stop offset="100" stop-color={lastColor}></stop>
       </linearGradient>
      <circle className="chart__circle" cx="17" cy="17" r="16"></circle>
      <circle className="chart__circle-paint" cx="17" cy="17" r="16" stroke={`url(#gradient-${id})`} stroke-dasharray={`${percent} 100`}></circle>
    </svg>
  );
}

export default Chart;
