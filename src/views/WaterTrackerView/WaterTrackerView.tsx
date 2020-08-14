import React, { useState } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { getTranslate } from 'utils';

import WithTranslate from 'components/hoc/WithTranslate';

import './WaterTrackerView.sass';

import { ReactComponent as PlusIcon } from 'assets/img/icons/plus-icon-blue-thin.svg';
import { ReactComponent as TickIcon } from 'assets/img/icons/tick-icon-big.svg';

import WaterChart from './WaterChart';

const WaterTrackerView = (props: any) => {
  const [trackerPeriod, setTrackerPeriod] = useState('week');
  const [totalCompleteWater, setTotalCompleteWater] = useState(55);
  const [totalCompleteWaterML, setTotalCompleteWaterML] = useState(1000);
  const [chartData, setChartData] = useState([50, 50, 50, 50, 60]);

  let chartLabels;

  function getChartLabels(period) {
    const weekList = ['Sun', 'Mon', 'Tus', 'Wen', 'Thu', 'Fri', 'Sat'];
    const monthList = ['Jan', 'Feb', 'Mar', 'May', 'Jun', 'Jul', 'Aug'];
    const yearList = ['2021', '2022', '2023', '2024', '2025', '2026', '2027'];
    if (period === 'week') {
      chartLabels = weekList;
    } else if (period === 'month') {
      chartLabels = monthList;
    } else {
      chartLabels = yearList;
    }
  }

  getChartLabels(trackerPeriod);

  const activePeriod = (period) =>
    classnames({
      'active-period': trackerPeriod === period,
    });

  const t = (code: string) => getTranslate(props.localePhrases, code);

  return (
    <>
      <div className='waterTracker'>
        <div className='container'>
          <div className='row'>
            <h4 className='waterTracker_title'>{t('wt.head_title')}</h4>
          </div>
        </div>

        <div className='container'>
          <div className='row'>
            <ul className='waterTracker_period'>
              <li
                onClick={() => setTrackerPeriod('week')}
                className={activePeriod('week')}
                role='presentation'
              >
                {t('common.week')}
              </li>
              <li
                onClick={() => setTrackerPeriod('month')}
                className={activePeriod('month')}
                role='presentation'
              >
                {t('common.month')}
              </li>
              <li
                onClick={() => setTrackerPeriod('year')}
                className={activePeriod('year')}
                role='presentation'
              >
                {t('common.year')}
              </li>
            </ul>
          </div>

          <div className='row row-wrap'>
            <div className='col-5'>
              <div className='waterTracker_chartwrap'>
                <WaterChart labels={chartLabels} data={chartData} />
              </div>
            </div>

            <div className='col-7'>
              <div className='col-9'>
                <ul className='waterTracker_daynorm'>
                  <li className='daynorm-item filled'>
                    <TickIcon />
                  </li>
                  <li className='daynorm-item filled'>
                    <TickIcon />
                  </li>
                  <li className='daynorm-item filled'>
                    <TickIcon />
                  </li>
                  <li className='daynorm-item filled'>
                    <TickIcon />
                  </li>
                  <li className='daynorm-item filled'>
                    <TickIcon />
                  </li>
                  <li className='daynorm-item'>
                    <PlusIcon />
                  </li>
                  <li className='daynorm-item' />
                  <li className='daynorm-item' />
                  <li className='daynorm-item' />
                  <li className='daynorm-item' />
                  <li className='daynorm-item' />
                  <li className='daynorm-item' />
                </ul>
              </div>

              <div className='water-drop'>
                <h3>{totalCompleteWater}%</h3>
                <h5>
                  {totalCompleteWaterML}
                  {t('common.ml')}
                </h5>
              </div>
            </div>
          </div>
        </div>

        <div className='container'>
          <div className='row row-wrap'>
            <div className='col-5'>
              <div className='waterTracker_info'>
                <div>
                  <p>{t('common.day_average')}</p>
                  <p>
                    <span>2000</span> {t('common.ml')}/{t('common.day')}
                  </p>
                </div>
                <div>
                  <p>{t('wt.drink_frequency')}</p>
                  <p>
                    <span>8</span> {t('common.time')}
                    (s)/
                    {t('common.day')}
                  </p>
                </div>
              </div>
            </div>

            <div className='col-7'>
              <div className='waterTracker_stats'>
                <p>{t('wt.complete')}</p>
                <span>
                  1000
                  {t('common.ml')}
                </span>
              </div>
              <div className='waterTracker_stats'>
                <p>{t('common.daily_goal')}</p>
                <span>
                  2000
                  {t('common.ml')}
                </span>
              </div>
              <div className='waterTracker_stats'>
                <p>{t('common.average')}</p>
                <span>
                  1300
                  {t('common.ml')}
                </span>
              </div>
              <div className='waterTracker_stats'>
                <p>{t('wt.status')}</p>
                <span>{t('wt.normal')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WithTranslate(connect(null)(WaterTrackerView));
