import React from 'react';
import classNames from 'classnames';
import uuid from 'react-uuid';

import './DonutChart.sass';

type DonutChartProps = {
  firstColor?: string,
  lastColor?: string,
  content?: any,
  className?: string,
  percent: number,
};

const DonutChart = (
  {
    firstColor = '#FBE54B',
    lastColor = '#FFBF6D',
    percent,
    className,
    content,
  }: DonutChartProps,
) => {
  const gradientId = uuid();

  return (
    <div className={classNames('donutChart_container', {
      [className]: className,
    })}
    >
      <div className="donutChart_content">{content}</div>

      <svg className="donutChart" width="34" height="34" viewBox="0 0 34 34">
        <linearGradient id={`gradient-${gradientId}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0" stopColor={firstColor} />
          <stop offset="100" stopColor={lastColor} />
        </linearGradient>
        <circle className="donutChart__circle" cx="17" cy="17" r="16" />
        <circle className="donutChart__circle-paint" cx="17" cy="17" r="16" stroke={`url(#gradient-${gradientId})`} strokeDasharray={`${percent} 100`} />
      </svg>
    </div>
  );
};

export default DonutChart;
