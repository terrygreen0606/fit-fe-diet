/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import {
  getTranslate,
  scrollToElement,
  getPaymentFlowType,
} from 'utils';
import Helmet from 'react-helmet';
import { routes } from 'constants/routes';
import queryString from 'query-string';
import { changeSetting as changeSettingAction } from 'store/actions';
import {
  getAppTariffs,
  getAppSingleTariff,
  getPaymentStatus,
} from 'api';

// Components
import Logo from 'components/Logo';
import Button from 'components/common/Forms/Button';
import WithTranslate from 'components/hoc/WithTranslate';
import Modal from 'components/common/Modal';
import ContentLoading from 'components/hoc/ContentLoading';
import CheckoutPaymentFormCard from 'components/CheckoutPaymentFormCard';

import './CheckoutPage.sass';

const CheckoutPage = ({
  changeSettingAction: changeSetting,
  activeTariffIdToPay,
  isSelectedTariffOnWelcomePage,
  history,
  location,
  localePhrases,
}: any) => {
  const t = (code: string, placeholders?: any) =>
    getTranslate(localePhrases, code, placeholders);

  const { order: orderId } = queryString.parse(location.search);

  const [tariffsDataList, setTariffsDataList] = useState<any[]>([]);
  const [isTariffsLoading, setIsTariffsLoading] = useState<boolean>(true);
  const [isTariffsLoadingError, setIsTariffsLoadingError] = useState<boolean>(false);

  const [activeTariffId, setActiveTariffId] = useState<any>(null);

  const [paymentStatusData, setPaymentStatusData] = useState<any>(null);
  const [isPaymentStatusLoading, setIsPaymentStatusLoading] = useState<boolean>(false);
  const [isPaymentStatusLoadingError, setIsPaymentStatusLoadingError] = useState<boolean>(false);
  const [isPaymentStatusError, setIsPaymentStatusError] = useState<boolean>(false);

  const [isWarningModalOpen, setWarningModalOpen] = useState<boolean>(false);

  const selectPlanBlockRef = useRef(null);
  const paymentFormBlockRef = useRef(null);

  const getUserPaymentStatus = () => {
    setIsPaymentStatusLoading(true);
    setIsPaymentStatusLoadingError(false);

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
            setIsPaymentStatusError(true);
          } else {
            history.push({
              pathname: routes.checkoutThankyou,
              orderTransactionId: paymentStatus.order_number,
              orderAmount: paymentStatus.amount_usd,
            });
          }
        } else {
          setIsPaymentStatusError(true);
        }
      })
      .catch(() => {
        setIsPaymentStatusLoadingError(true);
      })
      .finally(() => {
        setIsPaymentStatusLoading(false);
      });
  };

  const getUserTariffs = () => {
    setIsTariffsLoading(true);
    setIsTariffsLoadingError(false);

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
            } else if (responseData.length > 1) {
              setActiveTariffId(responseData[1].tariff);
            }
          } else if (paymentFlowType === '3') {
            setTariffsDataList([responseData]);
            setActiveTariffId(responseData.tariff);
            changeSetting('activeTariffIdToPay', responseData.tariff);
          }
        } else {
          setIsTariffsLoadingError(true);
        }
      })
      .catch(() => {
        setIsTariffsLoadingError(true);
      })
      .finally(() => {
        setIsTariffsLoading(false);
      });
  };

  useEffect(() => {
    getUserTariffs();

    if (orderId) {
      getUserPaymentStatus();
    }

    document.querySelector('.layoutMainWrapper')?.classList.add('checkout_layout');

    return () => {
      document.querySelector('.layoutMainWrapper')?.classList.remove('checkout_layout');
    };
  }, []);

  const getActiveTariffData = () => {
    const activeTariff = tariffsDataList.find((tariff) => tariff.tariff === activeTariffId);
    return activeTariff;
  };

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
          <Button
            className='checkout-warning-modal__btn'
            block
            color='mint'
          >
            {t('checkout.warning_modal.btn')}
          </Button>
        </Modal.Main>
      </Modal>

      <section className='checkout-logo-sect'>
        <div className='container'>
          <div className='row'>
            <div className='col-12 text-center'>

              <Logo raw />

            </div>
          </div>
        </div>
      </section>

      <ContentLoading
        isLoading={isPaymentStatusLoading}
        isError={isPaymentStatusLoadingError}
        fetchData={() => getUserPaymentStatus()}
        spinSize='lg'
      >
        <section className='checkout-tpl-sect'>
          <div className='container'>
            <div className='row'>
              <div className='col-12'>

                <div className='checkout-tpl-container'>
                  <div className='checkout-form-container'>

                    <div
                      ref={paymentFormBlockRef}
                      className={classNames({
                        'd-none': !getActiveTariffData(),
                      })}
                    >
                      <h3 className='mb-4 fw-bold text-center payment-form-title'>
                        {!isSelectedTariffOnWelcomePage ? (
                          `2. ${t('lp.payment_form.title')}`
                        ) : (
                          t('lp.payment_form.title.last_step')
                        )}
                      </h3>

                      <ContentLoading
                        isLoading={false}
                        isError={isTariffsLoadingError}
                        fetchData={() => getUserTariffs()}
                      >
                        <CheckoutPaymentFormCard
                          tariff={getActiveTariffData() || (tariffsDataList.length > 0 ? tariffsDataList[0] : null)}
                          disabled={!getActiveTariffData() || isTariffsLoading}
                          scrollRef={selectPlanBlockRef}
                          isPaymentError={isPaymentStatusError}
                          paymentErrors={paymentStatusData ? paymentStatusData.errors_i18n : []}
                          history={history}
                          localePhrases={localePhrases}
                          short
                        />
                      </ContentLoading>
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
      isSelectedTariffOnWelcomePage: state.storage.isSelectedTariffOnWelcomePage,
      activeTariffIdToPay: state.storage.activeTariffIdToPay,
    }),
    { changeSettingAction },
  )(CheckoutPage),
);
