import React from 'react';

import TodayActivityItem, { ItemProps } from './TodayActivityItem';

import './TodayActivities.sass';

type TodayActivitiesProps = {
  items: ItemProps[],
  todayActivities: string[],
  onChange: (any) => void,
  type: 'radio' | 'checkbox',
  name?: string,
};

const TodayActivities = ({
  items, todayActivities, onChange, type, name,
}: TodayActivitiesProps) => (
  <>
    <h4 className='mt-5 mb-4'>
      {name}
    </h4>
    <div className='today-activities-activity-list'>
      {
        items.map((item) => (
          <label key={item.text}>
            <input
              type={type}
              value={item.value}
              onChange={onChange}
              checked={todayActivities.includes(item.value)}
              disabled={item.disabled}
            />
            <TodayActivityItem
              active={todayActivities.includes(item.value)}
              value={item.value}
              icon={item.icon}
              text={item.text}
              disabled={item.disabled}
            />
          </label>
        ))
      }
    </div>
  </>
);

export default TodayActivities;
