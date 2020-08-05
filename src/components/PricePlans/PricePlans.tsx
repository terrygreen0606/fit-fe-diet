import React from 'react';

import Button from 'components/common/Forms/Button';

import './PricePlans.sass';

const PricePlans = () => {
  return (
    <div className='row'>
      <div className='mb-5 mb-lg-0 col-lg-4'>
        <div className='price-plans-item'>
          <h6 className='price-plans-item-period'>6 months</h6>

          <div className='price-plans-item-price'>
            <span className='price-plans-item-price-text'>6.33€</span>
            <span className='price-plans-item-price-paycycle'>/ mon</span>
          </div>

          <h6 className='price-plans-item-price-total'>Together 75.99€</h6>

          <div className='price-plans-item-features-list'>
            <div className='price-plans-item-features-list-item'>
              Your <b>personal nutrition program,</b> based on your warnings
            </div>
            <div className='price-plans-item-features-list-item'>
              List of products to save time and money
            </div>
          </div>

          <Button className='mt-5' color='secondary' outline block>
            Subscribe
          </Button>
        </div>
      </div>
      <div className='mb-5 mb-lg-0 col-lg-4'>
        <div id='price-plans-item-popular' className='price-plans-item'>
          <span id='price-plans-item-popular-label'>
            <div className='ribbon ribbon-top-right'>
              <span>Popular</span>
            </div>
          </span>

          <h6 className='price-plans-item-period'>12 months</h6>

          <div className='price-plans-item-price'>
            <span className='price-plans-item-price-text'>6.33€</span>
            <span className='price-plans-item-price-paycycle'>/ mon</span>
          </div>

          <h6 className='price-plans-item-price-total'>Together 75.99€</h6>

          <div className='price-plans-item-features-list'>
            <div className='price-plans-item-features-list-item'>
              Your <b>personal nutrition program,</b> based on your warnings
            </div>
            <div className='price-plans-item-features-list-item'>
              List of products to save time and money
            </div>
            <div className='price-plans-item-features-list-item'>
              Over <b>200 recipes</b> just for you
            </div>
          </div>

          <Button className='mt-5' color='secondary' block>
            Subscribe
          </Button>
        </div>
      </div>
      <div className='mb-5 mb-lg-0 col-lg-4'>
        <div className='price-plans-item'>
          <h6 className='price-plans-item-period'>3 months</h6>

          <div className='price-plans-item-price'>
            <span className='price-plans-item-price-text'>6.33€</span>
            <span className='price-plans-item-price-paycycle'>/ mon</span>
          </div>

          <h6 className='price-plans-item-price-total'>Together 75.99€</h6>

          <div className='price-plans-item-features-list'>
            <div className='price-plans-item-features-list-item'>
              Your <b>personal nutrition program,</b> based on your warnings
            </div>
          </div>

          <Button className='mt-5' color='secondary' outline block>
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PricePlans;
