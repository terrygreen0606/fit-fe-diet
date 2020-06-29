import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import styles from './PageLoader.module.sass';

const PageLoader = (props: any) => (
  <div {...props} className={`${styles.pageLoader} ${props.classname ? props.classname : ''}`}>
  	<FontAwesomeIcon icon={faCircleNotch} spin size="2x" />
  </div>
);

export default PageLoader;
