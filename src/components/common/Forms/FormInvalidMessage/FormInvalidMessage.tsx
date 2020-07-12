import React from 'react';

import './FormInvalidMessage.sass';

const FormInvalidMessage = (props: any) => (
  <div className="fgInvalidMsg">{props.children}</div>
);

export default FormInvalidMessage;
