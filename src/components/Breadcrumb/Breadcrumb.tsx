import React from 'react';
import { Link } from 'react-router-dom';

import './Breadcrumb.sass';

type BreadcrumbProps = {
  routes?: Array<any>;
  currentPage: string;
};

const Breadcrumb = ({ routes, currentPage }: BreadcrumbProps) => (
  <div className='breadcrumb'>
    {routes?.map((route) => (
      <Link key={route.url} to={route.url} className='breadcrumb__link'>
        {route.name}
      </Link>
    ))}
    <span className='breadcrumb__current'>{currentPage}</span>
  </div>
);

export default Breadcrumb;
