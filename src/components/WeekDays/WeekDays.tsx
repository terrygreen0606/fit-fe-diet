import React from 'react';
import classnames from 'classnames';

import CustomRadio from "components/common/Forms/CustomRadio";
import WeekDayItem, { WeekDayItemProps } from "./WeekDayItem";

import './WeekDays.sass';

type WeekWorkoutProps = {
  days: Array<WeekDayItemProps>,
  setWeekWorkout: Function,
  weekWorkout: string,
};

const WeekDays = ({ days, setWeekWorkout, weekWorkout }: WeekWorkoutProps) => {
  return (
    <section className="col-12 d-flex flex-column align-items-center">
      <div className="week-workout col-12 align-self-baseline">
        {
          days.map(day => (
            <CustomRadio
              key={`${day.number} ${day.dayOfWeek}`}
              value={day.dayOfWeek}
              inline
              checked={weekWorkout === day.dayOfWeek}
              onChange={e => setWeekWorkout(e.target.value)}
              className={classnames("week-workout-item", {
                active: weekWorkout === day.dayOfWeek,
              })}
              label={
                <WeekDayItem {...day} />
              }
            />
          ))
        }
      </div>



    </section>
  );
}

export default WeekDays;
