import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { getTranslate } from 'utils';

import WithTranslate from 'components/hoc/WithTranslate';

const NotFound = (props: any) => {
  const t = (code: string, placeholders?: any) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    getTranslate(props.localePhrases, code, placeholders);

  return (
    <>
      <Helmet>
        <title>{t('app.title.not_found')}</title>
      </Helmet>
      <h1 className='text-center'>404</h1>
    </>
  );
};

export default WithTranslate(connect(null)(NotFound));
