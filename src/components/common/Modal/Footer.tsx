import React from 'react';

import styles from './Modal.module.sass';

type Props = {
  children: any
}

const Footer = (props: Props) => {
  const {
    children
  } = props;

  return (
    <footer className={styles.dialogFooter}>
      <div className={styles.dialogFooterBtns}>
        {children}
      </div>
    </footer>
  );
};

export default Footer;
