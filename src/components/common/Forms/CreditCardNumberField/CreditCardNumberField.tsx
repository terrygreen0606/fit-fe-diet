import React from 'react';
import classNames from 'classnames';

// Components
import InputField from 'components/common/Forms/InputField';

import './CreditCardNumberField.sass';

import CreditCardDefaultLogo from 'assets/img/icons/credit-card-default-icon.svg';

import { InputFieldProps } from '../InputField/InputField';

type CreditCardType = {
  pattern: string;
  logo: string;
};

interface CreditCardNumberFieldProps extends InputFieldProps {
  cards?: CreditCardType[];
}

const CreditCardNumberFieldDefaultProps = {
  cards: [],
};

const CreditCardNumberField = ({ cards, ...inputProps }: CreditCardNumberFieldProps) => {
  const getCardLogo = () => {
    let cardLogo = CreditCardDefaultLogo;

    cards.forEach(({ pattern, logo }) => {
      if (new RegExp(pattern).test(inputProps.value?.toString().replace(/ /g, '') || '')) {
        cardLogo = logo;
      }
    });

    return cardLogo;
  };

  return (
    <div
      className={classNames('credit-card-number-input__wrap', {
        'input-block': inputProps.block,
      })}
    >
      <img
        className='credit-card-number-input__logo'
        src={getCardLogo()}
        alt=''
      />
      <InputField {...inputProps} />
    </div>
  );
};

CreditCardNumberField.defaultProps = CreditCardNumberFieldDefaultProps;

export default CreditCardNumberField;
