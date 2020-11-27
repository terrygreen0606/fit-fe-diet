/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import uuid from 'react-uuid';
import Helmet from 'react-helmet';
import classNames from 'classnames';
import { getTranslate, getImagePath, scrollToElement } from 'utils';
import { getAppTariffs, getAppReviews } from 'api';

// Components
import WithTranslate from 'components/hoc/WithTranslate';
import ContentLoading from 'components/hoc/ContentLoading';
import Button from 'components/common/Forms/Button';
import SliderSimple from 'components/common/SliderSimple';
import CheckoutPaymentFormCard from 'components/CheckoutPaymentFormCard';
import DietExpectationsChart from 'components/DietExpectationsChart';
import TariffPlanSelect from 'components/TariffPlanSelect';
import SalesWidgets from 'components/SalesWidgets';
import useVisible from 'components/hooks/useVisible';
import useWindowSize from 'components/hooks/useWindowSize';
import useDebounce from 'components/hooks/useDebounce';

import './RegisterWelcomePage.sass';

import metropolisLogoImg from 'assets/img/partners/metropolis.png';
import igLogoImg from 'assets/img/partners/ig.png';
import terraLogoImg from 'assets/img/partners/terra.png';
import defatoLogoImg from 'assets/img/partners/defato.png';

import { ReactComponent as StarFillIcon } from 'assets/img/icons/star-fill-icon.svg';

