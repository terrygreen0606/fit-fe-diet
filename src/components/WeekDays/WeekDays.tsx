import React from 'react';

import WeekDayItem, { ItemProps } from "./WeekDayItem";

import './WeekDays.sass';

type WeekDaysType = "radio" | "checkbox";

interface WeekDaysProps {
  days: Array<ItemProps>,
  onChange: (any) => void,
  dayWorkout: string,
  type?: WeekDaysType,
}

const WeekDays = ({ days, onChange, dayWorkout, type }: WeekDaysProps) => {
  return (
    <section className="col-12 d-flex flex-column align-items-center">
      <div className="week-workout col-12 align-self-baseline">
        {
          days.map(day =>
            <label key={`${day.number} ${day.dayOfWeek}`}>
              <input
                type={type}
                value={day.dayOfWeek}
                onChange={e => onChange(e.target.value)}
                checked={day.dayOfWeek === dayWorkout}
              />
              <WeekDayItem
                number={day.number}
                dayOfWeek={day.dayOfWeek}
                dayWorkout={dayWorkout}
              />
            </label>
          )
        }
      </div>
    </section>
  );
};

export default WeekDays;
