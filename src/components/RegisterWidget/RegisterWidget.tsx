import React from 'react';

import './RegisterWidget.sass';

import Button from 'components/common/Forms/Button';

const RegisterWidget = () => {
  return (
    <>
     <div className='register-widget'>
      <h1 className='register-widget_title'>
        Nutrition plan 3 days free
      </h1>
      <ul className='register-widget_list'>
        <li className='register-widget_list-item'>
          Over healthy <span>690</span> recipes
        </li>
        <li className='register-widget_list-item'>
          A shopping list that saves you time and money
        </li>
        <li className='register-widget_list-item'>
          You can join the whole family in the plan
        </li>
      </ul>
      <div className='register-widget_button-wrap'>
        <Button
          className='register-widget_button'
          color='primary'
        >
          Register as an user
        </Button>
      </div>
    </div>
    </>
  );
};

export default RegisterWidget;
