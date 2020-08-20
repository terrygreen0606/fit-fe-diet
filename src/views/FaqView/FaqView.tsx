import React, { useState } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Helmet from 'react-helmet';

import { getTranslate } from 'utils';

// Components
import ProfileLayout from 'components/hoc/ProfileLayout';
import WithTranslate from 'components/hoc/WithTranslate';

import './FaqView.sass';

// Icons
import { ReactComponent as ArrowRight } from 'assets/img/icons/arrow-right-gray-icon.svg';

const FaqView = (props: any) => {
  const t = (code: string) => getTranslate(props.localePhrases, code);

  const [faqData, setFaqData] = useState([
    {
      id: 1,
      question: t('faq.question'),
      answerTitle: t('faq.answer.title'),
      answerDescription: t('faq.answer.description'),
      isOpen: false,
    },
    {
      id: 2,
      question: t('faq.question'),
      answerTitle: t('faq.answer.title'),
      answerDescription: t('faq.answer.description'),
      isOpen: false,
    },
  ]);

  return (
    <>
      <Helmet>
        <title>{t('app.title.faq')}</title>
      </Helmet>
      <ProfileLayout>
        <div className='faq'>
          <div className='faq__title'>{t('faq.title')}</div>
          <div className='faq__list'>
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
                    updatedFaqData[index].isOpen = !updatedFaqData[index].isOpen;
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
                  <div className='faq__item-answer-title'>{item.answerTitle}</div>
                  {item.answerDescription}
                </div>
              </div>
            ))}
          </div>
        </div>
      </ProfileLayout>
    </>
  );
};

export default WithTranslate(connect(null)(FaqView));
