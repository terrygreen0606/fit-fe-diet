import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from 'constants/routes';

import './Logo.sass';

type LogoProps = {
  raw?: boolean;
};

const LogoDefaultProps = {
  raw: false,
};

const Logo = ({ raw }: LogoProps) => (
  <Link
    to={routes.main}
    className='mainHeader_logo'
    onClick={e => {
      if (raw) {
        e.preventDefault();
      }
    }}
  />
);

Logo.defaultProps = LogoDefaultProps;

export default Logo;
