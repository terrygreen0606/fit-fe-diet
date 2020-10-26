import React from 'react';
import { getTranslate } from 'utils';

// Components
import WithTranslate from 'components/hoc/WithTranslate';

import TodayActivityItem, { ItemProps } from './TodayActivityItem';

import './TodayActivities.sass';

type TodayActivitiesProps = {
  items: ItemProps[],
  todayActivities: string[],
  onChange: (any) => void,
  type: 'radio' | 'checkbox',
  localePhrases: [];
  name?: string,
};

const TodayActivitiesPropsDefault = {
  name: '',
};

const TodayActivities = ({
  items, todayActivities, onChange, type, localePhrases, name,
}: TodayActivitiesProps) => {
  const t = (code: string) => getTranslate(localePhrases, code);

  return (
    <>
      <h2 className='today-activities-activity-title'>
        {name}
      </h2>
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
                text={t(item.text)}
                disabled={item.disabled}
              />
            </label>
          ))
        }
      </div>
    </>
  );
};

TodayActivities.defaultProps = TodayActivitiesPropsDefault;

export default WithTranslate(TodayActivities);
