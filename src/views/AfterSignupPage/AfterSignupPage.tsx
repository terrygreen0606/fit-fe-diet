import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { getTranslate, getImagePath } from 'utils';
import { getAppTariff, getAppReviews } from 'api';

// Components
import WithTranslate from 'components/hoc/WithTranslate';
import ContentLoading from 'components/hoc/ContentLoading';
import Button from 'components/common/Forms/Button';
import CountDown from 'components/common/CountDown';
import RawCountDown from 'components/common/RawCountDown';
import SliderSimple from 'components/common/SliderSimple';
import Accordeon from 'components/common/Accordeon';
import LineChart from 'components/common/charts/LineChart';

import { data as chartData, options as chartOptions } from './expectationsChartConfig';

import './AfterSignupPage.sass';

import { ReactComponent as StarFillIcon } from 'assets/img/icons/star-fill-icon.svg';

const AfterSignupPage = (props: any) => {

  const { 
    isAfterSignup,
    afterSignupName, 
    afterSignupGoal, 
    afterSignupWeight, 
    afterSignupWeightGoal, 
    afterSignupPredictDate 
  } = props;

  const [tariffLoading, setTariffLoading] = useState<boolean>(false);
  const [tariffLoadingError, setTariffLoadingError] = useState<boolean>(false);
  
  const [reviewsLoading, setReviewsLoading] = useState<boolean>(false);
  const [reviewsLoadingError, setReviewsLoadingError] = useState<boolean>(false);

  const [reviewsList, setReviewsList] = useState<any[]>([]);
  const [tariffData, setTariffData] = useState<any>({
    price_text: null,
    price_old_text: null
  });

  const getUserTariff = () => {
    setTariffLoading(true);
    setReviewsLoadingError(false);

    getAppTariff('d7')
      .then(response => {
        setTariffLoading(false);

        if (response.data.data) {
          setTariffData({
            price_text: response.data.data.price_text || null,
            price_old_text: response.data.data.price_old_text || null
          });
        }
      })
      .catch(error => {
        setTariffLoading(false);
        setReviewsLoadingError(true);
      });
  };

  const getUserReviews = () => {
    setReviewsLoading(true);
    setReviewsLoadingError(false);

    getAppReviews()
      .then(response => {
        setReviewsLoading(false);

        if (response.data.data && response.data.data.length) {
          setReviewsList(response.data.data);
        }
      })
      .catch(error => {
        setReviewsLoading(false);
        setReviewsLoadingError(true);
      });
  };

  useEffect(() =>  {
    getUserTariff();
    getUserReviews();
  }, []);

  const t = (code: string, placeholders?: any) => 
    getTranslate(props.localePhrases, code, placeholders);

  const getChartLabels = () => {
    return [
      moment(new Date()).format('MM.DD.YYYY'), 
      moment(new Date()).format('MM.DD.YYYY'),
      moment(new Date(afterSignupPredictDate * 1000)).format('MM.DD.YYYY'),
      moment(new Date(afterSignupPredictDate * 1000)).format('MM.DD.YYYY'),
      moment(new Date(afterSignupPredictDate * 1000)).format('MM.DD.YYYY')
    ];
  };

  const getChartData = () => {
    return [
      Number(afterSignupWeight), 
      Number(afterSignupWeight), 
      Number(afterSignupWeightGoal) / 2.2, 
      Number(afterSignupWeightGoal) / 2.2, 
      Number(afterSignupWeightGoal) / 2.2, 
      Number(afterSignupWeightGoal) / 2.2, 
      Math.max(Number(afterSignupWeightGoal), Number(afterSignupWeight)) * 1.7
    ];
  };

  const getChartCommonData = () => {
    return {
      ...chartData,
      labels: getChartLabels(),
      datasets: [{
        ...chartData.datasets[0],
        data: getChartData()
      }, {
        borderColor: '#CDCDCD',
        borderWidth: 2,
        backgroundColor: 'transparent',
        data: [
          Number(afterSignupWeight) * 1.05,
          Number(afterSignupWeight) * 1.1,
          Number(afterSignupWeight) * 0.8,
          Number(afterSignupWeight) * 0.99,
          Number(afterSignupWeight) * 0.8,
        ]
      }]
    };
  };

  const getChartCommonOptions = () => {
    return {
      ...chartOptions,
      tooltips: {
        ...chartOptions.tooltips,
        callbacks: {
          title: function(tooltipItem, data) {
            if (tooltipItem.length > 0) {
              if (tooltipItem[0].datasetIndex > 0) {
                return null;
              }

              if (tooltipItem[0].index === 1) {
                return 'Today';
              } else if (tooltipItem[0].index === 3) {
                return getShortDate(tooltipItem[0].label);
              } else {
                return null;
              }
            } else {
              return null;
            }
          },
          label: function(tooltipItem, data) {
            return null;
          }
        }
      }
    };
  };

  const getShortDate = (dateStr: string) => {
    let monthLocale = new Date(dateStr).toLocaleString(window.navigator.language, { month: 'short' });
    monthLocale = monthLocale.charAt(0).toUpperCase() + monthLocale.slice(1);

    return `${moment(new Date(dateStr)).format('DD')} ${monthLocale}`;
  };

  const getWelcomeGoalText = () => {
    let welcomeDescrGoalText = '';

    const i18n_measurement = props.measurement === 'si' ? 'common.kg' : 'common.lbs';

    switch (afterSignupGoal) {
      case -1:
        welcomeDescrGoalText = t('lp.welcome.text_lose', { AMOUNT: t(i18n_measurement, { COUNT: afterSignupWeight - afterSignupWeightGoal }) });
        break;
      case 0:
        welcomeDescrGoalText = t('lp.welcome.text_keep');
        break;
      case 1:
        welcomeDescrGoalText = t('lp.welcome.text_gain', { AMOUNT: t(i18n_measurement, { COUNT: afterSignupWeightGoal - afterSignupWeight }) });
        break;
    }

    return welcomeDescrGoalText;
  };

  return (
    <>
      <section className="after-signup-header-sect">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 after-signup-header-content-col">
              
              <h3>{t('lp.welcome.title', { NAME: afterSignupName })}</h3>
              {isAfterSignup && <h4 className="mt-xl-5 mt-4" dangerouslySetInnerHTML={{ __html: getWelcomeGoalText() }} />}

              <div className="text-center mt-xl-5 mt-4">
                <CountDown seconds={900} />

                <ContentLoading
                  isLoading={tariffLoading}
                  isError={tariffLoadingError}
                  fetchData={() => getUserTariff()}
                >
                  <h4 
                    className="fw-regular mt-xl-5 mt-4" 
                    dangerouslySetInnerHTML={{ 
                      __html: t('lp.selling_text', { 
                        OLD_VALUE: tariffData.price_old_text, 
                        AMOUNT: tariffData.price_text 
                      }) 
                    }}
                  />
                </ContentLoading>

                <Button color="primary-shadow" className="mt-3">{t('button.reveal_plan')}</Button>
                <img className="after-signup-header-arrow" src={getImagePath('point-arrow-yellow.png')} alt="" />
              </div>

            </div>
            <div className="col-xl-6 mt-5 mt-xl-0 after-signup-header-chart-col">

              <div className="after-signup-header-chart-col_content">
                {isAfterSignup && (
                  <div className="after-signup__expectations_chart-wrap">
                    <span className="after-signup__expectations_chart-standart-plan-label">{t('signup.chart.standart_plan_label')}</span>
                    <span className="after-signup__expectations_chart-fitlope-plan-label" dangerouslySetInnerHTML={{ __html: t('signup.chart.fitlope_plan_label') }}></span>

                    <LineChart 
                      className="after-signup__expectations_chart"
                      data={getChartCommonData()} 
                      options={getChartCommonOptions()}
                    />
                  </div>
                )}
                
                  <div className="app-review-single-item">
                    <ContentLoading
                      isLoading={reviewsLoading}
                      isError={reviewsLoadingError}
                      fetchData={() => getUserReviews()}
                    >
                      {reviewsList.slice(0, 1).map(review => (
                        <>
                          <div className="app-review-single-item_img_wrap">
                            <span className="app-review-single-item_img" style={{ backgroundImage: `url(${review.image || null})` }} />
                          </div>
                          
                          <div className="app-review-single-item_content">
                            <p className="app-review-single-item_descr">{review.text || null}</p>
                            <div className="app-review-single-item_footer">
                              <div className="rate-stars_list">
                                <StarFillIcon className="rate-stars_item" />
                                <StarFillIcon className="rate-stars_item" />
                                <StarFillIcon className="rate-stars_item" />
                                <StarFillIcon className="rate-stars_item" />
                                <StarFillIcon className="rate-stars_item" />
                              </div>
                              <h6 className="app-review-single-item_author"><b>- {review.name || null}</b>, Fitlope user</h6>
                            </div>
                          </div>
                        </>
                      ))}             
                    </ContentLoading>
                  </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section className="after-signup-intro-sect">
        <div className="container">
          <div className="row">
            <div className="col-6 d-none d-xl-block text-right">
              
              <img src={getImagePath('register/expectations_step.png')} alt="" className="img-fluid flip-x" />

            </div>
            <div className="col-xl-6 mt-xl-0 after-signup-intro-content-col">

              <h5>{t('lp.partners_list_title')}</h5>

              <div className="app-partners-list">
                <span className="app-partners-list__item" style={{ backgroundImage: `url(${require('assets/img/partners/daily-mirror.png')})` }} />
                <span className="app-partners-list__item" style={{ backgroundImage: `url(${require('assets/img/partners/forbes.png')})` }} />
                <span className="app-partners-list__item" style={{ backgroundImage: `url(${require('assets/img/partners/modesto.png')})` }} />
              </div>

              <img className="after-signup-intro-arrow" src={getImagePath('point-arrow-black.png')} alt="" />

              <div className="mt-4 mt-xl-5" dangerouslySetInnerHTML={{ __html: t('lp.intro_sect_content') }}></div>
              
            </div>
          </div>
        </div>
      </section>

      <section className="after-signup-reviews-sect">
        <div className="container">
          <div className="row">
            <div className="col-xl-4 offset-xl-2 py-xl-5">
              
              <div dangerouslySetInnerHTML={{ __html: t('lp.reviews_sect_content') }}></div>

            </div>
            <div className="col-xl-5 offset-xl-1 mt-5 mt-xl-0">

              <ContentLoading
                isLoading={reviewsLoading}
                isError={reviewsLoadingError}
                fetchData={() => getUserReviews()}
              >
                <SliderSimple
                  className="app-reviews-slider app-reviews-slider--1"
                  dots
                  autoplay
                  autoplaySpeed={2000}
                  slides={reviewsList.map(review => (
                    <div className="app-reviews-slider__item">
                      <div className="app-reviews-slider__item_img" style={{ backgroundImage: `url(${review.image || null})` }} />
                      <div className="app-reviews-slider__item_content">
                        <p className="app-reviews-slider__item_descr">{review.text || null}</p>
                        <h6 className="app-reviews-slider__item_author">{review.name || null}, Fitlope user</h6>
                      </div>
                    </div>
                  ))}
                />                  
              </ContentLoading>

            </div>
          </div>
        </div>
      </section>

      <section className="after-signup-faq-sect">
        <div className="container">
          <div className="row">
            <div className="col-xl-5">

              <ContentLoading
                isLoading={reviewsLoading}
                isError={reviewsLoadingError}
                fetchData={() => getUserReviews()}
              >
                <SliderSimple
                  className="app-reviews-slider app-reviews-slider--2"
                  nav
                  autoplay
                  autoplaySpeed={3000}
                  slides={reviewsList.map(review => (
                    <div className="app-reviews-slider__item">
                      <div className="app-reviews-slider__item_img" style={{ backgroundImage: `url(${review.image || null})` }} />
                      <p className="app-reviews-slider__item_descr">{review.text || null}</p>
                      <h6 className="app-reviews-slider__item_author">{review.name || null}, Fitlope user</h6>
                    </div>
                  ))}
                />                
              </ContentLoading>

            </div>
            <div className="col-xl-6 offset-xl-1">
              
              <h4 className="mb-45">{t('lp.faq.title')}</h4>

              <Accordeon
                items={[
                  {
                    title: t('lp.faq.q1'),
                    content: <div dangerouslySetInnerHTML={{ __html: t('lp.faq.a1') }}></div>
                  },
                  {
                    title: t('lp.faq.q2'),
                    content: <div dangerouslySetInnerHTML={{ __html: t('lp.faq.a2') }}></div>
                  },
                  {
                    title: t('lp.faq.q3'),
                    content: <div dangerouslySetInnerHTML={{ __html: t('lp.faq.a3') }}></div>
                  },
                ]}
              />

            </div>
          </div>
        </div>
      </section>

      <section className="after-signup-expect-sect">
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              
              <h4 className="mb-5">{t('lp.advantages_title')}</h4>

              <div className="app-advantages-list">
                <div className="app-advantages-list__item">{t('lp.advantage_1')}</div>
                <div className="app-advantages-list__item">{t('lp.advantage_2')}</div>
                <div className="app-advantages-list__item">{t('lp.advantage_3')}</div>
              </div>

            </div>
            <div className="col-xl-6">
              
              {isAfterSignup && (
                <div className="after-signup__expectations_chart-wrap">
                  <span className="after-signup__expectations_chart-standart-plan-label">{t('signup.chart.standart_plan_label')}</span>
                  <span className="after-signup__expectations_chart-fitlope-plan-label" dangerouslySetInnerHTML={{ __html: t('signup.chart.fitlope_plan_label') }}></span>

                  <LineChart 
                    className="after-signup__expectations_chart"
                    data={getChartCommonData()} 
                    options={getChartCommonOptions()}
                  />
                </div>
              )}

            </div>
            <div className="col-12 mt-5 pt-xl-5">
              
              <div className="row">
                <div className="col-xl-6">
                  
                  <div className="money-back-guarantee-block">
                    <h5 className="money-back-guarantee-block__title">{t('lp.money_back_title')}</h5>
                    <p className="money-back-guarantee-block__descr">{t('lp.money_back_descr')}</p>
                  </div>

                </div>
                <div className="col-xl-6 mt-4 mt-xl-0 text-center">
                  
                  <img src={getImagePath('checkout/safe-checkout-img.png')} className="img-fluid" alt="" />

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>  

      <section className="after-signup-start-today-sect">
        <div className="container pb-5">
          <div className="row">
            <div className="col-xl-6 offset-xl-3 after-signup-start-today-col text-center">
              
              <h4 className="sect-title title-center">{t('lp.start_today_title')}</h4>

              <ContentLoading
                isLoading={tariffLoading}
                isError={tariffLoadingError}
                fetchData={() => getUserTariff()}
              >
                <h4 
                  className="fw-regular mt-xl-5 mt-4" 
                  dangerouslySetInnerHTML={{ 
                    __html: t('lp.selling_text', { 
                      OLD_VALUE: tariffData.price_old_text, 
                      AMOUNT: tariffData.price_text 
                    }) 
                  }}
                />
              </ContentLoading>

              <Button color="primary-shadow" className="mt-xl-5 mt-4">{t('button.reveal_plan')}</Button>

              <img className="after-signup-start-today-arrow" src={getImagePath('point-arrow-yellow.png')} alt="" />

              <div className="product-plants-one-tree-block mt-5">
                <p dangerouslySetInnerHTML={{ __html: t('lp.plants_one_tree_descr') }}></p>
              </div>

            </div>
          </div>
        </div>

        <section className="checkout-reserved-block">
          <div className="container">
            <div className="row">
              <div className="col-12">
                
                <h4 className="checkout-reserved-block__title">
                  {t('lp.bottom_countdown_title')} {' '}
                  
                  <span className="checkout-reserved-block__countdown">
                    <RawCountDown seconds={900} />
                  </span>
                </h4>

              </div>
            </div>
          </div>
        </section>
      </section>  
    </>
  );
};

export default WithTranslate(
  connect(
    (state: any) => ({
      measurement: state.settings.measurement,
      isAfterSignup: state.auth.userData.isAfterSignup,
      afterSignupName: state.auth.userData.afterSignupName,
      afterSignupGoal: state.auth.userData.afterSignupGoal,
      afterSignupWeight: state.auth.userData.afterSignupWeight,
      afterSignupWeightGoal: state.auth.userData.afterSignupWeightGoal,
      afterSignupPredictDate: state.auth.userData.afterSignupPredictDate
    }), 
    null
  )(AfterSignupPage)
);
