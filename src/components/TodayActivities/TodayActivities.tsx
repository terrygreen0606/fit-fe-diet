import React from 'react';

import './TodayActivities.sass';

import {ReactComponent as DumbbellIcon} from "../../assets/img/icons/dumbbell-icon.svg";
import {ReactComponent as WeighScaleIcon} from "../../assets/img/icons/weigh-scale-icon.svg";


const TodayActivities = () => (
  <div>
    <h4 className="mt-5 mb-4">Today's activities</h4>

    <div className="today-activities-activity-list">
      <input
        type="checkbox"
        id="activity1"
        value="activity1"
        name="activities"
        hidden
        defaultChecked
      />
      <label htmlFor="activity1" className="today-activities-activity-card card-bg">
        <span className="today-activities-activity-card-checkmark"/>

        <span className="today-activities-activity-card-icon-wrap">
          <DumbbellIcon className="today-activities-activity-card-icon" />
        </span>

        <h6 className="today-activities-activity-card-title">Add a workout</h6>
      </label>

      <input
        type="checkbox"
        id="activity2"
        value="activity2"
        name="activities"
        hidden
      />
      <label htmlFor="activity2" className="today-activities-activity-card card-bg">
        <span className="today-activities-activity-card-checkmark"/>

        <span className="today-activities-activity-card-icon-wrap">
          <WeighScaleIcon className="today-activities-activity-card-icon" />
        </span>

        <h6 className="today-activities-activity-card-title">Add today's weight</h6>
      </label>
    </div>

  </div>
);

export default TodayActivities;
