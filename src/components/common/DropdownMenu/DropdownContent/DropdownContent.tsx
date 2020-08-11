import React from 'react';

import './DropdownContent.sass';

const DropdownContent = ({ className, ...props }: any) => (
  <div {...props} className={`dropdownContent ${className || ''}`} />
);

export default DropdownContent;
