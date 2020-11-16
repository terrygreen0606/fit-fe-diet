import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import classnames from 'classnames';

import { getUserTodayActivity } from 'api';
import { getTranslate } from 'utils';

// Components
import WithTranslate from 'components/hoc/WithTranslate';

import './TodayActivities.sass';

import { ReactComponent as CheckedIcon } from 'assets/img/icons/checked-icon.svg';

import { dataForTodayActivities } from './dataForTodayActivities';

const TodayActivities = (props: any) => {
  const t = (code: string) => getTranslate(props.localePhrases, code);

  const [userTodayActivity, setUserTodayActivity] = useState({
    water_tracker: null,
  });

  useEffect(() => {
    getUserTodayActivity().then(({ data }) => {
      if (data.success && data.data) {
        setUserTodayActivity(data.data);
      }
    }).catch(() => toast.error(t('common.error')));
  }, []);

  return (
    <>
      <h2 className='today-activities__title'>
        {t('activities.title')}
      </h2>
      <div className='today-activities__list'>
        {dataForTodayActivities.map((item) => (
          item.isActive && (
            <Link
              key={item.id}
              to={item.link}
              className={classnames('today-activities__item card-bg', {
                active: userTodayActivity[item.labelName],
              })}
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
          )
        ))}
      </div>
    </>
  );
};

export default WithTranslate(TodayActivities);
