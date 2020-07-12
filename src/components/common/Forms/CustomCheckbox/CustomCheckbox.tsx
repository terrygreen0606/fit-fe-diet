import React, { ReactNode, RefObject } from 'react';
import classNames from 'classnames';

import  './CustomCheckbox.sass';

interface CustomCheckboxProps {
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

const CustomCheckboxDefaultProps = {
  type: 'checkbox'
};

const CustomCheckbox = (props: CustomCheckboxProps) => {
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
      className={classNames(className, "customCheckbox", {
        "checkboxDisabled": props.disabled,
        "checkboxInline": inline,
        "customCheckbox_is_invalid": invalid
      })}
    >
      {label && label}

      <input
        {...attributes}
        ref={innerRef}
        onChange={onChange}
      />

      <span className="checkmark" />
    </label>
  );
};

CustomCheckbox.defaultProps = CustomCheckboxDefaultProps;

export default CustomCheckbox;
