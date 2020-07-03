import React from 'react';
import classNames from 'classnames';

import styles from './Modal.module.sass';

const Footer = ({ children, className }) => {
  return (
    <footer className={classNames(styles.dialogFooter, {
      [className]: className
    })}>
      <div className={styles.dialogFooterBtns}>
        {children}
      </div>
    </footer>
  );
};

export default Footer;
