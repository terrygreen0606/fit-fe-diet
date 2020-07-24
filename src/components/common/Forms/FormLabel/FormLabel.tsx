import React from 'react';
import classNames from 'classnames';

import './FormLabel.sass';

const FormLabel = ({ invalid, ...props }: any) => (
  <label
    {...props}
    className={classNames("fgLabel", {
      "fgLabel_is_invalid": invalid
    })}
  />
);

export default FormLabel;
