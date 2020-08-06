import React from 'react';

import './TodayActivities.sass';


const TodayActivities = ({ items, todayActivities, setTodayActivities}) => {
  const onInputChange = e => {
    e.persist();
    e.target.checked
      ? setTodayActivities(prev => [...prev, e.target.value])
      : setTodayActivities(prev =>
        prev.indexOf(e.target.value) === prev.length - 1
          ? [...prev.slice(0, prev.indexOf(e.target.value))]
          : [...prev.slice(0, prev.indexOf(e.target.value)), ...prev.slice(prev.indexOf(e.target.value + 1))]
      )
  };

  return (
    <div>
      <h4 className="mt-5 mb-4">Today's activities</h4>

      <div className="today-activities-activity-list">

        {
          items.map(item => (
            <React.Fragment key={item.text}>
              <input
                type="checkbox"
                id={item.text}
                value={item.text}
                name="activities"
                onChange={e => onInputChange(e)}
                hidden
                defaultChecked={todayActivities.includes(item.text)}
              />
              <label htmlFor={item.text} className="today-activities-activity-card card-bg">
                <span className="today-activities-activity-card-checkmark"/>

                <span className="today-activities-activity-card-icon-wrap">
                <item.Icon className="today-activities-activity-card-icon" />
              </span>

                <h6 className="today-activities-activity-card-title">
                  {item.text}
                </h6>
              </label>
            </React.Fragment>
          ))
        }
      </div>

    </div>
  )
};

export default TodayActivities;
