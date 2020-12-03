/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import classNames from 'classnames';
import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
  getTranslate,
  scrollToElement,
  convertTime,
} from 'utils';
import Helmet from 'react-helmet';
import { InputError } from 'types';
import { routes } from 'constants/routes';
import queryString from 'query-string';
import {
  getAppTariffs,
  fetchUserProfile,
  getPaymentStatus,
} from 'api';

// Components
import Logo from 'components/Logo';
import Button from 'components/common/Forms/Button';
import WithTranslate from 'components/hoc/WithTranslate';
import Spinner from 'components/common/Spinner';
import Modal from 'components/common/Modal';
import ContentLoading from 'components/hoc/ContentLoading';
import FormValidatorUtil from 'utils/FormValidator';
// import SalesWidgets from 'components/SalesWidgets';
import TariffPlanSelect from 'components/TariffPlanSelect';
import CheckoutPaymentFormCard from 'components/CheckoutPaymentFormCard';

import './CheckoutPage.sass';

import metropolisLogoImg from 'assets/img/partners/metropolis.png';
import igLogoImg from 'assets/img/partners/ig.png';
import terraLogoImg from 'assets/img/partners/terra.png';
import defatoLogoImg from 'assets/img/partners/defato.png';

import { ReactComponent as RewardIcon } from 'assets/img/icons/reward-gold-icon.svg';

const checkoutFormDefault = {
  payment_type: 'credit_card',
  discount_code: null,
};

