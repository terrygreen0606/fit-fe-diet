import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
  getTranslate,
} from 'utils';
import { routes } from 'constants/routes';
import { InputError } from 'types';
import { payCreditCard, getPaymentMethods } from 'api';

// Components
import FormGroup from 'components/common/Forms/FormGroup';
import FormLabel from 'components/common/Forms/FormLabel';
import FormInvalidMessage from 'components/common/Forms/FormInvalidMessage';
import InputField from 'components/common/Forms/InputField';
import CreditCardNumberField from 'components/common/Forms/CreditCardNumberField';
import CreditCardCvvField from 'components/common/Forms/CreditCardCvvField';
import CustomRadio from 'components/common/Forms/CustomRadio';
import Button from 'components/common/Forms/Button';
import FormValidator from 'utils/FormValidator';
import PhoneInput from 'components/common/Forms/PhoneInput';

import './CheckoutPaymentFormCard.sass';

import { ReactComponent as LockIcon } from 'assets/img/icons/lock-icon.svg';
import { ReactComponent as CreditCardIcon } from 'assets/img/icons/credit-card-icon.svg';
import { ReactComponent as WarningIcon } from 'assets/img/icons/warning-icon.svg';

import { getCardFieldFormat } from './getCardFieldFormat';

const checkoutFormDefault = {
  payment_type: 'credit_card',
  payerName: null,
  phone: '',
  cardNumber: null,
  cardCvv: null,
  cardMonthYear: null,
  discount_code: null,
  docId: null,
  installments: '1',
};

type CheckoutPaymentFormCardProps = {
  className?: string;
  tariff: any;
  isPaymentError?: boolean;
  paymentErrors?: string[];
  disabled?: boolean;
  scrollRef?: any;
  history: any;
  localePhrases: any;
};

const CheckoutPaymentFormCardPropsDefault = {
  className: null,
  isPaymentError: null,
  paymentErrors: null,
  disabled: null,
  scrollRef: null,
};

const currentShortYear = parseInt(new Date().getFullYear().toString().slice(2, 4), 10);
const maxExpireYearShort = currentShortYear + 9;
const validExpireYearsShort = [];

for (let i = currentShortYear; i <= maxExpireYearShort; i++) {
  validExpireYearsShort.push(i);
}

const validExpireYearsShortRegex = validExpireYearsShort.join('|');

