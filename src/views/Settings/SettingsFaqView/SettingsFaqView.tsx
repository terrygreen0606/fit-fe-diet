import React, { useState } from 'react';
import Helmet from 'react-helmet';
import uuid from 'react-uuid';

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
      id: uuid(),
      title: t('faq.question1'),
      content: <div dangerouslySetInnerHTML={{ __html: t('faq.answer1') }}></div>,
    },
    {
      id: uuid(),
      title: t('faq.question2'),
      content: <div dangerouslySetInnerHTML={{ __html: t('faq.answer2') }}></div>,
    },
    {
      id: uuid(),
      title: t('faq.question3'),
      content: <div dangerouslySetInnerHTML={{ __html: t('faq.answer3') }}></div>,
    },
    {
      id: uuid(),
      title: t('faq.question4'),
      content: <div dangerouslySetInnerHTML={{ __html: t('faq.answer4') }}></div>,
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

export default WithTranslate(SettingsFaqView);
