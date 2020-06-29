import React, { SyntheticEvent } from 'react';

import styles from './Modal.module.sass';

import { ReactComponent as CrossIcon } from 'assets/img/icons/cross@20x20-icon.svg';

type Props = {
  withCloseBtn: boolean,

  shouldCloseOnOverlayClick: boolean,

  title: string,
  children: any,

  onClose?: (e: SyntheticEvent) => void
}

const Modal = (props: Props) => {
  const {
    title,
    withCloseBtn,
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
      <div className={styles.dialogContainer}>
        <header className={styles.dialogHeader}>
          <div className={styles.dialogHeaderWrap}>
            <p className={styles.dialogTitle}>{title}</p>
          </div>
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
