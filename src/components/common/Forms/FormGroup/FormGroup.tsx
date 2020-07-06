import React from 'react';
import classNames from 'classnames';

import styles from './FormGroup.module.sass';

const FormGroup = ({ children, className, inline }: any) => {
  return (
    <div className={classNames(styles.formGroup, {
      [className]: className,
      [styles.formGroup_inline]: inline
    })}>
      {children}
    </div>
  );
};

export default FormGroup;
