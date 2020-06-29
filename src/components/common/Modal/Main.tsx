import React from 'react';

import styles from './Modal.module.sass';

type Props = {
  children: any
}

const Main = (props: Props) => {
  const {
    children
  } = props;
  return (
    <div className={styles.dialogMain}>
      {children}
    </div>
  );
};

export default Main;
