import React, { useState, useEffect } from 'react';
import LocaleContext from 'utils/localeContext';

const Translate = ({ code }: { code: string }) => (
  <LocaleContext.Consumer>
    {phrases => phrases[code] || null}
  </LocaleContext.Consumer>
);

export default Translate;
