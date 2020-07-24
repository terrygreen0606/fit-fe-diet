import React from 'react';
import LocaleContext from 'utils/localeContext';

const WithTranslate = Component => {
  return props => (
    <LocaleContext.Consumer>
      {phrases =>  <Component {...props} localePhrases={phrases} />}
    </LocaleContext.Consumer>
  );
};

export default WithTranslate
