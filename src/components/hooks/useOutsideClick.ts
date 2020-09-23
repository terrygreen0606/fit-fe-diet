import { useState, useEffect, useRef } from 'react';

const useOutsideClick = (initialIsVisible) => {
  const [isBlockActive, setIsBlockActive] = useState(initialIsVisible);
  const changedBlockRef = useRef<HTMLDivElement>(null);

  const handleHideDropdown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsBlockActive(false);
    }
  };

  const handleClickOutside = (event: Event) => {
    if (changedBlockRef.current && !changedBlockRef.current.contains(event.target as Node)) {
      setIsBlockActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleHideDropdown, true);
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('keydown', handleHideDropdown, true);
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return { changedBlockRef, isBlockActive, setIsBlockActive };
};

export default useOutsideClick;
