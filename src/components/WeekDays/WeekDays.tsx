import React from 'react';

import WeekDayItem, { ItemProps } from "./WeekDayItem";

import './WeekDays.sass';

type WeekDaysProps = {
  days: ItemProps[],
  onChange: (any) => void,
  dayWorkout: string,
  type?: "radio" | "checkbox",
  name?: string,
};

const WeekDays = ({ days, onChange, dayWorkout, type }: WeekDaysProps) => {
  return (
    <section className="col-12 d-flex flex-column align-items-center">
      <div className="week-workout col-12 align-self-baseline">
        {
          days.map(day =>
            <label key={`${day.number} ${day.value}`}>
              <input
                type={type}
                value={day.value}
                onChange={onChange}
                checked={day.value === dayWorkout}
                disabled={day.disabled}
              />
              <WeekDayItem
                number={day.number}
                value={day.value}
                active={day.value === dayWorkout}
                disabled={day.disabled}
              />
            </label>
          )
        }
      </div>
    </section>
  );
};

export default WeekDays;
