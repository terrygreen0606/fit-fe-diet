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
import { getAppTariff, fetchUserProfile } from 'api';

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

  const [tariffData, setTariffData] = useState<any>({
    price_text: null,
    price_old_text: null
  });
  const [tariffLoading, setTariffLoading] = useState<boolean>(true);
  const [tariffLoadingError, setTariffLoadingError] = useState<boolean>(false);

  const [profileData, setProfileData] = useState<any>({
    name: 'Your'
  });  
  const [profileLoading, setProfileLoading] = useState<boolean>(true);

  const [isWarningModalOpen, setWarningModalOpen] = useState<boolean>(false);

  const getUserTariff = () => {
    setTariffLoading(true);
    setTariffLoadingError(false);

    getAppTariff('d7')
      .then(response => {
        setTariffLoading(false);

        if (response.data.success && response.data.data) {
          setTariffData({
            price_text: response.data.data.price_text || null,
            price_old_text: response.data.data.price_old_text || null
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

  useEffect(() =>  {
    getUserTariff();
    getUserProfile();
  }, []);

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

                    <div className="app-advantages-list list-xs">
                      <div className="app-advantages-list__item">{t('checkout.advantage_1')}</div>
                      <div className="app-advantages-list__item">{t('checkout.advantage_2')}</div>
                    </div>
                  </div>

                  <ContentLoading
                    isLoading={tariffLoading}
                    isError={tariffLoadingError}
                    fetchData={() => getUserTariff()}
                  >
                    <div className="checkout-summary-list mt-5">
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
                        <div className="checkout-summary-item__value"><b></b></div>
                      </div>

                      <div className="checkout-summary-item">
                        <div className="checkout-summary-item__label">{t('checkout.summary.trial_title')}</div>
                        <div className="checkout-summary-item__value">
                          <del className="mr-3">{tariffData.price_old_text}</del>
                          <b>{tariffData.price_text}</b>
                        </div>
                      </div>
                    </div>                    
                  </ContentLoading>

                  <div className="pl-sm-5">
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
                          <div className="payment-types-img-list">
                            <img src="https://cdn.8xgb.com/static/images/visa-curved-128px.png" className="payment-types-img" />
                            <img src="https://cdn.8xgb.com/static/images/mastercard-curved-128px.png" className="payment-types-img" />
                            <img src="https://cdn.8xgb.com/static/images/american-express-curved-128px.png" className="payment-types-img" />
                            <img src="https://cdn.8xgb.com/static/images/discover-curved-128px.png" className="payment-types-img" />
                            <img src="https://cdn.8xgb.com/static/images/diners-curved.png" className="payment-types-img" />
                          </div>
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
                            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjMyIiB2aWV3Qm94PSIwIDAgMTAwIDMyIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWluWU1pbiBtZWV0IiB4bWxucz0iaHR0cDomI3gyRjsmI3gyRjt3d3cudzMub3JnJiN4MkY7MjAwMCYjeDJGO3N2ZyI+PHBhdGggZmlsbD0iIzAwMzA4NyIgZD0iTSAxMi4yMzcgMi40NDQgTCA0LjQzNyAyLjQ0NCBDIDMuOTM3IDIuNDQ0IDMuNDM3IDIuODQ0IDMuMzM3IDMuMzQ0IEwgMC4yMzcgMjMuMzQ0IEMgMC4xMzcgMjMuNzQ0IDAuNDM3IDI0LjA0NCAwLjgzNyAyNC4wNDQgTCA0LjUzNyAyNC4wNDQgQyA1LjAzNyAyNC4wNDQgNS41MzcgMjMuNjQ0IDUuNjM3IDIzLjE0NCBMIDYuNDM3IDE3Ljc0NCBDIDYuNTM3IDE3LjI0NCA2LjkzNyAxNi44NDQgNy41MzcgMTYuODQ0IEwgMTAuMDM3IDE2Ljg0NCBDIDE1LjEzNyAxNi44NDQgMTguMTM3IDE0LjM0NCAxOC45MzcgOS40NDQgQyAxOS4yMzcgNy4zNDQgMTguOTM3IDUuNjQ0IDE3LjkzNyA0LjQ0NCBDIDE2LjgzNyAzLjE0NCAxNC44MzcgMi40NDQgMTIuMjM3IDIuNDQ0IFogTSAxMy4xMzcgOS43NDQgQyAxMi43MzcgMTIuNTQ0IDEwLjUzNyAxMi41NDQgOC41MzcgMTIuNTQ0IEwgNy4zMzcgMTIuNTQ0IEwgOC4xMzcgNy4zNDQgQyA4LjEzNyA3LjA0NCA4LjQzNyA2Ljg0NCA4LjczNyA2Ljg0NCBMIDkuMjM3IDYuODQ0IEMgMTAuNjM3IDYuODQ0IDExLjkzNyA2Ljg0NCAxMi42MzcgNy42NDQgQyAxMy4xMzcgOC4wNDQgMTMuMzM3IDguNzQ0IDEzLjEzNyA5Ljc0NCBaIj48L3BhdGg+PHBhdGggZmlsbD0iIzAwMzA4NyIgZD0iTSAzNS40MzcgOS42NDQgTCAzMS43MzcgOS42NDQgQyAzMS40MzcgOS42NDQgMzEuMTM3IDkuODQ0IDMxLjEzNyAxMC4xNDQgTCAzMC45MzcgMTEuMTQ0IEwgMzAuNjM3IDEwLjc0NCBDIDI5LjgzNyA5LjU0NCAyOC4wMzcgOS4xNDQgMjYuMjM3IDkuMTQ0IEMgMjIuMTM3IDkuMTQ0IDE4LjYzNyAxMi4yNDQgMTcuOTM3IDE2LjY0NCBDIDE3LjUzNyAxOC44NDQgMTguMDM3IDIwLjk0NCAxOS4zMzcgMjIuMzQ0IEMgMjAuNDM3IDIzLjY0NCAyMi4xMzcgMjQuMjQ0IDI0LjAzNyAyNC4yNDQgQyAyNy4zMzcgMjQuMjQ0IDI5LjIzNyAyMi4xNDQgMjkuMjM3IDIyLjE0NCBMIDI5LjAzNyAyMy4xNDQgQyAyOC45MzcgMjMuNTQ0IDI5LjIzNyAyMy45NDQgMjkuNjM3IDIzLjk0NCBMIDMzLjAzNyAyMy45NDQgQyAzMy41MzcgMjMuOTQ0IDM0LjAzNyAyMy41NDQgMzQuMTM3IDIzLjA0NCBMIDM2LjEzNyAxMC4yNDQgQyAzNi4yMzcgMTAuMDQ0IDM1LjgzNyA5LjY0NCAzNS40MzcgOS42NDQgWiBNIDMwLjMzNyAxNi44NDQgQyAyOS45MzcgMTguOTQ0IDI4LjMzNyAyMC40NDQgMjYuMTM3IDIwLjQ0NCBDIDI1LjAzNyAyMC40NDQgMjQuMjM3IDIwLjE0NCAyMy42MzcgMTkuNDQ0IEMgMjMuMDM3IDE4Ljc0NCAyMi44MzcgMTcuODQ0IDIzLjAzNyAxNi44NDQgQyAyMy4zMzcgMTQuNzQ0IDI1LjEzNyAxMy4yNDQgMjcuMjM3IDEzLjI0NCBDIDI4LjMzNyAxMy4yNDQgMjkuMTM3IDEzLjY0NCAyOS43MzcgMTQuMjQ0IEMgMzAuMjM3IDE0Ljk0NCAzMC40MzcgMTUuODQ0IDMwLjMzNyAxNi44NDQgWiI+PC9wYXRoPjxwYXRoIGZpbGw9IiMwMDMwODciIGQ9Ik0gNTUuMzM3IDkuNjQ0IEwgNTEuNjM3IDkuNjQ0IEMgNTEuMjM3IDkuNjQ0IDUwLjkzNyA5Ljg0NCA1MC43MzcgMTAuMTQ0IEwgNDUuNTM3IDE3Ljc0NCBMIDQzLjMzNyAxMC40NDQgQyA0My4yMzcgOS45NDQgNDIuNzM3IDkuNjQ0IDQyLjMzNyA5LjY0NCBMIDM4LjYzNyA5LjY0NCBDIDM4LjIzNyA5LjY0NCAzNy44MzcgMTAuMDQ0IDM4LjAzNyAxMC41NDQgTCA0Mi4xMzcgMjIuNjQ0IEwgMzguMjM3IDI4LjA0NCBDIDM3LjkzNyAyOC40NDQgMzguMjM3IDI5LjA0NCAzOC43MzcgMjkuMDQ0IEwgNDIuNDM3IDI5LjA0NCBDIDQyLjgzNyAyOS4wNDQgNDMuMTM3IDI4Ljg0NCA0My4zMzcgMjguNTQ0IEwgNTUuODM3IDEwLjU0NCBDIDU2LjEzNyAxMC4yNDQgNTUuODM3IDkuNjQ0IDU1LjMzNyA5LjY0NCBaIj48L3BhdGg+PHBhdGggZmlsbD0iIzAwOWNkZSIgZD0iTSA2Ny43MzcgMi40NDQgTCA1OS45MzcgMi40NDQgQyA1OS40MzcgMi40NDQgNTguOTM3IDIuODQ0IDU4LjgzNyAzLjM0NCBMIDU1LjczNyAyMy4yNDQgQyA1NS42MzcgMjMuNjQ0IDU1LjkzNyAyMy45NDQgNTYuMzM3IDIzLjk0NCBMIDYwLjMzNyAyMy45NDQgQyA2MC43MzcgMjMuOTQ0IDYxLjAzNyAyMy42NDQgNjEuMDM3IDIzLjM0NCBMIDYxLjkzNyAxNy42NDQgQyA2Mi4wMzcgMTcuMTQ0IDYyLjQzNyAxNi43NDQgNjMuMDM3IDE2Ljc0NCBMIDY1LjUzNyAxNi43NDQgQyA3MC42MzcgMTYuNzQ0IDczLjYzNyAxNC4yNDQgNzQuNDM3IDkuMzQ0IEMgNzQuNzM3IDcuMjQ0IDc0LjQzNyA1LjU0NCA3My40MzcgNC4zNDQgQyA3Mi4yMzcgMy4xNDQgNzAuMzM3IDIuNDQ0IDY3LjczNyAyLjQ0NCBaIE0gNjguNjM3IDkuNzQ0IEMgNjguMjM3IDEyLjU0NCA2Ni4wMzcgMTIuNTQ0IDY0LjAzNyAxMi41NDQgTCA2Mi44MzcgMTIuNTQ0IEwgNjMuNjM3IDcuMzQ0IEMgNjMuNjM3IDcuMDQ0IDYzLjkzNyA2Ljg0NCA2NC4yMzcgNi44NDQgTCA2NC43MzcgNi44NDQgQyA2Ni4xMzcgNi44NDQgNjcuNDM3IDYuODQ0IDY4LjEzNyA3LjY0NCBDIDY4LjYzNyA4LjA0NCA2OC43MzcgOC43NDQgNjguNjM3IDkuNzQ0IFoiPjwvcGF0aD48cGF0aCBmaWxsPSIjMDA5Y2RlIiBkPSJNIDkwLjkzNyA5LjY0NCBMIDg3LjIzNyA5LjY0NCBDIDg2LjkzNyA5LjY0NCA4Ni42MzcgOS44NDQgODYuNjM3IDEwLjE0NCBMIDg2LjQzNyAxMS4xNDQgTCA4Ni4xMzcgMTAuNzQ0IEMgODUuMzM3IDkuNTQ0IDgzLjUzNyA5LjE0NCA4MS43MzcgOS4xNDQgQyA3Ny42MzcgOS4xNDQgNzQuMTM3IDEyLjI0NCA3My40MzcgMTYuNjQ0IEMgNzMuMDM3IDE4Ljg0NCA3My41MzcgMjAuOTQ0IDc0LjgzNyAyMi4zNDQgQyA3NS45MzcgMjMuNjQ0IDc3LjYzNyAyNC4yNDQgNzkuNTM3IDI0LjI0NCBDIDgyLjgzNyAyNC4yNDQgODQuNzM3IDIyLjE0NCA4NC43MzcgMjIuMTQ0IEwgODQuNTM3IDIzLjE0NCBDIDg0LjQzNyAyMy41NDQgODQuNzM3IDIzLjk0NCA4NS4xMzcgMjMuOTQ0IEwgODguNTM3IDIzLjk0NCBDIDg5LjAzNyAyMy45NDQgODkuNTM3IDIzLjU0NCA4OS42MzcgMjMuMDQ0IEwgOTEuNjM3IDEwLjI0NCBDIDkxLjYzNyAxMC4wNDQgOTEuMzM3IDkuNjQ0IDkwLjkzNyA5LjY0NCBaIE0gODUuNzM3IDE2Ljg0NCBDIDg1LjMzNyAxOC45NDQgODMuNzM3IDIwLjQ0NCA4MS41MzcgMjAuNDQ0IEMgODAuNDM3IDIwLjQ0NCA3OS42MzcgMjAuMTQ0IDc5LjAzNyAxOS40NDQgQyA3OC40MzcgMTguNzQ0IDc4LjIzNyAxNy44NDQgNzguNDM3IDE2Ljg0NCBDIDc4LjczNyAxNC43NDQgODAuNTM3IDEzLjI0NCA4Mi42MzcgMTMuMjQ0IEMgODMuNzM3IDEzLjI0NCA4NC41MzcgMTMuNjQ0IDg1LjEzNyAxNC4yNDQgQyA4NS43MzcgMTQuOTQ0IDg1LjkzNyAxNS44NDQgODUuNzM3IDE2Ljg0NCBaIj48L3BhdGg+PHBhdGggZmlsbD0iIzAwOWNkZSIgZD0iTSA5NS4zMzcgMi45NDQgTCA5Mi4xMzcgMjMuMjQ0IEMgOTIuMDM3IDIzLjY0NCA5Mi4zMzcgMjMuOTQ0IDkyLjczNyAyMy45NDQgTCA5NS45MzcgMjMuOTQ0IEMgOTYuNDM3IDIzLjk0NCA5Ni45MzcgMjMuNTQ0IDk3LjAzNyAyMy4wNDQgTCAxMDAuMjM3IDMuMTQ0IEMgMTAwLjMzNyAyLjc0NCAxMDAuMDM3IDIuNDQ0IDk5LjYzNyAyLjQ0NCBMIDk2LjAzNyAyLjQ0NCBDIDk1LjYzNyAyLjQ0NCA5NS40MzcgMi42NDQgOTUuMzM3IDIuOTQ0IFoiPjwvcGF0aD48L3N2Zz4="
                            className="img-fluid"
                          />
                        </Button>
                      )}
                    />
                  </div>

                  <form className="checkout-pay-form mt-5" onSubmit={e => checkoutFormSubmit(e)}>
                    <h6 className="checkout-pay-form__title mb-3">{t('checkout.form_title')} <LockIcon className="ml-2" /></h6>

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
                      <div className="col-6 col-xs-3">
                        
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
                      <div className="col-6 col-xs-3">
                        
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
                      <div className="col-xs-6 col-sm-4 offset-sm-2">
                        
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

                    <div className="text-center mt-3 mt-sm-5">
                      <Button type="submit" className="checkout-pay-form__submit" color="primary">{t('button.checkout_start')}</Button>
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