const CheckoutPaymentFormCard = ({
  className,
  tariff,
  isPaymentError,
  paymentErrors,
  disabled,
  scrollRef,
  history,
  localePhrases,
}: CheckoutPaymentFormCardProps) => {
  const [checkoutForm, setCheckoutForm] = useState({ ...checkoutFormDefault });
  const [checkoutFormErrors, setCheckoutFormErrors] = useState<InputError[]>([]);

  const paymentErrorRef = useRef<any>(null);

  const [isCheckoutPaymentError, setCheckoutPaymentError] = useState<boolean>(false);
  const [paymentErrorsList, setPaymentErrorsList] = useState<string[]>([]);

  const [phoneErrors, setPhoneErrors] = useState<InputError[]>([]);

  const [paymentLoading, setPaymentLoading] = useState<boolean>(false);

  const [paymentMethods, setPaymentMethods] = useState<any>({
    cards: [],
    others: [],
  });
  const [paymentMethodsLoading, setPaymentMethodsLoading] = useState<boolean>(true);
  const [paymentMethodsLoadingError, setPaymentMethodsLoadingError] = useState<boolean>(false);

  const [countryCode, setCountryCode] = useState<string>(null);

  const updateCountryCode = (code: string) => setCountryCode(code);

  useEffect(() => {
    if (isPaymentError !== null) {
      setCheckoutPaymentError(isPaymentError);
    }
  }, [isPaymentError]);

  useEffect(() => {
    if (paymentErrors !== null) {
      setPaymentErrorsList([
        ...paymentErrors,
      ]);
    }
  }, [paymentErrors]);

  useEffect(() => {
    setCheckoutFormErrors([
      ...checkoutFormErrors,
      ...phoneErrors,
    ]);
  }, [phoneErrors]);

  const getUserPaymentMethods = () => {
    setPaymentMethodsLoading(true);
    setPaymentMethodsLoadingError(false);

    getPaymentMethods()
      .then(({ data }) => {
        setPaymentMethodsLoading(false);

        if (data.success && data.data) {
          setPaymentMethods({
            cards: data.data.cards || [],
            others: data.data.others || [],
          });
        }
      })
      .catch(() => {
        setPaymentMethodsLoading(false);
        setPaymentMethodsLoadingError(true);
      });
  };

  useEffect(() => {
    getUserPaymentMethods();
  }, []);

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

  const isFieldValid = (field: string) =>
    getFieldErrors(field).length === 0 && checkoutForm[field] && checkoutForm[field].length > 0;

  const getTariffDataValue = (property: string) => {
    let dataEl = null;

    if (tariff && tariff[property]) {
      dataEl = tariff[property];
    }

    return dataEl;
  };

  const getInstallmentsValue = (property: string) => {
    let dataEl = null;

    if (tariff && tariff.installments && tariff.installments[property]) {
      dataEl = tariff.installments[property].toString();
    }

    return dataEl;
  };

  const isShowInstallments = () =>
    getTariffDataValue('country') === 'br';

  const getPayCredictCardParams = () => {
    const {
      cardNumber,
      cardMonthYear,
      cardCvv,
      phone,
      payerName,
      installments,
      docId,
    } = checkoutForm;

    const payCredictCardPayload: any = {
      article_id: getTariffDataValue('tariff'),
      currency: getTariffDataValue('currency'),
      card: {
        number: cardNumber?.replace(/ /g, ''),
        year: `${new Date().getFullYear().toString().slice(0, 2)}${cardMonthYear.split('/')[1]}`,
        month: cardMonthYear.split('/')[0],
        cvv: cardCvv?.replace(/ /g, ''),
      },
      contacts: {
        phone: `${countryCode}${phone}`,
        payer_name: payerName,
      },
    };

    if (isShowInstallments) {
      if (installments !== '1') {
        payCredictCardPayload.card.installments = installments;
      }

      payCredictCardPayload.card.doc_id = docId;
    }

    return { ...payCredictCardPayload };
  };

  const checkoutFormSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const inputs = [...form.elements].filter((i) =>
      ['INPUT', 'SELECT', 'TEXTAREA'].includes(i.nodeName));

    const { errors, hasError } = FormValidator.bulkValidate(inputs);

    setCheckoutFormErrors([...errors]);

    if (!hasError && phoneErrors.length === 0) {
      setPaymentLoading(true);
      setCheckoutPaymentError(false);
      setPaymentErrorsList([]);

      payCreditCard(getPayCredictCardParams())
        .then((response) => {
          const paymentOrder = response.data;

          if (paymentOrder) {
            if (paymentOrder.status) {
              switch (paymentOrder.status) {
                case 'ok':
                  toast.success(t('checkout.payment_success'));
                  setCheckoutForm({ ...checkoutFormDefault });
                  history.push({
                    pathname: routes.checkoutThankyou,
                    orderTransactionId: paymentOrder.order_number,
                    orderAmount: paymentOrder.amount_usd,
                  });
                  break;

                case 'pending':
                  if (paymentOrder.redirect_url) {
                    window.location.href = paymentOrder.redirect_url;
                  } else {
                    toast.warning(t('checkout.payment_pending'));
                  }
                  break;

                case 'fail':
                  setCheckoutPaymentError(true);
                  setPaymentErrorsList(paymentOrder.errors_i18n
                    ? paymentOrder.errors_i18n.filter((error) => error.length > 0)
                    : []);
                  toast.error(t('checkout.payment_fail'));
                  paymentErrorRef?.current?.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
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
        .catch(({ response }) => {
          toast.error(t('checkout.payment_fail'));
          setCheckoutPaymentError(true);

          if (
            response &&
            response.status >= 400 &&
            response.status < 500 &&
            typeof response.data.message === 'object'
          ) {
            const validateErrors = response.data.message;

            const checkoutFormErrorsTemp: InputError[] = [...checkoutFormErrors];

            Object.keys(validateErrors).map((field) => {
              checkoutFormErrorsTemp.push({
                field: getCardFieldFormat(field),
                message: validateErrors[field],
              });
            });

            if (checkoutFormErrorsTemp.length > 0) {
              document?.querySelector(`.checkout-payment-card__form input[name=${checkoutFormErrorsTemp[0].field}]`)
                ?.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
            }

            setCheckoutFormErrors(checkoutFormErrorsTemp);
          } else {
            paymentErrorRef?.current?.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
          }
        })
        .finally(() => {
          setPaymentLoading(false);
        });
    }
  };

  const scrollToTariffsSelectForm = () => {
    scrollRef?.current?.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
  };

  return (
    <div
      className={classNames('checkout-payment-card', {
        [className]: className,
      })}
    >
      {isCheckoutPaymentError && (
        <div ref={paymentErrorRef} className='checkout-payment-card__error my-5'>
          <h3 className='checkout-payment-card__error__title'>
            <WarningIcon className='checkout-payment-card__error__icon mr-3' />
            {' '}
            {t('checkout.payment.error.title')}
          </h3>

          {paymentErrorsList.length > 0 && (
            <ul>
              {paymentErrorsList.map((error_i18n) => (
                <li>{error_i18n}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      <form className='checkout-payment-card__form' onSubmit={(e) => checkoutFormSubmit(e)}>
        <h3 className='checkout-payment-card__title'>
          <div className='checkout-payment-card__title_text'>
            <CreditCardIcon className='mr-2' />
            {t('checkout.form_card.title')}
          </div>

          <div className='payment-types-img-list'>
            {paymentMethods.cards.map((card) => (
              <img
                key={card.id}
                src={card.logo || null}
                className='payment-types-img'
                alt=''
              />
            ))}
          </div>
        </h3>

        <FormGroup>
          <FormLabel>{`${t('checkout.form_card_number')}*:`}</FormLabel>
          <CreditCardNumberField
            block
            name='cardNumber'
            cards={paymentMethods?.cards.map(({ pattern, logo }) => ({
              pattern,
              logo,
            })) || []}
            className='checkout-payment-card__form_input'
            value={checkoutForm.cardNumber}
            data-param='18,23'
            data-validate='["required", "max-max-len"]'
            onChange={(e) => validateOnChange('cardNumber', e.target.value?.trim(), e)}
            onFocus={(e) => {
              const el = e.target;
              const val = (e.target.value || '').trim();

              setTimeout(() => {
                el.setSelectionRange(val.length, val.length);
              }, 0);
            }}
            mask='1111 1111 1111 1111 111'
            invalid={getFieldErrors('cardNumber').length > 0}
            placeholderChar=' '
            placeholder='1245 8769 0987 0123'
          />

          {getFieldErrors('cardNumber').slice(0, 1).map((error, errorIndex) => (
            <FormInvalidMessage key={errorIndex}>{error.message}</FormInvalidMessage>
          ))}
        </FormGroup>

        <div className='row'>
          <div className='col-sm-6'>

            <FormGroup>
              <InputField
                block
                name='cardMonthYear'
                className='checkout-payment-card__form_input'
                data-param={`^(0[1-9]|1[012])/(${validExpireYearsShortRegex})$`}
                label={`${t('checkout.form_card.expiry_date')}*:`}
                isValid={isFieldValid('cardMonthYear')}
                value={checkoutForm.cardMonthYear}
                data-validate='["required", "regex"]'
                mask='11/11'
                onChange={(e) => validateOnChange('cardMonthYear', e.target.value, e)}
                errors={getFieldErrors('cardMonthYear')}
                placeholder={t('checkout.month_year.placeholder')}
              />
            </FormGroup>

          </div>
          <div className='col-sm-6'>

            <FormGroup>
              <CreditCardCvvField
                block
                name='cardCvv'
                className='checkout-payment-card__form_input'
                label={`${t('checkout.form_card.cvc_cvv')}*:`}
                isValid={isFieldValid('cardCvv')}
                value={checkoutForm.cardCvv}
                data-param='3,4'
                data-validate='["required", "max-max-len"]'
                onChange={(e) => validateOnChange('cardCvv', e.target.value, e)}
                errors={getFieldErrors('cardCvv')}
                mask='1111'
                placeholderChar=' '
                placeholder='123'
              />
            </FormGroup>

          </div>
        </div>

        <FormGroup>
          <InputField
            className='checkout-payment-card__form_input'
            block
            name='payerName'
            label={`${t('checkout.form_card.name')}*:`}
            isValid={isFieldValid('payerName')}
            value={checkoutForm.payerName}
            data-validate='["required"]'
            onChange={(e) => validateOnChange('payerName', e.target.value, e)}
            errors={getFieldErrors('payerName')}
            placeholder={t('checkout.name.placeholder')}
          />
        </FormGroup>

        <FormGroup>
          <PhoneInput
            name='phone'
            defaultCountry={getTariffDataValue('country')}
            label={`${t('checkout.form_phone')}*:`}
            value={`${checkoutForm.phone}`}
            data-validate='["required"]'
            onChange={(value, e) => validateOnChange('phone', value, e)}
            checkIsValid={(isValid: boolean) => {
              if (!isValid) {
                setPhoneErrors([{
                  field: 'phone',
                  code: 'required',
                  message: t('api.ecode.invalid_value'),
                }]);
              } else if (getFieldErrors('phone').length > 0 && isValid) {
                setPhoneErrors([]);
              }
            }}
            errors={getFieldErrors('phone')}
            countryCode={updateCountryCode}
          />
        </FormGroup>

        {isShowInstallments() && (
          <>
            <FormGroup>
              <InputField
                block
                name='docId'
                className='checkout-payment-card__form_input'
                label={`${t('checkout.form_card.cpf')}*:`}
                isValid={isFieldValid('docId')}
                value={checkoutForm.docId}
                data-param={14}
                data-validate='["required", "len"]'
                onChange={(e) => validateOnChange('docId', e.target.value, e)}
                errors={getFieldErrors('docId')}
                mask='111.111.111-11'
                placeholder='973.849.148-76'
              />
            </FormGroup>

            <FormLabel className='mt-45'>{t('checkout.tariff.installments.options_title')}</FormLabel>

            <div className='checkout-payment-card__form_installments__list mt-4 mt-xl-45'>
              <FormGroup className='checkout-payment-card__form_installments__item'>
                <FormLabel>
                  {t('checkout.tariff.installments.title', { PERIOD: getInstallmentsValue('parts') })}
                </FormLabel>

                <CustomRadio
                  inline
                  className={classNames('checkout-payment-card__form_installments__radio', {
                    'radio-checked': checkoutForm.payment_type === 'credit_card',
                  })}
                  checked={checkoutForm.installments === getInstallmentsValue('parts')}
                  value={getInstallmentsValue('parts') || ''}
                  name='checkout_installments'
                  onChange={(e) => validateOnChange('installments', e.target.value, e)}
                  label={(
                    <span className='checkout-payment-card__form_installments__radio_btn'>
                      <h6 className='checkout-payment-card__form_installments__radio_title'>
                        {getInstallmentsValue('price_weekly_text')}
                        /
                        {t('common.week')}
                        {' '}
                        {t('checkout.tariff.installments.taxes')}
                      </h6>
                      <p className='checkout-payment-card__form_installments__radio_descr'>
                        {t('checkout.tariff.installments.total_text', {
                          AMOUNT: getInstallmentsValue('price_text'),
                          PERIOD: getInstallmentsValue('parts'),
                        })}
                      </p>
                    </span>
                  )}
                />
              </FormGroup>

              <FormGroup className='checkout-payment-card__form_installments__item'>
                <FormLabel>
                  {t('checkout.tariff.installments.title_total', { COUNT: getInstallmentsValue('fee_pct') })}
                </FormLabel>

                <CustomRadio
                  inline
                  className={classNames('checkout-payment-card__form_installments__radio', {
                    'radio-checked': checkoutForm.payment_type === 'credit_card',
                  })}
                  checked={checkoutForm.installments === '1'}
                  value='1'
                  name='checkout_installments'
                  onChange={(e) => validateOnChange('installments', e.target.value, e)}
                  label={(
                    <span className='checkout-payment-card__form_installments__radio_btn'>
                      <h6 className='checkout-payment-card__form_installments__radio_title'>
                        {getTariffDataValue('price_weekly_text')}
                        /
                        {t('common.week')}
                      </h6>
                      <p className='checkout-payment-card__form_installments__radio_descr'>
                        {t('checkout.tariff.installments.total_text', {
                          AMOUNT: getTariffDataValue('price_text'),
                          PERIOD: getTariffDataValue('months'),
                        })}
                      </p>
                    </span>
                  )}
                />
              </FormGroup>
            </div>
          </>
        )}

        <div className='text-center mt-5'>
          <Button
            type='submit'
            className='checkout-payment-card__form_submit'
            color='primary'
            size='lg'
            isLoading={paymentLoading}
            disabled={!tariff || disabled}
          >
            <LockIcon className='mr-2' />
            {t('button.pay_now')}
          </Button>

          {disabled && (
            <div>
              <button
                type='button'
                className='checkout-payment-card__form_tariff_error'
                onClick={() => scrollToTariffsSelectForm()}
              >
                {t('checkout.tariff.select.error.msg')}
              </button>
            </div>
          )}
        </div>

        <img className='mt-5 img-fluid' src={t('checkout.guaranteed.img')} alt='' />

        <div
          className='money-back-guarantee-block mt-4'
          style={{ backgroundImage: `url(${t('checkout.money_back.img')})` }}
        >
          <h5 className='money-back-guarantee-block__title'>{t('lp.money_back_title')}</h5>
          <p className='money-back-guarantee-block__descr'>{t('lp.money_back_descr')}</p>
        </div>
      </form>

      {!disabled && (
        <p
          className='mt-4 checkout-payment-card__total'
          dangerouslySetInnerHTML={{
            __html: t('checkout.form_card.total_title', {
              AMOUNT: getTariffDataValue('price_text'),
              COUNT: getTariffDataValue('months'),
            }),
          }}
        />
      )}
    </div>
  );
};

CheckoutPaymentFormCard.defaultProps = CheckoutPaymentFormCardPropsDefault;

export default CheckoutPaymentFormCard;
