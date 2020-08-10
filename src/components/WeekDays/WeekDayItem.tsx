import React from 'react';
import classnames from 'classnames';

export type ItemProps = {
  number: string,
  value: string,
  checked?: boolean,
  disabled?: boolean,
  active?: boolean,
};

const WeekDayItem = (props: ItemProps) => {
  return (
    <div
      className={classnames("week-workout-item", {
        active: props.active,
      })}
    >
      <div className="week-workout-item-number">
        {props.number}
      </div>
      <div className="week-workout-item-of_week">
        {props.value}
      </div>
    </div>
  );
};

export default WeekDayItem;
