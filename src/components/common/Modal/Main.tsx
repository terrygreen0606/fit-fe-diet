import React from 'react';
import classNames from 'classnames';

import styles from './Modal.module.sass';

const Main = ({ children, className }: any) => {
  return (
    <div className={classNames(styles.dialogMain, {
      [className]: className
    })}>
      {children}
    </div>
  );
};

export default Main;
