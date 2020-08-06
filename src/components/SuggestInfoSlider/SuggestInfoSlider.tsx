import React from 'react';

import './SuggestInfoSlider.sass';

import { ReactComponent as ArrowLeft } from 'assets/img/icons/angle-left-icon.svg';
import { ReactComponent as ArrowRight } from 'assets/img/icons/angle-right-icon.svg';

const SuggestInfoSlider = () => {
  return (
    <>
      <div className="suggest-info-slider">
        <img
          className="suggest-info-slider_img"
          src='https://fitstg.s3.eu-central-1.amazonaws.com/maasikas.png'
          alt=""
        />
        <div className='suggest-info-slider_description'>
          <h3 className='suggest-info-slider_description-title'>
            Maris Maasikas results
          </h3>
          <div className='suggest-info-slider_description-wrap-button'>
            <a
              href=''
              className='suggest-info-slider_description-button'
            >
              See more
            </a>
          </div>
        </div>
        <div className='suggest-info-slider_controls'>
          <button className='suggest-info-slider_controls-button'>
            <ArrowLeft className='suggest-info-slider_controls-icon' />
          </button>
          <button className='suggest-info-slider_controls-button'>
            <ArrowRight className='suggest-info-slider_controls-icon' />
          </button>
        </div>
      </div>
    </>
  );
};

export default SuggestInfoSlider;
