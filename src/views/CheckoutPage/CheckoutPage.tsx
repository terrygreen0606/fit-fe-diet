import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
  getTranslate,
  getImagePath
} from 'utils';
import { InputError } from 'types';
import { 
  getAppTariff, 
  fetchUserProfile, 
  getPaymentMethods,
  payCreditCard
} from 'api';

// Components
import FormGroup from 'components/common/Forms/FormGroup';
import FormLabel from 'components/common/Forms/FormLabel';
import InputField from 'components/common/Forms/InputField';
import CustomRadio from 'components/common/Forms/CustomRadio';
import CreditCardNumberField from 'components/common/Forms/CreditCardNumberField';
import Button from 'components/common/Forms/Button';
import WithTranslate from 'components/hoc/WithTranslate';
import RawCountDown from 'components/common/RawCountDown';
import Spinner from 'components/common/Spinner';
import Modal from 'components/common/Modal';
import ContentLoading from 'components/hoc/ContentLoading';
import FormValidator from 'utils/FormValidator';

import './CheckoutPage.sass';

import { ReactComponent as RewardIcon } from 'assets/img/icons/reward-gold-icon.svg';
import { ReactComponent as LockIcon } from 'assets/img/icons/lock-icon.svg';

const checkoutFormDefault = {
  payment_type: 'credit_card',
  payer_name: null,
  phone: null,
  card_number: null,
  card_cvv: null,
  card_month: null,
  card_year: null,
  discount_code: null
};

