import React from 'react';
import classNames from 'classnames';

import styles from './DropdownToggle.module.sass';

const DropdownToggle = (props: any) => (
	<div {...props} className={classNames("dropdownToggle", {
    [props.className]: props.className
  })} />
);

export default DropdownToggle;