const CheckoutPage = ({
  settings,
  storage,
  history,
  location,
  localePhrases,
}: any) => {
  const t = (code: string, placeholders?: any) =>
    getTranslate(localePhrases, code, placeholders);

  const { order: orderId } = queryString.parse(location.search);

  const [checkoutForm, setCheckoutForm] = useState({ ...checkoutFormDefault });
  const [checkoutFormErrors, setCheckoutFormErrors] = useState<InputError[]>([]);

  const [tariffsDataList, setTariffsDataList] = useState<any[]>([]);
  const [tariffsLoading, setTariffsLoading] = useState<boolean>(false);
  const [tariffsLoadingError, setTariffsLoadingError] = useState<boolean>(false);

  const [activeTariffId, setActiveTariffId] = useState<any>(null);

  const [paymentStatusData, setPaymentStatusData] = useState<any>(null);
  const [paymentStatusLoading, setPaymentStatusLoading] = useState<boolean>(false);
  const [paymentStatusLoadingError, setPaymentStatusLoadingError] = useState<boolean>(false);
  const [paymentStatusError, setPaymentStatusError] = useState<boolean>(false);

  const [profileData, setProfileData] = useState<any>({
    name: t('checkout.title.user_name'),
    firstname: null,
    lastname: null,
    weightDifference: null,
    goal: null,
  });
  const [profileLoading, setProfileLoading] = useState<boolean>(true);

  const [isWarningModalOpen, setWarningModalOpen] = useState<boolean>(false);

  const selectPlanBlockRef = useRef(null);
  const paymentFormBlockRef = useRef(null);

  const getUserPaymentStatus = () => {
    setPaymentStatusLoading(true);
    setPaymentStatusLoadingError(false);

    getPaymentStatus(orderId.toString())
      .then(({ data }) => {
        if (data.success && data.data) {
          const paymentStatus = data.data;

          setPaymentStatusData({
            ...paymentStatus,
            errors_i18n: paymentStatus.errors_i18n
              ? paymentStatus.errors_i18n.filter((error) => error.length > 0)
              : [],
          });

          if (paymentStatus.status === 'fail') {
            setPaymentStatusError(true);
          } else {
            history.push({
              pathname: routes.checkoutThankyou,
              orderTransactionId: paymentStatus.order_number,
              orderAmount: paymentStatus.amount_usd,
            });
          }
        } else {
          setPaymentStatusError(true);
        }
      })
      .catch(() => {
        setPaymentStatusLoadingError(true);
      })
      .finally(() => {
        setPaymentStatusLoading(false);
      });
  };

  const getUserProfile = () => {
    setProfileLoading(true);

    fetchUserProfile()
      .then(({ data }) => {
        setProfileLoading(false);

        if (data.success && data.data) {
          const weightDifference = Math.abs(data.data?.weight - data.data?.weight_goal);

          setProfileData({
            name: data.data.name || t('checkout.title.user_name'),
            firstname: data.data.name || '',
            lastname: data.data.surname || '',
            weightDifference: weightDifference || null,
            goal: data.data.goal,
          });
        } else {
          setProfileData({
            name: t('checkout.title.user_name'),
          });
        }
      })
      .catch(() => {
        setProfileLoading(false);

        setProfileData({
          name: t('checkout.title.user_name'),
        });
      });
  };

  const getPhraseInReservedBlock = () => {
    let translation = null;
    switch (profileData.goal) {
      case -1:
        translation = t('checkout.reserved_block.descr.lose_weight', {
          COUNT: settings.measurement === 'si' ? (
            t('common.kg', { COUNT: profileData.weightDifference })
          ) : (
            t('common.oz', { COUNT: profileData.weightDifference })
          ),
          PERIOD: convertTime(storage.afterSignupPredictDate, settings.language),
        });
        break;
      case 0:
        translation = t('checkout.reserved_block.descr.keep_weight', {
          PERIOD: convertTime(storage.afterSignupPredictDate, settings.language),
        });
        break;
      case 1:
        translation = t('checkout.reserved_block.descr.lift_weight', {
          COUNT: settings.measurement === 'si' ? (
            t('common.kg', { COUNT: profileData.weightDifference })
          ) : (
            t('common.oz', { COUNT: profileData.weightDifference })
          ),
          PERIOD: convertTime(storage.afterSignupPredictDate, settings.language),
        });
        break;

      default:
        break;
    }
    return translation;
  };

  const getUserTariffs = () => {
    setTariffsLoading(true);
    setTariffsLoadingError(false);

    getAppTariffs()
      .then(({ data }) => {
        if (data.success && data.data) {
          if (data.data.length) {
            setTariffsDataList(data.data);

            if (data.data.length > 2) {
              setActiveTariffId(data.data[1]?.tariff);
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

  useEffect(() => {
    getUserTariffs();
    getUserProfile();

    if (orderId) {
      getUserPaymentStatus();
    }

    document.querySelector('.layoutMainWrapper')?.classList.add('checkout_layout');

    return () => {
      document.querySelector('.layoutMainWrapper')?.classList.remove('checkout_layout');
    };
  }, []);

  const FormValidator = FormValidatorUtil(localePhrases);

  const validateOnChange = (name: string, value: any, event, element?) => {
    validateFieldOnChange(
      name,
      value,
      event,
      checkoutForm,
      setCheckoutForm,
      checkoutFormErrors,
      setCheckoutFormErrors,
      localePhrases,
      element,
    );
  };

  const getFieldErrors = (field: string) =>
    getFieldErrorsUtil(field, checkoutFormErrors);

  const getActiveTariffData = () => {
    const activeTariff = tariffsDataList.find((tariff) => tariff.tariff === activeTariffId);
    return activeTariff;
  };

  const getTariffDataValue = (property: string) => {
    let dataEl = null;
    const tariffData = getActiveTariffData();

    if (tariffData && tariffData[property]) {
      dataEl = tariffData[property];
    }

    return dataEl;
  };

  const checkoutDiscountFormSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const inputs = [...form.elements].filter((i) =>
      ['INPUT', 'SELECT', 'TEXTAREA'].includes(i.nodeName));

    const { errors, hasError } = FormValidator.bulkValidate(inputs);

    setCheckoutFormErrors([
      ...checkoutFormErrors,
      ...errors,
    ]);

    if (!hasError) {}
  };

  const isShowPartners = () => settings.language === 'br';

  const scrollToCheckoutForm = () => {
    scrollToElement(paymentFormBlockRef?.current, -30);
  };

  return (
    <>
      <Helmet>
        <title>{t('app.title.checkout')}</title>
      </Helmet>

      <Modal
        isOpen={isWarningModalOpen}
        onClose={() => setWarningModalOpen(false)}
        className='checkout-warning-modal'
      >
        <Modal.Main>
          <h5 className='checkout-warning-modal__title'>{t('checkout.warning_modal.title')}</h5>
          <p className='checkout-warning-modal__descr'>{t('checkout.warning_modal.descr')}</p>
          <Button className='checkout-warning-modal__btn' block color='mint'>{t('checkout.warning_modal.btn')}</Button>
        </Modal.Main>
      </Modal>

      {/* <SalesWidgets /> */}

      <section className='checkout-logo-sect'>
        <div className='container'>
          <div className='row'>
            <div className='col-12 text-center text-xl-left'>

              <Logo raw />

            </div>
          </div>
        </div>
      </section>

      <ContentLoading
        isLoading={paymentStatusLoading}
        isError={paymentStatusLoadingError}
        fetchData={() => getUserPaymentStatus()}
        spinSize='lg'
      >
        <section className='checkout-tpl-sect'>
          <div className='container'>
            <div className='row'>
              <div className='col-12'>

                <div className='checkout-tpl-container'>
                  <div className='checkout-tpl-title'>
                    Last Step: Activate your exclusive meal plan below
                  </div>
                  <div className='checkout-rewards-block'>

                    {isShowPartners() && (
                      <div className='app-partners-list__wrap mt-45'>
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

                  <div className='checkout-form-container'>
                    <div className='checkout-reserved-top-block'>
                      <h3 className='checkout-reserved-top-block__title'>
                        <b>
                          {`${profileData.firstname} ${profileData.lastname} `}
                        </b>
                        {t('checkout.reserved_block.title')}
                      </h3>
                        {(storage.afterSignupPredictDate) && (
                          <p className='checkout-reserved-top-block__descr'>
                            {getPhraseInReservedBlock()}
                          </p>
                        )}
                      <p className='checkout-reserved-top-block__countdown_title'>
                        {t('checkout.reserved_block.countdown.title')}
                      </p>
                    </div>

                    <div ref={selectPlanBlockRef} id='selectTariffPlanBlock' className='mt-4 mt-xl-5'>
                      <h2 className='mb-4 fw-bold text-center'>
                        {t('lp.select_plan_title')}
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
                          }}
                          specialOfferIndex={1}
                          localePhrases={localePhrases}
                        />
                      </ContentLoading>
                    </div>

                    <div
                      ref={paymentFormBlockRef}
                      className={classNames('mt-4 mt-xl-5', {
                        'd-none': !getActiveTariffData(),
                      })}
                    >
                      <h3 className='mb-4 fw-bold text-center'>
                        {t('lp.select_payment.title')}
                      </h3>

                      <CheckoutPaymentFormCard
                        tariff={getActiveTariffData() || (tariffsDataList.length > 0 ? tariffsDataList[0] : null)}
                        disabled={!getActiveTariffData()}
                        scrollRef={selectPlanBlockRef}
                        isPaymentError={paymentStatusError}
                        paymentErrors={paymentStatusData ? paymentStatusData.errors_i18n : []}
                        history={history}
                        localePhrases={localePhrases}
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        <section className='checkout-reserved-block'>
          <div className='container'>
            <div className='row'>
              <div className='col-12'>

                <h4 className='checkout-reserved-block__title'>
                  {t('lp.bottom_countdown_title')}
                  {' '}
                </h4>

              </div>
            </div>
          </div>
        </section>
      </ContentLoading>
    </>
  );
};

export default WithTranslate(
  connect(
    (state: any) => ({
      settings: state.settings,
      storage: state.storage,
    }),
  )(CheckoutPage),
);
