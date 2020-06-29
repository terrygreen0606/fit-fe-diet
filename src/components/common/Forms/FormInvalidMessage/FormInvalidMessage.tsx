import React from 'react';

import styles from './FormInvalidMessage.module.sass';

const FormInvalidMessage = (props: any) => (
  <div className={styles.fgInvalidMsg}>{props.children}</div>
);

export default FormInvalidMessage;
