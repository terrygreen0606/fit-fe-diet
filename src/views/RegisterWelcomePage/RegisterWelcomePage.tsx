/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import uuid from 'react-uuid';
import Helmet from 'react-helmet';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import {
  getTranslate,
  getImagePath,
  scrollToElement,
  getLocaleByLang,
} from 'utils';
import { routes } from 'constants/routes';
import { changeSetting as changeSettingAction } from 'store/actions';
import useWindowSize from 'components/hooks/useWindowSize';
import useDebounce from 'components/hooks/useDebounce';
import { getAppTariffs, getAppReviews } from 'api';

// Components
import WithTranslate from 'components/hoc/WithTranslate';
import ContentLoading from 'components/hoc/ContentLoading';
import Button from 'components/common/Forms/Button';
import CheckoutPaymentFormCard from 'components/CheckoutPaymentFormCard';
import DietExpectationsChart from 'components/DietExpectationsChart';
import TariffPlanSelect from 'components/TariffPlanSelect';
// import SalesWidgets from 'components/SalesWidgets';
// import useVisible from 'components/hooks/useVisible';
// import useWindowSize from 'components/hooks/useWindowSize';
// import useDebounce from 'components/hooks/useDebounce';

import './RegisterWelcomePage.sass';

import metropolisLogoImg from 'assets/img/partners/metropolis.png';
import igLogoImg from 'assets/img/partners/ig.png';
import terraLogoImg from 'assets/img/partners/terra.png';
import defatoLogoImg from 'assets/img/partners/defato.png';

import { ReactComponent as StarFillIcon } from 'assets/img/icons/star-fill-icon.svg';

