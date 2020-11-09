import React from 'react';
import classNames from 'classnames';

import './ProgressLine.sass';

type ProgressLineProps = {
  width: number;
  className?: string;
};

const ProgressLineDefaultProps = {
  className: null,
};

const ProgressLine = ({
  width,
  className,
}: ProgressLineProps) => {
  return (
    <div
      className={classNames('progress-line', {
        [className]: className,
      })}
    >
      <div
        className='progress-line__bar'
        style={{ width: `${width}%` }}
      >
        {width}
        %
      </div>
    </div>
  );
};

ProgressLine.defaultProps = ProgressLineDefaultProps;

export default ProgressLine;
