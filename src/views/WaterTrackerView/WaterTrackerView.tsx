import React, { useEffect, useState } from 'react';

import WaterChart from './WaterChart'
// import {loadPhrases} from 'api/loadPhrases';
import axios from 'utils/axios';
import classnames from 'classnames';

import { ReactComponent as PlusIcon } from 'assets/img/icons/plus-icon-blue-thin.svg';
import { ReactComponent as TickIcon } from 'assets/img/icons/tick-icon-big.svg';

import './WaterTrackerView.sass';



const WaterTrackerView = (props: any) => {

  const [trackerPeriod, setTrackerPeriod] = useState('week');
  const [totalCompleteWater, setTotalCompleteWater] = useState(55);
  const [totalCompleteWaterML, setTotalCompleteWaterML] = useState(1000);

  const [t, setTranslate] = useState([])

  useEffect(() => {
    axios.get('/i18n/load')
    .then(function (response) {
      const data = response.data.data
      setTranslate(data)
    })
    .catch(function (error) {
      console.log(error);
    });
  }, [])

  let labels = []
  if (trackerPeriod == 'week') {
    labels = ['Sun', 'Mon', 'Tus', 'Wen', 'Thu', 'Fri', 'Sat']
  } else if (trackerPeriod == 'month') {
    labels = ['Jan', 'Feb', 'Mar', 'May', 'Jun', 'Jul', 'Aug']
  } else {
    labels = ['2021', '2022', '2023', '2024', '2025', '2026', '2027']
  }

  let activePeriod = (period) => classnames({
    'active-period': trackerPeriod == period,
  })

  return (
    <>
      <div className="waterTracker">
        <div className="container">
          <div className="row">
            <h4 className="waterTracker_title">{t['watertracker.water_tracker']}</h4>
          </div>
        </div>

        <div className="container" style={{marginBottom: 25}}>
          <div className="row">
            <ul className="waterTracker_period">
              <li
                onClick={()=> setTrackerPeriod('week')}
                className={activePeriod('week')}
              >
                {t['watertracker.week']}
              </li>
              <li
                onClick={()=> setTrackerPeriod('month')}
                className={activePeriod('month')}
              >
                {t['watertracker.month']}
              </li>
              <li
                onClick={()=> setTrackerPeriod('year')}
                className={activePeriod('year')}
              >
                {t['watertracker.year']}
              </li>
            </ul>
          </div>

          <div className="row row-wrap" >
            <div className="col-5">
              <WaterChart labels={labels} />
            </div>

            <div className="col-7">
              <div className="col-8">
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
                    <PlusIcon fill='#3283EB' />
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
                <h5>{totalCompleteWaterML}{t['watertracker.ml']}</h5>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row row-wrap">
            <div className="col-5">
              <div className="waterTracker_info">
                <div>
                  <p>{t['watertracker.day_average']}</p>
                  <p>
                    <span>2000</span> {t['watertracker.ml']}/{t['watertracker.day']}
                  </p>
                </div>
                <div>
                  <p>{t['watertracker.drink_frequency']}</p>
                  <p>
                    <span>8</span> {t['watertracker.time']}(s)/{t['watertracker.day']}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-7">
              <div className="waterTracker_stats">
                <p>{t['watertracker.complite']}</p>
                <span>1000{t['watertracker.ml']}</span>
              </div>
              <div className="waterTracker_stats">
                <p>{t['watertracker.daily_goal']}</p>
                <span>2000{t['watertracker.ml']}</span>
              </div>
              <div className="waterTracker_stats">
                <p>{t['watertracker.average']}</p>
                <span>1300{t['watertracker.ml']}</span>
              </div>
              <div className="waterTracker_stats">
                <p>{t['watertracker.status']}</p>
                <span>{t['watertracker.normal']}</span>
              </div>
            </div>

          </div>
        </div>
          
      </div>
    </>
  );
};

export default WaterTrackerView;
