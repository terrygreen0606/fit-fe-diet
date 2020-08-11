import React from 'react';
import classNames from 'classnames';

import styles from './DropdownToggle.module.sass';

const DropdownToggle = ({ className, ...props }: any) => (
  <div
    {...props}
    className={classNames('dropdownToggle', {
      [className]: className,
    })}
  />
);

export default DropdownToggle;
