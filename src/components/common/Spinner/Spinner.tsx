import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import './Spinner.sass';

type SpinnerProps = {
  width?: number;
  height?: number;
  color?: string,
  className?: string;
};

const Spinner = ({
  width,
  height,
  color,
  className,
}: SpinnerProps) => (
  <FontAwesomeIcon
    className={classNames('spinnerLoader', {
      [className]: className,
    })}
    style={{ width: width && `${width}px`, height: height && `${height}px` }}
    color={color && color}
    icon={faCircleNotch}
    spin
  />
);

export default Spinner;
