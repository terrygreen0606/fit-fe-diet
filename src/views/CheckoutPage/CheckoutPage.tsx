import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
  getTranslate,
  getImagePath
} from 'utils';
import { InputError } from 'types';
import { getAppReviews } from 'api';

// Components
import FormGroup from 'components/common/Forms/FormGroup';
import FormLabel from 'components/common/Forms/FormLabel';
import InputField from 'components/common/Forms/InputField';
import CustomRadio from 'components/common/Forms/CustomRadio';
import CreditCardNumberField from 'components/common/Forms/CreditCardNumberField';
import Button from 'components/common/Forms/Button';
import WithTranslate from 'components/hoc/WithTranslate';
import RawCountDown from 'components/common/RawCountDown';
import Modal from 'components/common/Modal';
import ContentLoading from 'components/hoc/ContentLoading';
import FormValidator from 'utils/FormValidator';

import './CheckoutPage.sass';

import { ReactComponent as RewardIcon } from 'assets/img/icons/reward-gold-icon.svg';
import { ReactComponent as LockIcon } from 'assets/img/icons/lock-icon.svg';

const CheckoutPage = (props: any) => {

  const [checkoutForm, setCheckoutForm] = useState({
    payment_type: 'credit_card',
    name: '',
    card_number: '',
    cvv: '',
    exp_month: '',
    exp_year: '',
    discount_code: ''
  });
  const [checkoutFormErrors, setCheckoutFormErrors] = useState<InputError[]>([]);

  const [isWarningModalOpen, setWarningModalOpen] = useState<boolean>(false);

  const t = (code: string, placeholders?: any) => 
    getTranslate(props.localePhrases, code, placeholders);

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

  const checkoutFormSubmit = e => {
    e.preventDefault();

    const form = e.target;
    const inputs = [...form.elements].filter((i) =>
      ['INPUT', 'SELECT', 'TEXTAREA'].includes(i.nodeName)
    );

    const { errors, hasError } = FormValidator.bulkValidate(inputs);

    setCheckoutFormErrors([...errors]);

    if (!hasError) {

    }
  };

  return (
    <>
      <Modal
        isOpen={isWarningModalOpen}
        onClose={e => setWarningModalOpen(false)}
        className="checkout-warning-modal"
      >
        <Modal.Main>
          <h5 className="checkout-warning-modal__title">Your information maybe lost!</h5>
          <p className="checkout-warning-modal__descr">Stay on this page to preserve your plan and sign up when you are ready.</p>
          <Button className="checkout-warning-modal__btn" block color="mint">See my plan today</Button>
        </Modal.Main>
      </Modal>

      <section className="checkout-tpl-sect">
        <div className="container">
          <div className="row">
            <div className="col-12">

              <h4 className="sect-subtitle">{t('checkout.page_title')}</h4>

              <div className="checkout-tpl-container mt-5 pt-5">
                <div className="checkout-person-plan-block">
                  <h4 className="checkout-person-plan-title">John Dow’s<br />Personalized diet plan</h4>
                </div>

                <div className="checkout-rewards-block">
                  <h4 className="checkout-rewards-block__title"><RewardIcon className="mr-3" /> Loose weight for good</h4>

                  <div className="row mt-5">
                    <div className="col-3 pt-2">
                      
                      <h5>{t('lp.partners_list_title')}</h5>

                    </div>
                    <div className="col-9">
                      
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
                    <h5 className="checkout-reserved-top-block__title">Your personalized plan has been reserved for the next 15 minutes!</h5>
                    <p className="checkout-reserved-top-block__descr">Save your profile below to claim it now</p>
                    <h6 className="checkout-reserved-top-block__countdown_title">Time remaining:</h6>
                    <span className="checkout-reserved-top-block__countdown">
                      <RawCountDown seconds={900} />
                    </span>
                  </div>

                  <div className="text-center mt-5">
                    <h6 className="checkout-advantages__title mb-5">Hightlights of your costomize plan:</h6>

                    <div className="app-advantages-list list-xs">
                      <div className="app-advantages-list__item">{t('checkout.advantage_1')}</div>
                      <div className="app-advantages-list__item">{t('checkout.advantage_2')}</div>
                    </div>
                  </div>

                  <div className="checkout-summary-list mt-5">
                    <div className="checkout-summary-item">
                      <div className="checkout-summary-item__label">Today total</div>
                      <div className="checkout-summary-item__value"><b>1$</b></div>
                    </div>

                    <div className="checkout-summary-item">
                      <div className="checkout-summary-item__label">Discount code:</div>
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

                          <Button type="submit" className="checkout-discount-form__btn" color="mint">Save</Button>
                        </form>
                      </div>
                    </div>

                    <div className="checkout-summary-item">
                      <div className="checkout-summary-item__label">Price after trial</div>
                      <div className="checkout-summary-item__value"><b>25$ for 2 month</b></div>
                    </div>

                    <div className="checkout-summary-item">
                      <div className="checkout-summary-item__label">14-day trial unlocked</div>
                      <div className="checkout-summary-item__value"><del className="mr-3">5$</del><b>1$</b></div>
                    </div>
                  </div>

                  <div className="pl-5">
                    <div className="product-plants-one-tree-block mt-5">
                      <p dangerouslySetInnerHTML={{ __html: t('lp.plants_one_tree_descr') }}></p>
                    </div>
                  </div>

                  <hr className="checkout-divider" />

                  <img src={getImagePath('checkout/safe-checkout-img-2.png')} className="img-fluid" alt="" />

                  <div className="checkout-payment-radio__list mt-5">
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
                          <img 
                            src={getImagePath('credit-cards/cards-list-img.png')} 
                            className="img-fluid"
                          />
                        </Button>
                      )}
                    />

                    <CustomRadio 
                      inline 
                      className={classNames("checkout-payment-radio", {
                        'radio-checked': checkoutForm.payment_type === 'paypal'
                      })}
                      checked={checkoutForm.payment_type === 'paypal'}
                      value="paypal"
                      name="payment_type"
                      onChange={e => validateOnChange('payment_type', e.target.value, e)}
                      label={(
                        <Button className="checkout-payment-radio__btn" spanBtn color="secondary">
                          <img 
                            src={getImagePath('credit-cards/paypal-highq.png')} 
                            className="img-fluid"
                          />
                        </Button>
                      )}
                    />
                  </div>

                  <form className="checkout-pay-form mt-5" onSubmit={e => checkoutFormSubmit(e)}>
                    <h6 className="checkout-pay-form__title mb-3">{t('checkout.form_title')} <LockIcon className="ml-3" /></h6>

                    <FormGroup>
                      <InputField
                        block
                        name='name'
                        label={`${t('checkout.form_name')}*:`}
                        isValid={getFieldErrors('name').length === 0 && checkoutForm.name.length > 0}
                        value={checkoutForm.name}
                        data-validate='["required"]'
                        onChange={e => validateOnChange('name', e.target.value, e)}
                        errors={getFieldErrors('name')}
                        placeholder=''
                      />
                    </FormGroup>

                    <FormGroup>
                      <CreditCardNumberField
                        block
                        name='card_number'
                        label={`${t('checkout.form_card_number')}*:`}
                        isValid={getFieldErrors('card_number').length === 0 && checkoutForm.card_number.length > 0}
                        value={checkoutForm.name}
                        data-param={19}
                        data-validate='["required", "len"]'
                        mask="1111 1111 1111 1111"
                        onChange={e => validateOnChange('card_number', e.target.value, e)}
                        errors={getFieldErrors('card_number')}
                        placeholder=''
                      />
                    </FormGroup>

                    <div className="row">
                      <div className="col-3">
                        
                        <FormGroup>
                          <InputField
                            block
                            name='exp_month'
                            data-param={2}
                            label={`${t('checkout.form_card_expiration')}*:`}
                            isValid={getFieldErrors('exp_month').length === 0 && checkoutForm.exp_month.length > 0}
                            value={checkoutForm.exp_month}
                            data-validate='["required", "len"]'
                            mask="11"
                            onChange={e => validateOnChange('exp_month', e.target.value, e)}
                            errors={getFieldErrors('exp_month')}
                            placeholder=''
                          />
                        </FormGroup>

                      </div>
                      <div className="col-3">
                        
                        <FormGroup>
                          <FormLabel className="text-transparent">{t('checkout.form_card_expiration')}</FormLabel>
                          <InputField
                            block
                            name='exp_year'
                            isValid={getFieldErrors('exp_year').length === 0 && checkoutForm.exp_year.length > 0}
                            value={checkoutForm.exp_year}
                            data-param={4}
                            data-validate='["required", "len"]'
                            mask="1111"
                            onChange={e => validateOnChange('exp_year', e.target.value, e)}
                            errors={getFieldErrors('exp_year')}
                            placeholder=''
                          />
                        </FormGroup>

                      </div>
                      <div className="col-4 offset-2">
                        
                        <FormGroup>
                          <InputField
                            block
                            name='cvv'
                            label={`${t('checkout.form_card_cvv')}*:`}
                            isValid={getFieldErrors('cvv').length === 0 && checkoutForm.cvv.length > 0}
                            value={checkoutForm.cvv}
                            data-param={3}
                            data-validate='["required", "len"]'
                            mask="111"
                            onChange={e => validateOnChange('cvv', e.target.value, e)}
                            errors={getFieldErrors('cvv')}
                            placeholder=''
                          />
                        </FormGroup>

                      </div>  
                    </div>

                    <div className="text-center">
                      <Button type="submit" className="checkout-pay-form__submit mt-5" color="primary">{t('button.checkout_start')}</Button>
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
