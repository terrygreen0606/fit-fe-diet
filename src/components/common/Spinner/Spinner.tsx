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

const Spinner = (props: SpinnerProps) => (
	<FontAwesomeIcon 
		className={classNames('spinnerLoader', {
      [props.className]: props.className
    })} 
    style={{ width: `${props.width && props.width}px`, height: `${props.height && props.height}px` }}
    color={props.color && props.color}
		icon={faCircleNotch} 
		spin
	/>
);

export default Spinner;
