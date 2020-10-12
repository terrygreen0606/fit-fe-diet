import React from 'react';
import classNames from 'classnames';

import './LinearProgress.sass';

type ProgressProps = {
  color: 'green' | 'blue';
};

const ProgressDefaultProps = {
  color: 'blue'
};

const LinearProgress = ({ color }: ProgressProps) => {
  return (
    <div className='linear-progress'>
      <div className={classNames('linear-progress-bar', `linear-progress-bar_${color}`)}></div>
    </div>
  );
};

LinearProgress.defaultProps = ProgressDefaultProps;

export default LinearProgress;