const CheckoutPage = (props: any) => {

  const t = (code: string, placeholders?: any) => 
    getTranslate(props.localePhrases, code, placeholders);

  const [checkoutForm, setCheckoutForm] = useState({...checkoutFormDefault});
  const [checkoutFormErrors, setCheckoutFormErrors] = useState<InputError[]>([]);

  const [tariffData, setTariffData] = useState<any>({
    price_text: null,
    currency: null,
    tariff: null,
    price_old_text: null,
    next_tariff: {
      price_text: null,
      days: null,
      tariff: null
    }
  });
  const [tariffLoading, setTariffLoading] = useState<boolean>(true);
  const [tariffLoadingError, setTariffLoadingError] = useState<boolean>(false);

  const [paymentMethods, setPaymentMethods] = useState<any>({
    cards: [],
    others: []
  });
  const [paymentMethodsLoading, setPaymentMethodsLoading] = useState<boolean>(true);
  const [paymentMethodsLoadingError, setPaymentMethodsLoadingError] = useState<boolean>(false);

  const [profileData, setProfileData] = useState<any>({
    name: t('checkout.title.user_name')
  });  
  const [profileLoading, setProfileLoading] = useState<boolean>(true);

  const [paymentLoading, setPaymentLoading] = useState<boolean>(false);

  const [isWarningModalOpen, setWarningModalOpen] = useState<boolean>(false);

  const getUserTariff = () => {
    setTariffLoading(true);
    setTariffLoadingError(false);

    getAppTariff('d7')
      .then(response => {
        setTariffLoading(false);

        if (response.data.success && response.data.data) {
          const tariff_data = response.data.data;
          const next_tariff_data = response.data.data.next_tariff || tariffData.next_tariff;

          setTariffData({
            price_text: tariff_data.price_text || null,
            price_old_text: tariff_data.price_old_text || null,
            currency: tariff_data.currency || null,
            days: tariff_data.days || null,
            tariff: tariff_data.tariff || null,
            next_tariff: {
              days: next_tariff_data.days || null,
              tariff: next_tariff_data.tariff || null,
              price_text: next_tariff_data.price_text || null
            }
          });
        } else {
          setTariffLoadingError(true);
        }
      })
      .catch(error => {
        setTariffLoading(false);
        setTariffLoadingError(true);
      });
  };

  const getUserProfile = () => {
    setProfileLoading(true);

    fetchUserProfile()
      .then(response => {
        setProfileLoading(false);

        if (response.data.success && response.data.data) {
          setProfileData({
            name: response.data.data.name || t('checkout.title.user_name')
          });
        } else {
          setProfileData({
            name: t('checkout.title.user_name')
          });
        }
      })
      .catch(error => {
        setProfileLoading(false);

        setProfileData({
          name: t('checkout.title.user_name')
        });
      });
  };

  const getUserPaymentMethods = () => {
    setPaymentMethodsLoading(true);
    setPaymentMethodsLoadingError(false);

    getPaymentMethods()
      .then(response => {
        setPaymentMethodsLoading(false);

        if (response.data.success && response.data.data) {
          setPaymentMethods({
            cards: response.data.data.cards || [],
            others: response.data.data.others || []
          });
        }
      })
      .catch(error => {
        setPaymentMethodsLoading(false);
        setPaymentMethodsLoadingError(true);

        setProfileData({
          name: t('checkout.title.user_name')
        });
      });
  };

  useEffect(() =>  {
    getUserTariff();
    getUserProfile();
    getUserPaymentMethods();
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
      element
    );
  };

  const getFieldErrors = (field: string) =>
    getFieldErrorsUtil(field, checkoutFormErrors)
      .map(msg => ({
        ...msg,
        message: t('api.ecode.invalid_value')
      }));

  const checkoutDiscountFormSubmit = e => {
    e.preventDefault();

    const form = e.target;
    const inputs = [...form.elements].filter((i) =>
      ['INPUT', 'SELECT', 'TEXTAREA'].includes(i.nodeName)
    );

    const { errors, hasError } = FormValidator.bulkValidate(inputs);

    setCheckoutFormErrors([
      ...checkoutFormErrors,
      ...errors
    ]);

    if (!hasError) {

    }
  };

  const getPayCredictCardParams = () => ({
    article_id: tariffData.tariff,
    currency: tariffData.currency,
    card: {
      number: checkoutForm.card_number.replace(/ /gi, ''),
      year: checkoutForm.card_year,
      month: checkoutForm.card_month,
      cvv: checkoutForm.card_cvv
    },
    contacts: {
      phone: checkoutForm.phone,
      payer_name: checkoutForm.payer_name
    }
  });

  const checkoutFormSubmit = async e => {
    e.preventDefault();

    const form = e.target;
    const inputs = [...form.elements].filter((i) =>
      ['INPUT', 'SELECT', 'TEXTAREA'].includes(i.nodeName)
    );

    const { errors, hasError } = FormValidator.bulkValidate(inputs);

    setCheckoutFormErrors([...errors]);

    if (!hasError) {
      setPaymentLoading(true);

      payCreditCard(getPayCredictCardParams())
        .then(response => {
          setPaymentLoading(false);
          
          const paymentOrder = response.data;

          if (paymentOrder) {
            if (paymentOrder.redirect_url) {
              window.location.href = paymentOrder.redirect_url;  
            } else if (paymentOrder.status) {
              switch (paymentOrder.status) {
                case 'ok':
                  toast.success(t('checkout.payment_success'));
                  setCheckoutForm({...checkoutFormDefault});
                  break;

                case 'pending':
                  toast.warning(t('checkout.payment_pending'));
                  break;

                case 'fail':
                  toast.error(t('checkout.payment_fail'));
                  break;

                default:
              }              
            } else {
              toast.error(t('checkout.payment_fail'));
            }
          } else {
            toast.error(t('checkout.payment_fail'));
          }
        })
        .catch(error => {
          setPaymentLoading(false);
          toast.error(t('checkout.payment_fail'));
        });
    }
  };

  const paymentSubmitIsDisabled = () => {
    return paymentLoading || 
           tariffLoading || 
           paymentMethodsLoading || 
           tariffLoadingError || 
           paymentMethodsLoadingError;
  };

  return (
    <>
      <Modal
        isOpen={isWarningModalOpen}
        onClose={e => setWarningModalOpen(false)}
        className="checkout-warning-modal"
      >
        <Modal.Main>
          <h5 className="checkout-warning-modal__title">{t('checkout.warning_modal.title')}</h5>
          <p className="checkout-warning-modal__descr">{t('checkout.warning_modal.descr')}</p>
          <Button className="checkout-warning-modal__btn" block color="mint">{t('checkout.warning_modal.btn')}</Button>
        </Modal.Main>
      </Modal>

      <section className="checkout-tpl-sect">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h4 className="sect-subtitle">{t('checkout.page_title')}</h4>

              <div className="checkout-tpl-container mt-3 mt-sm-5 pt-xl-5">
                <div className="checkout-person-plan-block">
                  <h4 className="checkout-person-plan-title">
                    {profileLoading ? <Spinner /> : <div dangerouslySetInnerHTML={{ __html: t('checkout.top_title', { NAME: profileData.name }) }} />}
                  </h4>
                </div>

                <div className="checkout-rewards-block">
                  <h4 className="checkout-rewards-block__title"><RewardIcon className="mr-3" /> {t('checkout.rewards_title')}</h4>

                  <div className="row mt-5">
                    <div className="col-lg-3 mb-3 mb-lg-0 pt-2">
                      
                      <h5>{t('lp.partners_list_title')}</h5>

                    </div>
                    <div className="col-lg-9">
                      
                      <div className="app-partners-list">
                        <span className="app-partners-list__item" style={{ backgroundImage: `url(${require('assets/img/partners/daily-mirror.png')})` }} />
                        <span className="app-partners-list__item" style={{ backgroundImage: `url(${require('assets/img/partners/forbes.png')})` }} />
                        <span className="app-partners-list__item" style={{ backgroundImage: `url(${require('assets/img/partners/modesto.png')})` }} />
                      </div>

                    </div>
                  </div>
                </div>

                <div className="checkout-form-container">
                  <div className="checkout-reserved-top-block">
                    <h5 className="checkout-reserved-top-block__title">{t('checkout.reserved_block.title')}</h5>
                    <p className="checkout-reserved-top-block__descr">{t('checkout.reserved_block.descr')}</p>
                    <h6 className="checkout-reserved-top-block__countdown_title">{t('checkout.reserved_block.title')}:</h6>
                    <span className="checkout-reserved-top-block__countdown">
                      <RawCountDown seconds={900} />
                    </span>
                  </div>

                  <div className="text-center mt-5">
                    <h6 className="checkout-advantages__title mb-5">{t('checkout.advantages_title')}:</h6>

                    <div className="app-advantages-list list-xs text-left">
                      <div className="app-advantages-list__item">{t('checkout.advantage_1')}</div>
                      <div className="app-advantages-list__item">{t('checkout.advantage_2')}</div>
                    </div>
                  </div>

                  <div className="mt-5">
                    <ContentLoading
                      isLoading={tariffLoading}
                      isError={tariffLoadingError}
                      fetchData={() => getUserTariff()}
                    >
                      <div className="checkout-summary-list">
                        <div className="checkout-summary-item">
                          <div className="checkout-summary-item__label">{t('checkout.summary.total_title')}</div>
                          <div className="checkout-summary-item__value"><b>{tariffData.price_text}</b></div>
                        </div>

                        <div className="checkout-summary-item">
                          <div className="checkout-summary-item__label">{t('checkout.summary.discount_title')}:</div>
                          <div className="checkout-summary-item__value">
                            <form className="checkout-discount-form" onSubmit={e => checkoutDiscountFormSubmit(e)}>
                              <InputField 
                                className="checkout-discount-form__input"
                                name='discount_code'
                                invalid={getFieldErrors('discount_code').length > 0}
                                value={checkoutForm.discount_code}
                                data-validate='["required"]'
                                onChange={e => validateOnChange('discount_code', e.target.value, e)}
                                placeholder='Code'
                              />

                              <Button type="submit" className="checkout-discount-form__btn" color="mint">{t('checkout.discount_btn')}</Button>
                            </form>
                          </div>
                        </div>

                        <div className="checkout-summary-item">
                          <div className="checkout-summary-item__label">{t('checkout.summary.price_after_trial_title')}</div>
                          <div className="checkout-summary-item__value"><b>{tariffData.next_tariff.price_text}</b></div>
                        </div>

                        <div className="checkout-summary-item">
                          <div className="checkout-summary-item__label">{t('checkout.summary.trial_title', { COUNT: tariffData.days })}</div>
                          <div className="checkout-summary-item__value">
                            <del className="mr-3">{tariffData.price_old_text}</del>
                            <b>{tariffData.price_text}</b>
                          </div>
                        </div>
                      </div>                    
                    </ContentLoading>
                  </div>

                  <div className="pl-sm-5">
                    <div className="product-plants-one-tree-block mt-5">
                      <p dangerouslySetInnerHTML={{ __html: t('lp.plants_one_tree_descr') }}></p>
                    </div>
                  </div>

                  <hr className="checkout-divider" />

                  <img src={getImagePath('checkout/safe-checkout-img-2.png')} className="img-fluid" alt="" />

                  <div className="mt-5">
                    <ContentLoading
                      isLoading={paymentMethodsLoading}
                      isError={paymentMethodsLoadingError}
                      fetchData={() => getUserPaymentMethods()}
                    >
                      <div className="checkout-payment-radio__list">
                        {paymentMethods.cards.length > 0 && (
                          <CustomRadio 
                            inline 
                            className={classNames("checkout-payment-radio", {
                              'radio-checked': checkoutForm.payment_type === 'credit_card'
                            })}
                            checked={checkoutForm.payment_type === 'credit_card'}
                            value="credit_card"
                            name="payment_type"
                            onChange={e => validateOnChange('payment_type', e.target.value, e)}
                            label={(
                              <Button className="checkout-payment-radio__btn" spanBtn color="secondary">
                                <div className="payment-types-img-list">
                                  {paymentMethods.cards.map((card, index) => (
                                    <img key={index} src={card.logo || null} className="payment-types-img" />  
                                  ))}
                                </div>
                              </Button>
                            )}
                          />
                        )}

                        {paymentMethods.others.map(method => (
                          <CustomRadio 
                            inline 
                            className={classNames("checkout-payment-radio", {
                              'radio-checked': checkoutForm.payment_type === method.id
                            })}
                            checked={checkoutForm.payment_type === method.id}
                            value="method.id"
                            name="payment_type"
                            onChange={e => validateOnChange('payment_type', e.target.value, e)}
                            label={(
                              <Button className="checkout-payment-radio__btn" spanBtn color="secondary">
                                <img 
                                  src={method.logo || null}
                                  className="img-fluid"
                                />
                              </Button>
                            )}
                          />
                        ))}
                      </div>
                    </ContentLoading>
                  </div>

                  <form className="checkout-pay-form mt-5" onSubmit={e => checkoutFormSubmit(e)}>
                    <h6 className="checkout-pay-form__title mb-3">{t('checkout.form_title')} <LockIcon className="ml-2" /></h6>

                    <FormGroup>
                      <InputField
                        block
                        name='payer_name'
                        label={`${t('checkout.form_name')}*:`}
                        isValid={checkoutForm.payer_name && getFieldErrors('payer_name').length === 0}
                        value={checkoutForm.payer_name}
                        data-validate='["required"]'
                        onChange={e => validateOnChange('payer_name', e.target.value, e)}
                        errors={getFieldErrors('payer_name')}
                        placeholder=''
                      />
                    </FormGroup>

                    <FormGroup>
                      <InputField
                        block
                        name='phone'
                        label={`${t('checkout.form_phone')}*:`}
                        isValid={checkoutForm.phone && getFieldErrors('phone').length === 0}
                        value={checkoutForm.phone}
                        data-validate='["required", "number"]'
                        onChange={e => validateOnChange('phone', e.target.value, e)}
                        errors={getFieldErrors('phone')}
                        placeholder=''
                      />
                    </FormGroup>

                    <FormGroup>
                      <CreditCardNumberField
                        block
                        name='card_number'
                        label={`${t('checkout.form_card_number')}*:`}
                        isValid={checkoutForm.card_number && getFieldErrors('card_number').length === 0}
                        value={checkoutForm.card_number}
                        data-param={19}
                        placeholderChar=" "
                        data-validate='["required", "len"]'
                        mask="1111 1111 1111 1111"
                        onChange={e => validateOnChange('card_number', e.target.value, e)}
                        errors={getFieldErrors('card_number')}
                        placeholder=''
                      />
                    </FormGroup>

                    <div className="row">
                      <div className="col-6 col-xs-3">
                        
                        <FormGroup>
                          <InputField
                            block
                            name='card_month'
                            data-param={2}
                            label={`${t('checkout.form_card_expiration')}*:`}
                            isValid={checkoutForm.card_month && getFieldErrors('card_month').length === 0}
                            value={checkoutForm.card_month}
                            data-validate='["required", "len"]'
                            mask="11"
                            onChange={e => validateOnChange('card_month', e.target.value, e)}
                            errors={getFieldErrors('card_month')}
                            placeholder=''
                          />
                        </FormGroup>

                      </div>
                      <div className="col-6 col-xs-3">
                        
                        <FormGroup>
                          <FormLabel className="text-transparent">{t('checkout.form_card_expiration')}</FormLabel>
                          <InputField
                            block
                            name='card_year'
                            isValid={checkoutForm.card_year && getFieldErrors('card_year').length === 0}
                            value={checkoutForm.card_year}
                            data-param={4}
                            data-validate='["required", "len"]'
                            mask="1111"
                            onChange={e => validateOnChange('card_year', e.target.value, e)}
                            errors={getFieldErrors('card_year')}
                            placeholder=''
                          />
                        </FormGroup>

                      </div>
                      <div className="col-xs-6 col-sm-4 offset-sm-2">
                        
                        <FormGroup>
                          <InputField
                            block
                            name='card_cvv'
                            label={`${t('checkout.form_card_cvv')}*:`}
                            isValid={checkoutForm.card_cvv && getFieldErrors('card_cvv').length === 0}
                            value={checkoutForm.card_cvv}
                            data-param={3}
                            data-validate='["required", "len"]'
                            mask="111"
                            onChange={e => validateOnChange('card_cvv', e.target.value, e)}
                            errors={getFieldErrors('card_cvv')}
                            placeholder=''
                          />
                        </FormGroup>

                      </div>  
                    </div>

                    <div className="text-center mt-3 mt-sm-5">
                      <Button 
                        type="submit" 
                        className="checkout-pay-form__submit" 
                        color="primary"
                        isLoading={paymentLoading}
                        disabled={paymentSubmitIsDisabled()}
                      >
                        {t('button.checkout_start')}
                      </Button>
                    </div>
                  </form>

                  <div className="text-center mt-5">
                    <img src={getImagePath('checkout/guaranteed-checkout-img.png')} className="img-fluid" alt="" />
                  </div>

                  <div className="money-back-guarantee-block mt-4">
                    <div>
                      <h5 className="money-back-guarantee-block__title">{t('lp.money_back_title')}</h5>
                      <p className="money-back-guarantee-block__descr">{t('lp.money_back_descr')}</p>
                    </div>
                  </div>
                </div>                
              </div>
              
            </div>
          </div>
        </div>
      </section>

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
    </>
  );
};

export default WithTranslate(CheckoutPage);
