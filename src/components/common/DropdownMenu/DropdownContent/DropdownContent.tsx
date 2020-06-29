import React from 'react';

import './DropdownContent.sass';

const DropdownContent = (props: any) => (
	<div {...props} className={`dropdownContent ${props.className ? props.className : ''}`} />
);

export default DropdownContent;
