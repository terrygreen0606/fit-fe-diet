import React, { useState } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Helmet from 'react-helmet';

import { routes } from 'constants/routes';
import { getTranslate } from 'utils';

// Components
import ProfileLayout from 'components/hoc/ProfileLayout';
import WithTranslate from 'components/hoc/WithTranslate';
import Breadcrumb from 'components/Breadcrumb';
import Accordeon from 'components/common/Accordeon';

import './SettingsFaqView.sass';

// Icons
import { ReactComponent as ArrowRight } from 'assets/img/icons/arrow-right-gray-icon.svg';

const SettingsFaqView = (props: any) => {
  const t = (code: string) => getTranslate(props.localePhrases, code);

  const [faqData, setFaqData] = useState([
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
          <div className='faq__title'>{t('faq.title')}</div>
          <Accordeon
            items={faqData}
          />
          {/* <div className='faq__list'>
            {faqData.map((item, index) => (
              <div
                key={item.id}
                className={classnames('faq__item card-bg', {
                  active: item.isOpen,
                })}
              >
                <button
                  type='button'
                  className='faq__item-question'
                  onClick={() => {
                    const updatedFaqData = [...faqData];
                    updatedFaqData[index].isOpen = !updatedFaqData[index]
                      .isOpen;
                    setFaqData(updatedFaqData);
                  }}
                >
                  <span className='faq__item-question-description'>
                    {item.question}
                  </span>
                  <div className='faq__item-question-arrow'>
                    <ArrowRight />
                  </div>
                </button>
                <div className='faq__item-answer'>
                  <div className='faq__item-answer-title'>
                    {item.answerTitle}
                  </div>
                  {item.answerDescription}
                </div>
              </div>
            ))}
          </div> */}
        </div>
      </ProfileLayout>
    </>
  );
};

export default WithTranslate(connect(null)(SettingsFaqView));
