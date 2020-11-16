import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import './Spinner.sass';

type SpinnerProps = {
  size?: 'xs' | 'sm' | 'md' | 'lg'
  color?: string,
  className?: string;
};

const SpinnerDefaultProps = {
  size: 'sm',
  color: null,
  className: null,
};

const Spinner = ({
  size,
  color,
  className,
}: SpinnerProps) => {
  const getSpinnerSize = (spinnerSize: string) => {
    let spinSize = null;

    switch (spinnerSize) {
      case 'xs':
        spinSize = 18;
        break;

      case 'sm':
        spinSize = 25;
        break;

      case 'md':
        spinSize = 35;
        break;

      case 'lg':
        spinSize = 45;
        break;

      default:
        spinSize = 25;
    }

    return spinSize;
  };

  return (
    <FontAwesomeIcon
      className={classNames('spinnerLoader', {
        [className]: className,
      })}
      style={{ width: `${getSpinnerSize(size)}px`, height: `${getSpinnerSize(size)}px` }}
      color={color && color}
      icon={faCircleNotch}
      spin
    />
  );
};

Spinner.defaultProps = SpinnerDefaultProps;

export default Spinner;
