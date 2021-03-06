import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { routes } from 'constants/routes';
import { getTranslate } from 'utils';

// Components
import CustomRadio from 'components/common/Forms/CustomRadio';
import InputField from 'components/common/Forms/InputField';
import Button from 'components/common/Forms/Button';
import WithTranslate from 'components/hoc/WithTranslate';
import Breadcrumb from 'components/Breadcrumb';

import './CancellationFormView.sass';

const CancellationFormView = (props: any) => {
  const t = (code: string) => getTranslate(props.localePhrases, code);

  return (
    <>
      <Helmet>
        <title>{t('cancellation.title')}</title>
      </Helmet>
      <div className='container'>
        <Breadcrumb
          routes={[
            {
              url: routes.main,
              name: t('breadcrumb.main'),
            },
          ]}
          currentPage={t('app.title.cancellation')}
        />
        <div className='cancellation-form'>
          <h2 className='sect-subtitle'>
            {t('cancellation.title')}
          </h2>
          <h2 className='cancellation-form__sub-title'>
            {t('cancellation.date.title')}
          </h2>
          <div className='cancellation-form__sub-desc'>
            {t('cancellation.date.desc')}
          </div>
          <h2 className='cancellation-form__sub-title'>
            {t('cancellation.deletion.title')}
          </h2>
          <div className='cancellation-form__sub-desc'>
            {t('cancellation.deletion.desc')}
          </div>
          <h2 className='cancellation-form__sub-title cancellation-form__sub-title_mt'>
            {t('cancellation.reason.title')}
          </h2>
          <div className='cancellation-form__reasons-list'>
            <div className='cancellation-form__reasons-item'>
              <CustomRadio
                name='reason'
                className='cancellation-form__reasons-item-radio'
                label={t('cancellation.not_needs')}
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
            <h2 className='cancellation-form__sub-title'>
              {t('cancellation.feedback.title')}
            </h2>
            <InputField
              type='textarea'
              rows={8}
              border='light'
              className='cancellation-form__feedback-input'
            />
            <div className='cancellation-form__feedback-button-wrap'>
              <Button color='cancel'>
                {t('cancellation.feedback.button')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WithTranslate(connect(null)(CancellationFormView));
