import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import './PageLoader.sass';

const PageLoader = (props: any) => {
  const { classname } = props;

  return (
    <div
      {...props}
      className={classNames('pageLoader', {
        [classname]: classname,
      })}
    >
      <FontAwesomeIcon icon={faCircleNotch} spin size="2x" />
    </div>
  );
};

export default PageLoader;
