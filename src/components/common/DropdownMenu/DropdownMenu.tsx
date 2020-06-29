import React, { useEffect } from 'react';
import classNames from 'classnames';

import './DropdownMenu.sass';

interface DropdownMenuProps {
  isOpen: boolean,
  toggle: (any?) => void,
  children?: React.ReactNode,
  [propName: string]: any
}

const DropdownMenu = ({ isOpen, toggle, ...attributes }: DropdownMenuProps) => {
  const wrapperRef = React.useRef();

  useEffect(() => {
    window.addEventListener('click', closeDropdown);

    return () => {
      window.removeEventListener('click', closeDropdown);
    };
  });

  function closeDropdown(e) {
    // @ts-ignore
    if (
      isOpen &&
      wrapperRef &&
      wrapperRef.current &&
      // @ts-ignore
      !wrapperRef.current.contains(e.target)
    ) {
      toggle(e);
    }
  }

  return (
    <div
      ref={wrapperRef}
      {...attributes}
      className={classNames(
        'dropdownMenu',
        attributes.className,
        isOpen && 'dropdownMenuOpen'
      )}
      onClick={toggle}
    />
  );
};

export default DropdownMenu;
