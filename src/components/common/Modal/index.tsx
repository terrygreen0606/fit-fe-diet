import React, { SyntheticEvent, useEffect } from 'react';
import ReactDOM from 'react-dom';

import ModalView from './Modal';

import ModalMain from './Main';
import ModalFooter from './Footer';

export const Main = ({ children }) => <ModalMain>{children}</ModalMain>;
export const Footer = ({ children }) => <ModalFooter>{children}</ModalFooter>;

type Props = {
  isOpen: boolean,
  onAfterOpen?: () => void,
  onAfterClose?: () => void,
  bodyOpenClassName?: string,
  withCloseBtn?: boolean,

  shouldCloseOnOverlayClick?: boolean,

  title: string,
  children: any,

  onClose?: (e: SyntheticEvent) => void
}

const Modal = (props: Props) => {
  const {
    isOpen,
    title,
    bodyOpenClassName = 'ReactModal__Body--open',
    withCloseBtn = true,
    shouldCloseOnOverlayClick = true,
    children
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
          shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
        >
          {children}
        </ModalView>,
        document.getElementById('modal')
      )
    );
  }

  return null;
};

Modal.Main = Main;
Modal.Footer = Footer;

export default Modal;
