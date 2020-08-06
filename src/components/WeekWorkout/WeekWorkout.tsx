import React from 'react';

import Button from "../common/Forms/Button";

import './WeekWorkout.sass';

const WeekWorkout = ({ items }) => {
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
                defaultChecked={item.checked}
              />
              <label htmlFor={item.day} className="week-workout-item">
                <div>
                  <div className="week-workout-item-number">
                    {item.number}
                  </div>
                  <div className="week-workout-item-of_week">
                    {item.day}
                  </div>
                </div>
              </label>
            </React.Fragment>
          ))
        }

        {/*<input type="radio" id="week-workout1" value="mon" name="week-workout" hidden />*/}
        {/*<label htmlFor="week-workout1" className="week-workout-item">*/}
        {/*  <div>*/}
        {/*    <div className="week-workout-item-number">*/}
        {/*      27*/}
        {/*    </div>*/}
        {/*    <div className="week-workout-item-of_week">*/}
        {/*      mon*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</label>*/}

        {/*<input type="radio" id="week-workout2" value="tus" name="week-workout" hidden />*/}
        {/*<label htmlFor="week-workout2" className="week-workout-item">*/}
        {/*  <div>*/}
        {/*    <div className="week-workout-item-number">*/}
        {/*      28*/}
        {/*    </div>*/}
        {/*    <div className="week-workout-item-of_week">*/}
        {/*      tus*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</label>*/}

        {/*<input type="radio" id="week-workout3" value="wed" name="week-workout" hidden defaultChecked />*/}
        {/*<label htmlFor="week-workout3" className="week-workout-item">*/}
        {/*  <div>*/}
        {/*    <div className="week-workout-item-number">*/}
        {/*      29*/}
        {/*    </div>*/}
        {/*    <div className="week-workout-item-of_week">*/}
        {/*      wed*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</label>*/}

        {/*<input type="radio" id="week-workout4" value="thu" name="week-workout" hidden />*/}
        {/*<label htmlFor="week-workout4" className="week-workout-item">*/}
        {/*  <div>*/}
        {/*    <div className="week-workout-item-number">*/}
        {/*      30*/}
        {/*    </div>*/}
        {/*    <div className="week-workout-item-of_week">*/}
        {/*      thu*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</label>*/}

        {/*<input type="radio" id="week-workout5" value="fri" name="week-workout" hidden />*/}
        {/*<label htmlFor="week-workout5" className="week-workout-item">*/}
        {/*  <div>*/}
        {/*    <div className="week-workout-item-number">*/}
        {/*      31*/}
        {/*    </div>*/}
        {/*    <div className="week-workout-item-of_week">*/}
        {/*      fri*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</label>*/}

        {/*<input type="radio" id="week-workout6" value="sat" name="week-workout" hidden />*/}
        {/*<label htmlFor="week-workout6" className="week-workout-item">*/}
        {/*  <div>*/}
        {/*    <div className="week-workout-item-number">*/}
        {/*      01*/}
        {/*    </div>*/}
        {/*    <div className="week-workout-item-of_week">*/}
        {/*      sat*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</label>*/}

        {/*<input type="radio" id="week-workout7" value="sun" name="week-workout" hidden />*/}
        {/*<label htmlFor="week-workout7" className="week-workout-item">*/}
        {/*  <div>*/}
        {/*    <div className="week-workout-item-number">*/}
        {/*      02*/}
        {/*    </div>*/}
        {/*    <div className="week-workout-item-of_week">*/}
        {/*      sun*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</label>*/}

      </div>

      <Button className="mt-5 px-5" size="lg" color="secondary">Start today's Workout</Button>

    </section>
  );
}

export default WeekWorkout;
