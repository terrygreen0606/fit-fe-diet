import React, { useState } from 'react';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
  getTranslate,
  getImagePath,
} from 'utils';
import { InputError } from 'types';
import { payCreditCard } from 'api';

// Components
import FormGroup from 'components/common/Forms/FormGroup';
import FormLabel from 'components/common/Forms/FormLabel';
import InputField from 'components/common/Forms/InputField';
import CreditCardNumberField from 'components/common/Forms/CreditCardNumberField';
import Button from 'components/common/Forms/Button';
import FormValidator from 'utils/FormValidator';

import './CheckoutPaymentFormCard.sass';

import { ReactComponent as LockIcon } from 'assets/img/icons/lock-icon.svg';
import { ReactComponent as CreditCardIcon } from 'assets/img/icons/credit-card-icon.svg';

const checkoutFormDefault = {
  payment_type: 'credit_card',
  payer_name: null,
  phone: null,
  card_number: null,
  card_cvv: null,
  card_month_year: null,
  discount_code: null,
};

type CheckoutPaymentFormCardProps = {
  tariffId: string;
  currency: string;
  localePhrases: any;
};

const CheckoutPaymentFormCard = ({
  tariffId,
  currency,
  localePhrases,
}: CheckoutPaymentFormCardProps) => {
  const [checkoutForm, setCheckoutForm] = useState({ ...checkoutFormDefault });
  const [checkoutFormErrors, setCheckoutFormErrors] = useState<InputError[]>([]);

  const [paymentLoading, setPaymentLoading] = useState<boolean>(false);

  const t = (code: string, placeholders?: any) =>
    getTranslate(localePhrases, code, placeholders);

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

  const getPayCredictCardParams = () => ({
    article_id: tariffId,
    currency,
    card: {
      number: checkoutForm.card_number.replace(/ /gi, ''),
      year: checkoutForm.card_month_year.split('/')[1],
      month: checkoutForm.card_month_year.split('/')[0],
      cvv: checkoutForm.card_cvv,
    },
    contacts: {
      phone: checkoutForm.phone,
      payer_name: checkoutForm.payer_name,
    },
  });

  const checkoutFormSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const inputs = [...form.elements].filter((i) =>
      ['INPUT', 'SELECT', 'TEXTAREA'].includes(i.nodeName));

    const { errors, hasError } = FormValidator.bulkValidate(inputs);

    setCheckoutFormErrors([...errors]);

    if (!hasError) {
      setPaymentLoading(true);

      payCreditCard(getPayCredictCardParams())
        .then((response) => {
          const paymentOrder = response.data;

          if (paymentOrder) {
            if (paymentOrder.redirect_url) {
              window.location.href = paymentOrder.redirect_url;
            } else if (paymentOrder.status) {
              switch (paymentOrder.status) {
                case 'ok':
                  toast.success(t('checkout.payment_success'));
                  setCheckoutForm({ ...checkoutFormDefault });
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
        .catch(() => {
          toast.error(t('checkout.payment_fail'));
        })
        .finally(() => {
          setPaymentLoading(false);
        });
    }
  };

  return (
    <div className='checkout-payment-card'>
      <form className='checkout-payment-card__form' onSubmit={(e) => checkoutFormSubmit(e)}>
        <h3 className='checkout-payment-card__title'>
          <CreditCardIcon className='mr-2' />
          {t('checkout.form_card.title')}
        </h3>

        <FormGroup>
          <CreditCardNumberField
            block
            name='card_number'
            label={`${t('checkout.form_card_number')}*:`}
            isValid={checkoutForm.card_number && getFieldErrors('card_number').length === 0}
            value={checkoutForm.card_number}
            data-param={19}
            placeholderChar=' '
            data-validate='["required", "len"]'
            mask='1111 1111 1111 1111'
            onChange={(e) => validateOnChange('card_number', e.target.value, e)}
            errors={getFieldErrors('card_number')}
            placeholder='1245 8769 0987 0945'
            className='checkout-payment-card__form_input'
          />
        </FormGroup>

        <div className='row'>
          <div className='col-sm-6'>

            <FormGroup>
              <InputField
                block
                name='card_month_year'
                data-param={7}
                label={`${t('checkout.form_card.expiry_date')}*:`}
                isValid={checkoutForm.card_month_year && getFieldErrors('card_month_year').length === 0}
                value={checkoutForm.card_month_year}
                data-validate='["required", "len"]'
                mask='11/1111'
                onChange={(e) => validateOnChange('card_month_year', e.target.value, e)}
                errors={getFieldErrors('card_month_year')}
                placeholder='MM/YYYY'
                className='checkout-payment-card__form_input'
              />
            </FormGroup>

          </div>
          <div className='col-sm-6'>

            <FormGroup>
              <InputField
                block
                name='card_cvv'
                label={`${t('checkout.form_card.cvc_cvv')}*:`}
                isValid={checkoutForm.card_cvv && getFieldErrors('card_cvv').length === 0}
                value={checkoutForm.card_cvv}
                data-param={3}
                data-validate='["required", "len"]'
                mask='111'
                onChange={(e) => validateOnChange('card_cvv', e.target.value, e)}
                errors={getFieldErrors('card_cvv')}
                placeholder='123'
                className='checkout-payment-card__form_input'
              />
            </FormGroup>

          </div>
        </div>

        <FormGroup>
          <InputField
            block
            name='payer_name'
            label={`${t('checkout.form_card.name')}*:`}
            isValid={checkoutForm.payer_name && getFieldErrors('payer_name').length === 0}
            value={checkoutForm.payer_name}
            data-validate='["required"]'
            onChange={(e) => validateOnChange('payer_name', e.target.value, e)}
            errors={getFieldErrors('payer_name')}
            placeholder='J.Smith'
            className='checkout-payment-card__form_input'
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
            onChange={(e) => validateOnChange('phone', e.target.value, e)}
            errors={getFieldErrors('phone')}
            placeholder='9876543210'
            className='checkout-payment-card__form_input'
          />
        </FormGroup>

        <div className='text-center mt-3 mt-sm-5'>
          <Button
            type='submit'
            className='checkout-pay-form__submit'
            color='primary'
            size='lg'
            block
            style={{ maxWidth: '320px' }}
            isLoading={paymentLoading}
          >
            <LockIcon className='mr-2' />
            {t('button.pay_now')}
          </Button>
        </div>
      </form>

      <img className='mt-5 img-fluid' src={getImagePath('checkout/guaranteed-checkout-img.png')} alt='' />

      <div className='money-back-guarantee-block mt-4'>
        <h5 className='money-back-guarantee-block__title'>{t('lp.money_back_title')}</h5>
        <p className='money-back-guarantee-block__descr'>{t('lp.money_back_descr')}</p>
      </div>
    </div>
  );
};

export default CheckoutPaymentFormCard;
