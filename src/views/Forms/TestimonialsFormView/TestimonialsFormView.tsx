/* eslint-disable comma-dangle */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Helmet from 'react-helmet';

import { routes, MAIN } from 'constants/routes';
import { getTranslate } from 'utils';

// Components
import CustomRadio from 'components/common/Forms/CustomRadio';
import InputField from 'components/common/Forms/InputField';
import Button from 'components/common/Forms/Button';
import WithTranslate from 'components/hoc/WithTranslate';
import Breadcrumb from 'components/Breadcrumb';

import './TestimonialsFormView.sass';

// Icons
import { ReactComponent as StarIcon } from 'assets/img/icons/star-icon.svg';

const TestimonialsFormView = (props: any) => {
  const [percentActiveLine, setPercentActiveLine] = useState(0);
  const [likeCounter, setLikeCounter] = useState([
    {
      value: 1,
      isActive: false,
    },
    {
      value: 2,
      isActive: false,
    },
    {
      value: 3,
      isActive: false,
    },
    {
      value: 4,
      isActive: false,
    },
    {
      value: 5,
      isActive: false,
    },
    {
      value: 6,
      isActive: false,
    },
    {
      value: 7,
      isActive: false,
    },
    {
      value: 8,
      isActive: false,
    },
    {
      value: 9,
      isActive: false,
    },
    {
      value: 10,
      isActive: false,
    },
  ]);

  const [starRating, setStarRating] = useState([
    {
      id: 1,
      isActive: false,
    },
    {
      id: 2,
      isActive: false,
    },
    {
      id: 3,
      isActive: false,
    },
    {
      id: 4,
      isActive: false,
    },
    {
      id: 5,
      isActive: false,
    },
    {
      id: 6,
      isActive: false,
    },
    {
      id: 7,
      isActive: false,
    },
    {
      id: 8,
      isActive: false,
    },
    {
      id: 9,
      isActive: false,
    },
    {
      id: 10,
      isActive: false,
    },
  ]);

  const t = (code: string, placeholders?: any) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    getTranslate(props.localePhrases, code, placeholders);

  return (
    <>
      <Helmet>
        <title>{t('app.title.testimonials.add')}</title>
      </Helmet>
      <div className='container'>
        <Breadcrumb
          routes={[
            {
              url: routes[MAIN],
              name: MAIN,
            },
          ]}
          currentPage={t('app.title.testimonials.add')}
        />
        <div className='testimonials-form'>
          <h2 className='testimonials-form__title'>
            <span className='testimonials-form__title-wrap'>
              {t('testimonials.add.title')}
            </span>
          </h2>
          <p className='testimonials-form__description'>
            {t('testimonials.add.description')}
          </p>
          <div>
            <div className='testimonials-form__label-title'>
              {t('testimonials.add.recommendation_title')}
            </div>
            <div className='testimonials-form__recommendation-description'>
              <span>{t('testimonials.add.not_likely')}</span>
              <span>{t('testimonials.add.most_likely')}</span>
            </div>
            <div className='testimonials-form__recommendation'>
              {likeCounter.map((count) => (
                <div
                  key={count.value}
                  className={classnames(
                    'testimonials-form__recommendation-item',
                    {
                      active: count.isActive,
                    }
                  )}
                >
                  <div className='testimonials-form__recommendation-item-line'></div>
                  <button
                    type='button'
                    onClick={() => {
                      let activeCount = 0;
                      const updatedLikeCounter = [...likeCounter];
                      updatedLikeCounter.map((updateCount) => {
                        updateCount.isActive = false;
                        if (updateCount.value <= count.value) {
                          updateCount.isActive = true;
                          activeCount++;
                        }

                        return setLikeCounter([...updatedLikeCounter]);
                      });
                      setPercentActiveLine(10 * activeCount);
                    }}
                    className='testimonials-form__recommendation-item-count'
                  >
                    {count.value}
                  </button>
                </div>
              ))}
              <div
                className='testimonials-form__recommendation-active-line'
                style={{ width: `${percentActiveLine}%` }}
              />
            </div>
          </div>
          <div>
            <div className='testimonials-form__label-title'>
              {t('testimonials.add.liked_scale')}
            </div>
            <div className='testimonials-form__rating-table'>
              <div className='testimonials-form__rating-table-row'>
                <div className='testimonials-form__rating-table-item_big testimonials-form__rating-table-head' />
                <div className='testimonials-form__rating-table-item testimonials-form__rating-table-head'>
                  {t('testimonials.add.strongly_disagree')}
                </div>
                <div className='testimonials-form__rating-table-item testimonials-form__rating-table-head'>
                  {t('testimonials.add.disagree')}
                </div>
                <div className='testimonials-form__rating-table-item testimonials-form__rating-table-head'>
                  {t('testimonials.add.neutral')}
                </div>
                <div className='testimonials-form__rating-table-item testimonials-form__rating-table-head'>
                  {t('testimonials.add.agree')}
                </div>
                <div className='testimonials-form__rating-table-item testimonials-form__rating-table-head'>
                  {t('testimonials.add.strongly_agree')}
                </div>
              </div>
              <div className='testimonials-form__rating-table-row'>
                <div className='testimonials-form__rating-table-item_big testimonials-form__rating-table-cell'>
                  {t('testimonials.add.archive_goals')}
                </div>
                <div className='testimonials-form__rating-table-cell testimonials-form__rating-table-item'>
                  <CustomRadio
                    name='goals'
                    className='testimonials-form__rating-table-radio'
                  />
                </div>
                <div className='testimonials-form__rating-table-cell testimonials-form__rating-table-item'>
                  <CustomRadio
                    name='goals'
                    className='testimonials-form__rating-table-radio'
                  />
                </div>
                <div className='testimonials-form__rating-table-cell testimonials-form__rating-table-item'>
                  <CustomRadio
                    name='goals'
                    className='testimonials-form__rating-table-radio'
                  />
                </div>
                <div className='testimonials-form__rating-table-cell testimonials-form__rating-table-item'>
                  <CustomRadio
                    name='goals'
                    className='testimonials-form__rating-table-radio'
                  />
                </div>
                <div className='testimonials-form__rating-table-cell testimonials-form__rating-table-item'>
                  <CustomRadio
                    name='goals'
                    className='testimonials-form__rating-table-radio'
                  />
                </div>
              </div>
              <div className='testimonials-form__rating-table-row'>
                <div className='testimonials-form__rating-table-item_big testimonials-form__rating-table-cell'>
                  {t('testimonials.add.recommend_others')}
                </div>
                <div className='testimonials-form__rating-table-cell testimonials-form__rating-table-item'>
                  <CustomRadio
                    name='recommendation'
                    className='testimonials-form__rating-table-radio'
                  />
                </div>
                <div className='testimonials-form__rating-table-cell testimonials-form__rating-table-item'>
                  <CustomRadio
                    name='recommendation'
                    className='testimonials-form__rating-table-radio'
                  />
                </div>
                <div className='testimonials-form__rating-table-cell testimonials-form__rating-table-item'>
                  <CustomRadio
                    name='recommendation'
                    className='testimonials-form__rating-table-radio'
                  />
                </div>
                <div className='testimonials-form__rating-table-cell testimonials-form__rating-table-item'>
                  <CustomRadio
                    name='recommendation'
                    className='testimonials-form__rating-table-radio'
                  />
                </div>
                <div className='testimonials-form__rating-table-cell testimonials-form__rating-table-item'>
                  <CustomRadio
                    name='recommendation'
                    className='testimonials-form__rating-table-radio'
                  />
                </div>
              </div>
              <div className='testimonials-form__rating-table-row'>
                <div className='testimonials-form__rating-table-item_big testimonials-form__rating-table-cell'>
                  {t('testimonials.add.changed_like')}
                </div>
                <div className='testimonials-form__rating-table-cell testimonials-form__rating-table-item'>
                  <CustomRadio
                    name='change_life'
                    className='testimonials-form__rating-table-radio'
                  />
                </div>
                <div className='testimonials-form__rating-table-cell testimonials-form__rating-table-item'>
                  <CustomRadio
                    name='change_life'
                    className='testimonials-form__rating-table-radio'
                  />
                </div>
                <div className='testimonials-form__rating-table-cell testimonials-form__rating-table-item'>
                  <CustomRadio
                    name='change_life'
                    className='testimonials-form__rating-table-radio'
                  />
                </div>
                <div className='testimonials-form__rating-table-cell testimonials-form__rating-table-item'>
                  <CustomRadio
                    name='change_life'
                    className='testimonials-form__rating-table-radio'
                  />
                </div>
                <div className='testimonials-form__rating-table-cell testimonials-form__rating-table-item'>
                  <CustomRadio
                    name='change_life'
                    className='testimonials-form__rating-table-radio'
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className='testimonials-form__label-title'>
              {t('testimonials.add.rating')}
            </div>
            <div className='testimonials-form__rating-stars'>
              {starRating.map((starButton) => (
                <button
                  key={starButton.id}
                  type='button'
                  className={classnames(
                    'testimonials-form__rating-stars-button',
                    {
                      active: starButton.isActive,
                    }
                  )}
                  onClick={() => {
                    const updatedStarRating = [...starRating];
                    updatedStarRating.map((updateCount) => {
                      updateCount.isActive = false;
                      if (updateCount.id <= starButton.id) {
                        updateCount.isActive = true;
                      }

                      return setStarRating([...updatedStarRating]);
                    });
                  }}
                >
                  <StarIcon />
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className='testimonials-form__label-title'>
              {t('testimonials.add.improve_title')}
            </div>
            <InputField
              type='textarea'
              border='light'
              rows={9}
              className='testimonials-form__opinion'
            />
            <div className='testimonials-form__add-button-wrap'>
              <Button color='primary'>{t('testimonials.add.button')}</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WithTranslate(connect(null)(TestimonialsFormView));
