import React from 'react';
import classNames from 'classnames';

import './Modal.sass';

const Footer = ({ children, className }) => {
  return (
    <footer className={classNames("dialogFooter", {
      [className]: className
    })}>
      <div className="dialogFooterBtns">
        {children}
      </div>
    </footer>
  );
};

export default Footer;
