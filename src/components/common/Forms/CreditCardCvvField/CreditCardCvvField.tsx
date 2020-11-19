import React from 'react';
import classNames from 'classnames';

// Components
import InputField from 'components/common/Forms/InputField';

import { InputFieldProps } from '../InputField/InputField';

import './CreditCardCvvField.sass';

interface CreditCardCvvFieldProps extends InputFieldProps {}

const CreditCardCvvField = ({ className, ...inputProps }: CreditCardCvvFieldProps) => (
  <InputField
    {...inputProps}
    className={classNames('credit-card-cvv-input', {
      [className]: className,
    })}
  />
);

export default CreditCardCvvField;
