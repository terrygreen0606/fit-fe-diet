import React, { ReactNode, RefObject } from 'react';
import classNames from 'classnames';

// Components
import Spinner from 'components/common/Spinner';

import './Button.sass';

interface ButtonProps {
  type?: 'submit' | 'button' | 'reset',
  size?: 'md' | 'sm' | 'lg',
  color?: 'primary' | 'default' | 'secondary' | 'raw',
  weight?: 'medium' | 'default',
  outline?: boolean,
  block?: boolean,
  isLoading?: boolean,
  active?: boolean,
  disabled?: boolean,
  onClick?: (any) => void,
  innerRef?: RefObject<HTMLButtonElement>,
  children?: ReactNode,
  className?: string,
  ariaLabel?: string,
  [propName: string]: any
}

const ButtonPropsDefaults = {
  type: 'button',
  color: 'default',
  weight: 'default',
  size: 'md',
  block: false,
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
    outline,
    children,
    disabled,
    ariaLabel,
    isLoading,
    innerRef,
    ...attributes
  } = props;

  return (
    <button // eslint-disable-line
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
        },
      )}
      onClick={onClick}
      disabled={disabled || isLoading}
      aria-label={ariaLabel || null}
    >
      {children}
      {' '}
      {isLoading ? <Spinner className="ml-2" /> : null}
    </button>
  );
};

Button.defaultProps = ButtonPropsDefaults;

export default Button;
