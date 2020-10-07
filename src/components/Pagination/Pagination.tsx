import React, { useState, useEffect } from 'react';
import classnames from 'classnames';

import './Pagination.sass';

import { ReactComponent as ArrowLeftGray } from 'assets/img/icons/arrow-left-gray-icon.svg';
import { ReactComponent as ArrowRightGray } from 'assets/img/icons/arrow-right-gray-icon.svg';

type PaginationProps = {
  currentItem: number,
  lastPage: number,
  getClickedPage: Function,
  // must be greater than 2
  quantityButtons: number,
};

const Pagination = ({
  currentItem,
  lastPage,
  getClickedPage,
  quantityButtons,
}: PaginationProps) => {
  const [buttons, setButtons] = useState<any[]>([]);

  useEffect(() => {
    const updatedButtons = [];

    if (lastPage - currentItem < quantityButtons) {
      for (let i = 0; i < quantityButtons; i++) {
        updatedButtons.push(lastPage - quantityButtons + 1 + i);
      }
      setButtons([...updatedButtons]);
      return;
    }

    for (let i = 0; i < quantityButtons; i++) {
      updatedButtons.push(currentItem + i);
    }

    setButtons([...updatedButtons]);
  }, [currentItem, lastPage, quantityButtons]);

  return (
    <ul className='pagination'>
      <li className='pagination__item pagination__item_arrow'>
        <button
          type='button'
          disabled={currentItem === 1}
          onClick={() => getClickedPage(currentItem - 1)}
          className='pagination__item-btn pagination__item-btn_arrow pagination__item-btn_arrow-prev'
        >
          <ArrowLeftGray />
        </button>
      </li>
      {buttons.map((item) => (
        <li
          key={item}
          className='pagination__item'
        >
          <button
            type='button'
            onClick={() => getClickedPage(item)}
            className={classnames('pagination__item-btn', {
              active: item === currentItem,
            })}
          >
            {item}
          </button>
        </li>
      ))}
      <li className='pagination__item pagination__item_arrow'>
        <button
          type='button'
          disabled={currentItem === lastPage}
          onClick={() => getClickedPage(currentItem + 1)}
          className='pagination__item-btn pagination__item-btn_arrow pagination__item-btn_arrow-next'
        >
          <ArrowRightGray />
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
