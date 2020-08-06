import React from 'react';

import Button from "../common/Forms/Button";

import './WeekWorkout.sass';

const WeekWorkout = ({ items, setWeekWorkout, weekWorkout }) => {
  const onClickHandler = () => {
    alert(`Your workout day is ${weekWorkout}`)
  };

  return (
    <section className="col-12 d-flex flex-column align-items-center">
      <div className="week-workout col-12 align-self-baseline">

        {
          items.map(item => (
            <React.Fragment key={item.day}>
              <input
                type="radio"
                id={item.day}
                value={item.day}
                name="week-workout"
                hidden
                defaultChecked={weekWorkout === item.day}
                onChange={e => setWeekWorkout(e.target.value)}
              />
              <label htmlFor={item.day} className="week-workout-item">
                <div className="week-workout-item-number">
                  {item.number}
                </div>
                <div className="week-workout-item-of_week">
                  {item.day}
                </div>
              </label>
            </React.Fragment>
          ))
        }

      </div>

      <Button
        className="mt-5 px-5"
        size="lg"
        color="secondary"
        onClick={onClickHandler}
      >
        Start today's Workout
      </Button>

    </section>
  );
}

export default WeekWorkout;
