/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import classNames from 'classnames';

import { InputError } from 'types';

// Components
import IntlTelInput from 'react-intl-tel-input';
import FormInvalidMessage from 'components/common/Forms/FormInvalidMessage';
import FormLabel from '../FormLabel';

import 'react-intl-tel-input/dist/main.css';
import './PhoneInput.sass';

type PhoneInputProps = {
  value: string;
  defaultCountry?: string;
  onChange?: (val, e?) => void;
  label?: string;
  errors?: InputError[];
  invalid?: boolean;
  name?: string,
  checkIsValid?: (isValid: boolean) => void;
  countryCode?: (code: string) => void;
  className?: string;
};

const PhoneInputDefaultProps = {
  defaultCountry: null,
  onChange: null,
  label: null,
  errors: null,
  invalid: null,
  name: null,
  checkIsValid: null,
  countryCode: null,
  className: null,
};

const PhoneInput = (props: PhoneInputProps) => {
  const [dummyErrorSelectInputRef] = useState(React.createRef<HTMLInputElement>());

  const [isValid, setIsValid] = useState<boolean>(true);

  const {
    value,
    onChange,
    defaultCountry,
    label,
    errors,
    invalid,
    name,
    checkIsValid,
    countryCode,
    className,
  } = props;

  const onChangeInput = (valid: boolean, val: string) => {
    if (onChange) {
      if (errors) {
        const event = new Event('change');
        dummyErrorSelectInputRef.current.value = val;
        dummyErrorSelectInputRef.current.dispatchEvent(event);

        onChange(val, event);
      } else {
        onChange(val);
      }
    }
    checkIsValid(valid);
  };

  return (
    <>
      {!!label && (
        <FormLabel
          invalid={invalid || (errors && errors.length > 0)}
        >
          {label}
        </FormLabel>
      )}

      <div className='phone-input-wrap'>
        <IntlTelInput
          key={defaultCountry}
          value={value}
          defaultCountry={defaultCountry}
          onPhoneNumberChange={(valid, val, country) => {
            setIsValid(valid);

            countryCode(country.dialCode);

            // eslint-disable-next-line no-restricted-globals
            if (isNaN(+val)) {
              return;
            }

            return onChangeInput(valid, val);
          }}
          containerClassName={classNames('intl-tel-input', className)}
          inputClassName={classNames('fg-input', {
            'is-invalid': !isValid,
          })}
        />
      </div>

      {errors && (
        <input
          ref={dummyErrorSelectInputRef}
          name={name}
          type='hidden'
          value={value}
          data-validate={props['data-validate']}
        />
      )}

      {errors && errors.length > 0 ? (
        <FormInvalidMessage>
          {errors[0].message}
        </FormInvalidMessage>
      ) : null}
    </>
  );
};

PhoneInput.defaultProps = PhoneInputDefaultProps;

export default PhoneInput;