const RegisterWelcomePage = ({
  isAfterSignup,
  afterSignupName,
  afterSignupGoal,
  afterSignupWeight,
  afterSignupWeightGoal,
  afterSignupPredictDate,
  afterSignupNameFirstSection,
  measurement,
  language,
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

  const { width: windowWidth } = useWindowSize();
  const debounceWindowWidth = useDebounce(windowWidth, 500);

  const [isActiveWidgetsOnMobile, setIsActiveWidgetsOnMobile] = useState<boolean>(false);
  const [isStartActiveWidgets, setIsStartActiveWidgets] = useState<boolean>(false);

  const selectPlanBlockRef = useRef(null);
  const isVisibleSelectPlanBlock = useVisible(selectPlanBlockRef);
  useEffect(() => {
    if (debounceWindowWidth < 576) {
      setIsActiveWidgetsOnMobile(isVisibleSelectPlanBlock);
    }
  }, [
    debounceWindowWidth,
    isVisibleSelectPlanBlock,
  ]);

  const paymentFormBlockRef = useRef(null);
  const isVisiblePaymentFormBlock = useVisible(paymentFormBlockRef);
  useEffect(() => {
    if (debounceWindowWidth < 576) {
      setIsActiveWidgetsOnMobile(isVisiblePaymentFormBlock);
    }
  }, [
    debounceWindowWidth,
    isVisiblePaymentFormBlock,
  ]);

  const introBlockRef = useRef(null);
  const isVisibleIntroBlock = useVisible(introBlockRef, '-50px');
  useEffect(() => {
    setIsStartActiveWidgets(isVisibleIntroBlock);
  }, [
    debounceWindowWidth,
    isVisibleIntroBlock,
  ]);

  const getUserTariffs = () => {
    setTariffsLoading(true);
    setTariffsLoadingError(false);

    getAppTariffs()
      .then(({ data }) => {
        if (data.success && data.data) {
          if (data.data.length) {
            setTariffsDataList(data.data);
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

  const documentScrollHandle = () => {
    const mainPromoHeader = document.getElementById('mainPromoHeader');
    const selectTariffPlanBlock = document.getElementById('selectTariffPlanBlock');

    if (!mainPromoHeader || !selectTariffPlanBlock) {
      return false;
    }

    if (selectTariffPlanBlock.getBoundingClientRect().top < 80) {
      if (mainPromoHeader.classList.contains('fixed-top')) {
        mainPromoHeader.classList.remove('fixed-top');
      }
    } else if (!mainPromoHeader.classList.contains('fixed-top')) {
      mainPromoHeader.classList.add('fixed-top');
    }
  };

  useEffect(() => {
    getUserTariffs();
    getUserReviews();

    document.addEventListener('scroll', documentScrollHandle);

    return () => {
      document.removeEventListener('scroll', documentScrollHandle);
    };
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

  const scrollToTariffsSelectForm = () => {
    scrollToElement(selectPlanBlockRef?.current, -30);
  };

  const scrollToCheckoutForm = () => {
    scrollToElement(paymentFormBlockRef?.current, -30);
  };

  const isShowPartners = () => language === 'br';

  return (
    <>
      <Helmet>
        <title>{t('app.title.after_signup')}</title>
      </Helmet>

      <section className='after-signup-header-sect'>
        <div className='container'>
          <div className='row'>
            <div className='col-12 mb-4 text-center text-xl-left'>

              <h1 className='fw-bold'>{t('lp.welcome.title', { NAME: afterSignupName })}</h1>

            </div>
            <div className='col-xl-6 order-xl-2 after-signup-header-chart-col'>

              <div className='after-signup-header-chart-col_content'>
                {afterSignupNameFirstSection === 'stat' ? (
                  <>
                    {isAfterSignup && (
                      <DietExpectationsChart
                        weight={afterSignupWeight}
                        weightGoal={afterSignupWeightGoal}
                        predictedDate={afterSignupPredictDate}
                        measurement={measurement}
                        localePhrases={localePhrases}
                      />
                    )}
                  </>
                ) : (
                    <iframe
                      className='after-signup-video-frame'
                      title={t('lp.video.title')}
                      src={`https://player.vimeo.com/video/${t('lp.video.vimeo.id')}?autoplay=1`}
                      allow='autoplay'
                      width='100%'
                      height='400'
                    />
                  )}
              </div>

            </div>
            <div className='col-xl-6 order-xl-1 mt-4 mt-xl-0 after-signup-header-content-col'>

              {isAfterSignup && (
                <h2
                  className='fw-bold mb-4'
                  dangerouslySetInnerHTML={{ __html: getWelcomeGoalText() }}
                />
              )}

              <div className='text-center'>
                <ContentLoading
                  isLoading={tariffsLoading}
                  isError={tariffsLoadingError}
                  fetchData={() => getUserTariffs()}
                >
                  {tariffsDataList.length > 0 && (
                    <h4
                      className='fw-regular'
                      dangerouslySetInnerHTML={{
                        __html: t(tariffsDataList?.[1]?.country === 'br' ? 'lp.selling_text.BR' : 'lp.selling_text', {
                          OLD_VALUE: tariffsDataList?.[1]?.country === 'br'
                          ? tariffsDataList?.[1]?.installments?.price_old_monthly_text
                          : tariffsDataList?.[1].price_old_weekly_text,
                          AMOUNT: tariffsDataList?.[1]?.country === 'br'
                            ? tariffsDataList?.[1]?.installments?.price_monthly_text
                            : tariffsDataList?.[1].price_weekly_text,
                        }),
                      }}
                    />
                  )}
                </ContentLoading>

                <div className='after-signup-header-btn-col'>
                  <Button
                    onClick={() => scrollToTariffsSelectForm()}
                    pulse
                    color='primary-shadow'
                    className='mt-3'
                    size='lg'
                  >
                    {t('button.select_plan')}
                  </Button>

                  <img className='after-signup-header-arrow' src={getImagePath('point-arrow-yellow.png')} alt='' />
                </div>

                <div className='sale-points__list mt-45'>
                  <div className='sale-points__item'>{t('lp.sale.point1')}</div>
                  <div className='sale-points__item'>{t('lp.sale.point2')}</div>
                  <div className='sale-points__item'>{t('lp.sale.point3')}</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section ref={introBlockRef} className='after-signup-intro-sect'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-8 order-md-2 pt-lg-4 pl-xl-5 mt-lg-0 after-signup-intro-content-col'>

              {isShowPartners() && (
                <div className='mb-4'>
                  <h5 className='fw-bold'>{t('lp.partners_list_title')}</h5>

                  <div className='app-partners-list'>
                    <span
                      className='app-partners-list__item'
                      style={{ backgroundImage: `url(${metropolisLogoImg})` }}
                    />
                    <span
                      className='app-partners-list__item'
                      style={{ backgroundImage: `url(${igLogoImg})` }}
                    />
                    <span
                      className='app-partners-list__item'
                      style={{ backgroundImage: `url(${terraLogoImg})` }}
                    />
                    <span
                      className='app-partners-list__item'
                      style={{ backgroundImage: `url(${defatoLogoImg})` }}
                    />
                  </div>
                </div>
              )}

              <img className='after-signup-intro-arrow' src={getImagePath('point-arrow-black.png')} alt='' />

              <div dangerouslySetInnerHTML={{ __html: t('lp.intro_sect_content') }}></div>

              <div className='after-signup-intro-content-btn mt-4 pt-3 pb-5 text-center text-xl-left'>
                <Button
                  pulse
                  color='primary-shadow'
                  size='lg'
                  block
                  onClick={() => scrollToTariffsSelectForm()}
                  style={{ maxWidth: '380px' }}
                >
                  {t('button.activate_plan')}
                </Button>

                <img className='after-signup-start-today-arrow' src={getImagePath('point-arrow-yellow.png')} alt='' />
              </div>

            </div>
            <div className='col-lg-4 order-md-1 mb-4 mb-md-4 text-center text-lg-left'>

              <button
                type='button'
                onClick={() => scrollToTariffsSelectForm()}
                className='after-signup-image-button'
              >
                <img src={t('lp.phone_overview.gif')} alt='' className='after-signup-phone-overview-img img-fluid' />
              </button>

            </div>
          </div>
        </div>
      </section>

      <section className='after-signup-reviews-sect'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6 col-xl-5 offset-xl-1'>

              <h2 className='fw-bold'>{t('lp.reviews_sect.title')}</h2>
              <p className='mt-45' dangerouslySetInnerHTML={{ __html: t('lp.reviews_sect.descr') }} />
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

              <div className='after-signup-reviews-btn-col mt-5 text-center text-xl-left'>
                <Button
                  pulse
                  color='primary-shadow'
                  size='lg'
                  onClick={() => scrollToTariffsSelectForm()}
                >
                  {t('button.select_plan')}
                </Button>

                <img className='after-signup-start-today-arrow' src={getImagePath('point-arrow-yellow.png')} alt='' />
              </div>

            </div>
            <div className='col-md-6 mt-5 mt-md-0'>

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
                        onClick={() => scrollToTariffsSelectForm()}
                        className='app-reviews-slider__item_img after-signup-image-button'
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

              <h2 className='mb-4 mb-xl-5 fw-bold'>{t('lp.advantages_title')}</h2>

              <div className='app-advantages-list'>
                <div className='app-advantages-list__item'>{t('lp.advantage_1')}</div>
                <div className='app-advantages-list__item'>{t('lp.advantage_2')}</div>
                <div className='app-advantages-list__item'>{t('lp.advantage_3')}</div>
              </div>

            </div>
            <div className='col-xl-6 mt-5 mt-xl-0'>

              {afterSignupNameFirstSection === 'stat' ? (
                <iframe
                  className='after-signup-video-frame'
                  title={t('lp.video.title')}
                  src={`https://player.vimeo.com/video/${t('lp.video.vimeo.id')}?autoplay=1`}
                  allow='autoplay'
                  width='100%'
                  height='400'
                />
              ) : (
                  <>
                    {isAfterSignup && (
                      <DietExpectationsChart
                        weight={afterSignupWeight}
                        weightGoal={afterSignupWeightGoal}
                        predictedDate={afterSignupPredictDate}
                        measurement={measurement}
                        localePhrases={localePhrases}
                      />
                    )}
                  </>
                )}

            </div>
            <div className='col-12 mt-4 mt-xl-5'>

              <div className='row'>
                <div className='col-md-6 text-center'>

                <button
                  type='button'
                  onClick={() => scrollToTariffsSelectForm()}
                  className='after-signup-image-button'
                >
                  <img src={t('checkout.social.img')} className='img-fluid' alt='' />
                </button>

                </div>
                <div className='col-md-6 mt-4 mt-md-0 text-center'>

                  <button
                    type='button'
                    onClick={() => scrollToTariffsSelectForm()}
                    className='after-signup-image-button'
                  >
                    <img src={t('checkout.safe.img')} className='img-fluid' alt='' />
                  </button>

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section className='after-signup-start-today-sect'>
        <div className='container pb-3'>
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
                    className='fw-regular mt-4 text-left text-lg-center'
                    dangerouslySetInnerHTML={{
                      __html: t(tariffsDataList?.[1]?.country === 'br' ? 'lp.selling_text.BR' : 'lp.selling_text', {
                        OLD_VALUE: tariffsDataList?.[1]?.country === 'br'
                          ? tariffsDataList?.[1]?.installments?.price_old_monthly_text
                          : tariffsDataList?.[1].price_old_weekly_text,
                        AMOUNT: tariffsDataList?.[1]?.country === 'br'
                          ? tariffsDataList?.[1]?.installments?.price_monthly_text
                          : tariffsDataList?.[1].price_weekly_text,
                      }),
                    }}
                  />
                )}
              </ContentLoading>

              <div className='after-signup-start-today-btn-col'>
                <Button
                  pulse
                  color='primary-shadow'
                  className='mt-4'
                  size='lg'
                  block
                  onClick={() => scrollToTariffsSelectForm()}
                  style={{ maxWidth: '500px' }}
                >
                  {t('button.activate_plan')}
                </Button>

                <img className='after-signup-start-today-arrow' src={getImagePath('point-arrow-yellow.png')} alt='' />
              </div>

              {isShowPartners() && (
                <div className='app-partners-list__wrap mt-5'>
                  <h5 className='app-partners-list__title'>{t('lp.partners_list_title')}</h5>

                  <div className='app-partners-list'>
                    <span
                      className='app-partners-list__item'
                      style={{ backgroundImage: `url(${metropolisLogoImg})` }}
                    />
                    <span
                      className='app-partners-list__item'
                      style={{ backgroundImage: `url(${igLogoImg})` }}
                    />
                    <span
                      className='app-partners-list__item'
                      style={{ backgroundImage: `url(${terraLogoImg})` }}
                    />
                    <span
                      className='app-partners-list__item'
                      style={{ backgroundImage: `url(${defatoLogoImg})` }}
                    />
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      <section className='after-signup-plan-select-sect'>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>

              <div className='row'>
                <div ref={selectPlanBlockRef} id='selectTariffPlanBlock' className='col-md-6'>

                  <h2 className='mb-4 mb-xl-5 fw-bold text-center'>
                    {t('lp.select_plan_title')}
                  </h2>

                  <TariffPlanSelect
                    tariffs={tariffsDataList}
                    value={activeTariffId}
                    onChange={(id) => {
                      if (activeTariffId === null) {
                        setTimeout(() => {
                          scrollToCheckoutForm();
                        }, 100);
                      }

                      setActiveTariffId(id);
                    }}
                    specialOfferIndex={1}
                    localePhrases={localePhrases}
                  />

                </div>
                <div className='col-md-6 pl-xl-5 mt-4 mt-md-0'>

                  <h2 className='mb-4 mb-xl-5 fw-bold'>{t('lp.plan.advantages_title')}</h2>

                  <div className='advantages-checklist'>
                    {Array(4).fill(1).map((el) => uuid()).map((id, index) => (
                      <div key={id} className='advantages-checklist-item'>
                        <h6 className='advantages-checklist-item__title'>
                          {t(`lp.plan.advantage${index + 1}.title`)}
                        </h6>

                        <div className='advantages-checklist-item__content'>
                          {t(`lp.plan.advantage${index + 1}.descr`)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className='text-center'>
                    <img
                      src={t('checkout.safe.img2')}
                      className='img-fluid mt-4'
                      style={{ maxWidth: '70%' }}
                      alt=''
                    />
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section ref={paymentFormBlockRef} className='after-signup-payment-form-sect'>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>

              <div
                className={classNames({
                'd-none': !getActiveTariffData()
                })}
              >
                <h3 className='mb-4 mb-xl-5 fw-bold text-center'>
                  {t('lp.select_payment.title')}
                </h3>

                <CheckoutPaymentFormCard
                  tariff={getActiveTariffData() || (tariffsDataList.length > 0 ? tariffsDataList[0] : null)}
                  disabled={!getActiveTariffData()}
                  scrollRef={selectPlanBlockRef}
                  history={history}
                  localePhrases={localePhrases}
                />
              </div>

            </div>
          </div>
        </div>
      </section>

      <section className='after-signup-faq-sect'>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>

              <h2 className='sect-title title-center'>{t('lp.faq.title')}</h2>

              <div className='row mt-xl-5'>
                <div className='col-lg-6'>

                  <h5 className='mb-4 fw-bold text-center'>{t('lp.faq.q1')}</h5>
                  <p>{t('lp.faq.a1')}</p>

                </div>
                <div className='col-lg-6 mt-5 mt-lg-0'>

                  <h5 className='mb-4 fw-bold text-center'>{t('lp.faq.q2')}</h5>
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
                </h4>

                <Button
                  pulse
                  color='primary-shadow'
                  onClick={() => scrollToTariffsSelectForm()}
                >
                  {t('button.reveal_plan')}
                </Button>
              </div>

            </div>
          </div>
        </div>
      </section>

      <SalesWidgets
        isShow={!isActiveWidgetsOnMobile}
        isStartShow={isStartActiveWidgets}
      />
    </>
  );
};

export default WithTranslate(
  connect(
    (state: any) => ({
      measurement: state.settings.measurement,
      language: state.settings.settings,
      isAfterSignup: state.storage.isAfterSignup,
      afterSignupName: state.storage.afterSignupName,
      afterSignupGoal: state.storage.afterSignupGoal,
      afterSignupWeight: state.storage.afterSignupWeight,
      afterSignupWeightGoal: state.storage.afterSignupWeightGoal,
      afterSignupPredictDate: state.storage.afterSignupPredictDate,
      afterSignupNameFirstSection: state.storage.afterSignupNameFirstSection,
    }),
    null,
  )(RegisterWelcomePage),
);
