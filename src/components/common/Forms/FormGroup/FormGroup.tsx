import React from 'react';
import classNames from 'classnames';

import './FormGroup.sass';

const FormGroup = ({ children, className, inline }: any) => {
  return (
    <div className={classNames("formGroup", {
      [className]: className,
      "formGroup_inline": inline
    })}>
      {children}
    </div>
  );
};

export default FormGroup;
