import React, {
  useRef, createRef, useState, useEffect,
} from 'react';
import { connect } from 'react-redux';
import { changeSetting } from 'store/actions';
import ColumnResizer from 'column-resizer';
import classNames from 'classnames';
import { localStringToNumber } from 'utils/helpers';

// Components
import PageLoader from '../PageLoader';

import './Table.sass';

type TableProps = {
  columns?: any,
  rows: any[],
  loading?: boolean,
  resizable?: boolean,
  striped?: boolean,
  resizeWidths?: number[],
  tableName?: string,
  minWidths?: number[],
  [propName: string]: any
};

const Table = ({
  columns,
  rows,
  loading,
  resizable,
  striped,
  resizeWidths,
  tableName,
  minWidths,
  settings,
  isFullscreen,
}: TableProps) => {
  const isInitialMount = useRef(true);

  const [resizer, setResizer] = useState(null);
  const [tableRef] = useState(createRef<HTMLTableElement>());
  const [tableWrapperRef] = useState(createRef<HTMLDivElement>());
  const [disabledColumns, setDisabledColumns] = useState([]);
  const [intialWidths, setInitialWidths] = useState(() => {
    if (settings[`${tableName}ResizeWidths`] && settings[`${tableName}ResizeWidths`].length > 0) {
      return settings[`${tableName}ResizeWidths`];
    } if (resizeWidths) {
      if (minWidths) {
        const newResizeWidths = resizeWidths || [];

        minWidths.forEach((width, i) => {
          if (newResizeWidths[i] && newResizeWidths[i] < minWidths[i]) {
            newResizeWidths[i] = minWidths[i];
          }
        });

        return newResizeWidths;
      }
      return resizeWidths;
    }
    return null;
  });

  useEffect(() => {
    if (tableName) {
      changeSetting(`${tableName}ResizeWidths`, intialWidths);
    }
  }, [intialWidths]);

  useEffect(() => {
    if (resizable) {
      setResizer(new ColumnResizer(tableRef.current, {
        liveDrag: true,
        // partialRefresh: true,
        disabledColumns,
        widths: intialWidths,
        resizeMode: 'fit',
        onResize: (e) => {
          const newHeadCells = Array.from(tableRef.current.getElementsByTagName('th'));
          const newResizeWidths = newHeadCells.map((th) => Number(th.style.width.replace('px', '').replace('%', '')));

          if (minWidths) {
            const minimumWidths = minWidths.slice(0, newHeadCells.length);

            newResizeWidths.forEach((width, i) => {
              if (minimumWidths[i] && width < minimumWidths[i]) {
                newResizeWidths[i] = minimumWidths[i];
              }
            });
          }

          setInitialWidths(newResizeWidths);
        },
        onDrag: (e) => {},
      }));

      return () => {
        if (resizer) {
          resizer.reset({ disable: true });
        }
      };
    }
  }, [columns, rows, isFullscreen, loading]);

  return (
    <div ref={tableWrapperRef} className="tableCustomWrapper">
      <table
        ref={tableRef}
        className={classNames('tableCustom', {
          tableCustom_Resizable: resizable,
          tableCustom_Striped: striped,
        })}
      >
        {columns && (
          <thead>
            <tr>
              {Object.values(columns).map((col, i) => (
                <th key={`${i + 1}`}>{col}</th>
              ))}
            </tr>
          </thead>
        )}

        <tbody
          className={
            (loading && rows && rows.length >= 0) ? 'overlay' : null
          }
        >
          {(loading && (!rows || rows.length === 0)) ? (
            <tr>
              <td colSpan={columns ? Object.values(columns).length : 1}>
                <PageLoader />
              </td>
            </tr>
          ) : (
            <>
              {rows.map((row, i) => (
                <tr key={row.id ? row.id : i}>
                  {Object.values(row).map((rowValue, ind) => (
                    <td key={`${ind + 1}`}>{rowValue}</td>
                  ))}
                </tr>
              ))}

              {rows.length === 0 && (
                <tr>
                  <td
                    className="text-center"
                    colSpan={columns ? Object.values(columns).length : 1}
                  >
                    Нет записей
                  </td>
                </tr>
              )}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default connect(
  (state: any) => ({
    isFullscreen: state.settings.isFullscreen,
    settings: state.settings,
  }),
  { changeSetting },
)(Table);