const RegisterWelcomePage = ({
  isAfterSignup,
  afterSignupName,
  afterSignupWeight,
  afterSignupWeightGoal,
  afterSignupPredictDate,
  afterSignupNameFirstSection,
  activeTariffIdToPay,
  changeSettingAction: changeSetting,
  measurement,
  language,
  history,
  localePhrases,
}: any) => {
  const { width: windowWidth } = useWindowSize();
  const debounceWindowWidth = useDebounce(windowWidth, 500);

  const [reviewsLoading, setReviewsLoading] = useState<boolean>(false);
  const [reviewsLoadingError, setReviewsLoadingError] = useState<boolean>(false);

  const [reviewsList, setReviewsList] = useState<any[]>([]);

  const [tariffsDataList, setTariffsDataList] = useState<any[]>([]);
  const [tariffsLoading, setTariffsLoading] = useState<boolean>(false);
  const [tariffsLoadingError, setTariffsLoadingError] = useState<boolean>(false);

  const [activeTariffId, setActiveTariffId] = useState<any>(null);

  const [welcomeVideoPlayerInstance, setWelcomeVideoPlayerInstance] = useState<any>(null);

  // const { width: windowWidth } = useWindowSize();
  // const debounceWindowWidth = useDebounce(windowWidth, 500);

  // const [isActiveWidgetsOnMobile, setIsActiveWidgetsOnMobile] = useState<boolean>(false);
  // const [isStartActiveWidgets, setIsStartActiveWidgets] = useState<boolean>(false);

  const selectPlanBlockRef = useRef(null);
  // const isVisibleSelectPlanBlock = useVisible(selectPlanBlockRef);
  // useEffect(() => {
  //   if (debounceWindowWidth < 576) {
  //     setIsActiveWidgetsOnMobile(isVisibleSelectPlanBlock);
  //   }
  // }, [
  //   debounceWindowWidth,
  //   isVisibleSelectPlanBlock,
  // ]);

  const paymentFormBlockRef = useRef(null);
  // const isVisiblePaymentFormBlock = useVisible(paymentFormBlockRef);
  // useEffect(() => {
  //   if (debounceWindowWidth < 576) {
  //     setIsActiveWidgetsOnMobile(isVisiblePaymentFormBlock);
  //   }
  // }, [
  //   debounceWindowWidth,
  //   isVisiblePaymentFormBlock,
  // ]);

  const introBlockRef = useRef(null);
  // const isVisibleIntroBlock = useVisible(introBlockRef, '-50px');
  // useEffect(() => {
  //   setIsStartActiveWidgets(isVisibleIntroBlock);
  // }, [
  //   debounceWindowWidth,
  //   isVisibleIntroBlock,
  // ]);

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

          if (activeTariffIdToPay) {
            setActiveTariffId(activeTariffIdToPay);
          }
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

    const welcomeVideo = document.querySelector('.after-signup-video-frame');
    let welcomeVideoPlayer = welcomeVideoPlayerInstance;

    if (!welcomeVideoPlayer && window['Vimeo']) {
      welcomeVideoPlayer = new window['Vimeo'].Player(welcomeVideo);
      setWelcomeVideoPlayerInstance(welcomeVideoPlayer);
    }

    if (selectTariffPlanBlock.getBoundingClientRect().top < 80) {
      if (mainPromoHeader.classList.contains('fixed-top')) {
        mainPromoHeader.classList.remove('fixed-top');
      }
    } else if (!mainPromoHeader.classList.contains('fixed-top')) {
      mainPromoHeader.classList.add('fixed-top');
    }

    if (welcomeVideo?.getBoundingClientRect().top < -100) {
      welcomeVideoPlayer?.pause();
    } else {
      welcomeVideoPlayer?.play();
    }
  };

  const t = (code: string, placeholders?: any) =>
    getTranslate(localePhrases, code, placeholders);

  useEffect(() => {
    getUserTariffs();
    getUserReviews();

    document.addEventListener('scroll', documentScrollHandle);

    return () => {
      document.removeEventListener('scroll', documentScrollHandle);
    };
  }, []);

  const getShortDate = (dateStr: string) => {
    let predictedDateFormatted = '';

    if (new Date(dateStr).getFullYear() === new Date().getFullYear()) {
      predictedDateFormatted = new Date(dateStr).toLocaleDateString(
        getLocaleByLang(language), { day: 'numeric', month: 'short' }
      );
    } else {
      predictedDateFormatted = new Date(dateStr).toLocaleDateString(
        getLocaleByLang(language), { day: 'numeric', month: 'short', year: 'numeric' }
      );
    }

    return predictedDateFormatted;
  };

  const getWelcomeGoalText = () => {
    let welcomeDescrGoalText = '';

    const I18N_MEASUREMENT = measurement === 'si' ? 'common.kg' : 'common.lbs';

    let signupGoal = null;

    if (afterSignupWeight > afterSignupWeightGoal) {
      signupGoal = -1;
    } else if (afterSignupWeight < afterSignupWeightGoal) {
      signupGoal = 1;
    } else if (afterSignupWeight === afterSignupWeightGoal) {
      signupGoal = 0;
    }

    switch (signupGoal) {
      case -1:
        welcomeDescrGoalText = t('lp.welcome.text.lose', {
          AMOUNT: t(I18N_MEASUREMENT, {
            COUNT: afterSignupWeight - afterSignupWeightGoal,
          }),
          NAME: afterSignupName,
          PERIOD: getShortDate(afterSignupPredictDate),
        });
        break;

      case 0:
        welcomeDescrGoalText = t('lp.welcome.text.keep', {
          NAME: afterSignupName,
        });
        break;

      case 1:
        welcomeDescrGoalText = t('lp.welcome.text.gain', {
          AMOUNT: t(I18N_MEASUREMENT, {
            COUNT: afterSignupWeightGoal - afterSignupWeight,
          }),
          NAME: afterSignupName,
          PERIOD: getShortDate(afterSignupPredictDate),
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

  const scrollToTariffsSelectForm = (e) => {
    e.preventDefault();
    scrollToElement(selectPlanBlockRef?.current, -30);
  };

  const scrollToCheckoutForm = () => {
    scrollToElement(paymentFormBlockRef?.current, -30);
  };

  const isShowPartners = () => language === 'br';

  const getPaymentFlowType = () => {
    let paymentFlow = null;

    const paymentFlowData = window['dataLayer']?.find((data) => data['payment_flow']);

    if (paymentFlowData) {
      paymentFlow = paymentFlowData['payment_flow'];
    }

    return paymentFlow;
  };

  return (
    <>
      <Helmet>
        <title>{t('app.title.after_signup')}</title>
        <script src='https://player.vimeo.com/api/player.js' />
      </Helmet>

      <section className='after-signup-tpl'>
        <section className='after-signup-header-sect'>
          <div className='container'>
            <div className='row'>
              <div className='col-12'>

                <div className='col-xl-6 mb-4 text-center text-xl-left'>
                  <h1 className='fw-bold'>{t('lp.welcome.title', { NAME: afterSignupName })}</h1>
                </div>

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

                <ContentLoading
                  isLoading={tariffsLoading}
                  isError={tariffsLoadingError}
                  fetchData={() => getUserTariffs()}
                >
                  {tariffsDataList.length > 0 && (
                    <h4
                      className='fw-regular'
                      dangerouslySetInnerHTML={{
                        __html: t(tariffsDataList?.[1]?.country === 'br' ? 'lp.selling_text.br' : 'lp.selling_text', {
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
                    onClick={scrollToTariffsSelectForm}
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
        </section>

        <section ref={introBlockRef} className='after-signup-intro-sect'>
          <div className='container'>
            <div className='row'>
              <div className='col-12 text-center'>

                {isShowPartners() && (
                  <div className='mb-4'>
                    <h5 className='fw-bold'>{t('lp.partners_list.title')}</h5>

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
              <div className='col-lg-8 offset-lg-4 mb-45 mb-lg-0 pl-xl-5 after-signup-intro-content-col'>

                <h2>{t('lp.intro.title')}</h2>

              </div>
              <div className='col-lg-8 order-2 pl-xl-5 mt-lg-0 after-signup-intro-content-col'>

                <img className='after-signup-intro-arrow' src={getImagePath('point-arrow-black.png')} alt='' />

                <div dangerouslySetInnerHTML={{ __html: t('lp.intro.content') }}></div>

                <div className='after-signup-intro-content-btn mt-4 text-center text-xl-left'>
                  <Button
                    color='primary-shadow'
                    size='lg'
                    block
                    onClick={scrollToTariffsSelectForm}
                    style={{ maxWidth: '380px' }}
                  >
                    {t('button.activate_plan')}
                  </Button>

                  <img className='after-signup-start-today-arrow' src={getImagePath('point-arrow-yellow.png')} alt='' />
                </div>

              </div>
              <div className='col-lg-4 order-1 mt-5 mt-md-0 mb-4 text-center text-lg-left'>

                <button
                  type='button'
                  onClick={scrollToTariffsSelectForm}
                  className='after-signup-image-button'
                >
                  <img
                    src={getImagePath('fitlope-app-screens.png')}
                    alt=''
                    className='img-fluid'
                  />
                </button>

              </div>
            </div>
          </div>
        </section>

        <section className='after-signup-reviews-sect'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-6 order-md-2 mb-5 mt-md-0 text-center'>

                <button
                  type='button'
                  onClick={scrollToTariffsSelectForm}
                  className='after-signup-image-button'
                >
                  <img className='img-fluid' src={getImagePath('dishes.png')} alt='' />
                </button>

              </div>
              <div className='col-md-6 col-xl-5 offset-xl-1'>

                <h2 className='fw-bold'>{t('lp.reviews.title')}</h2>
                <p className='mt-45' dangerouslySetInnerHTML={{ __html: t('lp.reviews.descr') }} />
                <h4 className='mt-4 fw-bold'>{t('lp.reviews.subtitle')}</h4>

                <ContentLoading
                  isLoading={reviewsLoading}
                  isError={reviewsLoadingError}
                  fetchData={() => getUserReviews()}
                >
                  {reviewsList.length > 0 && (
                    <div className='app-review-rate-single mt-4 mt-xl-5'>
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
                </ContentLoading>

                <div className='after-signup-reviews-btn-col mt-4 mt-xl-5 text-center text-xl-left'>
                  <Button
                    color='primary-shadow'
                    size='lg'
                    onClick={scrollToTariffsSelectForm}
                  >
                    {t('button.select_plan')}
                  </Button>

                  <img className='after-signup-start-today-arrow' src={getImagePath('point-arrow-yellow.png')} alt='' />
                </div>

              </div>
            </div>
          </div>
        </section>

        <section className='after-signup-expect-sect'>
          <div className='container'>
            <div className='row'>
              <div className='col-xl-6'>

                <h2 className='mb-4 mb-xl-5 fw-bold'>{t('lp.advantages.title')}</h2>

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
                    onClick={scrollToTariffsSelectForm}
                    className='after-signup-image-button'
                  >
                    <img src={t('checkout.social.img')} className='img-fluid' alt='' />
                  </button>

                  </div>
                  <div className='col-md-6 mt-4 mt-md-0 text-center'>

                    <button
                      type='button'
                      onClick={scrollToTariffsSelectForm}
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

                <h2 className='sect-title title-center'>{t('lp.start_today.title')}</h2>

                <ContentLoading
                  isLoading={tariffsLoading}
                  isError={tariffsLoadingError}
                  fetchData={() => getUserTariffs()}
                >
                  {tariffsDataList.length > 0 && (
                    <h2
                      className='fw-regular mt-4 text-left text-lg-center'
                      dangerouslySetInnerHTML={{
                        __html: t(tariffsDataList?.[1]?.country === 'br' ? 'lp.selling_text.br' : 'lp.selling_text', {
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
                    onClick={scrollToTariffsSelectForm}
                    style={{ maxWidth: '500px' }}
                  >
                    {t('button.activate_plan')}
                  </Button>

                  <img className='after-signup-start-today-arrow' src={getImagePath('point-arrow-yellow.png')} alt='' />
                </div>

                {isShowPartners() && (
                  <div className='app-partners-list__wrap mt-5'>
                    <h5 className='app-partners-list__title'>{t('lp.partners_list.title')}</h5>

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
                  <div
                    ref={selectPlanBlockRef}
                    id='selectTariffPlanBlock'
                    className={classNames({
                      'col-md-6': getPaymentFlowType() === '2',
                      'col-md-7': getPaymentFlowType() !== '2',
                    })}
                  >

                    <h2 className='mb-4 mb-xl-5 fw-bold text-center'>
                      {t('lp.select_plan.title')}
                    </h2>

                    <ContentLoading
                      isLoading={tariffsLoading}
                      isError={tariffsLoadingError}
                      fetchData={() => getUserTariffs()}
                    >
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
                          changeSetting('activeTariffIdToPay', id);
                        }}
                        specialOfferIndex={1}
                        localePhrases={localePhrases}
                      />

                      {getPaymentFlowType() !== '2' && (
                        <div className='text-center'>
                          <Link to={routes.checkout} className='mt-5 link-raw'>
                            <Button color='primary' size='lg' disabled={!getActiveTariffData()}>
                              {t('button.confirm.tariff')}
                            </Button>
                          </Link>

                          {!getActiveTariffData() && (
                            <div>
                              <button
                                type='button'
                                className='checkout_tariff_error'
                                onClick={scrollToTariffsSelectForm}
                              >
                                {t('checkout.tariff.select.error.msg')}
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </ContentLoading>

                    {(debounceWindowWidth > 768 && getPaymentFlowType() === '2') && (
                      <>
                        <h2 className='mt-5 mb-4 mb-xl-5 fw-bold text-center text-md-left'>
                          {t('lp.plan.advantages.title')}
                        </h2>

                        <div className='advantages-checklist'>
                          {Array(5).fill(1).map((el) => uuid()).map((id, index) => (
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

                        <Link to={routes.checkout} className='link-raw'>
                          <div className='text-center'>
                            <img
                              src={t('checkout.safe.img2')}
                              className='img-fluid mt-4'
                              style={{ maxWidth: '70%' }}
                              alt=''
                            />
                          </div>
                        </Link>
                      </>
                    )}

                  </div>
                  {getPaymentFlowType() === '2' && (
                    <div className='col-md-6 pl-xl-5 mt-4 mt-md-0'>

                      {!tariffsLoading && !tariffsLoadingError ? (
                        <div ref={paymentFormBlockRef}>
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
                      ) : null}

                    </div>
                  )}
                  {debounceWindowWidth <= 768 || getPaymentFlowType() !== '2' ? (
                    <div
                      className={classNames('mt-45 mt-md-0', {
                        'col-md-6': getPaymentFlowType() === '2',
                        'col-md-5': getPaymentFlowType() !== '2',
                      })}
                    >

                      <h2 className='mb-4 mb-xl-5 fw-bold text-center text-md-left'>{t('lp.plan.advantages.title')}</h2>

                      <div className='advantages-checklist'>
                        {Array(5).fill(1).map((el) => uuid()).map((id, index) => (
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

                      <Link to={routes.checkout} className='link-raw'>
                        <div className='text-center'>
                          <img
                            src={t('checkout.safe.img2')}
                            className='img-fluid mt-4'
                            style={{ maxWidth: '70%' }}
                            alt=''
                          />
                        </div>
                      </Link>

                    </div>
                  ) : null}
                </div>

              </div>
            </div>
          </div>
        </section>
      </section>

      {/* <SalesWidgets
        isShow={!isActiveWidgetsOnMobile}
        isStartShow={isStartActiveWidgets}
      /> */}
    </>
  );
};

export default WithTranslate(
  connect(
    (state: any) => ({
      measurement: state.settings.measurement,
      language: state.settings.language,
      isAfterSignup: state.storage.isAfterSignup,
      afterSignupName: state.storage.afterSignupName,
      afterSignupWeight: state.storage.afterSignupWeight,
      afterSignupWeightGoal: state.storage.afterSignupWeightGoal,
      afterSignupPredictDate: state.storage.afterSignupPredictDate,
      afterSignupNameFirstSection: state.storage.afterSignupNameFirstSection,
      activeTariffIdToPay: state.storage.activeTariffIdToPay,
    }),
    { changeSettingAction },
  )(RegisterWelcomePage),
);
