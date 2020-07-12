import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import './FullPageLoader.sass';

const FullPageLoader = () => (
  <div className="pageLoader">
    <FontAwesomeIcon icon={faSpinner} spin size="4x" />
  </div>
);

export default FullPageLoader;
