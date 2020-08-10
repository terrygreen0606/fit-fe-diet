import React from 'react';

import TodayActivityItem, { ItemProps } from "./TodayActivityItem";

import './TodayActivities.sass';

type TodayActivityType = "radio" | "checkbox";

interface TodayActivitiesProps {
  items: Array<ItemProps>,
  todayActivities: Array<string>,
  onChange: (any) => void,
  type?: TodayActivityType,
}

const TodayActivities = ({ items, todayActivities, onChange, type }: TodayActivitiesProps) => {
  const onInputChange = e => {
    e.persist();
    e.target.checked
      ? onChange(prev => [...prev, e.target.value])
      : onChange(prev =>
        [...prev.slice(0, prev.indexOf(e.target.value)), ...prev.slice(prev.indexOf(e.target.value) + 1)])
  };

  return (
    <>
      <h4 className="mt-5 mb-4">Today's activities</h4>
      <div className="today-activities-activity-list">
        {
          items.map(item => (
            <label key={item.text}>
              <input
                type={type}
                value={item.text}
                onChange={onInputChange}
                checked={todayActivities.includes(item.text)}
              />
              <TodayActivityItem icon={item.icon} text={item.text} todayActivities={todayActivities} />
            </label>
          ))
        }
      </div>
    </>
  )
};

export default TodayActivities;
