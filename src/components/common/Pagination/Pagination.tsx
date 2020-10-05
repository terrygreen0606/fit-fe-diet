import React, { useState, useEffect } from 'react';
import classnames from 'classnames';

import './Pagination.sass';

import { ReactComponent as ArrowLeftGray } from 'assets/img/icons/arrow-left-gray-icon.svg';
import { ReactComponent as ArrowRightGray } from 'assets/img/icons/arrow-right-gray-icon.svg';

type PaginationProps = {
  activeItem: number,
  totalPages: number,
  getClickedPage: Function,
};

const Pagination = ({
  activeItem,
  totalPages,
  getClickedPage,
}: PaginationProps) => {
  const [quantity, setQuantity] = useState<any[]>([]);

  useEffect(() => {
    setQuantity([
      activeItem,
      activeItem + 1,
      activeItem + 2,
      activeItem + 3,
      activeItem + 4,
      activeItem + 5,
    ]);
  }, [activeItem]);

  return (
    <ul className='pagination'>
      <li className='pagination__item pagination__item_arrow'>
        <button
          type='button'
          disabled={activeItem === 1}
          onClick={() => getClickedPage(activeItem - 1)}
          className='pagination__item-btn pagination__item-btn_arrow'
        >
          <ArrowLeftGray />
        </button>
      </li>
      {quantity.map((item) => (
        item <= totalPages ? (
          <li
            key={item}
            className='pagination__item'
          >
            <button
              type='button'
              onClick={() => getClickedPage(item)}
              className={classnames('pagination__item-btn', {
                active: item === activeItem,
              })}
            >
              {item}
            </button>
          </li>
        ) : null
      ))}
      <li className='pagination__item pagination__item_arrow'>
        <button
          type='button'
          disabled={activeItem === totalPages}
          onClick={() => getClickedPage(activeItem + 1)}
          className='pagination__item-btn pagination__item-btn_arrow'
        >
          <ArrowRightGray />
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
