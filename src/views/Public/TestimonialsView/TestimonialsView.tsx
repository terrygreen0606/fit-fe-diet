import React from 'react';

import Button from 'components/common/Forms/Button';
import PricePlans from 'components/PricePlans';

import './TestimonialsView.sass';

import { ReactComponent as ArrowLeft } from 'assets/img/icons/angle-left-icon.svg';
import { ReactComponent as ArrowRight } from 'assets/img/icons/angle-right-icon.svg';

const TestimonialsView = () => {
  return (
    <div className='testimonials'>
      <div className='testimonials__welcome'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='mb-3 mb-lg-0 col-lg-6'>
              <div className='testimonials__slider'>
                <div className='testimonials__slider-slide active'>
                  <img
                    src='https://fitstg.s3.eu-central-1.amazonaws.com/maasikas.png'
                    alt=''
                  />
                  <div className='testimonials__slider-description'>
                    <h3 className='testimonials__slider-description-title'>
                      Maris Maasikas results
                    </h3>
                    <div className='testimonials__slider-description-button-wrap'>
                      <a
                        href=''
                        className='testimonials__slider-description-link'
                      >
                        See more
                      </a>
                    </div>
                  </div>
                </div>
                <div className='testimonials__slider-controls'>
                  <button className='testimonials__slider-controls-button'>
                    <ArrowLeft className='testimonials__slider-controls-button-icon' />
                  </button>
                  <button className='testimonials__slider-controls-button'>
                    <ArrowRight className='testimonials__slider-controls-button-icon' />
                  </button>
                </div>
              </div>
            </div>
            <div className='col-lg-6'>
              <div className='testimonials__welcome-description'>
                <h1 className='testimonials__welcome-description-title'>
                  Free access for the whole family
                </h1>
                <ul className='testimonials__welcome-description-list'>
                  <li className='testimonials__welcome-description-list-item'>
                    Your <span>personal nutrition program</span>, based on your
                    warnings.
                  </li>
                  <li className='testimonials__welcome-description-list-item'>
                    List of products to save time and money
                  </li>
                  <li className='testimonials__welcome-description-list-item'>
                    Over <span>200 recipes</span> just for you.
                  </li>
                </ul>
                <div className='testimonials__welcome-description-button-wrap'>
                  <Button
                    className='testimonials__welcome-description-button'
                    color='primary'
                  >
                    Register
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='testimonials__examples'>
        <div className='container'>
          <h3 className='testimonials__examples-title'>
            Successful weight loss
          </h3>
          <ul className='testimonials__examples-tabs'>
            <li className='testimonials__examples-tabs-item active'>
              Everything
            </li>
            <li className='testimonials__examples-tabs-item'>Up to 10 kg</li>
            <li className='testimonials__examples-tabs-item'>10 - 20 kg</li>
            <li className='testimonials__examples-tabs-item'>more 20 kg</li>
          </ul>
          <div className='testimonials__examples-list active'>
            <div className='testimonials__examples-list-item'>
              <div className='testimonials__examples-list-item-media'>
                <img
                  src='https://fitstg.s3.eu-central-1.amazonaws.com/kaidi_laan.png'
                  alt=''
                  className='testimonials__examples-list-item-media-img'
                />
                <div className='testimonials__examples-list-item-media-data'>
                  <div className='testimonials__examples-list-item-media-name'>
                    Kaidi Laan
                  </div>
                  <div className='testimonials__examples-list-item-media-parameters'>
                    <div className='testimonials__examples-list-item-media-parameters-item'>
                      21
                    </div>
                    <div className='testimonials__examples-list-item-media-parameters-item'>
                      84 kg start
                    </div>
                    <div className='testimonials__examples-list-item-media-parameters-item'>
                      result 60 kg
                    </div>
                  </div>
                </div>
              </div>
              <div className='testimonials__examples-list-item-description'>
                Kaidi kaotas Fitlap toitumiskava abil 24 üleliigset kilogrammi.
                Tegelikult alustas Kaidi toitumiskava jälgimist, siis kui ta oli
                9 kuud rase.
              </div>
            </div>
            <div className='testimonials__examples-list-item'>
              <div className='testimonials__examples-list-item-media'>
                <img
                  src='https://fitstg.s3.eu-central-1.amazonaws.com/kaidi_laan.png'
                  alt=''
                  className='testimonials__examples-list-item-media-img'
                />
                <div className='testimonials__examples-list-item-media-data'>
                  <div className='testimonials__examples-list-item-media-name'>
                    Kaidi Laan
                  </div>
                  <div className='testimonials__examples-list-item-media-parameters'>
                    <div className='testimonials__examples-list-item-media-parameters-item'>
                      21
                    </div>
                    <div className='testimonials__examples-list-item-media-parameters-item'>
                      84 kg start
                    </div>
                    <div className='testimonials__examples-list-item-media-parameters-item'>
                      result 60 kg
                    </div>
                  </div>
                </div>
              </div>
              <div className='testimonials__examples-list-item-description'>
                Kaidi kaotas Fitlap toitumiskava abil 24 üleliigset kilogrammi.
                Tegelikult alustas Kaidi toitumiskava jälgimist, siis kui ta oli
                9 kuud rase.
              </div>
            </div>
            <div className='testimonials__examples-list-item'>
              <div className='testimonials__examples-list-item-media'>
                <img
                  src='https://fitstg.s3.eu-central-1.amazonaws.com/kaidi_laan.png'
                  alt=''
                  className='testimonials__examples-list-item-media-img'
                />
                <div className='testimonials__examples-list-item-media-data'>
                  <div className='testimonials__examples-list-item-media-name'>
                    Kaidi Laan
                  </div>
                  <div className='testimonials__examples-list-item-media-parameters'>
                    <div className='testimonials__examples-list-item-media-parameters-item'>
                      21
                    </div>
                    <div className='testimonials__examples-list-item-media-parameters-item'>
                      84 kg start
                    </div>
                    <div className='testimonials__examples-list-item-media-parameters-item'>
                      result 60 kg
                    </div>
                  </div>
                </div>
              </div>
              <div className='testimonials__examples-list-item-description'>
                Kaidi kaotas Fitlap toitumiskava abil 24 üleliigset kilogrammi.
                Tegelikult alustas Kaidi toitumiskava jälgimist, siis kui ta oli
                9 kuud rase.
              </div>
            </div>
            <div className='testimonials__examples-list-item'>
              <div className='testimonials__examples-list-item-media'>
                <img
                  src='https://fitstg.s3.eu-central-1.amazonaws.com/kaidi_laan.png'
                  alt=''
                  className='testimonials__examples-list-item-media-img'
                />
                <div className='testimonials__examples-list-item-media-data'>
                  <div className='testimonials__examples-list-item-media-name'>
                    Kaidi Laan
                  </div>
                  <div className='testimonials__examples-list-item-media-parameters'>
                    <div className='testimonials__examples-list-item-media-parameters-item'>
                      21
                    </div>
                    <div className='testimonials__examples-list-item-media-parameters-item'>
                      84 kg start
                    </div>
                    <div className='testimonials__examples-list-item-media-parameters-item'>
                      result 60 kg
                    </div>
                  </div>
                </div>
              </div>
              <div className='testimonials__examples-list-item-description'>
                Kaidi kaotas Fitlap toitumiskava abil 24 üleliigset kilogrammi.
                Tegelikult alustas Kaidi toitumiskava jälgimist, siis kui ta oli
                9 kuud rase.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='testimonials__all-stories d-lg-none'>
          <Button
            color='primary'
            size='lg'
            className='testimonials__all-stories-btn'
          >
            See all stroies
          </Button>
        </div>
        <div className='testimonials__pagination d-none d-lg-flex'>
          <button className='testimonials__pagination-arrow testimonials__pagination-prev'>
            <ArrowLeft />
          </button>
          <button className='testimonials__pagination-count'>1</button>
          <button className='testimonials__pagination-count'>2</button>
          <button className='testimonials__pagination-count'>3</button>
          <button className='testimonials__pagination-count'>4</button>
          <button className='testimonials__pagination-count'>5</button>
          <button className='testimonials__pagination-count'>6</button>
          <button className='testimonials__pagination-arrow testimonials__pagination-next'>
            <ArrowRight />
          </button>
        </div>
        <div className='testimonials__tariff'>
          <h3 className='testimonials__tariff-title'>
            Choose a period and join
          </h3>
          <PricePlans />
        </div>
      </div>
    </div>
  );
};

export default TestimonialsView;
