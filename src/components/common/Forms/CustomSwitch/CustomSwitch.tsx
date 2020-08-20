import React from 'react';
import classNames from 'classnames';

import './CustomSwitch.sass';

type CustomSwitchProps = {
  label1: string,
  label2: string,
  className?: string,
  checked?: boolean,
  defaultChecked?: boolean,
  onChange?: (any) => void,
  disabled?: boolean,
};

const CustomSwitch = (props: CustomSwitchProps) => {

  const onChange = (e) => {
    if (props.disabled) {
      e.preventDefault();
      return;
    }

    if (props.onChange) {
      props.onChange(e);
    }
  };

  const {
    className,
    label1,
    label2,
    checked,
    disabled
  } = props;

  return (
    <label className={classNames(className, 'customSwitch', {
        'customSwitch_disabled': disabled
      })}>
      <input type="checkbox" checked={checked} onChange={onChange} />

      <span className="customSwitch_mark">
        <span className="customSwitch_mark_text">{label1}</span>
        <span className="customSwitch_mark_text">{label2}</span>
      </span>
    </label>
  );
};

export default CustomSwitch;
