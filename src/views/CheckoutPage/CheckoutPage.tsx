/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
  getTranslate,
} from 'utils';
import Helmet from 'react-helmet';
import { InputError } from 'types';
import { routes } from 'constants/routes';
import queryString from 'query-string';
import {
  getCheckoutTariff, fetchUserProfile,
  getPaymentStatus,
} from 'api';

// Components
import InputField from 'components/common/Forms/InputField';
import CustomRadio from 'components/common/Forms/CustomRadio';
import Button from 'components/common/Forms/Button';
import WithTranslate from 'components/hoc/WithTranslate';
import RawCountDown from 'components/common/RawCountDown';
import Spinner from 'components/common/Spinner';
import Modal from 'components/common/Modal';
import ContentLoading from 'components/hoc/ContentLoading';
import FormValidator from 'utils/FormValidator';
import SalesWidgets from 'components/SalesWidgets';
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
  language,
  history,
  location,
  localePhrases,
}: any) => {
  const t = (code: string, placeholders?: any) =>
    getTranslate(localePhrases, code, placeholders);

  const { order: orderId } = queryString.parse(location.search);

  const [checkoutForm, setCheckoutForm] = useState({ ...checkoutFormDefault });
  const [checkoutFormErrors, setCheckoutFormErrors] = useState<InputError[]>([]);

  const [tariffData, setTariffData] = useState<any>(null);
  const [tariffLoading, setTariffLoading] = useState<boolean>(true);
  const [tariffLoadingError, setTariffLoadingError] = useState<boolean>(false);

  const [paymentStatusData, setPaymentStatusData] = useState<any>(null);
  const [paymentStatusLoading, setPaymentStatusLoading] = useState<boolean>(false);
  const [paymentStatusLoadingError, setPaymentStatusLoadingError] = useState<boolean>(false);
  const [paymentStatusError, setPaymentStatusError] = useState<boolean>(false);

  const [profileData, setProfileData] = useState<any>({
    name: t('checkout.title.user_name'),
  });
  const [profileLoading, setProfileLoading] = useState<boolean>(true);

  const [isWarningModalOpen, setWarningModalOpen] = useState<boolean>(false);

  const getUserPaymentTariff = () => {
    setTariffLoading(true);
    setTariffLoadingError(false);

    getCheckoutTariff()
      .then(({ data }) => {
        setTariffLoading(false);

        if (data.success && data.data) {
          setTariffData(data.data);
        } else {
          setTariffLoadingError(true);
        }
      })
      .catch(() => {
        setTariffLoading(false);
        setTariffLoadingError(true);
      });
  };

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
          setProfileData({
            name: data.data.name || t('checkout.title.user_name'),
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

  useEffect(() => {
    getUserPaymentTariff();
    getUserProfile();

    if (orderId) {
      getUserPaymentStatus();
    }

    if (sessionStorage.getItem('redirectedToPayView') === 'true') {
      toast.error(t('tariff.not_paid'));
      sessionStorage.removeItem('redirectedToPayView');
    }
  }, []);

  const validateOnChange = (name: string, value: any, event, element?) => {
    validateFieldOnChange(
      name,
      value,
      event,
      checkoutForm,
      setCheckoutForm,
      checkoutFormErrors,
      setCheckoutFormErrors,
      element,
    );
  };

  const getFieldErrors = (field: string) =>
    getFieldErrorsUtil(field, checkoutFormErrors)
      .map((msg) => ({
        ...msg,
        message: t('api.ecode.invalid_value'),
      }));

  const getTariffDataValue = (property: string) => {
    let dataEl = null;

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

    if (!hasError) { }
  };

  const isShowPartners = () => language === 'br';

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

      <SalesWidgets />

      <section>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>

              <h4 className='sect-subtitle'>{t('checkout.page_title')}</h4>

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

                <div className='checkout-tpl-container mt-3 mt-sm-5 pt-xl-5'>
                  <div className='checkout-person-plan-block'>
                    <h4 className='checkout-person-plan-title'>
                      {profileLoading ? (
                        <Spinner />
                      ) : (
                          <div
                            dangerouslySetInnerHTML={{ __html: t('checkout.top_title', { NAME: profileData.name }) }}
                          />
                        )}
                    </h4>
                  </div>

                  <div className='checkout-rewards-block'>
                    <h1 className='checkout-rewards-block__title'>
                      <RewardIcon className='mr-3' />
                      {t('checkout.rewards_title')}
                    </h1>

                    {isShowPartners() ? (
                      <div className='row mt-5'>
                        <div className='col-lg-3 mb-3 mb-lg-0 pt-2'>

                          <h3>{t('lp.partners_list_title')}</h3>

                        </div>
                        <div className='col-lg-9'>

                          <div className='app-partners-list__wrap mt-5 pt-5'>
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

                        </div>
                      </div>
                    ) : (
                        <div style={{ height: '70px' }} />
                      )}
                  </div>

                  <div className='checkout-form-container'>
                    <div className='checkout-reserved-top-block'>
                      <h3 className='checkout-reserved-top-block__title'>{t('checkout.reserved_block.title')}</h3>
                      <p className='checkout-reserved-top-block__descr'>{t('checkout.reserved_block.descr')}</p>
                      <p className='checkout-reserved-top-block__countdown_title'>
                        {t('checkout.reserved_block.countdown.title')}
                      </p>
                      <span className='checkout-reserved-top-block__countdown'>
                        <RawCountDown seconds={900} />
                      </span>
                    </div>

                    <div className='text-center mt-5'>
                      <h6 className='checkout-advantages__title mb-5'>
                        {t('checkout.advantages_title')}
                        :
                      </h6>

                      <div className='app-advantages-list list-xs text-left'>
                        <div className='app-advantages-list__item'>{t('checkout.advantage_1')}</div>
                        <div className='app-advantages-list__item'>{t('checkout.advantage_2')}</div>
                      </div>
                    </div>

                    <div className='mt-5'>
                      <ContentLoading
                        isLoading={tariffLoading}
                        isError={tariffLoadingError}
                        fetchData={() => getUserPaymentTariff()}
                      >
                        <div className='checkout-summary-list'>
                          <div className='checkout-summary-item'>
                            <div className='checkout-summary-item__label'>{t('checkout.summary.total_title')}</div>
                            <div className='checkout-summary-item__value'>
                              <del>{getTariffDataValue('price_old_text')}</del>
                              {' '}
                              <b>{getTariffDataValue('price_text')}</b>
                            </div>
                          </div>

                          <div className='checkout-summary-item'>
                            <div className='checkout-summary-item__label'>
                              {t('checkout.summary.discount_title')}
                              :
                            </div>
                            <div className='checkout-summary-item__value'>
                              <form className='checkout-discount-form' onSubmit={(e) => checkoutDiscountFormSubmit(e)}>
                                <InputField
                                  className='checkout-discount-form__input'
                                  name='discount_code'
                                  invalid={getFieldErrors('discount_code').length > 0}
                                  value={checkoutForm.discount_code}
                                  data-validate='["required"]'
                                  onChange={(e) => validateOnChange('discount_code', e.target.value, e)}
                                  placeholder='Code'
                                />

                                <Button
                                  type='submit'
                                  className='checkout-discount-form__btn'
                                  color='mint'
                                >
                                  {t('checkout.discount_btn')}
                                </Button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </ContentLoading>
                    </div>

                    <div className='pl-sm-5'>
                      <div className='product-plants-one-tree-block mt-5'>
                        <p dangerouslySetInnerHTML={{ __html: t('lp.plants_one_tree_descr') }}></p>
                      </div>
                    </div>

                    <hr className='checkout-divider' />

                    <img src={t('checkout.safe.img2')} className='img-fluid' alt='' />

                    <CheckoutPaymentFormCard
                      className='mt-4 mt-xl-5'
                      tariff={tariffData}
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
        </section>

        <section className='checkout-reserved-block'>
          <div className='container'>
            <div className='row'>
              <div className='col-12'>

                <h4 className='checkout-reserved-block__title'>
                  {t('lp.bottom_countdown_title')}
                  {' '}

                  <span className='checkout-reserved-block__countdown'>
                    <RawCountDown seconds={900} />
                  </span>
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
      language: state.settings.settings,
    }),
  )(CheckoutPage),
);
