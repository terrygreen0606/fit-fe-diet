import React from 'react';
import CustomRadio from "../common/Forms/CustomRadio";

export type WeekDayItemProps ={
  number: number,
  dayOfWeek: string,
  type?: string,
  onChange?: () => void,
  checked?: boolean,
  defaultChecked: boolean
};

const WeekDayItemDefaultProps = {
  type: 'radio'
};

const WeekDayItem = (props: WeekDayItemProps) => {
  return (
    <>
      <div className="week-workout-item-number">
        {props.number}
      </div>
      <div className="week-workout-item-of_week">
        {props.dayOfWeek}
      </div>
    </>
  );
};

CustomRadio.defaultProps = WeekDayItemDefaultProps;

export default WeekDayItem;
