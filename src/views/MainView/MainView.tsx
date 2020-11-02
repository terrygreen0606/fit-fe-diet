import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { getTranslate } from 'utils';

import WithTranslate from 'components/hoc/WithTranslate';

const MainView = (props: any) => {
  const t = (code: string) => getTranslate(props.localePhrases, code);

  return (
    <>
      <Helmet>
        <title>{t('app.title.main')}</title>
      </Helmet>
    </>
  );
};

export default WithTranslate(connect(null)(MainView));
