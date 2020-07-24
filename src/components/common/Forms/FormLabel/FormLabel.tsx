import React from 'react';
import classNames from 'classnames';

import './FormLabel.sass';

const FormLabel = ({ invalid, size, ...props }: any) => (
  <label
    {...props}
    className={classNames("fgLabel", `size-${size}`, {
      "fgLabel_is_invalid": invalid
    })}
  />
);

export default FormLabel;
