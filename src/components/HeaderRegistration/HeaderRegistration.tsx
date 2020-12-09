import React from 'react';

import { getTranslate } from 'utils';

// Components
import WithTranslate from 'components/hoc/WithTranslate';

import './HeaderRegistration.sass';

const HeaderRegistration = (props: any) => {
  const t = (code: string) => getTranslate(props.localePhrases, code);

  return (
    <header className='header-registration'>
      {t('register.headline')}
    </header>
  );
};

export default WithTranslate(HeaderRegistration);
