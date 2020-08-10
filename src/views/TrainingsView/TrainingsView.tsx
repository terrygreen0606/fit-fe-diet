import React, { useState } from "react";
import classnames from 'classnames';

import WeekDays from "components/WeekDays";
import TrainingCard from "components/TrainingCard";
import TodayActivities from "components/TodayActivities";
import Advantages from "components/Advantages";
import Button from "components/common/Forms/Button";

import { ReactComponent as RewardIcon } from "assets/img/icons/reward-icon-white.svg";
import { ReactComponent as ClockIcon } from "assets/img/icons/15-min-clock-icon.svg";
import { ReactComponent as CalendarIcon } from "assets/img/icons/calendar-icon.svg";
import { ReactComponent as RewardImage } from "assets/img/reward-img.svg";
import WomanGymImage from "assets/img/woman_ball_gym.png";

import { dataForWeekWorkout, dataForTodayActivities } from "./mockDataForTrainings";

import './TrainingsView.sass';

const TrainingsView: React.FC = () => {
  const [level, setLevel] = useState(0);
  const [weekWorkout, setWeekWorkout] = useState("wed");
  const [todayActivities, setTodayActivities] = useState(["Add a workout"]);
  const tabs = ["Elementary level", "Intermediate", "Advanced"];

  return (
    <>
      <Advantages
        mainTitle="How does the exercise plan work?"
        icon1={RewardIcon}
        advantage1Title="Strengthen your body"
        advantage1Desc="If you want to exercise in addition to a healthy diet, here you will find plans that will help make your body stronger and more resilient."
        icon2={ClockIcon}
        advantage2Title="Workouts last 15 minutes"
        advantage2Desc="You can do the exercises at home, because no aids are needed."
        icon3={CalendarIcon}
        advantage3Title="Train 3-4 times a week"
        advantage3Desc="To achieve the best effect, we recommend going through the training plan 3-4 times a week and choosing the level of difficulty of the plan according to your abilities."
      />

      <section className="training-plan-card-list-sect">
        <div className="container">
          <div className="row">
            <div className="training-plan-card-list-col training-plan-list">
              <div className="row">

                <ol className="page-tabs mx-4 mx-md-0">
                  {
                    tabs.map(tab => (
                      <li
                        key={`Level: ${tab}`}
                        className={classnames("page-tabs-item", {
                          active: level === tabs.indexOf(tab),
                        })}
                        value={tabs.indexOf(tab)}
                        onClick={(e) => setLevel(e.currentTarget.value)}
                      >
                        {tab}
                      </li>
                    ))
                  }
                </ol>

                <WeekDays
                  days={dataForWeekWorkout}
                  dayWorkout={weekWorkout}
                  onChange={setWeekWorkout}
                  type="radio"
                />

                <Button
                  className="px-5 mb-5 mx-auto week-workout-start-btn"
                  size="lg"
                  color="secondary"
                >
                  Start today's Workout
                </Button>

                <div className="col-12">
                  {Array.from({length:8}, (_, index) =>
                    <TrainingCard
                      key={index}
                      image={WomanGymImage}
                      text="Intermediate level 1"
                      time={16}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="training-plan-info-col">
              <TodayActivities
                items={dataForTodayActivities}
                todayActivities={todayActivities}
                onChange={setTodayActivities}
                type="checkbox"
              />
              <div className="training-plan-adherence-diet-card card-bg mt-5">
                <h4 className="training-plan-adherence-diet-card-title">Adherence to a diet plan</h4>
                <div className="training-plan-adherence-diet-card-img">
                  <RewardImage />
                </div>
                <div className="training-plan-adherence-diet-card-content">
                  <p><b>0%</b> of the plan completed today</p>
                  <a href="/" className="link">See last week's report</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TrainingsView;
