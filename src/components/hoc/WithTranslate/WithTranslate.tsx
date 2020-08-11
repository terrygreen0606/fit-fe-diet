import React from 'react';
import LocaleContext from 'utils/localeContext';

const WithTranslate = (Component) => (props) => (
  <LocaleContext.Consumer>
    {(phrases) => <Component {...props} localePhrases={phrases} />}
  </LocaleContext.Consumer>
);

export default WithTranslate;
