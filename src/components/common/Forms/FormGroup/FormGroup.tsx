import React from 'react';

import styles from './FormGroup.module.sass';

const FormGroup = ({ children, className }: any) => {
  return (
    <div className={`${styles.formGroup} ${className && className}`}>
      {children}
    </div>
  );
};

export default FormGroup;
