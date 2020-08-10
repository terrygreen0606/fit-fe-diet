import React, { useState } from "react";
import classnames from 'classnames';

import WeekDays from "components/WeekDays";
import TrainingCard from "components/TrainingCard";
import TodayActivities from "components/TodayActivities";
import Advantages from "components/Advantages";
import Button from "components/common/Forms/Button";
import WithTranslate from 'components/hoc/WithTranslate';
import { getTranslate } from "utils";

import { ReactComponent as RewardIcon } from "assets/img/icons/reward-icon-white.svg";
import { ReactComponent as ClockIcon } from "assets/img/icons/15-min-clock-icon.svg";
import { ReactComponent as CalendarIcon } from "assets/img/icons/calendar-icon.svg";
import { ReactComponent as RewardImage } from "assets/img/reward-img.svg";
import WomanGymImage from "assets/img/woman_ball_gym.png";

import { dataForWeekWorkout, dataForTodayActivities, tabs } from "./mockDataForTrainings";

import './TrainingsView.sass';

const TrainingsView: React.FC = (props: any) => {
  const [level, setLevel] = useState(0);
  const [weekWorkout, setWeekWorkout] = useState("wed");
  const [todayActivities, setTodayActivities] = useState(["workout_add"]);

  const t = (code: string, placeholders?: any) => getTranslate(props.localePhrases, code, placeholders);

  const onWorkoutChange = e => setWeekWorkout(e.target.value);

  const onActivitiesChange = e => {
    e.persist();
    e.target.checked
      ? setTodayActivities(prev => [...prev, e.target.value])
      : setTodayActivities(prev =>
        [...prev.slice(0, prev.indexOf(e.target.value)), ...prev.slice(prev.indexOf(e.target.value) + 1)])
  };

  return (
    <>
      <Advantages
        mainTitle={t("trainings.plan.main_title")}
        icon1={RewardIcon}
        advantage1Title={t("trainings.plan.feat1_title")}
        advantage1Desc={t("trainings.plan.feat1_desc")}
        icon2={ClockIcon}
        advantage2Title={t("trainings.plan.feat2_title")}
        advantage2Desc={t("trainings.plan.feat2_desc")}
        icon3={CalendarIcon}
        advantage3Title={t("trainings.plan.feat3_title")}
        advantage3Desc={t("trainings.plan.feat3_desc")}
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
                  onChange={onWorkoutChange}
                  type="radio"
                />

                <Button
                  className="px-5 mb-5 mx-auto week-workout-start-btn"
                  size="lg"
                  color="secondary"
                >
                  {t("trainings.start_workout")}
                </Button>

                <div className="col-12">
                  {Array.from({length:8}, (_, index) =>
                    <TrainingCard
                      key={index}
                      image={WomanGymImage}
                      text="Intermediate level 1"
                      time={t("common.minutes", { number: 16 })}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="training-plan-info-col">
              <TodayActivities
                name={t("trainings.today_activities")}
                items={dataForTodayActivities}
                todayActivities={todayActivities}
                onChange={onActivitiesChange}
                type="checkbox"
              />
              <div className="training-plan-adherence-diet-card card-bg mt-5">
                <h4 className="training-plan-adherence-diet-card-title">
                  {t("trainings.diet_plan")}
                </h4>
                <div className="training-plan-adherence-diet-card-img">
                  <RewardImage />
                </div>
                <div className="training-plan-adherence-diet-card-content">
                  <p>
                    {t("trainings.plan.completed", { number: 0 })}
                  </p>
                  <a href="/" className="link">
                    {t("trainings.report.week")}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WithTranslate(TrainingsView);
