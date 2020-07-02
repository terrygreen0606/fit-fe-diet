import React, { useState } from 'react';
import classNames from 'classnames';
import Select, { components } from 'react-select';
import AsyncSelect from 'react-select/async';

// Components
import FormLabel from '../FormLabel';
import FormInvalidMessage from '../FormInvalidMessage';

import styles from './SelectInput.module.sass';

// Select Props
// https://react-select.com/props

type SelectValueType = string | number | null | undefined | boolean;

type inputError = {
  code?: string,
  field?:string,
  message: string
};

interface SelectOptions {
  [index: number]: { value: SelectValueType, label: SelectValueType }
}

interface SelectInputProps {
  // value?: { value: SelectValueType, label: SelectValueType },
  options?: SelectOptions,
  label?: string,
  async?: boolean,
  loadOptions?: (any) => any,
  block?: boolean,
  disabled?: boolean,
  readOnly?: boolean,
  width?: number,
  errors?: inputError[],
  [propName: string]: any
}

const SelectInputDefaultProps = {
  width: 200
};

const SelectInput = (props: SelectInputProps) => {

  const [dummyErrorSelectInputRef] = useState(React.createRef<HTMLInputElement>());

  const Input = inputProps => (
    <components.Input {...inputProps} />
  );

  const Control = controlProps => (
    <components.Control
      {...controlProps}
      className={classNames(styles.fgSelectControl, {
        [styles.fgSelectControl_block]: props.block,
        [styles.fgSelectControl_focused]: controlProps.isFocused || controlProps.hasValue,
        [styles.fgSelectControl_has_value]: controlProps.hasValue,
        [styles.fgSelectControl_disabled]: controlProps.isDisabled,
        [styles.fgSelectControl_readonly]: props.readOnly,
        [styles.fgSelectControl_is_invalid]: props.invalid || (props.errors && props.errors.length > 0)
      })}
    />
  );

  const SingleValue = ({ children, ...singleValueProps }) => (
    <components.SingleValue {...singleValueProps} className={styles.fgSelectSingleValue}>{children}</components.SingleValue>
  );

  const Menu = menuProps => (
    <components.Menu
      {...menuProps}
      className={classNames(styles.fgSelectMenu, {
        [styles.fgSelectMenu_block]: props.block
      })}
    >
      {menuProps.children}
    </components.Menu>
  );

  const Option = optionProps => (
    <components.Option
      {...optionProps}
      className={classNames(styles.fgSelectOption, {
        [styles.fgSelectOption_selected]: optionProps.isSelected,
        [styles.fgSelectOption_focused]: optionProps.isFocused,
        [styles.fgSelectOption_selected_disabled]: optionProps.isDisabled
      })}
    />
  );

  const IndicatorsContainer = indicatorsContainerProps => (
    <components.IndicatorsContainer
      {...indicatorsContainerProps}
      className={styles.fgSelectIndicatorsContainer}
    />
  );

  const IndicatorSeparator = ({ indicatorSeparatorProps }) => (
    <span
      {...indicatorSeparatorProps}
      className={styles.fgSelectSeprator}
    />
  );

  const onChange = selectValue => {
    if (props.onChange) {
      if (props.errors) {

        const event = new Event('change');
        dummyErrorSelectInputRef.current.value = selectValue;
        dummyErrorSelectInputRef.current.dispatchEvent(event);

        props.onChange(selectValue, event);
      } else {
        props.onChange(selectValue);
      }
    }
  };

  const {
    children, // eslint-disable-line
    value,
    options,
    label,
    disabled,
    readOnly,
    invalid,
    async,
    name,
    errors,
    ...attributes
  } = props;

  const finalAttributes = {
    ...attributes,
    isDisabled: disabled || readOnly,
    menuPlacement: 'auto',
    components: {
      Control,
      SingleValue,
      Menu,
      Option,
      IndicatorsContainer,
      IndicatorSeparator,
      Input
    },
    value: value ? value : '', // eslint-disable-line
    onChange,
    options,
    styles: {
      control: (base) => ({
        ...base,
        width: `${props.width}px`
      }),
      menu: (base) => ({
        ...base,
        width: `${props.width}px`
      })
    }
  };

  if (finalAttributes['data-validate']) {
    delete finalAttributes['data-validate'];
  }

  if (finalAttributes['data-param']) {
    delete finalAttributes['data-validate'];
  }

  return (
    <>
      {label && (
        <FormLabel invalid={invalid || (errors && errors.length > 0)}>
          {label}
        </FormLabel>
      )}

      {async ? (
        <AsyncSelect
          {...finalAttributes}
        />
      ) : (
        <Select
          {...finalAttributes}
        />
      )}

      {errors && (
        <input
          ref={dummyErrorSelectInputRef}
          name={name}
          type="hidden"
          value={props.value ? props.value : ''}
          data-param={props['data-param']}
          data-validate={props['data-validate']}
        />
      )}

      {errors && errors.slice(0, 1).map(error => (
        <FormInvalidMessage>{error.message}</FormInvalidMessage>
      ))}
    </>
  );
};

SelectInput.defaultProps = SelectInputDefaultProps;

export default SelectInput;