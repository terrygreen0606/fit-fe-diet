import React, { useState } from 'react';
import IntlTelInput from 'react-intl-tel-input';

// Components
import FormInvalidMessage from 'components/common/Forms/FormInvalidMessage';

import 'react-intl-tel-input/dist/main.css';
import './PhoneInputOdin.sass';

type PhoneInputOdinProps = {
  defaultCountry?: string,
  label?: string;
};

const PhoneInputOdinDefaultProps = {
  defaultCountry: null,
  label: null,
};

const PhoneInputOdin = ({
  defaultCountry,
  label,
}: PhoneInputOdinProps) => {
  const [isError, setIsError] = useState<boolean>(false);

  return (
    <>
      <div>
        {label}
      </div>
      <div className='phone-input-wrap'>
        <IntlTelInput
          defaultCountry={defaultCountry}
          onPhoneNumberChange={(e) => setIsError(!e)}
        />
      </div>
      {isError && (
        <FormInvalidMessage>
          Bad value
        </FormInvalidMessage>
      )}
    </>
  );
};

PhoneInputOdin.defaultProps = PhoneInputOdinDefaultProps;

export default PhoneInputOdin;
