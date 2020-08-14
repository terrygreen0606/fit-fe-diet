import React from 'react';
import classnames from 'classnames';

export type ItemProps = {
  number: string,
  value: string,
  checked?: boolean,
  disabled?: boolean,
  active?: boolean,
};

const WeekDayItem = ({
  active,
  disabled,
  number,
  value,
}: ItemProps) => (
  <div
    className={classnames('week-workout-item', {
      active,
      disabled,
    })}
  >
    <div className='week-workout-item-number'>
      {number}
    </div>
    <div className='week-workout-item-of_week'>
      {value}
    </div>
  </div>
);

export default WeekDayItem;
