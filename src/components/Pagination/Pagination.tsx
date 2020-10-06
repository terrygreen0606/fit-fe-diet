import React from 'react';
import queryString from 'query-string';
import classNames from 'classnames';

import './Pagination.sass';

import { ReactComponent as IconArrowLeft } from 'assets/img/icons/arrow-left-gray-icon.svg';
import { ReactComponent as IconArrowRight } from 'assets/img/icons/arrow-right-gray-icon.svg';

interface PaginationProps {
  tableItemsTotal: number,
  itemsPerPage: number,
  currentPage: number,
  setPage: (page: number) => void,
  history: any,
  location: any,
  [propName: string]: any
}

const Pagination = (props: PaginationProps) => {
  const setTablePage = (newPage) => {
    const {
      history,
      location,
      tableItemsTotal,
      currentPage,
      itemsPerPage,
      setPage,
    } = props;

    if (currentPage !== newPage && newPage >= 0 && tableItemsTotal) {
      const params = queryString.parse(location.search);
      const lastPage = Math.ceil(tableItemsTotal / itemsPerPage) - 1;

      if (newPage > lastPage) {
        setPage(lastPage);

        params.page = lastPage.toString();

        const search = `?${queryString.stringify(params)}`;

        history.push({
          pathname: location.pathname,
          search,
        });
      } else {
        setPage(newPage);

        params.page = newPage.toString();

        const search = `?${queryString.stringify(params)}`;

        history.push({
          pathname: location.pathname,
          search,
        });
      }
    }
  };

  const {
    tableItemsTotal,
    itemsPerPage,
    currentPage,
  } = props;

  const pageQuantity = Math.ceil(tableItemsTotal / itemsPerPage);

  const itemIdexes = [];

  const countOfPage = 6;

  const arrayFromCalculationCountOfPage = Array.from(Array(countOfPage - 1).keys());

  const centerAdditive = currentPage - Math.floor((countOfPage - 2) / 2);

  const centerArray = arrayFromCalculationCountOfPage.map((item) => item + centerAdditive);

  // added right side
  if (centerArray.includes(-1)) {
    centerArray.push(
      ...Array.from(Array(centerArray.indexOf(0)).keys()).map((item) => item + centerArray[centerArray.length - 1] + 1),
    );
  }

  // added left side
  if (centerArray.includes(pageQuantity)) {
    centerArray.unshift(
      ...Array.from(Array(centerArray.length - centerArray.indexOf(pageQuantity)).keys())
        .map((item) => item + (centerArray[0] - (centerArray.length - centerArray.indexOf(pageQuantity)))),
    );
  }

  // negative numbers were removed
  if (centerArray.includes(-1)) {
    centerArray.splice(0, centerArray.indexOf(0));
  }

  // numbers more than page quantity were removed
  if (centerArray.includes(pageQuantity)) {
    centerArray.splice(centerArray.indexOf(pageQuantity), centerArray.length);
  }

  itemIdexes.push(...centerArray);

  if (itemIdexes[itemIdexes.length - 1] + 2 === pageQuantity) {
    itemIdexes.push(pageQuantity - 1);
  } else if (itemIdexes[itemIdexes.length - 1] + 1 < pageQuantity) {
    itemIdexes.unshift(
      <button
        className='pagiLink pagiArrow'
        type='button'
        onClick={() => {
          setTablePage(currentPage - 1);
        }}
        disabled={currentPage === 0}
      >
        <IconArrowLeft width='6' height='10' />
      </button>,
    );

    itemIdexes.push(
      '...',
      pageQuantity - 1,
      <button
        className='pagiLink pagiArrow'
        type='button'
        onClick={() => {
          setTablePage(currentPage + 1);
        }}
      >
        <IconArrowRight width='6' height='10' />
      </button>,
    );
  }

  if (itemIdexes[0] - 1 === 0) {
    itemIdexes.unshift(0);
  } else if (itemIdexes[0] > 0) {
    itemIdexes.unshift(
      <button
        className='pagiLink pagiArrow'
        type='button'
        onClick={() => {
          setTablePage(currentPage - 1);
        }}
      >
        <IconArrowLeft width='6' height='10' />
      </button>,
      0,
      '...',
    );

    itemIdexes.push(
      <button
        className='pagiLink pagiArrow'
        type='button'
        onClick={() => {
          setTablePage(currentPage + 1);
        }}
      >
        <IconArrowRight width='6' height='10' />
      </button>,
    );
  }

  return (
    <ul className='pagination text-left'>
      {itemIdexes
        .map((page) => (
          Number.isInteger(page)
            ? (
              <li
                key={page}
                role='presentation'
                className={classNames('pagiItem', {
                  pagiItem_active: currentPage === page,
                })}
                onClick={() => setTablePage(page)}
              >
                <span className='pagiLink'>{page + 1}</span>
              </li>
            )
            : (
              <li
                key={page}
                className='pagiItem'
              >
                {page}
              </li>
            )
        ))}
    </ul>
  );
};

export default Pagination;
