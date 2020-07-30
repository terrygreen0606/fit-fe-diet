import React, { useState } from 'react';

// Components
import DoughnutSingleChart from 'components/common/charts/DoughnutSingleChart';
import LineChart from 'components/common/charts/LineChart';
import Button from 'components/common/Forms/Button';
import CustomRadio from 'components/common/Forms/CustomRadio';
import SelectInput from 'components/common/Forms/SelectInput';

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
  { value: 'week', label: 'Last week' }
];

const chartData = {
  labels: ["19.06.20", "19.06.20", "19.06.20", "19.06.20", "19.06.20"],
  datasets: [
    {
      label: "Weight",
      fill: false,
      lineTension: 0.5,
      pointRadius: 7,
      backgroundColor: "#106EE8",
      borderColor: "#D8E6FB",
      borderWidth: 2,
      data: [55, 57, 80, 81, 56],
    },
    {
      label: "Purpose",
      fill: false,
      lineTension: 0.5,
      pointRadius: 7,
      backgroundColor: "#BCFFC5",
      borderColor: "#CDFFD3",
      borderWidth: 2,
      data: [155, 47, 20, 231, 56],
    },
  ],
};

const WeightGraphicsPage = () => {

  const [dietStatisticsType, setDietStatisticsType] = useState('weight');

  return (
    <>
      <CustomRadio 
        label="Weight" 
        value="weight" 
        inline 
        checked={dietStatisticsType === 'weight'} 
        onChange={e => setDietStatisticsType(e.target.value)}
      />

      <CustomRadio 
        label="Dimensions" 
        value="dimensions" 
        inline 
        checked={dietStatisticsType === 'dimensions'} 
        onChange={e => setDietStatisticsType(e.target.value)}
      />

      <div className="weight-change-history-table">
        <div className="weight-change-history-table-row">
          <div className="weight-change-history-table-cell">60kg</div>
          <div className="weight-change-history-table-cell">June 19, 2020</div>
          <div className="weight-change-history-table-cell">Weight day</div>
          <div className="weight-change-history-table-cell">Change</div>
        </div>

        <div className="weight-change-history-table-row">
          <div className="weight-change-history-table-cell">60kg</div>
          <div className="weight-change-history-table-cell">June 19, 2020</div>
          <div className="weight-change-history-table-cell">Weight day</div>
          <div className="weight-change-history-table-cell">Change</div>
        </div>

        <div className="weight-change-history-table-row">
          <div className="weight-change-history-table-cell">60kg</div>
          <div className="weight-change-history-table-cell">June 19, 2020</div>
          <div className="weight-change-history-table-cell">Weight day</div>
          <div className="weight-change-history-table-cell">Change</div>
        </div>
      </div>

      <div style={{ padding: '100px' }}><SelectInput value={periodOptions[0]} options={periodOptions} /></div>

      <div className="card-bg">
        <DoughnutSingleChart percent={50} />

        <Button className="mt-5" color="primary">Add today's weight</Button>
        <Button className="mt-3" color="primary" outline><ImagePlusIcon className="mr-2" /> Add selfie</Button>
        <Button className="mt-3" color="primary" outline><RewardIcon className="mr-2" /> Change the goal</Button>
      </div>

      <WeighScaleIcon />
      <CalendarIcon />

      <LineChart data={chartData} />

      <Button color="primary">Delete scales</Button>
    </>
  );
};

export default WeightGraphicsPage;
