import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from 'constants/routes';

import './Logo.sass';

const Logo = () => (
  <Link to={routes.main} className='mainHeader_logo' />
);

export default Logo;
