import React, { useState } from 'react';

// Components
import RegisterModal from 'components/RegisterModal';
import Button from 'components/common/Forms/Button';

import './MainView.sass';

import { ReactComponent as LikeIcon } from 'assets/img/icons/like-icon.svg';

const MainView = () => {
  
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

  return (
    <>
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setRegisterModalOpen(false)}
      />
      
      <section className="main-header-sect">
        <div className="container">
          <div className="row">
            <div className="col-6">
              
              <h2 className="mb-3">Personal<br/>diet plan</h2>
              <p>sulle ja su perele sulle ja su perelesulle ja su perelesulle ja su perelesulle ja su perelesulle ja su perelesulle ja su perelesulle ja su perelesulle ja su perele</p>

              <Button className="mt-4" color="primary" onClick={() => setRegisterModalOpen(true)}>Register</Button>

            </div>
            <div className="col-6">
              
              <div className="main-header-sect-img-wrap">
                <span id="main-header-sect-rect"></span>
                <span id="main-header-sect-dotted-rect"></span>

                <img src="https://fitstg.s3.eu-central-1.amazonaws.com/food-serving-img-2.png" alt="" id="main-header-sect-food-img1" />
                <img src="https://fitstg.s3.eu-central-1.amazonaws.com/food-serving-img-1.png" alt="" id="main-header-sect-food-img2" />
              </div>

            </div>
          </div>
        </div>
      </section>

      <section className="main-features-sect">
        <div className="container">
          <div className="row">
            <div className="col-3">
              
              <div className="main-features-sect-img-wrap">
                <span id="main-features-sect-rect"></span>
                <span id="main-features-sect-dotted-rect"></span>

                <img src="https://fitstg.s3.eu-central-1.amazonaws.com/sport-woman.png" alt="" id="main-features-sect-img" />
              </div>

            </div>
            <div className="col-9">
              
              <h4 className="sect-title">Lose weight with quick easy recipes</h4>
              <p>Eating is the most important thing to get in shape. When you eat healthily and are physically active, your weight is under control and your health improves. When you eat according to the simple and delicious recipes of Fitlap, you will feel healthy and fresh.</p>

              <h4 className="my-5">Features</h4>

              <div className="main-diet-plan-feature-list">
                <div className="main-diet-plan-feature-list-item">
                  <span className="main-diet-plan-feature-icon" style={{ backgroundImage: `url('https://fitstg.s3.eu-central-1.amazonaws.com/nutrition-feature.png')` }}></span>

                  <div className="main-diet-plan-feature-content">
                    <h4 className="mb-3">Personal nutrition plan</h4>
                    <p>With Fitlap you dont have to give up on any of your favourite foods!</p>
                  </div>
                </div>

                <div className="main-diet-plan-feature-list-item">
                  <span className="main-diet-plan-feature-icon" style={{ backgroundImage: `url('https://fitstg.s3.eu-central-1.amazonaws.com/list-feature.png')` }}></span>

                  <div className="main-diet-plan-feature-content">
                    <h4 className="mb-3">Simple grocery list</h4>
                    <p>You can create your own grocery list for shopping.</p>
                  </div>
                </div>

                <div className="main-diet-plan-feature-list-item">
                  <span className="main-diet-plan-feature-icon" style={{ backgroundImage: `url('https://fitstg.s3.eu-central-1.amazonaws.com/graph-feature.png')` }}></span>

                  <div className="main-diet-plan-feature-content">
                    <h4 className="mb-3">Goal tracking toitumiskava</h4>
                    <p>Track your goals and meal plan statistics.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section className="main-success-stories-sect">
        <div id="main-success-stories-sect-container" className="container">
          <h4 className="sect-title">Success stories</h4>

          <div className="row">
            <div className="col-3">
              
              <div className="main-success-story-item">
                <div className="main-success-story-item-img" style={{ backgroundImage: `url('https://fitstg.s3.eu-central-1.amazonaws.com/sport-woman-gym.jpg')` }}></div>
                
                <h6 className="main-success-story-item-name">Jaanika Paimre, 47</h6>
                
                <div className="main-success-story-item-content">
                  <h6 className="main-success-story-item-title">-38kg with plan</h6>
                  <p className="main-success-story-item-descr">Jaanika is a 47-year-old mother of five children who lost 38 extra pounds and 104 cmi of her whole body with the help of a diet plan.</p>
                </div>
              </div>

            </div>
            <div className="col-3">
              
              <div className="main-success-story-item">
                <div className="main-success-story-item-img" style={{ backgroundImage: `url('https://fitstg.s3.eu-central-1.amazonaws.com/sport-woman-gym.jpg')` }}></div>
                
                <h6 className="main-success-story-item-name">Jaanika Paimre, 47</h6>
                
                <div className="main-success-story-item-content">
                  <h6 className="main-success-story-item-title">-38kg with plan</h6>
                  <p className="main-success-story-item-descr">Jaanika is a 47-year-old mother of five children who lost 38 extra pounds and 104 cmi of her whole body with the help of a diet plan.</p>
                </div>
              </div>

            </div>
            <div className="col-3">
              
              <div className="main-success-story-item">
                <div className="main-success-story-item-img" style={{ backgroundImage: `url('https://fitstg.s3.eu-central-1.amazonaws.com/sport-woman-gym.jpg')` }}></div>
                
                <h6 className="main-success-story-item-name">Jaanika Paimre, 47</h6>
                
                <div className="main-success-story-item-content">
                  <h6 className="main-success-story-item-title">-38kg with plan</h6>
                  <p className="main-success-story-item-descr">Jaanika is a 47-year-old mother of five children who lost 38 extra pounds and 104 cmi of her whole body with the help of a diet plan.</p>
                </div>
              </div>

            </div>
            <div className="col-3">
              
              <div className="main-success-story-item">
                <div className="main-success-story-item-img" style={{ backgroundImage: `url(https://fitstg.s3.eu-central-1.amazonaws.com/sport-woman-gym.jpg)` }}></div>
                
                <h6 className="main-success-story-item-name">Jaanika Paimre, 47</h6>
                
                <div className="main-success-story-item-content">
                  <h6 className="main-success-story-item-title">-38kg with plan</h6>
                  <p className="main-success-story-item-descr">Jaanika is a 47-year-old mother of five children who lost 38 extra pounds and 104 cmi of her whole body with the help of a diet plan.</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <Button color="primary"><LikeIcon className="mr-2" /> Get started</Button>
        </div>
      </section>

      <section className="main-choose-plan-sect">
        <div id="main-choose-plan-sect-container" className="container">
          <h4 className="sect-title title-center">Choose a period and join</h4>

          <div className="row">
            <div className="col-4">
              
              <div className="main-choose-plan-item">
                <h6 className="main-choose-plan-item-period">6 months</h6>

                <div className="main-choose-plan-item-price">
                  <span className="main-choose-plan-item-price-text">6.33€</span>
                  <span className="main-choose-plan-item-price-paycycle">/ mon</span>
                </div>

                <h6 className="main-choose-plan-item-price-total">Together 75.99€</h6>

                <div className="main-choose-plan-item-features-list">
                  <div className="main-choose-plan-item-features-list-item">Your <b>personal nutrition program,</b> based on your warnings</div>
                  <div className="main-choose-plan-item-features-list-item">List of products to save time and money</div>
                </div>

                <Button className="mt-5" color="secondary" outline block>Subscribe</Button>
              </div>

            </div>
            <div className="col-4">
              
              <div id="main-choose-plan-item-popular" className="main-choose-plan-item">
                <span id="main-choose-plan-item-popular-label">                  
                  <div className="ribbon ribbon-top-right"><span>Popular</span></div>
                </span>

                <h6 className="main-choose-plan-item-period">12 months</h6>

                <div className="main-choose-plan-item-price">
                  <span className="main-choose-plan-item-price-text">6.33€</span>
                  <span className="main-choose-plan-item-price-paycycle">/ mon</span>
                </div>

                <h6 className="main-choose-plan-item-price-total">Together 75.99€</h6>

                <div className="main-choose-plan-item-features-list">
                  <div className="main-choose-plan-item-features-list-item">Your <b>personal nutrition program,</b> based on your warnings</div>
                  <div className="main-choose-plan-item-features-list-item">List of products to save time and money</div>
                  <div className="main-choose-plan-item-features-list-item">Over <b>200 recipes</b> just for you</div>
                </div>

                <Button className="mt-5" color="secondary" block>Subscribe</Button>
              </div>

            </div>
            <div className="col-4">
              
              <div className="main-choose-plan-item">
                <h6 className="main-choose-plan-item-period">3 months</h6>

                <div className="main-choose-plan-item-price">
                  <span className="main-choose-plan-item-price-text">6.33€</span>
                  <span className="main-choose-plan-item-price-paycycle">/ mon</span>
                </div>

                <h6 className="main-choose-plan-item-price-total">Together 75.99€</h6>

                <div className="main-choose-plan-item-features-list">
                  <div className="main-choose-plan-item-features-list-item">Your <b>personal nutrition program,</b> based on your warnings</div>
                </div>

                <Button className="mt-5" color="secondary" outline block>Subscribe</Button>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MainView;
