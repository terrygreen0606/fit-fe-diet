import React, {useState} from "react";

// Components
import WeekWorkout from "../../components/WeekWorkout";
import TrainingCard from "../../components/TrainingCard";
import TodayActivities from "../../components/TodayActivities";
import Advantages from "../../components/Advantages";
import PageTabs from "./PageTabs";

import {ReactComponent as RewardIcon} from "../../assets/img/icons/reward-icon-white.svg";
import {ReactComponent as ClockIcon} from "../../assets/img/icons/15-min-clock-icon.svg";
import {ReactComponent as CalendarIcon} from "../../assets/img/icons/calendar-icon.svg";
import {ReactComponent as RewardImage} from "../../assets/img/reward-img.svg";

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
    checked: true,
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
]

const TrainingsView = () => {
  const [level, setLevel] = useState("Elementary level");

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

      <section className="nutrition-plan-card-list-sect">
        <div className="container">
          <div className="row">
            <div className="nutrition-plan-card-list-col nutrition-plan-list">
              <div className="row">
                <div className="col-12">
                  <PageTabs
                    levels={["Elementary level", "Intermediate", "Advanced"]}
                    defaultChecked={level}
                    setLevel={setLevel}
                  />
                </div>

                <WeekWorkout items={dataForWeekWorkout} />

                <div className="col-6">
                  <TrainingCard />
                </div>
                <div className="col-6">
                  <TrainingCard />
                </div>
                <div className="col-6">
                  <TrainingCard />
                </div>
                <div className="col-6">
                  <TrainingCard />
                </div>
                <div className="col-6">
                  <TrainingCard />
                </div>
                <div className="col-6">
                  <TrainingCard />
                </div>
                <div className="col-6">
                  <TrainingCard />
                </div>
                <div className="col-6">
                  <TrainingCard />
                </div>
              </div>
            </div>

            <div className="nutrition-plan-info-col">
              <TodayActivities />

              <div className="nutrition-plan-adherence-diet-card card-bg mt-5">
                <h4 className="nutrition-plan-adherence-diet-card-title">Adherence to a diet plan</h4>

                <div className="nutrition-plan-adherence-diet-card-img">
                  <RewardImage />
                </div>

                <div className="nutrition-plan-adherence-diet-card-content">
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
