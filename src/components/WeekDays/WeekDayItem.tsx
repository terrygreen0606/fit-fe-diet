import React from 'react';
import classnames from 'classnames';

export type ItemProps = {
  number: string,
  dayOfWeek: string,
  dayWorkout?: string,
};

const WeekDayItem = (props: ItemProps) => {
  return (
    <div
      className={classnames("week-workout-item", {
        active: props.dayOfWeek === props.dayWorkout,
      })}
    >
      <div className="week-workout-item-number">
        {props.number}
      </div>
      <div className="week-workout-item-of_week">
        {props.dayOfWeek}
      </div>
    </div>
  );
};

export default WeekDayItem;
