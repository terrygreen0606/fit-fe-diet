import React, { ReactNode, RefObject } from 'react';
import classNames from 'classnames';

import styles from './CustomRadio.module.sass';

interface CustomRadioProps {
  type?: 'checkbox',
  name?: string,
  className?: string,
  label?: ReactNode,
  checked?: boolean,
  defaultChecked?: boolean,
  onChange?: (any) => void,
  inline?: boolean,
  disabled?: boolean,
  required?: boolean,
  invalid?: boolean,
  innerRef?: RefObject<HTMLInputElement>,
  htmlFor?: string,
  [propName: string]: any
}

const CustomRadioDefaultProps = {
  type: 'radio'
};

const CustomRadio = (props: CustomRadioProps) => {
  const onChange = e => {
    if (props.disabled) {
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
    inline,
    innerRef,
    invalid,
    htmlFor,
    children, // eslint-disable-line
    ...attributes
  } = props;

  return (
    <label
      htmlFor={htmlFor}
      className={classNames(className, styles.customRadio, {
        [styles.radioDisabled]: props.disabled,
        [styles.radioInline]: inline,
        [styles.customRadio_is_invalid]: invalid
      })}
    >
      {label && label}

      <input
        {...attributes}
        ref={innerRef}
        onChange={onChange}
      />

      <span className={styles.radiomark} />
    </label>
  );
};

CustomRadio.defaultProps = CustomRadioDefaultProps;

export default CustomRadio;