import React from 'react';
import { InputFieldProps } from '../InputField/InputField';

// Components
import InputField from 'components/common/Forms/InputField';

import './CreditCardNumberField.sass';

interface CreditCardNumberFieldProps extends InputFieldProps {

}

const CreditCardNumberField = (props: CreditCardNumberFieldProps) => {
  return (
    <InputField {...props} />
  );
};

export default CreditCardNumberField;
