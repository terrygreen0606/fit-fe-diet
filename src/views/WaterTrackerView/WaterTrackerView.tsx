import React, { useState } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { getTranslate as getTranslateUtil } from 'utils';

import WithTranslate from 'components/hoc/WithTranslate';
import WaterChart from './WaterChart'

import './WaterTrackerView.sass';

import { ReactComponent as PlusIcon } from 'assets/img/icons/plus-icon-blue-thin.svg';
import { ReactComponent as TickIcon } from 'assets/img/icons/tick-icon-big.svg';

const WaterTrackerView = (props: any) => {

  const [trackerPeriod, setTrackerPeriod] = useState('week');
  const [totalCompleteWater, setTotalCompleteWater] = useState(55);
  const [totalCompleteWaterML, setTotalCompleteWaterML] = useState(1000);

  let chartLabels
  if (trackerPeriod == 'week') {
    chartLabels = ['Sun', 'Mon', 'Tus', 'Wen', 'Thu', 'Fri', 'Sat']
  } else if (trackerPeriod == 'month') {
    chartLabels = ['Jan', 'Feb', 'Mar', 'May', 'Jun', 'Jul', 'Aug']
  } else {
    chartLabels = ['2021', '2022', '2023', '2024', '2025', '2026', '2027']
  }

  let chartData = [50,50,50,50,60]

  let activePeriod = (period) => classnames({
    'active-period': trackerPeriod == period,
  })

  const getTranslate = (code: string) => getTranslateUtil(props.localePhrases, code);

  return (
    <>
      <div className="waterTracker">
        <div className="container">
          <div className="row">
            <h4 className="waterTracker_title">
              {getTranslate('watertracker.water_tracker')}
            </h4>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <ul className="waterTracker_period">
              <li
                onClick={()=> setTrackerPeriod('week')}
                className={activePeriod('week')}
              >
                {getTranslate('common.week')}
              </li>
              <li
                onClick={()=> setTrackerPeriod('month')}
                className={activePeriod('month')}
              >
                {getTranslate('common.month')}
              </li>
              <li
                onClick={()=> setTrackerPeriod('year')}
                className={activePeriod('year')}
              >
                {getTranslate('common.year')}
              </li>
            </ul>
          </div>

          <div className="row row-wrap" >
            <div className="col-5">
              <div className='waterTracker_chartwrap'>
                <WaterChart labels={chartLabels} data={chartData} />
              </div>
            </div>

            <div className="col-7">
              <div className="col-9">
                <ul className="waterTracker_daynorm">
                  <li className="daynorm-item filled">
                    <TickIcon />
                  </li>
                  <li className="daynorm-item filled">
                    <TickIcon />
                  </li>
                  <li className="daynorm-item filled">
                    <TickIcon />
                  </li>
                  <li className="daynorm-item filled">
                    <TickIcon />
                  </li>
                  <li className="daynorm-item filled" >
                    <TickIcon />
                  </li>
                  <li className="daynorm-item">
                    <PlusIcon />
                  </li>
                  <li className="daynorm-item">
                  </li>
                  <li className="daynorm-item">
                  </li>
                  <li className="daynorm-item">
                  </li>
                  <li className="daynorm-item">
                  </li>
                  <li className="daynorm-item">
                  </li>
                  <li className="daynorm-item">
                  </li>
                </ul>
              </div>

              <div className="water-drop">
                <h3>{totalCompleteWater}%</h3>
                <h5>{totalCompleteWaterML}{getTranslate('common.ml')}</h5>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row row-wrap">
            <div className="col-5">
              <div className="waterTracker_info">
                <div>
                  <p>{getTranslate('common.day_average')}</p>
                  <p>
                    <span>2000</span> {getTranslate('common.ml')}/{getTranslate('common.day')}
                  </p>
                </div>
                <div>
                  <p>{getTranslate('watertracker.drink_frequency')}</p>
                  <p>
                    <span>8</span> {getTranslate('common.time')}(s)/{getTranslate('common.day')}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-7">
              <div className="waterTracker_stats">
                <p>{getTranslate('common.complite')}</p>
                <span>1000{getTranslate('common.ml')}</span>
              </div>
              <div className="waterTracker_stats">
                <p>{getTranslate('common.daily_goal')}</p>
                <span>2000{getTranslate('common.ml')}</span>
              </div>
              <div className="waterTracker_stats">
                <p>{getTranslate('common.average')}</p>
                <span>1300{getTranslate('common.ml')}</span>
              </div>
              <div className="waterTracker_stats">
                <p>{getTranslate('common.status')}</p>
                <span>{getTranslate('watertracker.normal')}</span>
              </div>
            </div>

          </div>
        </div>
          
      </div>
    </>
  );
};

export default WithTranslate(connect(
  null,
)(WaterTrackerView));
