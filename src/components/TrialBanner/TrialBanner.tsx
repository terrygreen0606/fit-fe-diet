import React from 'react';

import './TrialBanner.sass';

import Button from 'components/common/Forms/Button';

const TrialBanner = () => {
  return (
    <>
     <div className='trial-banner'>
      <h1 className='trial-banner_title'>
        Nutrition plan 3 days free
      </h1>
      <ul className='trial-banner_list'>
        <li>
          Over healthy <span>690</span> recipes
        </li>
        <li>
          A shopping list that saves you time and money
        </li>
        <li>
          You can join the whole family in the plan
        </li>
      </ul>
      <div className='trial-banner_button-wrap'>
        <Button
          className='trial-banner_button'
          color='primary'
        >
          Register as an user
        </Button>
      </div>
    </div>
    </>
  );
};

export default TrialBanner;
