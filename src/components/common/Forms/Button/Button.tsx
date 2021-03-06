import React, { ReactNode, RefObject } from 'react';
import classNames from 'classnames';

// Components
import Spinner from 'components/common/Spinner';

import './Button.sass';

interface ButtonProps {
  type?: 'submit' | 'button' | 'reset';
  size?: 'md' | 'sm' | 'lg';
  color?: 'primary' | 'primary-shadow' | 'default' | 'mint' | 'caribbean' | 'secondary' | 'raw' | 'info' | 'gray' | 'cancel';
  weight?: 'medium' | 'default';
  icon?: any;
  outline?: boolean;
  block?: boolean;
  isLoading?: boolean;
  pulse?: boolean;
  arrow?: boolean;
  spanBtn?: boolean,
  active?: boolean;
  disabled?: boolean;
  onClick?: (any) => void;
  innerRef?: RefObject<HTMLButtonElement>;
  children?: ReactNode;
  className?: string;
  ariaLabel?: string;
  [propName: string]: any;
}

const ButtonPropsDefaults = {
  type: 'button',
  color: 'default',
  weight: 'default',
  size: 'md',
  block: false,
  arrow: false,
};

const Button = (props: ButtonProps) => {
  const onClick = (e) => {
    if (props.disabled) {
      e.preventDefault();
      return;
    }

    if (props.onClick) {
      props.onClick(e);
    }
  };

  const {
    className,
    color,
    block,
    size,
    weight,
    icon,
    outline,
    spanBtn,
    children,
    disabled,
    ariaLabel,
    pulse,
    arrow,
    isLoading,
    innerRef,
    ...attributes
  } = props;

  if (spanBtn) {
    delete attributes.type;
  }

  const ButtonComponent = (ButtonComponentProps: any) =>
    spanBtn ? <span {...ButtonComponentProps} /> : <button {...ButtonComponentProps} />;

  return (
    <ButtonComponent // eslint-disable-line
      {...attributes}
      ref={innerRef}
      className={classNames(
        className,
        'bttn',
        `bttn_${color}`,
        `bttn_${size}`,
        `bttnWeight_${weight}`,
        {
          bttnBlock: block,
          bttnOutline: outline,
          bttnWithIcon: icon,
          bttnPulse: pulse,
          bttnArrow: arrow,
        }
      )}
      onClick={onClick}
      disabled={disabled || isLoading}
      aria-label={ariaLabel || null}
    >
      {icon}
      {children} {isLoading ? <Spinner className='ml-2' /> : null}
    </ButtonComponent>
  );
};

Button.defaultProps = ButtonPropsDefaults;

export default Button;
