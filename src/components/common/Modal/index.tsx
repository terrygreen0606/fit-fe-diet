import React, { SyntheticEvent, useEffect } from 'react';
import ReactDOM from 'react-dom';

import ModalView from './Modal';

import ModalMain from './Main';
import ModalFooter from './Footer';

export const Main = ({ children, className }: any) => <ModalMain className={className}>{children}</ModalMain>;
export const Footer = ({ children, className }: any) => <ModalFooter className={className}>{children}</ModalFooter>;

type Props = {
  isOpen: boolean,
  onAfterOpen?: () => void,
  onAfterClose?: () => void,
  bodyOpenClassName?: string,
  withCloseBtn?: boolean,

  shouldCloseOnOverlayClick?: boolean,

  title?: string,
  children: any,
  className?: string,

  onClose?: (e: SyntheticEvent) => void
};

const Modal = (props: Props) => {
  const {
    isOpen,
    title,
    className,
    bodyOpenClassName = 'ReactModal__Body--open',
    withCloseBtn = true,
    shouldCloseOnOverlayClick = true,
    children,
  } = props;

  const onClose = (e: SyntheticEvent) => {
    if (props.onClose) {
      props.onClose(e);

      document.querySelector('body').classList.remove(bodyOpenClassName);

      if (props.onAfterClose) {
        props.onAfterClose();
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.querySelector('body').classList.add(bodyOpenClassName);

      if (props.onAfterOpen) {
        props.onAfterOpen();
      }
    } else {
      document.querySelector('body').classList.remove(bodyOpenClassName);
    }
  }, [isOpen]);

  if (isOpen) {
    return (
      ReactDOM.createPortal(
        <ModalView
          title={title}
          onClose={onClose}
          withCloseBtn={withCloseBtn}
          className={className}
          shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
        >
          {children}
        </ModalView>,
        document.getElementById('modal'),
      )
    );
  }

  return null;
};

Modal.Main = Main;
Modal.Footer = Footer;

export default Modal;
