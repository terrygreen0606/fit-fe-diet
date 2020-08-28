import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { getTranslate } from 'utils';

import WithTranslate from 'components/hoc/WithTranslate';
import Breadcrumb from 'components/Breadcrumb';

const MainView = (props: any) => {
  const t = (code: string) => getTranslate(props.localePhrases, code);

  return (
    <>
      <Helmet>
        <title>{t('app.title.main')}</title>
      </Helmet>
      <div className='container'>
        <Breadcrumb currentPage={t('breadcrumb.main')} />
      </div>
    </>
  );
};

export default WithTranslate(connect(null)(MainView));
