import React, { useState } from 'react';
import classNames from 'classnames';
import ReactPhoneInput from 'react-phone-input-2';
import { InputError } from 'types';
import uuid from 'react-uuid';

// Components
import FormLabel from '../FormLabel';
import FormInvalidMessage from '../FormInvalidMessage';

import './PhoneInput.sass';

type PhoneInputProps = {
  id?: string;
  className?: string;
  containerClassName?: string;
  invalid?: boolean;
  isValid?: boolean;
  label?: string;
  value?: string,
  name?: string,
  onChange?: (val, e?) => void;
  checkIsValid?: (isValid: boolean) => void;
  readOnly?: boolean;
  disabled?: boolean;
  required?: boolean;
  block?: boolean;
  placeholder?: string;
  errors?: InputError[];
  height?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  border?: 'light';
  [propName: string]: any
};

const PhoneInputDefaultProps = {
  id: null,
  className: null,
  containerClassName: null,
  invalid: null,
  isValid: null,
  label: null,
  value: null,
  name: null,
  onChange: null,
  checkIsValid: null,
  readOnly: null,
  disabled: null,
  required: null,
  block: null,
  placeholder: null,
  errors: null,
  height: null,
  border: null,
};

const PhoneInput = (props: PhoneInputProps) => {
  const [dummyErrorSelectInputRef] = useState(React.createRef<HTMLInputElement>());

  const {
    label,
    className,
    containerClassName,
    invalid,
    block,
    id,
    name,
    errors,
    value,
    isValid,
    disabled,
    readOnly,
    placeholder,
    onChange,
    checkIsValid,
    height,
    border,
    ...attributes
  } = props;

  const finalAttributes = {
    ...attributes,
  };

  if (finalAttributes['data-validate']) {
    delete finalAttributes['data-validate'];
  }

  if (finalAttributes['data-param']) {
    delete finalAttributes['data-validate'];
  }

  const classNameFinal = classNames(className, 'fg-input', {
    [`height-${height}`]: height,
    [`border-${border}`]: border,
    'input-block': block,
    'is-invalid': invalid || (errors && errors.length > 0),
    'is-valid': isValid,
  });

  const onChangeInput = (val: string) => {
    if (disabled || readOnly) {
      return;
    }

    if (onChange) {
      if (props.errors) {
        const event = new Event('change');
        dummyErrorSelectInputRef.current.value = val;
        dummyErrorSelectInputRef.current.dispatchEvent(event);

        onChange(val, event);
      } else {
        onChange(val);
      }
    }
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

      <ReactPhoneInput
        value={value}
        isValid={(curValue, country) => {
          if (checkIsValid && country['format'] && curValue) {
            checkIsValid(country['format'].split('').filter((char) => char === '.').length === curValue.length);
          }

          return true;
        }}
        onChange={(phone) => onChangeInput(phone)}
        specialLabel={label}
        containerClass={classNames({
          [containerClassName]: containerClassName,
        })}
        inputClass={classNameFinal}
        inputProps={{
          disabled: disabled || readOnly,
          readOnly,
          required: null,
        }}
        placeholder={placeholder}
      />

      {errors && (
        <input
          ref={dummyErrorSelectInputRef}
          name={name}
          type='hidden'
          value={value}
          data-param={props['data-param']}
          data-validate={props['data-validate']}
        />
      )}

      {errors && errors.length > 0 ? (
        <FormInvalidMessage>{errors[0].message}</FormInvalidMessage>
      ) : null}
    </>
  );
};

PhoneInput.defaultProps = PhoneInputDefaultProps;

export default PhoneInput;
