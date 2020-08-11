import React, { useState } from 'react';
import classNames from 'classnames';
import Select, { components } from 'react-select';
import AsyncSelect from 'react-select/async';

// Components
import FormLabel from '../FormLabel';
import FormInvalidMessage from '../FormInvalidMessage';

import './SelectInput.sass';

// Select Props
// https://react-select.com/props

type SelectValueType = string | number | null | undefined | boolean;

type InputError = {
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
  errors?: InputError[],
  [propName: string]: any
}

const SelectInputDefaultProps = {
  width: 200,
};

const SelectInput = (props: SelectInputProps) => {
  const [dummyErrorSelectInputRef] = useState(React.createRef<HTMLInputElement>());

  const SelectContainer = ({ children, ...selectContainerProps }: any) => (
    <components.SelectContainer
      {...selectContainerProps}
      className={classNames('fgSelectContainer', {
        fgSelectContainer_block: props.block,
      })}
    >
      {children}
    </components.SelectContainer>
  );

  const Input = (inputProps) => (
    <components.Input {...inputProps} />
  );

  const Control = (controlProps) => (
    <components.Control
      {...controlProps}
      className={classNames('fgSelectControl', {
        fgSelectControl_block: props.block,
        fgSelectControl_focused: controlProps.isFocused || controlProps.hasValue,
        fgSelectControl_has_value: controlProps.hasValue,
        fgSelectControl_disabled: controlProps.isDisabled,
        fgSelectControl_readonly: props.readOnly,
        fgSelectControl_is_invalid: props.invalid || (props.errors && props.errors.length > 0),
      })}
    />
  );

  const SingleValue = ({ children, ...singleValueProps }: any) => (
    <components.SingleValue {...singleValueProps} className="fgSelectSingleValue">{children}</components.SingleValue>
  );

  const Menu = (menuProps) => (
    <components.Menu
      {...menuProps}
      className={classNames('fgSelectMenu', {
        fgSelectMenu_block: props.block,
      })}
    >
      {menuProps.children}
    </components.Menu>
  );

  const Option = (optionProps) => (
    <components.Option
      {...optionProps}
      className={classNames('fgSelectOption', {
        fgSelectOption_selected: optionProps.isSelected,
        fgSelectOption_focused: optionProps.isFocused,
        fgSelectOption_selected_disabled: optionProps.isDisabled,
      })}
    />
  );

  const IndicatorsContainer = (indicatorsContainerProps) => (
    <components.IndicatorsContainer
      {...indicatorsContainerProps}
      className="fgSelectIndicatorsContainer"
    />
  );

  const IndicatorSeparator = ({ indicatorSeparatorProps }: any) => (
    <span
      {...indicatorSeparatorProps}
      className="fgSelectSeprator"
    />
  );

  const onChange = (selectValue) => {
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
      SelectContainer,
      Input,
    },
    value: value ? value : '', // eslint-disable-line
    onChange,
    options,
    styles: {
      control: (base) => ({
        ...base,
        width: `${props.width}px`,
      }),
      menu: (base) => ({
        ...base,
        width: `${props.width}px`,
      }),
    },
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
          value={value || ''}
          data-param={props['data-param']}
          data-validate={props['data-validate']}
        />
      )}

      {errors && errors.slice(0, 1).map((error) => (
        <FormInvalidMessage>{error.message}</FormInvalidMessage>
      ))}
    </>
  );
};

SelectInput.defaultProps = SelectInputDefaultProps;

export default SelectInput;
