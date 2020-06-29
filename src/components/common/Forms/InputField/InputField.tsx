import React, { useState } from 'react';
import classNames from 'classnames';
import uuid from 'react-uuid';
import MaskedInput from 'react-maskedinput';
import numeral from 'numeral';
import { InputError } from 'types';
import { localStringToNumber } from 'utils/helpers';

// Components
import FormLabel from '../FormLabel';
import FormInvalidMessage from '../FormInvalidMessage';

import './InputField.sass';

interface InputFieldProps {
  type?: 'text' | 'number' | 'password' | 'money' | 'percent' | 'textarea',
  name?: string,
  label?: string,
  value?: string,
  mask?: string, // https://github.com/insin/inputmask-core#pattern
  className?: string,
  invalid?: boolean,
  onChange?: (any) => void,
  readOnly?: boolean,
  disabled?: boolean,
  required?: boolean,
  minLength?: number,
  rows?: number,
  cols?: number,
  maxLength?: number,
  min?: number,
  max?: number,
  block?: boolean,
  placeholder?: string,
  errors?: InputError[],
  openModalFiled?: boolean,
  openModalFiledProps?: any,
  [propName: string]: any
}

const InputFieldPropsDefaults = {
  type: 'text'
};

const InputField = (props: InputFieldProps) => {
  const [inputFieldId] = useState(`inputField-${uuid()}`);

  const onBlur = e => {
    if (props.type === 'money' && !props.mask) {
      const value = e.target.value;

      const currency = 'RUB'; // https://www.currency-iso.org/dam/downloads/lists/list_one.xml

      const options = {
        maximumFractionDigits: 2,
        currency,
        style: 'currency',
        currencyDisplay: 'symbol'
      };

      e.target.value = value ? localStringToNumber(value).toLocaleString(undefined, options) : '';

      if (props.onChange) {
        props.onChange(e);
      }
    } else if (props.type === 'percent' && !props.mask) {
      const value = e.target.value;

      e.target.value = value ? numeral(numeral(value.replace(',', '.')).value() / 100).format('0.00%') : '';

      if (props.onChange) {
        props.onChange(e);
      }
    }

    if (props.onBlur) {
      props.onBlur(e);
    }
  };

  const onFocus = e => {
    if (props.type === 'money' && !props.mask) {
      const value = e.target.value;

      e.target.value = e.target.value
        ? localStringToNumber(value.split(',')[0]) + localStringToNumber(value.split(',')[1]) / 100
        : '';
    } else if (props.type === 'percent' && !props.mask) {
      const value = e.target.value;

      e.target.value = e.target.value ? numeral(numeral(value).value() * 100).format('0.00') : '';
    }

    if (props.onFocus) {
      props.onFocus(e);
    }
  };

  const onChange = e => {
    if (props.disabled || props.readOnly) {
      e.preventDefault();
      return;
    }

    if (props.onChange) {
      props.onChange(e);
    }
  };

  const {
    label,
    className,
    invalid,
    block,
    id, // eslint-disable-line
    children, // eslint-disable-line
    openModalFiled,
    openModalFiledProps,
    mask,
    errors,
    value,
    disabled,
    readOnly,
    innerRef,
    ...attributes
  } = props;

  if (attributes.type !== 'number') {
    delete attributes.min;
    delete attributes.max;
  }

  if (attributes.type !== 'textarea') {
    delete attributes.rows;
    delete attributes.cols;
  }

  if (attributes.type === 'money' || attributes.type === 'percent') {
    attributes.type = 'text';
  }

  const finalAttributes = {
    ...attributes,
    disabled: disabled || readOnly,
    readOnly,
    id: inputFieldId,
    mask,
    className: classNames(className, 'fg-input', {
      'input-block': block,
      'is-invalid': invalid || (errors && errors.length > 0)
    }),
    onChange,
    onBlur,
    onFocus,
    ref: innerRef,
    value: value ? value : '' // eslint-disable-line
  };

  if (!finalAttributes.mask) {
    delete finalAttributes.mask;
  }

  let input = <input {...finalAttributes} />;

  if (mask) {
    input = <MaskedInput {...finalAttributes} />;
  } else if (attributes.type === 'textarea') {
    input = <textarea {...finalAttributes} />;
  }

  return (
    <>
      {!!label && (
        <FormLabel
          htmlFor={inputFieldId}
          invalid={invalid || (errors && errors.length > 0)}
        >
          {label}
        </FormLabel>
      )}

      {input}

      {errors && errors[0] && (
        <FormInvalidMessage>{errors[0].message}</FormInvalidMessage>
      )}
    </>
  );
};

InputField.defaultProps = InputFieldPropsDefaults;

export default InputField;
