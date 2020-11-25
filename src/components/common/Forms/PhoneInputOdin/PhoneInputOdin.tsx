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
import './PhoneInputOdin.sass';

type PhoneInputOdinProps = {
  value: string;
  defaultCountry?: string;
  onChange?: (val, e?) => void;
  label?: string;
  errors?: InputError[];
  invalid?: boolean;
  name?: string,
  checkIsValid?: (isValid: boolean) => void;
  countryCode?: (code: string) => void;
};

const PhoneInputOdinDefaultProps = {
  defaultCountry: null,
  onChange: null,
  label: null,
  errors: null,
  invalid: null,
  name: null,
  checkIsValid: null,
  countryCode: null,
};

const PhoneInputOdin = (props: PhoneInputOdinProps) => {
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
          value={value}
          defaultCountry={defaultCountry}
          onPhoneNumberChange={(valid, val, country) => {
            setIsValid(valid);

            countryCode(country.dialCode);

            return onChangeInput(valid, val);
          }}
          inputClassName={classNames({
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

PhoneInputOdin.defaultProps = PhoneInputOdinDefaultProps;

export default PhoneInputOdin;
