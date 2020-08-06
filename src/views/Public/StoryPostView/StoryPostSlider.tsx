import React from 'react';

import './StoryPostView.sass';

import { ReactComponent as ArrowLeft } from 'assets/img/icons/angle-left-icon.svg';
import { ReactComponent as ArrowRight } from 'assets/img/icons/angle-right-icon.svg';
import { ReactComponent as StarIcon } from 'assets/img/icons/star-yellow-icon.svg';
import { ReactComponent as MarkerIcon } from 'assets/img/icons/marker-place-icon.svg';

const StoryPostSlider = () => {
  return (
    <>
      <div className="story-post-slider">
        <img
          className="story-post-slider_img"
          src="https://fitstg.s3.eu-central-1.amazonaws.com/kaidi_laan.png" alt=""
        />
        <div className="story-post-slider_user">
          <div className="story-post-slider_user-name"> 
            <h4>
              Kaidi Laan
            </h4>
            <div className='story-post-slider_user-name_rate'>
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
            </div>
          </div>
          <div className='story-post-slider_user-place'>
            <MarkerIcon />
            <p>Paris, France</p>
          </div>
          
          <div className="story-post-slider_user-info">
            <div className="story-post-slider_user-info_item">21</div>
            <div className="story-post-slider_user-info_item">84 kg start</div>
            <div className="story-post-slider_user-info_item">result 60 kg</div>
          </div>

          <div className='story-post-slider_controls'>
            <button className='story-post-slider_controls-button'>
              <ArrowLeft className='story-post-slider_controls-icon' />
            </button>
            <button className='story-post-slider_controls-button'>
              <ArrowRight className='story-post-slider_controls-icon' />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StoryPostSlider;
