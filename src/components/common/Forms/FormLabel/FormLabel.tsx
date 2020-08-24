import React from 'react';
import classNames from 'classnames';

import './FormLabel.sass';

const FormLabel = ({ invalid, className, ...props }: any) => (
  <label
    {...props}
    className={classNames('fgLabel', className, {
      fgLabel_is_invalid: invalid,
    })}
  />
);

export default FormLabel;
