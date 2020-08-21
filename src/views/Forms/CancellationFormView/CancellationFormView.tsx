import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { getTranslate } from 'utils';

// Components
import CustomRadio from 'components/common/Forms/CustomRadio';
import InputField from 'components/common/Forms/InputField';
import Button from 'components/common/Forms/Button';
import WithTranslate from 'components/hoc/WithTranslate';

import './CancellationFormView.sass';

const CancellationFormView = (props: any) => {
  const t = (code: string) => getTranslate(props.localePhrases, code);

  return (
    <>
      <Helmet>
        <title>{t('cancellation.title')}</title>
      </Helmet>
      <div className='container'>
        <div className='cancellation-form'>
          <h2 className='cancellation-form__title'>
            <div className='cancellation-form__title-text'>
              {t('cancellation.title')}
            </div>
          </h2>
          <div className='cancellation-form__sub-title'>
            {t('cancellation.date_title')}
          </div>
          <div className='cancellation-form__sub-desc'>
            {t('cancellation.date_desc')}
          </div>
          <div className='cancellation-form__sub-title'>
            {t('cancellation.data_delation_title')}
          </div>
          <div className='cancellation-form__sub-desc'>
            {t('cancellation.data_delation_desc')}
          </div>
          <div className='cancellation-form__sub-title cancellation-form__sub-title_mt'>
            {t('cancellation.reason_title')}
          </div>
          <div className='cancellation-form__reasons-list'>
            <div className='cancellation-form__reasons-item'>
              <CustomRadio
                name='reason'
                className='cancellation-form__reasons-item-radio'
                label={t('cancellation.didnt_needs')}
              />
            </div>
            <div className='cancellation-form__reasons-item'>
              <CustomRadio
                name='reason'
                className='cancellation-form__reasons-item-radio'
                label={t('cancellation.another_service')}
              />
            </div>
            <div className='cancellation-form__reasons-item'>
              <CustomRadio
                name='reason'
                className='cancellation-form__reasons-item-radio'
                label={t('cancellation.difficult_set_up')}
              />
            </div>
            <div className='cancellation-form__reasons-item'>
              <CustomRadio
                name='reason'
                className='cancellation-form__reasons-item-radio'
                label={t('cancellation.high_price')}
              />
            </div>
            <div className='cancellation-form__reasons-item'>
              <CustomRadio
                name='reason'
                className='cancellation-form__reasons-item-radio'
                label={t('cancellation.dissatisfied_reliability')}
              />
            </div>
          </div>
          <div className='cancellation-form__feedback'>
            <div className='cancellation-form__sub-title'>
              {t('cancellation.feedback_title')}
            </div>
            <InputField
              type='textarea'
              rows={14}
              border='light'
              className='cancellation-form__feedback-input'
            />
            <div className='cancellation-form__feedback-button-wrap'>
              <Button color='secondary'>
                {t('cancellation.feedback_button')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WithTranslate(connect(null)(CancellationFormView));
