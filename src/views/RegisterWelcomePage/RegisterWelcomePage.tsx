import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import uuid from 'react-uuid';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import {
  getTranslate,
  getImagePath,
  scrollToElement,
  convertTime,
  getPaymentFlowType,
} from 'utils';
import { routes } from 'constants/routes';
import { changeSetting as changeSettingAction } from 'store/actions';
import useWindowSize from 'components/hooks/useWindowSize';
import useDebounce from 'components/hooks/useDebounce';
// import { getAppTariffs, getAppReviews } from 'api';
import { getAppTariffs, getAppSingleTariff } from 'api';

// Components
import WithTranslate from 'components/hoc/WithTranslate';
import ContentLoading from 'components/hoc/ContentLoading';
import Button from 'components/common/Forms/Button';
import CheckoutPaymentFormCard from 'components/CheckoutPaymentFormCard';
import DietExpectationsChart from 'components/DietExpectationsChart';
import TariffPlanSelect from 'components/TariffPlanSelect';
import SalesWidgets from 'components/SalesWidgets';
import RawCountDown from 'components/common/RawCountDown';

import './RegisterWelcomePage.sass';

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

  // const [reviewsLoading, setReviewsLoading] = useState<boolean>(false);
  // const [reviewsLoadingError, setReviewsLoadingError] = useState<boolean>(false);

  // const [reviewsList, setReviewsList] = useState<any[]>([]);

  const [tariffsDataList, setTariffsDataList] = useState<any[]>([]);
  const [tariffsLoading, setTariffsLoading] = useState<boolean>(true);
  const [tariffsLoadingError, setTariffsLoadingError] = useState<boolean>(false);

  const [activeTariffId, setActiveTariffId] = useState<any>(null);

  const [isShowWidgets, setIsShowWidgets] = useState(true);
  const [isStartShowWidgets, setIsStartShowWidgets] = useState<boolean>(false);

  const [welcomeVideoPlayerInstance, setWelcomeVideoPlayerInstance] = useState<any>(null);

  const [isPaymentDisabled, setPaymentDisabled] = useState<boolean>(false);

  const selectPlanBlockRef = useRef(null);
  const paymentFormBlockRef = useRef(null);
  const introBlockRef = useRef(null);

  const getUserTariffs = () => {
    setTariffsLoading(true);
    setTariffsLoadingError(false);

    const paymentFlowType = getPaymentFlowType();
    const getTariffsApi = paymentFlowType === '1' ? getAppSingleTariff() : getAppTariffs();

    getTariffsApi
      .then(({ data }) => {
        const responseData = data?.data;

        if (data.success && responseData) {
          if (responseData.length) {
            setTariffsDataList(responseData);

            if (activeTariffIdToPay) {
              setActiveTariffId(activeTariffIdToPay);
            }
          } else if (paymentFlowType === '1') {
            setTariffsDataList([responseData]);
            setActiveTariffId(responseData.tariff);
            changeSetting('isSelectedTariffOnWelcomePage', responseData.tariff);
            changeSetting('activeTariffIdToPay', responseData.tariff);
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

  // const getUserReviews = () => {
  //   setReviewsLoading(true);
  //   setReviewsLoadingError(false);

  //   getAppReviews()
  //     .then(({ data }) => {
  //       setReviewsLoading(false);

  //       if (data.data && data.data.length) {
  //         setReviewsList(data.data.map((review) => ({
  //           ...review,
  //           id: uuid(),
  //         })));
  //       }
  //     })
  //     .catch(() => {
  //       setReviewsLoading(false);
  //       setReviewsLoadingError(true);
  //     });
  // };

  const documentScrollHandle = () => {
    const mainPromoHeader = document.getElementById('mainPromoHeader');
    const selectTariffPlanBlock = document.getElementById('selectTariffPlanBlock');
    const welcomePartnersBlock = document.getElementById('welcomePartnersBlock');

    if (!mainPromoHeader || !selectTariffPlanBlock || !welcomePartnersBlock) {
      return false;
    }

    const welcomeVideo = document.querySelector('.after-signup-video-frame');
    let welcomeVideoPlayer = welcomeVideoPlayerInstance;

    if (!welcomeVideoPlayer && window.Vimeo) {
      welcomeVideoPlayer = new window.Vimeo.Player(welcomeVideo);
      setWelcomeVideoPlayerInstance(welcomeVideoPlayer);
    }

    if (welcomeVideo?.getBoundingClientRect().top < -100) {
      welcomeVideoPlayer?.pause();
    }

    if (
      introBlockRef?.current?.getBoundingClientRect().top <= 0 &&
      welcomePartnersBlock.getBoundingClientRect().top > 82
    ) {
      if (!mainPromoHeader.classList.contains('fixed-top')) {
        mainPromoHeader.classList.add('fixed-top');
      }
    } else if (mainPromoHeader.classList.contains('fixed-top')) {
      mainPromoHeader.classList.remove('fixed-top');
    }

    if (introBlockRef?.current?.getBoundingClientRect().top - window.innerHeight < 0) {
      setIsStartShowWidgets(true);
    }

    if (debounceWindowWidth <= 576) {
      if (
        selectTariffPlanBlock.getBoundingClientRect().top > window.innerHeight ||
        selectTariffPlanBlock.getBoundingClientRect().bottom < 0
      ) {
        setIsShowWidgets(true);
      } else {
        setIsShowWidgets(false);
      }
    }
  };

  const t = (code: string, placeholders?: any) =>
    getTranslate(localePhrases, code, placeholders);

  useEffect(() => {
    getUserTariffs();
    // getUserReviews();
  }, []);

  useEffect(() => {
    document.addEventListener('scroll', documentScrollHandle);

    documentScrollHandle();

    return () => {
      document.removeEventListener('scroll', documentScrollHandle);
    };
  }, [debounceWindowWidth]);

  const getShortDate = (timestamp: number) => {
    let predictedDateFormatted = '';

    if (new Date(timestamp).getFullYear() === new Date().getFullYear()) {
      predictedDateFormatted = convertTime(timestamp, language, { day: 'numeric', month: 'short' });
    } else {
      predictedDateFormatted = convertTime(timestamp, language, { day: 'numeric', month: 'short', year: 'numeric' });
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

  const welcomeButtonHandle = (e) => {
    e.preventDefault();

    if (getPaymentFlowType() === '1') {
      history.push(routes.checkout);
    } else {
      const scrollBlock = document.getElementById('welcomePartnersBlock');
      if (scrollBlock) {
        scrollToElement(scrollBlock, -82);
      }
    }
  };

  const scrollToCheckoutForm = () => {
    scrollToElement(paymentFormBlockRef?.current, -30);
  };

  const getWelcomeHeadlLineTextVersion1 = () => {
    const tariffData = getPaymentFlowType() === '1' ? tariffsDataList?.[0] : tariffsDataList?.[1];

    return (
      t(tariffData?.country === 'br' ? 'welcome.desc.br1' : 'welcome.desc1', {
        OLD_VALUE: tariffData?.country === 'br'
        ? tariffData?.installments?.price_old_monthly_text
        : tariffData.price_old_weekly_text,
        AMOUNT: tariffData?.country === 'br'
          ? tariffData?.installments?.price_monthly_text
          : tariffData.price_weekly_text,
      })
    );
  };

  const getWelcomeHeadlLineText = () => {
    let headlineVersion = null;

    const headlineVersionData = window.dataLayer?.find((data) => data.headline_version);

    if (headlineVersionData) {
      headlineVersion = headlineVersionData.headline_version;
    }

    switch (headlineVersion?.toString()) {
      case '2':
        headlineVersion = t('welcome.title2');
        break;

      case '3':
        headlineVersion = t('welcome.title3');
        break;

      case '4':
        headlineVersion = t('welcome.title4');
        break;

      default:
        headlineVersion = t('welcome.title1');
        break;
    }

    return headlineVersion;
  };

  const getVideoAutoplay = () => {
    let videoAutoplay = null;

    const videoAutoplayData = window.dataLayer?.find((data) => data.video_autoplay_on);

    if (videoAutoplayData) {
      videoAutoplay = videoAutoplayData.video_autoplay_on;
    }

    switch (videoAutoplay?.toString()) {
      case '1':
        videoAutoplay = '?autoplay=1';
        break;

      default:
        videoAutoplay = '?autoplay=0';
        break;
    }

    return videoAutoplay;
  };

  const getWelcomeDescriptionText = () => {
    let descriptionVersion = null;

    const descriptionVersionData = window.dataLayer?.find((data) => data.description_version);

    if (descriptionVersionData) {
      descriptionVersion = descriptionVersionData.description_version;
    }

    switch (descriptionVersion?.toString()) {
      case '2':
        descriptionVersion = t('welcome.desc2');
        break;

      case '3':
        descriptionVersion = t('welcome.desc3');
        break;

      case '4':
        descriptionVersion = t('welcome.desc4');
        break;

      default:
        descriptionVersion = getWelcomeHeadlLineTextVersion1();
        break;
    }

    return descriptionVersion;
  };

  const getVideoLocation = () => {
    let videoLocation = null;

    const videoLocationData = window.dataLayer?.find((data) => data.video_location);

    if (videoLocationData) {
      videoLocation = videoLocationData.video_location.toString();
    } else {
      videoLocation = '1';
    }

    return videoLocation;
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

                <div className='col-xl-6 mb-4 p-0 text-center text-xl-left'>
                  <h1 className='fw-bold'>{getWelcomeHeadlLineText()}</h1>
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
                    <>
                      {getVideoLocation() === '1' && (
                        <iframe
                          className='after-signup-video-frame'
                          title={t('lp.video.title')}
                          src={`https://player.vimeo.com/video/${t('lp.video.vimeo.id')}${getVideoAutoplay()}`}
                          allow='autoplay'
                          width='100%'
                          height='400'
                        />
                      )}
                      {getVideoLocation() === '2' && (
                        <div className='text-xl-right text-center'>
                          <button
                            type='button'
                            onClick={welcomeButtonHandle}
                            className='after-signup-image-button'
                          >
                            <img
                              src={getImagePath('fitlope-app-screens.png')}
                              alt=''
                              className='img-fluid'
                            />
                          </button>
                        </div>
                      )}
                    </>
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
                    <h4 className='fw-regular' dangerouslySetInnerHTML={{ __html: getWelcomeDescriptionText() }} />
                  )}
                </ContentLoading>

                {/* <div className='after-signup-header-btn-col'>
                  <Link
                    to={routes.checkout}
                    onClick={(e) => {
                      if (!activeTariffIdToPay) {
                        e.preventDefault();
                        welcomeButtonHandle(e);
                      }
                    }}
                    className='link-raw'
                  >
                    <Button
                      pulse
                      color='primary-shadow'
                      className='mt-3'
                      size='lg'
                    >
                      {t('button.select_plan')}
                    </Button>
                  </Link>

                  <img className='after-signup-header-arrow' src={getImagePath('point-arrow-yellow.png')} alt='' />
                </div> */}

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

                <div className='mb-4'>
                  <h5 className='app-partners-list__title'>{t('lp.partners_list.title')}</h5>

                  <div className='app-partners-list'>
                    <span
                      className='app-partners-list__item'
                      style={{ backgroundImage: `url(${t('lp.partners.img1')})` }}
                    />
                    <span
                      className='app-partners-list__item'
                      style={{ backgroundImage: `url(${t('lp.partners.img2')})` }}
                    />
                    <span
                      className='app-partners-list__item'
                      style={{ backgroundImage: `url(${t('lp.partners.img3')})` }}
                    />
                    <span
                      className='app-partners-list__item'
                      style={{ backgroundImage: `url(${t('lp.partners.img4')})` }}
                    />
                  </div>
                </div>

              </div>
              <div className='col-lg-8 offset-lg-4 mb-45 mb-lg-0 pl-xl-5 after-signup-intro-content-col'>

                <h2>{t('lp.intro.title')}</h2>

              </div>
              <div className='col-lg-8 order-2 pl-xl-5 mt-lg-0 after-signup-intro-content-col'>

                <img className='after-signup-intro-arrow' src={getImagePath('point-arrow-black.png')} alt='' />

                <div dangerouslySetInnerHTML={{ __html: t('lp.intro.content') }}></div>

                {/* <div className='after-signup-intro-content-btn mt-4 text-center text-xl-left'>
                  <Link
                    to={routes.checkout}
                    onClick={(e) => {
                      if (!activeTariffIdToPay) {
                        e.preventDefault();
                        welcomeButtonHandle(e);
                      }
                    }}
                    className='link-raw'
                  >
                    <Button
                      block
                      color='primary-shadow'
                      size='lg'
                      style={{ maxWidth: '380px' }}
                    >
                      {t('button.activate_plan')}
                    </Button>
                  </Link>

                  <img className='after-signup-start-today-arrow' src={getImagePath('point-arrow-yellow.png')} alt='' />
                </div> */}

              </div>
              <div className='col-lg-4 order-1 mb-4 mb-lg-0 text-center text-lg-left'>

                {getVideoLocation() === '1' && (
                  <button
                    type='button'
                    onClick={welcomeButtonHandle}
                    className='after-signup-image-button'
                  >
                    <img
                      src={getImagePath('fitlope-app-screens.png')}
                      alt=''
                      className='img-fluid'
                    />
                  </button>
                )}

                {getVideoLocation() === '2' && (
                  <iframe
                    className='after-signup-video-frame'
                    title={t('lp.video.title')}
                    src={`https://player.vimeo.com/video/${t('lp.video.vimeo.id')}${getVideoAutoplay()}`}
                    allow='autoplay'
                    width='100%'
                    height='200px'
                  />
                )}

              </div>
            </div>
          </div>
        </section>

        <section className='after-signup-reviews-sect'>
          <div className='container'>
            <div className='row'>
              <div className='col-12 mb-45'>

                <div className='row'>
                  <div className='col-lg-6'>

                    <h2 className='fw-bold'>{t('lp.reviews.title')}</h2>

                  </div>
                </div>

              </div>
              <div className='col-lg-6 order-lg-3 mb-5 mb-lg-0 after-signup-image-button-col text-center'>

                <button
                  type='button'
                  onClick={welcomeButtonHandle}
                  className='after-signup-image-button'
                >
                  <img className='img-fluid' src={getImagePath('review-info-img.png')} alt='' />
                </button>

              </div>
              <div className='col-lg-6'>

                <p dangerouslySetInnerHTML={{ __html: t('lp.reviews.descr') }} />
                <h4 className='mt-4 fw-bold'>{t('lp.reviews.subtitle')}</h4>

                {/* <ContentLoading
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
                </ContentLoading> */}

                {/* <div className='after-signup-reviews-btn-col mt-4 mt-xl-5 text-center text-xl-left'>
                  <Link
                    to={routes.checkout}
                    onClick={(e) => {
                      if (!activeTariffIdToPay) {
                        e.preventDefault();
                        welcomeButtonHandle(e);
                      }
                    }}
                    className='link-raw'
                  >
                    <Button
                      color='primary-shadow'
                      size='lg'
                    >
                      {t('button.select_plan')}
                    </Button>
                  </Link>

                  <img className='after-signup-start-today-arrow' src={getImagePath('point-arrow-yellow.png')} alt='' />
                </div> */}

              </div>
            </div>
          </div>
        </section>

        <section className='after-signup-expect-sect'>
          <div className='container'>
            <div className='row'>
              <div className='col-xl-9 offset-xl-3'>

                <h2 className='mb-4 fw-bold text-center text-xl-left'>{t('lp.advantages.title')}</h2>

              </div>
              <div className='col-xl-3 order-xl-1 after-signup-expect-image-col'>

                <button
                  type='button'
                  onClick={welcomeButtonHandle}
                  className='after-signup-image-button'
                >
                  <img className='img-fluid' src={getImagePath('dishes.png')} alt='' />
                </button>

              </div>
              <div className='col-xl-9 order-xl-2 mt-5 mt-xl-0'>

                <div className='app-advantages-list'>
                  {Array(5).fill(1).map(() => uuid()).map((id, index) => (
                    <div className='app-advantages-list__item'>{t(`lp.advantage_${index + 1}`)}</div>
                  ))}
                </div>

              </div>
              <div className='col-12 order-xl-4 mt-4 mt-xl-0'>

                <div className='row'>
                  <div className='col-md-6 text-center'>

                  <button
                    type='button'
                    onClick={welcomeButtonHandle}
                    className='after-signup-image-button'
                  >
                    <img src={t('checkout.social.img')} className='img-fluid' alt='' />
                  </button>

                  </div>
                  <div className='col-md-6 mt-4 mt-md-0 text-center'>

                    <button
                      type='button'
                      onClick={welcomeButtonHandle}
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
              <div className='col-xl-8 offset-xl-2 after-signup-start-today-col text-center'>

                <h2 className='sect-title title-center'>{t('lp.start_today.title')}</h2>

                <h2
                  className='fw-regular mt-4 text-left text-lg-center'
                  dangerouslySetInnerHTML={{
                    __html: t('welcome.start_today.descr'),
                  }}
                />

                <div className='after-signup-start-today-btn-col'>
                  <Button
                    pulse
                    color='primary-shadow'
                    className='mt-4'
                    size='lg'
                    block
                    onClick={welcomeButtonHandle}
                    style={{ maxWidth: '500px' }}
                  >
                    {t('button.activate_plan')}
                  </Button>

                  <img className='after-signup-start-today-arrow' src={getImagePath('point-arrow-yellow.png')} alt='' />
                </div>

                <div id='welcomePartnersBlock' className='app-partners-list__wrap'>
                  <h5 className='app-partners-list__title'>{t('lp.partners_list.title')}</h5>

                  <div className='app-partners-list'>
                    <span
                      className='app-partners-list__item'
                      style={{ backgroundImage: `url(${t('lp.partners.img1')})` }}
                    />
                    <span
                      className='app-partners-list__item'
                      style={{ backgroundImage: `url(${t('lp.partners.img2')})` }}
                    />
                    <span
                      className='app-partners-list__item'
                      style={{ backgroundImage: `url(${t('lp.partners.img3')})` }}
                    />
                    <span
                      className='app-partners-list__item'
                      style={{ backgroundImage: `url(${t('lp.partners.img4')})` }}
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
                  <h3 className='checkout-reserved-top-block__title'>
                    {t('welcome.reserved_block.title')}
                  </h3>
                  <p className='checkout-reserved-top-block__descr'>
                    {t('welcome.reserved_block.descr')}
                  </p>
                  <p className='checkout-reserved-top-block__countdown_title'>
                    {t('welcome.reserved_block.countdown.title')}
                  </p>
                  <span className='checkout-reserved-top-block__countdown'>
                    <RawCountDown
                      seconds={900}
                      onEnd={() => setPaymentDisabled(true)}
                    />
                  </span>
                </div>

              </div>
              <div
                ref={selectPlanBlockRef}
                id='selectTariffPlanBlock'
                className='col-md-6'
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
                    tariffs={tariffsDataList.map((tariff) => ({
                      ...tariff,
                      disabled: isPaymentDisabled,
                    }))}
                    value={activeTariffId}
                    onChange={(id) => {
                      if (activeTariffId === null) {
                        setTimeout(() => {
                          scrollToCheckoutForm();
                        }, 100);
                      }

                      setActiveTariffId(id);
                      changeSetting('activeTariffIdToPay', id);
                      changeSetting('isSelectedTariffOnWelcomePage', true);
                    }}
                    type={getPaymentFlowType()}
                    specialOfferIndex={getPaymentFlowType() === '1' ? 0 : 1}
                    localePhrases={localePhrases}
                  />

                  {getPaymentFlowType() !== '2' && (
                    <div className='text-center'>
                      <Link
                        to={routes.checkout}
                        className='mt-5 link-raw'
                      >
                        <Button
                          color='primary'
                          size='lg'
                          arrow
                          disabled={!getActiveTariffData() || isPaymentDisabled}
                        >
                          {t('button.confirm.tariff')}
                        </Button>
                      </Link>

                      {!getActiveTariffData() && (
                        <div>
                          <button
                            type='button'
                            className='checkout_tariff_error'
                            onClick={welcomeButtonHandle}
                          >
                            {t('checkout.tariff.select.error.msg')}
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {getPaymentFlowType() === '1' && (
                    <>
                      <div className='text-center mt-5'>
                        <img
                          src={t('checkout.safe.img2')}
                          className='img-fluid'
                          alt=''
                        />
                      </div>

                      <div className='checkout_tariff_confirm_descr mt-4'>
                        {t('checkout.tariff.confirm.descr')}
                      </div>
                    </>
                  )}
                </ContentLoading>

                {(debounceWindowWidth > 768 && getPaymentFlowType() === '2') && (
                  <>
                    <h2 className='mt-5 mb-4 mb-xl-5 fw-bold text-center text-md-left'>
                      {t('lp.plan.advantages.title')}
                    </h2>

                    <div className='advantages-checklist'>
                      {Array(5).fill(1).map(() => uuid()).map((id, index) => (
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
                <div className='col-md-6 mt-45 mt-md-0 pl-xl-5'>
                  <h2 className='mb-4 mb-xl-5 fw-bold text-center text-md-left'>{t('lp.plan.advantages.title')}</h2>

                  <div className='advantages-checklist'>
                    {Array(5).fill(1).map(() => uuid()).map((id, index) => (
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

                  {getPaymentFlowType() !== '1' && (
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
                  )}

                </div>
              ) : null}
            </div>
          </div>
        </section>
      </section>

      <SalesWidgets
        isShow={isShowWidgets}
        isStartShow={isStartShowWidgets}
      />
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
