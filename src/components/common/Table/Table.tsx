import React, { useRef, createRef, useState, useEffect } from 'react';
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

const Table = (props: TableProps) => {
  const isInitialMount = useRef(true);

  const [resizer, setResizer] = useState(null);
  const [tableRef] = useState(createRef<HTMLTableElement>());
  const [tableWrapperRef] = useState(createRef<HTMLDivElement>());
  const [disabledColumns, setDisabledColumns] = useState([]);
  const [intialWidths, setInitialWidths] = useState(() => {
    if (props.settings[`${props.tableName}ResizeWidths`] && props.settings[`${props.tableName}ResizeWidths`].length > 0) {
      return props.settings[`${props.tableName}ResizeWidths`];
    } else if (props.resizeWidths) {
      if (props.minWidths) {
        let newResizeWidths = props.resizeWidths ? props.resizeWidths : [];

        props.minWidths.forEach((width, i) => {
          if (newResizeWidths[i] && newResizeWidths[i] < props.minWidths[i]) {
            newResizeWidths[i] = props.minWidths[i];
          }
        });

        return newResizeWidths;
      } else {
        return props.resizeWidths;
      }
    } else {
      return null;
    }
  });

  useEffect(() => {
    if (props.tableName) {
      props.changeSetting(`${props.tableName}ResizeWidths`, intialWidths);
    }
  }, [intialWidths]);

  useEffect(() => {
    if (props.resizable) {
      setResizer(new ColumnResizer(tableRef.current, {
        liveDrag: true,
        // partialRefresh: true,
        disabledColumns,
        widths: intialWidths,
        resizeMode: 'fit',
        onResize: e => {
          let newHeadCells = Array.from(tableRef.current.getElementsByTagName('th'));
          let newResizeWidths = newHeadCells.map(th => Number(th.style.width.replace('px', '').replace('%', '')));
          
          if (props.minWidths) {
            let minWidths = props.minWidths.slice(0, newHeadCells.length);

            newResizeWidths.forEach((width, i) => {
              if (minWidths[i] && width < minWidths[i]) {
                newResizeWidths[i] = minWidths[i];
              }
            });
          }

          setInitialWidths(newResizeWidths);
        },
        onDrag: e => {}
      }));

      return () => {
        if (resizer) {
          resizer.reset({ disable: true });
        }
      };
    }
  }, [props.columns, props.rows, props.isFullscreen, props.loading]);

  return (
    <div ref={tableWrapperRef} className="tableCustomWrapper">
      <table ref={tableRef} className={classNames("tableCustom", {
        "tableCustom_Resizable": props.resizable,
        "tableCustom_Striped": props.striped
      })}>
        {props.columns && (
          <thead>
            <tr>
              {Object.values(props.columns).map((col, i) => (
                <th key={i}>{col}</th>
              ))}
            </tr>
          </thead>
        )}

        <tbody
          className={
            (props.loading && props.rows && props.rows.length >= 0) ? "overlay" : null
          }
        >
          {(props.loading && (!props.rows || props.rows.length === 0)) ? (
            <tr>
              <td colSpan={props.columns ? Object.values(props.columns).length : 1}>
                <PageLoader />
              </td>
            </tr>
          ) : (
            <>
              {props.rows.map((row, i) => (
                <tr key={row.id ? row.id : i}>
                  {Object.values(row).map((rowValue, i) => (
                    <td key={i}>{rowValue}</td>
                  ))}
                </tr>
              ))}

              {props.rows.length === 0 && (
                <tr>
                  <td
                    className="text-center"
                    colSpan={props.columns ? Object.values(props.columns).length : 1}
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
    settings: state.settings
  }),
  { changeSetting }
)(Table);
