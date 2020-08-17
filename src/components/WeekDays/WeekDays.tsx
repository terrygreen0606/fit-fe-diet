import React from 'react';

import WeekDayItem, { ItemProps } from './WeekDayItem';

import './WeekDays.sass';

type WeekDaysProps = {
  days: ItemProps[];
  onChange: (any) => void;
  curDay: string;
  type: 'radio' | 'checkbox';
  name?: string;
};

const WeekDays = ({ days, onChange, curDay, type }: WeekDaysProps) => (
  <section className='d-flex flex-column align-items-center overflow-auto week-days'>
    <div className='week-workout col-auto align-self-baseline'>
      {days.map((day) => (
        <label key={`${day.number} ${day.value}`}>
          <input
            type={type}
            value={day.value}
            onChange={onChange}
            checked={day.value === curDay}
            disabled={day.disabled}
          />
          <WeekDayItem
            number={day.number}
            value={day.value}
            active={day.value === curDay}
            disabled={day.disabled}
          />
        </label>
      ))}
    </div>
  </section>
);

export default WeekDays;
