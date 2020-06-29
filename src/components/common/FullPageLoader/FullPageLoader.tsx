import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import styles from './FullPageLoader.module.sass';

const FullPageLoader = () => (
  <div className={styles.pageLoader}>
    <FontAwesomeIcon icon={faSpinner} spin size="4x" />
  </div>
);

export default FullPageLoader;
