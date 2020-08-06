import React from 'react';

import Button from 'components/common/Forms/Button';

import './WeightLossFilters.sass';

const WeightLossFilters = () => {
  return (
    <>
      <h3 className='weight-loss-filter_title'>
        Successful weight loss
      </h3>
      <ul className='weight-loss-filter_tabs'>
        <li className='weight-loss-filter_tabs-item active'>
          Everything
        </li>
        <li className='weight-loss-filter_tabs-item'>Up to 10 kg</li>
        <li className='weight-loss-filter_tabs-item'>10 - 20 kg</li>
        <li className='weight-loss-filter_tabs-item'>more 20 kg</li>
      </ul>
    </>
  );
};

export default WeightLossFilters;
