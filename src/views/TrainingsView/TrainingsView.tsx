import React, {useState} from "react";

// Components
import WeekWorkout from "../../components/WeekWorkout";
import TrainingCard from "../../components/TrainingCard";
import TodayActivities from "../../components/TodayActivities";
import Advantages from "../../components/Advantages";
import PageTabs from "../../components/PageTabs/PageTabs";

import {ReactComponent as RewardIcon} from "../../assets/img/icons/reward-icon-white.svg";
import {ReactComponent as ClockIcon} from "../../assets/img/icons/15-min-clock-icon.svg";
import {ReactComponent as CalendarIcon} from "../../assets/img/icons/calendar-icon.svg";
import {ReactComponent as RewardImage} from "../../assets/img/reward-img.svg";
import {ReactComponent as DumbbellIcon} from "../../assets/img/icons/dumbbell-icon.svg";
import {ReactComponent as WeighScaleIcon} from "../../assets/img/icons/weigh-scale-icon.svg";

import './TrainingsView.sass';

const dataForWeekWorkout = [
  {
    number: 27,
    day: "mon",
  },
  {
    number: 28,
    day: "tus",
  },
  {
    number: 29,
    day: "wed",
  },
  {
    number: 30,
    day: "thu",
  },
  {
    number: 31,
    day: "fri",
  },
  {
    number: 0o1,
    day: "sat",
  },
  {
    number: 0o2,
    day: "sun",
  },
];

const dataForTodayActivities = [
  {
    Icon: DumbbellIcon,
    text: "Add a workout",
  },
  {
    Icon: WeighScaleIcon,
    text: "Add today's weight",
  },
];

const TrainingsView = () => {
  const [level, setLevel] = useState("Elementary level");
  const [weekWorkout, setWeekWorkout] = useState("wed");
  const [todayActivities, setTodayActivities] = useState(["Add a workout"]);

  return (
    <>
      <Advantages
        titleInBlueZone="How does the exercise plan work?"
        FirstIcon={RewardIcon}
        titleForFirstIcon="Strengthen your body"
        textForFirstIcon="If you want to exercise in addition to a healthy diet, here you will find plans that will help make your body stronger and more resilient."
        SecondIcon={ClockIcon}
        titleForSecondIcon="Workouts last 15 minutes"
        textForSecondIcon="You can do the exercises at home, because no aids are needed."
        ThirdIcon={CalendarIcon}
        titleForThirdIcon="Train 3-4 times a week"
        textForThirdIcon="To achieve the best effect, we recommend going through the training plan 3-4 times a week and choosing the level of difficulty of the plan according to your abilities."
      />

      <section className="training-plan-card-list-sect">
        <div className="container">
          <div className="row">
            <div className="training-plan-card-list-col training-plan-list">
              <div className="row">
                <PageTabs
                  levels={["Elementary level", "Intermediate", "Advanced"]}
                  defaultChecked={level}
                  setLevel={setLevel}
                />
                <WeekWorkout
                  items={dataForWeekWorkout}
                  setWeekWorkout={setWeekWorkout}
                  weekWorkout={weekWorkout}
                />
                <div className="col-12">
                  {Array.from({length:8}, (_, index) =>
                    <TrainingCard
                      key={index}
                      image={`url(${require('../../assets/img/woman_ball_gym.png')})`}
                      text="Intermediate level 1"
                      time="16 minutit"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="training-plan-info-col">
              <TodayActivities
                items={dataForTodayActivities}
                todayActivities={todayActivities}
                setTodayActivities={setTodayActivities}
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
}

export default TrainingsView;
