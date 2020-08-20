import React from 'react';
import classNames from 'classnames';

import './FormInvalidMessage.sass';

const FormInvalidMessage = ({ className, children }: any) => (
  <div className={classNames("fgInvalidMsg", {
    [className]: className
  })}>{children}</div>
);

export default FormInvalidMessage;
