import React from 'react';
import classNames from 'classnames';

import styles from './FormLabel.module.sass';

const FormLabel = ({ invalid, ...props }: any) => (
  <label
    {...props}
    className={classNames(styles.fgLabel, {
      [styles.fgLabel_is_invalid]: invalid
    })}
  />
);

export default FormLabel;
