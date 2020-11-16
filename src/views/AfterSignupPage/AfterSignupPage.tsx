import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import uuid from 'react-uuid';
import Helmet from 'react-helmet';
import { getTranslate, getImagePath } from 'utils';
import { getAppTariffs, getAppReviews } from 'api';

// Components
import WithTranslate from 'components/hoc/WithTranslate';
import ContentLoading from 'components/hoc/ContentLoading';
import Button from 'components/common/Forms/Button';
import CountDown from 'components/common/CountDown';
import RawCountDown from 'components/common/RawCountDown';
import SliderSimple from 'components/common/SliderSimple';
import CheckoutPaymentFormCard from 'components/CheckoutPaymentFormCard';
import DietExpectationsChart from 'components/DietExpectationsChart';
import TariffPlanSelect from 'components/TariffPlanSelect';
import SalesWidgets from 'components/SalesWidgets';

import './AfterSignupPage.sass';

import dailyMirrorImg from 'assets/img/partners/daily-mirror.png';
import forbesImg from 'assets/img/partners/forbes.png';
import modestoImg from 'assets/img/partners/modesto.png';

import { ReactComponent as StarFillIcon } from 'assets/img/icons/star-fill-icon.svg';

const AfterSignupPage = ({
  isAfterSignup,
  afterSignupName,
  afterSignupGoal,
  afterSignupWeight,
  afterSignupWeightGoal,
  afterSignupPredictDate,
  measurement,
  history,
  localePhrases,
}: any) => {
  const [reviewsLoading, setReviewsLoading] = useState<boolean>(false);
  const [reviewsLoadingError, setReviewsLoadingError] = useState<boolean>(false);

  const [reviewsList, setReviewsList] = useState<any[]>([]);

  const [tariffsDataList, setTariffsDataList] = useState<any[]>([]);
  const [tariffsLoading, setTariffsLoading] = useState<boolean>(false);
  const [tariffsLoadingError, setTariffsLoadingError] = useState<boolean>(false);

  const [activeTariffId, setActiveTariffId] = useState<any>(null);

  const getUserTariffs = () => {
    setTariffsLoading(true);
    setTariffsLoadingError(false);

    getAppTariffs()
      .then(({ data }) => {
        if (data.success && data.data) {
          if (data.data.length) {
            setTariffsDataList(data.data);

            if (data.data.length > 1) {
              setActiveTariffId(data.data[1].tariff);
            } else if (data.data.length > 0) {
              setActiveTariffId(data.data[0].tariff);
            }
          }
        } else {
          setTariffsLoadingError(true);
        }
      })
      .catch(() => {
        setTariffsLoadingError(true);
      })
      .finally(() => {
        setTariffsLoading(false);
      });
  };

  const getUserReviews = () => {
    setReviewsLoading(true);
    setReviewsLoadingError(false);

    getAppReviews()
      .then(({ data }) => {
        setReviewsLoading(false);

        if (data.data && data.data.length) {
          setReviewsList(data.data.map((review) => ({
            ...review,
            id: uuid(),
          })));
        }
      })
      .catch(() => {
        setReviewsLoading(false);
        setReviewsLoadingError(true);
      });
  };

  useEffect(() => {
    getUserTariffs();
    getUserReviews();
  }, []);

  const t = (code: string, placeholders?: any) =>
    getTranslate(localePhrases, code, placeholders);

  const getWelcomeGoalText = () => {
    let welcomeDescrGoalText = '';

    const I18N_MEASUREMENT = measurement === 'si' ? 'common.kg' : 'common.lbs';

    switch (afterSignupGoal) {
      case -1:
        welcomeDescrGoalText = t('lp.welcome.text_lose', {
          AMOUNT: t(I18N_MEASUREMENT, {
            COUNT: afterSignupWeight - afterSignupWeightGoal,
          }),
        });
        break;

      case 0:
        welcomeDescrGoalText = t('lp.welcome.text_keep');
        break;

      case 1:
        welcomeDescrGoalText = t('lp.welcome.text_gain', {
          AMOUNT: t(I18N_MEASUREMENT, {
            COUNT: afterSignupWeightGoal - afterSignupWeight,
          }),
        });
        break;

      default:
        welcomeDescrGoalText = '';
    }

    return welcomeDescrGoalText;
  };

  const getActiveTariffData = () => {
    const activeTariff = tariffsDataList.find((tariff) => tariff.tariff === activeTariffId);
    return activeTariff;
  };

  const scrollToCheckoutForm = () => {
    document.getElementById('afterSignupTariffs')?.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
  };

  return (
    <>
      <Helmet>
        <title>{t('app.title.after_signup')}</title>
      </Helmet>

      <section className='after-signup-header-sect'>
        <div className='container'>
          <div className='row'>
            <div className='col-xl-6 after-signup-header-content-col'>

              <h1 className='fw-bold'>{t('lp.welcome.title', { NAME: afterSignupName })}</h1>

              {isAfterSignup && (
                <h2
                  className='mt-5 mt-xl-4 fw-bold'
                  dangerouslySetInnerHTML={{ __html: getWelcomeGoalText() }}
                />
              )}

              <div className='text-center mt-4'>
                <CountDown seconds={900} />

                <ContentLoading
                  isLoading={tariffsLoading}
                  isError={tariffsLoadingError}
                  fetchData={() => getUserTariffs()}
                >
                  {tariffsDataList.length > 0 && (
                    <h2
                      className='fw-regular mt-4'
                      dangerouslySetInnerHTML={{
                        __html: t('lp.selling_text', {
                          OLD_VALUE: tariffsDataList[0].price_old_monthly_text,
                          AMOUNT: tariffsDataList[0].price_monthly_text,
                        }),
                      }}
                    />
                  )}
                </ContentLoading>

                <Button
                  onClick={() => scrollToCheckoutForm()}
                  pulse
                  color='primary-shadow'
                  className='mt-3'
                  size='lg'
                >
                  {t('button.select_plan')}
                </Button>

                <img className='after-signup-header-arrow' src={getImagePath('point-arrow-yellow.png')} alt='' />
              </div>

            </div>
            <div className='col-xl-6 mt-5 mt-xl-0 after-signup-header-chart-col'>

              <div className='after-signup-header-chart-col_content'>
                {isAfterSignup && (
                  <DietExpectationsChart
                    weight={afterSignupWeight}
                    weightGoal={afterSignupWeightGoal}
                    predictedDate={afterSignupPredictDate}
                    measurement={measurement}
                    localePhrases={localePhrases}
                  />
                )}

                <div className='app-review-single-item'>
                  <ContentLoading
                    isLoading={reviewsLoading}
                    isError={reviewsLoadingError}
                    fetchData={() => getUserReviews()}
                  >
                    {reviewsList.slice(0, 1).map((review) => (
                      <>
                        <div className='app-review-single-item_img_wrap'>
                          <span
                            className='app-review-single-item_img'
                            style={{ backgroundImage: `url(${review.image || null})` }}
                          />
                        </div>

                        <div className='app-review-single-item_content'>
                          <p className='app-review-single-item_descr'>{review.text || null}</p>
                          <div className='app-review-single-item_footer'>
                            <div className='rate-stars_list'>
                              <StarFillIcon className='rate-stars_item' />
                              <StarFillIcon className='rate-stars_item' />
                              <StarFillIcon className='rate-stars_item' />
                              <StarFillIcon className='rate-stars_item' />
                              <StarFillIcon className='rate-stars_item' />
                            </div>
                            <h6 className='app-review-single-item_author'>
                              <b>
                                {'- '}
                                {review.name || null}
                              </b>
                              , Fitlope user
                            </h6>
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

      <section className='after-signup-intro-sect'>
        <div className='container'>
          <div className='row'>
            <div className='col-4 d-none d-xl-block text-left'>

              <img src={t('lp.phone_overview.gif')} alt='' className='img-fluid' />

            </div>
            <div className='col-xl-8 pl-xl-5 mt-xl-0 after-signup-intro-content-col'>

              <h5 className='fw-bold'>{t('lp.partners_list_title')}</h5>

              <div className='app-partners-list'>
                <span
                  className='app-partners-list__item'
                  style={{ backgroundImage: `url(${dailyMirrorImg})` }}
                />
                <span
                  className='app-partners-list__item'
                  style={{ backgroundImage: `url(${forbesImg})` }}
                />
                <span
                  className='app-partners-list__item'
                  style={{ backgroundImage: `url(${modestoImg})` }}
                />
              </div>

              <img className='after-signup-intro-arrow' src={getImagePath('point-arrow-black.png')} alt='' />

              <div className='mt-4 mt-xl-5' dangerouslySetInnerHTML={{ __html: t('lp.intro_sect_content') }}></div>

              <div className='mt-5 pt-3 pb-5 text-center text-xl-left'>
                <Button
                  pulse
                  color='primary-shadow'
                  size='lg'
                  block
                  onClick={() => scrollToCheckoutForm()}
                  style={{ maxWidth: '380px' }}
                >
                  {t('button.activate_plan')}
                </Button>

                <img className='after-signup-start-today-arrow' src={getImagePath('point-arrow-yellow.png')} alt='' />
              </div>

            </div>
          </div>
        </div>
      </section>

      <section className='after-signup-reviews-sect'>
        <div className='container'>
          <div className='row'>
            <div className='col-xl-4 offset-xl-2 py-xl-5'>

              <h2 className='fw-bold'>{t('lp.reviews_sect.title')}</h2>
              <p className='mt-45'>{t('lp.reviews_sect.descr')}</p>
              <h4 className='mt-4 fw-bold'>{t('lp.reviews_sect.subtitle')}</h4>

              {reviewsList.length > 0 && (
                <div className='app-review-rate-single mt-5'>
                  <div className='rate-stars_list'>
                    <StarFillIcon className='rate-stars_item' />
                    <StarFillIcon className='rate-stars_item' />
                    <StarFillIcon className='rate-stars_item' />
                    <StarFillIcon className='rate-stars_item' />
                    <StarFillIcon className='rate-stars_item' />
                  </div>

                  <h6 className='app-review-rate-single__author'>
                    <b>
                      {'- '}
                      {reviewsList[0].name}
                    </b>
                    {', '}
                    {t('common.app_user')}
                  </h6>
                </div>
              )}

              <div className='mt-5 text-center text-xl-left'>
                <Button
                  pulse
                  color='primary-shadow'
                  size='lg'
                  onClick={() => scrollToCheckoutForm()}
                >
                  {t('button.select_plan')}
                </Button>

                <img className='after-signup-start-today-arrow' src={getImagePath('point-arrow-yellow.png')} alt='' />
              </div>

            </div>
            <div className='col-xl-5 offset-xl-1 mt-5 mt-xl-0'>

              <ContentLoading
                isLoading={reviewsLoading}
                isError={reviewsLoadingError}
                fetchData={() => getUserReviews()}
              >
                <SliderSimple
                  className='app-reviews-slider app-reviews-slider--3'
                  dots
                  autoplay
                  autoplaySpeed={3000}
                  slides={reviewsList.map(({ id, image }) => (
                    <div key={id} className='app-reviews-slider__item'>
                      <div
                        className='app-reviews-slider__item_img'
                        style={{ backgroundImage: `url(${image})` }}
                      />
                    </div>
                  ))}
                />
              </ContentLoading>

            </div>
          </div>
        </div>
      </section>

      <section className='after-signup-expect-sect'>
        <div className='container'>
          <div className='row'>
            <div className='col-xl-6'>

              <h2 className='mb-5 fw-bold'>{t('lp.advantages_title')}</h2>

              <div className='app-advantages-list'>
                <div className='app-advantages-list__item'>{t('lp.advantage_1')}</div>
                <div className='app-advantages-list__item'>{t('lp.advantage_2')}</div>
                <div className='app-advantages-list__item'>{t('lp.advantage_3')}</div>
              </div>

            </div>
            <div className='col-xl-6 mt-5 mt-xl-0'>

              <iframe
                className='after-signup-video-frame'
                title={t('lp.video.title')}
                src={`https://player.vimeo.com/video/${t('lp.video.vimeo.id')}`}
                width='100%'
                height='400'
              />

            </div>
            <div className='col-12 mt-5 pt-xl-5'>

              <div className='row'>
                <div className='col-xl-6'>

                  <div className='money-back-guarantee-block'>
                    <h5 className='money-back-guarantee-block__title'>{t('lp.money_back_title')}</h5>
                    <p className='money-back-guarantee-block__descr'>{t('lp.money_back_descr')}</p>
                  </div>

                </div>
                <div className='col-xl-6 mt-4 mt-xl-0 text-center'>

                  <img src={getImagePath('checkout/safe-checkout-img.png')} className='img-fluid' alt='' />

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section className='after-signup-start-today-sect'>
        <div className='container pb-5'>
          <div className='row'>
            <div className='col-xl-6 offset-xl-3 after-signup-start-today-col text-center'>

              <h2 className='sect-title title-center'>{t('lp.start_today_title')}</h2>

              <ContentLoading
                isLoading={tariffsLoading}
                isError={tariffsLoadingError}
                fetchData={() => getUserTariffs()}
              >
                {tariffsDataList.length > 0 && (
                  <h2
                    className='fw-regular mt-4'
                    dangerouslySetInnerHTML={{
                      __html: t('lp.selling_text', {
                        OLD_VALUE: tariffsDataList[0].price_old_monthly_text,
                        AMOUNT: tariffsDataList[0].price_monthly_text,
                      }),
                    }}
                  />
                )}
              </ContentLoading>

              <Button
                pulse
                color='primary-shadow'
                className='mt-4'
                size='lg'
                block
                onClick={() => scrollToCheckoutForm()}
                style={{ maxWidth: '500px' }}
              >
                {t('button.activate_plan')}
              </Button>

              <img className='after-signup-start-today-arrow' src={getImagePath('point-arrow-yellow.png')} alt='' />

              <div className='app-partners-list__wrap mt-5 pt-5'>
                <h5 className='app-partners-list__title'>{t('lp.partners_list_title')}</h5>

                <div className='app-partners-list'>
                  <span
                    className='app-partners-list__item'
                    style={{ backgroundImage: `url(${dailyMirrorImg})` }}
                  />
                  <span
                    className='app-partners-list__item'
                    style={{ backgroundImage: `url(${forbesImg})` }}
                  />
                  <span
                    className='app-partners-list__item'
                    style={{ backgroundImage: `url(${modestoImg})` }}
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section className='after-signup-plan-select-sect'>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>

              <div className='checkout-reserved-top-block'>
                <h3 className='checkout-reserved-top-block__title'>{t('checkout.reserved_block.title')}</h3>
                <h6 className='checkout-reserved-top-block__descr'>{t('checkout.reserved_block.descr')}</h6>
                <h6 className='checkout-reserved-top-block__countdown_title'>
                  {t('checkout.reserved_block.title')}
                  :
                </h6>
                <span className='checkout-reserved-top-block__countdown'>
                  <RawCountDown seconds={900} />
                </span>
              </div>

              <div className='row'>
                <div className='col-md-6'>

                  <h2 id='afterSignupTariffs' className='mb-5 fw-bold text-center'>
                    {t('lp.select_plan_title')}
                  </h2>

                  <TariffPlanSelect
                    tariffs={tariffsDataList.map(({
                      tariff,
                      months,
                      price_monthly_text,
                      price_old_monthly_text,
                      price_text,
                    }) => ({
                      id: tariff,
                      price: price_text,
                      priceMonth: price_monthly_text,
                      priceOldMonth: price_old_monthly_text,
                      months,
                    }))}
                    value={activeTariffId}
                    onChange={(id) => setActiveTariffId(id)}
                    specialOfferIndex={1}
                    localePhrases={localePhrases}
                  />

                </div>
                <div className='col-md-6 pl-xl-5 mt-5 mt-xl-0'>

                  <h2 className='mb-5 fw-bold'>{t('lp.plan.advantages_title')}</h2>

                  <div className='advantages-checklist'>
                    {Array(5).fill(1).map((el) => uuid()).map((id, index) => (
                      <div key={id} className='advantages-checklist-item'>
                        <h6 className='advantages-checklist-item__title'>
                          {t(`lp.plan.advantage${index}.title`)}
                        </h6>

                        <div className='advantages-checklist-item__content'>
                          {t(`lp.plan.advantage${index}.descr`)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <img src={getImagePath('checkout/safe-checkout-img-2.png')} className='img-fluid mt-5' alt='' />

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section className='after-signup-payment-form'>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>

              <h3 className='mb-5 fw-bold text-center'>{t('lp.select_payment.title')}</h3>

              <CheckoutPaymentFormCard
                tariff={getActiveTariffData()}
                history={history}
                localePhrases={localePhrases}
              />

            </div>
          </div>
        </div>
      </section>

      <section className='after-signup-faq-sect'>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>

              <h2 className='sect-title title-center'>{t('lp.faq.title')}</h2>

              <div className='row mt-xl-5 pt-lg-5'>
                <div className='col-lg-6'>

                  <h5 className='mb-5 fw-bold text-center'>{t('lp.faq.q1')}</h5>
                  <p>{t('lp.faq.a1')}</p>

                </div>
                <div className='col-lg-6 mt-5 mt-lg-0'>

                  <h5 className='mb-5 fw-bold text-center'>{t('lp.faq.q2')}</h5>
                  <p>{t('lp.faq.a2')}</p>

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section className='checkout-reserved-block mb-4 blue-style'>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>

              <div className='checkout-reserved-block__wrap'>
                <h4 className='checkout-reserved-block__title'>
                  {t('lp.bottom_countdown_title')}
                  {' '}

                  <span className='checkout-reserved-block__countdown'>
                    <RawCountDown seconds={900} />
                  </span>
                </h4>

                <Button
                  pulse
                  color='primary-shadow'
                  onClick={() => scrollToCheckoutForm()}
                >
                  {t('button.reveal_plan')}
                </Button>
              </div>

            </div>
          </div>
        </div>
      </section>

      <SalesWidgets />
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
      afterSignupPredictDate: state.auth.userData.afterSignupPredictDate,
    }),
    null,
  )(AfterSignupPage),
);
