import React, { useState } from 'react';
import { getTranslate } from 'utils';
import classnames from 'classnames';
import Helmet from 'react-helmet';

import { routes } from 'constants/routes';

import WithTranslate from 'components/hoc/WithTranslate';
import WeekDays from 'components/WeekDays';
import Breadcrumb from 'components/Breadcrumb';

import { ReactComponent as DailyPlanIcon } from 'assets/img/icons/daily-plan-icon.svg';
import { ReactComponent as WeekPlanIcon } from 'assets/img/icons/week-plan-icon.svg';
import { ReactComponent as FileDyskIcon } from 'assets/img/icons/file-dysk-icon.svg';
import { ReactComponent as PrintIcon } from 'assets/img/icons/print-icon.svg';
import { ReactComponent as ShareIcon } from 'assets/img/icons/share-icon.svg';

import FoodPlanDay from './FoodPlanDay';

import './FoodPlanView.sass';

import { weeks } from './mockDataForFoodPlanView';

const FoodPlanView = (props: any) => {
  const [plan, setPlan] = useState('week');
  const [week, setWeek] = useState(0);
  const [curDay, setCurDay] = useState('wed');
  const activeWeek = weeks[week];

  const t = (code: string, placeholders?: any) => getTranslate(
    props.localePhrases,
    code,
    placeholders,
  );

  const dynamicTabs = () => {
    if (plan === 'daily') {
      return (
        <div className='mobile-sub-tabs'>
          <WeekDays
            days={activeWeek.days}
            onChange={(e) => setCurDay(e.target.value)}
            curDay={curDay}
            type='radio'
          />
        </div>
      );
    }
    return (
      <ol className='page-sub-tabs'>
        {weeks.map((item) => (
          <li
            key={item.title}
            role='presentation'
            value={weeks.indexOf(item)}
            className={classnames('page-sub-tabs-item', {
              active: week === weeks.indexOf(item),
            })}
            onClick={(e) => setWeek(e.currentTarget.value)}
          >
            {item.title}
          </li>
        ))}
      </ol>
    );
  };

  return (
    <>
      <Helmet>
        <title>{t('app.title.food_plan')}</title>
      </Helmet>
      <section>
        <div className='container'>
          <Breadcrumb
            routes={[
              {
                url: routes.main.url,
                name: routes.main.title,
              },
            ]}
            currentPage={t('app.title.food_plan')}
          />
          <div className='row food_plan'>
            <div className='col-md-8 col-lg-9'>
              <div className='row food_plan_tabs'>
                <ul className='page-tabs mx-4 mx-md-0'>
                  <li role='presentation' className='page-tabs-item active'>
                    {t('foodplan.your_menu')}
                  </li>
                </ul>
              </div>
              <div className='row'>
                {dynamicTabs()}

                <div className='page-sub-tabs-controls-list'>
                  <div className='page-sub-tabs-controls-item'>
                    <FileDyskIcon className='page-sub-tabs-controls-icon' />
                  </div>
                  <div className='page-sub-tabs-controls-item'>
                    <PrintIcon className='page-sub-tabs-controls-icon' />
                  </div>
                  <div className='page-sub-tabs-controls-item'>
                    <ShareIcon className='page-sub-tabs-controls-icon' />
                  </div>
                </div>
              </div>
            </div>
            <div className='col-lg-3 justify-content-center d-flex flex-row choose_plan'>
              <label>
                <input
                  type='radio'
                  value='week'
                  onChange={(e) => setPlan(e.target.value)}
                  checked={plan === 'week'}
                />
                <div
                  className={classnames('d-flex flex-column choose_plan_item', {
                    active: plan === 'week',
                  })}
                >
                  <span className='choose_plan_item_checkmark' />
                  <span className='choose_plan_item_icon-wrap'>
                    <WeekPlanIcon className='choose_plan_item_icon' />
                  </span>
                  <h6 className='choose_plan_item_title'>{t('common.week')}</h6>
                </div>
              </label>

              <label>
                <input
                  type='radio'
                  value='daily'
                  onChange={(e) => setPlan(e.target.value)}
                  checked={plan === 'daily'}
                />
                <div
                  className={classnames(
                    'd-flex flex-column choose_plan_item daily mr-0',
                    { active: plan === 'daily' },
                  )}
                >
                  <span className='choose_plan_item_checkmark' />
                  <span className='choose_plan_item_icon-wrap'>
                    <DailyPlanIcon className='choose_plan_item_icon' />
                  </span>
                  <h6 className='choose_plan_item_title'>
                    {t('common.daily')}
                  </h6>
                </div>
              </label>
            </div>
          </div>
          {activeWeek.days
            .filter((day) => (plan === 'daily' ? day.value === curDay : true))
            .map((day) => (
              <FoodPlanDay
                key={`${day.date} food-plan-day`}
                date={day.date}
                mealPlan={day.mealPlan}
                plan={plan}
                t={t}
              />
            ))}
        </div>
      </section>
    </>
  );
};

export default WithTranslate(FoodPlanView);
