import React, { SyntheticEvent } from 'react';
import classNames from 'classnames';

import styles from './Modal.module.sass';

import { ReactComponent as CrossIcon } from 'assets/img/icons/cross-icon.svg';

type Props = {
  withCloseBtn: boolean,

  shouldCloseOnOverlayClick: boolean,

  title?: string,
  children: any,
  className?: string,

  onClose?: (e: SyntheticEvent) => void
}

const Modal = (props: Props) => {
  const {
    title,
    withCloseBtn,
    className,
    shouldCloseOnOverlayClick,
    children
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
    <div className={styles.dialogWrap}>
      <div className={styles.dialogBackdrop} onClick={onClickByBackdrop} />
      <div className={classNames(styles.dialogContainer, {
        [className]: className
      })}>
        <header className={styles.dialogHeader}>
          {title && (
            <div className={styles.dialogHeaderWrap}>
              <p className={styles.dialogTitle}>{title}</p>
            </div>
          )}

          {withCloseBtn ? (
            <button className={styles.dialogHeaderClose} type="button" onClick={onClose}>
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
