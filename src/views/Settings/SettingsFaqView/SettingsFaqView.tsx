import React, { useState } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { routes } from 'constants/routes';
import { getTranslate } from 'utils';

// Components
import ProfileLayout from 'components/hoc/ProfileLayout';
import WithTranslate from 'components/hoc/WithTranslate';
import Breadcrumb from 'components/Breadcrumb';
import Accordeon from 'components/common/Accordeon';

import './SettingsFaqView.sass';

const SettingsFaqView = (props: any) => {
  const t = (code: string) => getTranslate(props.localePhrases, code);

  const [faqData] = useState([
    {
      id: 1,
      title: t('faq.question'),
      content: <div dangerouslySetInnerHTML={{ __html: t('faq.answer.description') }}></div>,
    },
    {
      id: 2,
      title: t('faq.question'),
      answerTitle: t('faq.answer.title'),
      content: <div dangerouslySetInnerHTML={{ __html: t('faq.answer.description') }}></div>,
    },
  ]);

  return (
    <>
      <Helmet>
        <title>{t('app.title.faq')}</title>
      </Helmet>
      <div className='container'>
        <Breadcrumb
          routes={[
            {
              url: routes.main,
              name: t('breadcrumb.main'),
            },
          ]}
          currentPage={t('app.title.faq')}
        />
      </div>
      <ProfileLayout>
        <div className='faq'>
          <h2 className='faq__title'>{t('faq.title')}</h2>
          <Accordeon
            items={faqData}
          />
        </div>
      </ProfileLayout>
    </>
  );
};

export default WithTranslate(connect(null)(SettingsFaqView));
