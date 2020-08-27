import React, { SyntheticEvent } from 'react';
import classNames from 'classnames';

import './Modal.sass';

import { ReactComponent as CrossIcon } from 'assets/img/icons/cross-icon.svg';

type Props = {
  withCloseBtn: boolean,

  shouldCloseOnOverlayClick: boolean,

  title?: string,
  children: any,
  className?: string,

  onClose?: (e: SyntheticEvent) => void
};

const Modal = (props: Props) => {
  const {
    title,
    withCloseBtn,
    className,
    shouldCloseOnOverlayClick,
    children,
  } = props;

  const onClickByBackdrop = (e: SyntheticEvent) => {
    if (shouldCloseOnOverlayClick && props.onClose) {
      props.onClose(e);
    }
  };

  const onClose = (e: SyntheticEvent) => {
    if (props.onClose) {
      props.onClose(e);
    }
  };

  return (
    <div className={classNames("dialogWrap", {
      [`${className}_wrap`]: className
    })}>
      <div role="presentation" className="dialogBackdrop" onClick={onClickByBackdrop} />
      <div className={classNames('dialogContainer', {
        [className]: className,
      })}
      >
        <header className="dialogHeader">
          {title && (
            <div className="dialogHeaderWrap">
              <p className="dialogTitle">{title}</p>
            </div>
          )}

          {withCloseBtn ? (
            <button className="dialogHeaderClose" type="button" onClick={onClose}>
              <CrossIcon />
            </button>
          ) : null}
        </header>
        {children}
      </div>
    </div>
  );
};

export default Modal;
