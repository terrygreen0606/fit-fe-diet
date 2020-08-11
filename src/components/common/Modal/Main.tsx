import React from 'react';
import classNames from 'classnames';

import './Modal.sass';

const Main = ({ children, className }: any) => (
  <div className={classNames('dialogMain', {
    [className]: className,
  })}
  >
    {children}
  </div>
);

export default Main;
