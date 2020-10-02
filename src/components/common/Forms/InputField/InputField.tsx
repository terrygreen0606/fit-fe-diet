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

export type InputFieldProps = {
  type?: 'text' | 'number' | 'password' | 'money' | 'percent' | 'textarea' | 'radio',
  name?: string,
  label?: string,
  value?: string | number,
  mask?: any, // https://github.com/insin/inputmask-core#pattern
  className?: string,
  invalid?: boolean,
  isValid?: boolean,
  onChange?: (any) => void,
  readOnly?: boolean,
  disabled?: boolean,
  required?: boolean,
  minLength?: number,
  rows?: number,
  cols?: number,
  searchBar?: boolean,
  maxLength?: number,
  min?: number,
  max?: number,
  block?: boolean,
  placeholder?: string,
  errors?: InputError[],
  openModalFiled?: boolean,
  openModalFiledProps?: any,
  height?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  border?: 'light',
  [propName: string]: any
}

const InputFieldPropsDefaults = {
  type: 'text',
};

const InputField = (props: InputFieldProps) => {
  const [inputFieldId] = useState(props.id || `inputField-${uuid()}`);

  const onBlur = (e) => {
    if (props.type === 'money' && !props.mask) {
      const { value } = e.target;

      const currency = 'RUB'; // https://www.currency-iso.org/dam/downloads/lists/list_one.xml

      const options = {
        maximumFractionDigits: 2,
        currency,
        style: 'currency',
        currencyDisplay: 'symbol',
      };

      e.target.value = value ? localStringToNumber(value).toLocaleString(undefined, options) : '';

      if (props.onChange) {
        props.onChange(e);
      }
    } else if (props.type === 'percent' && !props.mask) {
      const { value } = e.target;

      e.target.value = value ? numeral(numeral(value.replace(',', '.')).value() / 100).format('0.00%') : '';

      if (props.onChange) {
        props.onChange(e);
      }
    }

    if (props.onBlur) {
      props.onBlur(e);
    }
  };

  const onFocus = (e) => {
    if (props.type === 'money' && !props.mask) {
      const { value } = e.target;

      e.target.value = e.target.value
        ? localStringToNumber(value.split(',')[0]) + localStringToNumber(value.split(',')[1]) / 100
        : '';
    } else if (props.type === 'percent' && !props.mask) {
      const { value } = e.target;

      e.target.value = e.target.value ? numeral(numeral(value).value() * 100).format('0.00') : '';
    }

    if (props.onFocus) {
      props.onFocus(e);
    }
  };

  const onChange = (e) => {
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
    valid,
    value,
    isValid,
    disabled,
    searchBar,
    readOnly,
    innerRef,
    height,
    border,
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

  if (searchBar && attributes.placeholder) {
    attributes.placeholder = 'Search...';
  }

  const finalAttributes = {
    ...attributes,
    disabled: disabled || readOnly,
    readOnly,
    id: inputFieldId,
    mask,
    className: classNames(className, 'fg-input', {
      [`height-${height}`]: height,
      [`border-${border}`]: border,
      'input-block': block,
      'is-invalid': invalid || (errors && errors.length > 0),
      'is-valid': isValid,
      'is-searchbar': searchBar,
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

      {errors && errors.length > 0 ? (
        <FormInvalidMessage>{errors[0].message}</FormInvalidMessage>
      ) : null}
    </>
  );
};

InputField.defaultProps = InputFieldPropsDefaults;

export default InputField;
