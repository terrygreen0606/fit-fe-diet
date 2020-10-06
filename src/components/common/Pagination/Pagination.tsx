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
  const [activeBtn, setActiveBtn] = useState<number>();

  useEffect(() => {
    const updatedButtons = [];

    for (let i = 0; i < quantityButtons; i++) {
      if (i === 0) setActiveBtn(currentItem);
      updatedButtons.push(currentItem + i);
    }

    setButtons([...updatedButtons]);
  }, [currentItem, lastPage, quantityButtons]);

  const handlerClick = (clickedItem) => {
    getClickedPage(clickedItem);

    setActiveBtn(clickedItem);

    if (lastPage - clickedItem < Math.round(quantityButtons / 2)) {
      const updatedButtons = [];

      for (let i = 0; i < quantityButtons; i++) {
        updatedButtons.push(lastPage + i - quantityButtons + 1);
      }

      setButtons([...updatedButtons]);
      return;
    }

    if (quantityButtons === 3) {
      const updatedButtons = [];

      for (let i = 0; i < quantityButtons; i++) {
        updatedButtons.push(clickedItem + i - 1);
      }

      setButtons([...updatedButtons]);
    } else if (clickedItem > Math.round(quantityButtons / 2)) {
      const updatedButtons = [];

      for (let i = 0; i < quantityButtons; i++) {
        updatedButtons.push(clickedItem + i - 2);
      }

      setButtons([...updatedButtons]);
    }
  };

  return (
    <ul className='pagination'>
      <li className='pagination__item pagination__item_arrow'>
        <button
          type='button'
          disabled={activeBtn === 1}
          onClick={() => handlerClick(activeBtn - 1)}
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
            onClick={() => handlerClick(item)}
            className={classnames('pagination__item-btn', {
              active: item === activeBtn,
            })}
          >
            {item}
          </button>
        </li>
      ))}
      <li className='pagination__item pagination__item_arrow'>
        <button
          type='button'
          disabled={activeBtn === lastPage}
          onClick={() => handlerClick(activeBtn + 1)}
          className='pagination__item-btn pagination__item-btn_arrow pagination__item-btn_arrow-next'
        >
          <ArrowRightGray />
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
