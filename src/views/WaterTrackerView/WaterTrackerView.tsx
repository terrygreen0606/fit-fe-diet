/* eslint-disable no-case-declarations */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Helmet from 'react-helmet';
import moment from 'moment';

import { routes } from 'constants/routes';
import { getTranslate } from 'utils';
import {
  getDataStatsForPeriod,
  getDataStatsForToday,
} from 'api';

import WithTranslate from 'components/hoc/WithTranslate';
import Breadcrumb from 'components/Breadcrumb';
import Banner from 'components/Banner';
import Button from 'components/common/Forms/Button';

import './WaterTrackerView.sass';

import { ReactComponent as DropIcon } from 'assets/img/icons/drop-icon.svg';
import { ReactComponent as TrashLineIcon } from 'assets/img/icons/trash-line-icon.svg';

import WaterChart from './WaterChart';
import { bannerData, periods } from './dataForWaterTracker';

const WaterTrackerView = (props: any) => {
  const t = (code: string) => getTranslate(props.localePhrases, code);

  const [trackerPeriod, setTrackerPeriod] = useState<string>(periods.week);

  const [dayAverage, setDayAverage] = useState<number>(0);
  const [drinkFrequency, setDrinkFrequency] = useState<number>(0);
  const [completed, setCompleted] = useState<number>(0);
  const [completedPercent, setCompletedPercent] = useState<number>(0);
  const [dailyGoal, setDailyGoal] = useState<number>(0);
  const [actLevel, setActLevel] = useState<string>('');

  const [chartsData, setChartsData] = useState<{
    label: string[],
    data: number[],
  }>({
    label: [],
    data: [],
  });

  const getData = () => {
    getDataStatsForPeriod(trackerPeriod).then((response) => {
      const { data } = response.data;

      if (response.data.status && response.data.data) {
        if (trackerPeriod === periods.week) {
          const updatedData = {
            label: [],
            data: [],
          };

          Object.keys(data.stats).forEach((item) => {
            updatedData.label.push(
              moment.unix(+item).format('HH:mm'),
            );
            updatedData.data.push(data.stats[item]);
          });

          setChartsData({ ...updatedData });
        } else if (trackerPeriod === periods.month) {
          const updatedData = {
            label: [],
            data: [],
          };

          Object.keys(data.stats).forEach((item) => {
            updatedData.label.push(
              moment.unix(+item).format('D MMM'),
            );
            updatedData.data.push(data.stats[item]);
          });

          setChartsData({ ...updatedData });
        } else if (trackerPeriod === periods.year) {
          const updatedData = {
            label: [],
            data: [],
          };

          Object.keys(data.stats).forEach((item) => {
            updatedData.label.push(
              moment.unix(+item).format('MMM'),
            );
            updatedData.data.push(data.stats[item]);
          });

          setChartsData({ ...updatedData });
        }

        setDayAverage(data.day_average);
        setDrinkFrequency(data.frequency);
      }
    });
  };

  useEffect(() => {
    getData();
  }, [trackerPeriod]);

  useEffect(() => {
    getDataStatsForToday().then((response) => {
      const { data } = response.data;

      if (response.data.succeeat && response.data.data) {
        setCompleted(data.completed);
        setCompletedPercent(data.completed_percent);
        setDailyGoal(data.daily_goal);
        setActLevel(data.act_level);
      }
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('app.title.water_tracker')}</title>
      </Helmet>
      <div className='waterTracker'>
        <div className='container'>
          <Breadcrumb
            routes={[
              {
                url: routes.main,
                name: t('breadcrumb.main'),
              },
            ]}
            currentPage={t('wt.head_title')}
          />
          <h4 className='waterTracker_title'>
            <span className='waterTracker_title-text'>
              {t('wt.head_title')}
            </span>
          </h4>
          <Banner
            items={bannerData}
            imageSize='lg'
          />
          <div className='row'>
            <ul className='waterTracker_period'>
              <li
                onClick={() => setTrackerPeriod(periods.week)}
                className={classnames('waterTracker_period-item', {
                  'active-period': trackerPeriod === periods.week,
                })}
                role='presentation'
              >
                {t('common.week')}
              </li>
              <li
                onClick={() => setTrackerPeriod(periods.month)}
                className={classnames('waterTracker_period-item', {
                  'active-period': trackerPeriod === periods.month,
                })}
                role='presentation'
              >
                {t('common.month')}
              </li>
              <li
                onClick={() => setTrackerPeriod(periods.year)}
                className={classnames('waterTracker_period-item', {
                  'active-period': trackerPeriod === periods.year,
                })}
                role='presentation'
              >
                {t('common.year')}
              </li>
            </ul>
          </div>

          <div className='row row-wrap mb-5'>
            <div className='col-xl-5'>
              <div className='waterTracker_chartwrap'>
                <WaterChart labels={chartsData.label} data={chartsData.data} />
              </div>
            </div>

            <div className='col-xl-7'>
              <div className='row'>
                <div className='col-lg-8'>
                  <div className='waterTracker_daynorm'>
                    <div className='waterTracker_daynorm-item'>
                      <div className='waterTracker_daynorm-item-wrap'>
                        <DropIcon className='waterTracker_daynorm-item-drop' />
                        <div className='waterTracker_daynorm-item-time'>
                          11:00
                        </div>
                      </div>
                      <div className='waterTracker_daynorm-item-wrap'>
                        <div className='waterTracker_daynorm-item-size'>
                          200
                          {t('common.ml')}
                        </div>
                        <button
                          type='button'
                          className='waterTracker_daynorm-item-btn-trash'
                        >
                          <TrashLineIcon className='waterTracker_daynorm-item-trash' />
                        </button>
                      </div>
                    </div>
                    <div className='waterTracker_daynorm-item'>
                      <div className='waterTracker_daynorm-item-wrap'>
                        <DropIcon className='waterTracker_daynorm-item-drop' />
                        <div className='waterTracker_daynorm-item-time'>
                          11:00
                        </div>
                      </div>
                      <div className='waterTracker_daynorm-item-wrap'>
                        <div className='waterTracker_daynorm-item-size'>
                          200
                          {t('common.ml')}
                        </div>
                        <button
                          type='button'
                          className='waterTracker_daynorm-item-btn-trash'
                        >
                          <TrashLineIcon className='waterTracker_daynorm-item-trash' />
                        </button>
                      </div>
                    </div>
                    <div className='waterTracker_daynorm-item'>
                      <div className='waterTracker_daynorm-item-wrap'>
                        <DropIcon className='waterTracker_daynorm-item-drop' />
                        <div className='waterTracker_daynorm-item-time'>
                          11:00
                        </div>
                      </div>
                      <div className='waterTracker_daynorm-item-wrap'>
                        <div className='waterTracker_daynorm-item-size'>
                          200
                          {t('common.ml')}
                        </div>
                        <button
                          type='button'
                          className='waterTracker_daynorm-item-btn-trash'
                        >
                          <TrashLineIcon className='waterTracker_daynorm-item-trash' />
                        </button>
                      </div>
                    </div>
                    <div className='waterTracker_daynorm-item'>
                      <div className='waterTracker_daynorm-item-wrap'>
                        <DropIcon className='waterTracker_daynorm-item-drop' />
                        <div className='waterTracker_daynorm-item-time'>
                          11:00
                        </div>
                      </div>
                      <div className='waterTracker_daynorm-item-wrap'>
                        <div className='waterTracker_daynorm-item-size'>
                          200
                          {t('common.ml')}
                        </div>
                        <button
                          type='button'
                          className='waterTracker_daynorm-item-btn-trash'
                        >
                          <TrashLineIcon className='waterTracker_daynorm-item-trash' />
                        </button>
                      </div>
                    </div>
                    <div className='waterTracker_daynorm-item'>
                      <div className='waterTracker_daynorm-item-wrap'>
                        <DropIcon className='waterTracker_daynorm-item-drop' />
                        <div className='waterTracker_daynorm-item-time'>
                          11:00
                        </div>
                      </div>
                      <div className='waterTracker_daynorm-item-wrap'>
                        <div className='waterTracker_daynorm-item-size'>
                          200
                          {t('common.ml')}
                        </div>
                        <button
                          type='button'
                          className='waterTracker_daynorm-item-btn-trash'
                        >
                          <TrashLineIcon className='waterTracker_daynorm-item-trash' />
                        </button>
                      </div>
                    </div>
                    <div className='waterTracker_daynorm-delete'>
                      <span>{t('wt.delete')}</span>
                      <button
                        type='button'
                        className='waterTracker_daynorm-delete-btn'
                      >
                        {t('common.yes')}
                      </button>
                    </div>
                  </div>
                </div>

                <div className='col-lg-4 text-center'>
                  <div className='water-drop'>
                    <h3>
                      {`${completedPercent}%`}
                    </h3>
                    <h5>
                      {dailyGoal}
                      {t('common.ml')}
                    </h5>
                  </div>
                  <div className='log-drink-wrap'>
                    <Button color='secondary' className='log-drink-btn'>
                      {t('wt.log_drink')}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='row row-wrap align-items-end'>
            <div className='col-xl-5'>
              <div className='waterTracker_info'>
                <div className='waterTracker_info-item'>
                  <div className='waterTracker_info-item-title'>
                    {t('common.day_average')}
                  </div>
                  <div className='waterTracker_info-item-desc'>
                    <div className='waterTracker_info-item-desc-selected'>
                      {dayAverage}
                    </div>
                    {t('wt.day_average')}
                  </div>
                </div>
                <div className='waterTracker_info-item'>
                  <div className='waterTracker_info-item-title'>
                    {t('wt.drink_frequency')}
                  </div>
                  <div className='waterTracker_info-item-desc'>
                    <div className='waterTracker_info-item-desc-selected'>
                      {drinkFrequency}
                    </div>
                    {t('wt.drink_frequency_count')}
                  </div>
                </div>
              </div>
            </div>

            <div className='col-xl-7'>
              <div className='waterTracker_stats-wrap'>
                <div className='waterTracker_stats'>
                  <div>
                    {t('wt.complete')}
                  </div>
                  <span className='waterTracker_stats-value'>
                    {`${completed} ${t('common.ml')}`}
                  </span>
                </div>
                <div className='waterTracker_stats'>
                  <div>
                    {t('common.daily_goal')}
                  </div>
                  <span className='waterTracker_stats-value'>
                    {`${dailyGoal} ${t('common.ml')}`}
                  </span>
                </div>
                <div className='waterTracker_stats'>
                  <div>
                    {t('common.average')}
                  </div>
                  <span className='waterTracker_stats-value'>
                    {`${dayAverage} ${t('common.ml')}`}
                  </span>
                </div>
                <div className='waterTracker_stats'>
                  <div>
                    {t('wt.status')}
                  </div>
                  <span className='waterTracker_stats-value'>
                    {t(actLevel)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WithTranslate(connect(null)(WaterTrackerView));
