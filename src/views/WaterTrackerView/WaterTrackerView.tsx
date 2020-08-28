/* eslint-disable react/no-danger */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Helmet from 'react-helmet';

import { routes, MAIN } from 'constants/routes';
import { getTranslate, getImagePath } from 'utils';

import WithTranslate from 'components/hoc/WithTranslate';
import Breadcrumb from 'components/Breadcrumb';

import './WaterTrackerView.sass';

import { ReactComponent as DropIcon } from 'assets/img/icons/drop-icon.svg';
import { ReactComponent as TrashLineIcon } from 'assets/img/icons/trash-line-icon.svg';

import Button from 'components/common/Forms/Button';
import WaterChart from './WaterChart';

const WaterTrackerView = (props: any) => {
  const [trackerPeriod, setTrackerPeriod] = useState('week');
  const [totalCompleteWater] = useState(55);
  const [totalCompleteWaterML] = useState(1000);
  const [chartData] = useState([50, 50, 50, 50, 60]);

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
      <Helmet>
        <title>{t('app.title.water_tracker')}</title>
      </Helmet>
      <div className='waterTracker'>
        <div className='container'>
          <Breadcrumb
            routes={[
              {
                url: routes[MAIN],
                name: MAIN,
              },
            ]}
            currentPage={t('wt.head_title')}
          />
          <h4 className='waterTracker_title'>
            <span className='waterTracker_title-text'>
              {t('wt.head_title')}
            </span>
          </h4>
          <div className='waterTracker_banner card-bg'>
            <div className='waterTracker_banner-text'>
              <div
                className='waterTracker_banner-text-title'
                dangerouslySetInnerHTML={{ __html: t('wt.banner.title') }}
              />
              <div className='waterTracker_banner-text-desc'>
                {t('wt.banner.desc')}
              </div>
            </div>
            <div className='waterTracker_banner-media'>
              <img src={getImagePath('water-woman.png')} alt='' />
            </div>
            <div className='waterTracker_banner-btnWrap'>
              <Button color='primary' className='waterTracker_banner-btn'>
                {t('wt.next')}
              </Button>
            </div>
            <Button className='waterTracker_banner-skip'>{t('wt.skip')}</Button>
          </div>
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

          <div className='row row-wrap mb-5'>
            <div className='col-lg-5'>
              <div className='waterTracker_chartwrap'>
                <WaterChart labels={chartLabels} data={chartData} />
              </div>
            </div>

            <div className='col-lg-7'>
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
                          200 {t('common.ml')}
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
                          200 {t('common.ml')}
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
                          200 {t('common.ml')}
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
                          200 {t('common.ml')}
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
                          200 {t('common.ml')}
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
                    <h3>{totalCompleteWater}%</h3>
                    <h5>
                      {totalCompleteWaterML}
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
            <div className='col-5'>
              <div className='waterTracker_info'>
                <div>
                  <p>{t('common.day_average')}</p>
                  <p>
                    <span>2000</span>
                    {t('common.ml')}/{t('common.day')}
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
