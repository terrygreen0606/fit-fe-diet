import React from 'react';
import { Link } from 'react-router-dom';

import { getTranslate } from 'utils';

// Components
import WithTranslate from 'components/hoc/WithTranslate';

import './TodayActivities.sass';

import { ReactComponent as CheckedIcon } from 'assets/img/icons/checked-icon.svg';

type TodayActivitiesProps = {
  title: string;
  items: {
    id: number;
    title: string;
    icon: any;
    link: string;
  }[];
  localePhrases: any;
};

const TodayActivities = ({
  title,
  items,
  localePhrases,
}: TodayActivitiesProps) => {
  const t = (code: string) => getTranslate(localePhrases, code);

  return (
    <>
      <h2 className='today-activities__title'>
        {title}
      </h2>
      <div className='today-activities__list'>
        {items.map((item) => (
          <Link
            key={item.id}
            to={item.link}
            className='today-activities__item card-bg'
          >
            <div className='today-activities__item-media'>
              {item.icon}
            </div>
            <div className='today-activities__item-desc'>
              {t(item.title)}
            </div>
            <div className='today-activities__item-checked-icon'>
              <CheckedIcon />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default WithTranslate(TodayActivities);
