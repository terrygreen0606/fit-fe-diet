import React, { useState } from 'react';
import Helmet from 'react-helmet';

import { routes } from 'constants/routes';
import { getTranslate } from 'utils';

// Components
import DonutChart from 'components/common/charts/DonutChart';
import LineChart from 'components/common/charts/LineChart';
import Button from 'components/common/Forms/Button';
import CustomRadio from 'components/common/Forms/CustomRadio';
import SelectInput from 'components/common/Forms/SelectInput';
import WithTranslate from 'components/hoc/WithTranslate';
import Breadcrumb from 'components/Breadcrumb';

import './WeightGraphicsPage.sass';

import { ReactComponent as ImagePlusIcon } from 'assets/img/icons/image-plus-icon.svg';
import { ReactComponent as RewardIcon } from 'assets/img/icons/reward-icon.svg';
import { ReactComponent as WeighScaleIcon } from 'assets/img/icons/weigh-scale-icon.svg';
import { ReactComponent as PlusIcon } from 'assets/img/icons/plus-icon.svg';
import { ReactComponent as CalendarIcon } from 'assets/img/icons/calendar-icon.svg';

const periodOptions = [
  { value: 'all', label: 'Whole period' },
  { value: 'year', label: 'Last year' },
  { value: 'month', label: 'Last month' },
  { value: 'week', label: 'Last week' },
];

const chartData = {
  labels: ['19.06.20', '19.06.20', '19.06.20', '19.06.20', '19.06.20'],
  datasets: [
    {
      label: 'Weight',
      fill: false,
      lineTension: 0.5,
      pointRadius: 7,
      backgroundColor: '#106EE8',
      borderColor: '#5B9DFF',
      borderWidth: 2,
      data: [55, 57, 80, 81, 56],
    },
    {
      label: 'Purpose',
      fill: false,
      lineTension: 0.5,
      pointRadius: 7,
      backgroundColor: '#BCFFC5',
      borderColor: '#CDFFD3',
      borderWidth: 2,
      data: [155, 47, 20, 231, 56],
    },
  ],
};

const WeightGraphicsPage = (props: any) => {
  const t = (code: string, placeholders?: any) =>
    getTranslate(props.localePhrases, code, placeholders);

  const [dietStatisticsType, setDietStatisticsType] = useState('weight');
  const [dietStatisticsPeriod, setDietStatisticsPeriod] = useState(
    periodOptions[0]
  );

  return (
    <>
      <Helmet>
        <title>{t('app.title.weight_graphic')}</title>
      </Helmet>
      <section className='weight-graphics-page'>
        <div className='container'>
          <Breadcrumb
            routes={[
              {
                url: routes.main,
                name: t('breadcrumb.main'),
              },
              {
                url: routes.nutritionPlan,
                name: t('app.title.nutrition_plan'),
              },
            ]}
            currentPage={t('nutrition_weights.title')}
          />
          <div className='row'>
            <div className='weight-graphics-page-graph-col'>
              <div className='text-center'>
                <CustomRadio
                  label='Weight'
                  value='weight'
                  inline
                  checked={dietStatisticsType === 'weight'}
                  onChange={(e) => setDietStatisticsType(e.target.value)}
                />

                <CustomRadio
                  label='Dimensions'
                  value='dimensions'
                  inline
                  checked={dietStatisticsType === 'dimensions'}
                  onChange={(e) => setDietStatisticsType(e.target.value)}
                />
              </div>

              <div className='mt-3 text-right'>
                <SelectInput
                  value={dietStatisticsPeriod}
                  options={periodOptions}
                  onChange={setDietStatisticsPeriod}
                />
              </div>

              <div className='weight-graphics-graph-container mt-4'>
                <WeighScaleIcon className='weight-graphics-graph-weigh-icon' />
                <CalendarIcon className='weight-graphics-graph-calendar-icon' />

                <LineChart data={chartData} />
              </div>

              <div className='weight-change-history-table mt-5'>
                <div className='weight-change-history-table-row'>
                  <div className='weight-change-history-table-cell'>60kg</div>
                  <div className='weight-change-history-table-cell'>
                    June 19, 2020
                  </div>
                  <div className='weight-change-history-table-cell'>
                    <span className='link link-blue'>Weight day</span>
                  </div>
                  <div className='weight-change-history-table-cell'>Change</div>
                </div>

                <div className='weight-change-history-table-row'>
                  <div className='weight-change-history-table-cell'>60kg</div>
                  <div className='weight-change-history-table-cell'>
                    June 19, 2020
                  </div>
                  <div className='weight-change-history-table-cell'>
                    <span className='link link-blue'>Weight day</span>
                  </div>
                  <div className='weight-change-history-table-cell'>Change</div>
                </div>

                <div className='weight-change-history-table-row'>
                  <div className='weight-change-history-table-cell'>60kg</div>
                  <div className='weight-change-history-table-cell'>
                    June 19, 2020
                  </div>
                  <div className='weight-change-history-table-cell'>
                    Weight day
                    <PlusIcon className='weight-graphics-plus-icon ml-2' />
                  </div>
                  <div className='weight-change-history-table-cell'>Change</div>
                </div>
              </div>

              <div className='mt-5 text-right'>
                <Button color='secondary'>Delete scales</Button>
              </div>
            </div>
            <div className='weight-graphics-page-stat-col'>
              <div className='weight-graph-card card-bg'>
                <DonutChart
                  className='mx-4'
                  percent={50}
                  content={
                    <div className='text-center'>
                      <h5>5 kg</h5>
                      <p>lost</p>
                    </div>
                  }
                />

                <Button className='mt-5 px-2' block color='secondary'>
                  Add today&apos;s weight
                </Button>
                <Button className='mt-4 px-2' block color='secondary' outline>
                  <ImagePlusIcon className='mr-2' /> Add selfie
                </Button>
                <Button className='mt-4 px-2' block color='secondary' outline>
                  <RewardIcon className='mr-2' /> Change the goal
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WithTranslate(WeightGraphicsPage);
