import React from 'react';

import styles from './DropdownToggle.module.sass';

const DropdownToggle = (props: any) => (
	<div {...props} className={`${styles.dropdownToggle} ${props.className ? props.className : ''}`} />
);

export default DropdownToggle;
