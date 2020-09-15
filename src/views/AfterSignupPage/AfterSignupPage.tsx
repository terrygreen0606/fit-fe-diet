import React from 'react';

// Components
import Button from 'components/common/Forms/Button';

import './AfterSignupPage.sass';

const AfterSignupPage = (props: any) => {
  return (
    <>
      <section className="after-signup-header-sect">
        <div className="container">
          <div className="row">
            <div className="col-6">
              
              <h3>Good news #Name#!</h3>
              <p>We have  created a custom diet plan to help you lose up to 25kg, with noeffort at all. It has been reserved for</p>

            </div>
            <div className="col-6"></div>
          </div>
        </div>
      </section>

      <section className="after-signup-intro-sect">
        <div className="container">
          <div className="row">
            <div className="col-6">
              
              <img src={require('assets/img/register/expectations_step.png')} alt="" className="img-fluid" />

            </div>
            <div className="col-6">
              
              <h4>What if you could drop excess kilos without difficult exercises or rigorous diets?</h4>
              <p>Exercising takes so much energy. And expensive gym equipment.</p>
              <p>The other way to lose weight is with rigorous diets, that often give you on results all. Plus, not everyone can afford to the time it takes to train or plan what to eat next.</p>

              <h4>With Fitlope, there’s no training, no dieting, no planning.</h4>
              <p>Just easy improvement in your lifestyle that’ll help you get <b>fitter and healthier.</b></p>
              <p>Your <b>personalized</b> fitness program was designed by an Artifical Intelligence software, with years of natrional and medical experience built into it.</p>
              <p>That means you can <b>achieve the same (if not better) results with Fitlope</b> that you’d achieve training and dieting combined.</p>

            </div>
          </div>
        </div>
      </section>

      <section className="after-signup-reviews-sect">
        <div className="container">
          <div className="row">
            <div className="col-6">
              
              <h4>Build your dream body-Without getting off your couch</h4>

              <p>If you could carve out body, what would it like?</p>
              <p>Would you be the guy catching attention of all the women in th room?</p>
              <p>Would you be the girl all guys turn around for?</p>

              <h5>Fitlope gives you nutritional habits you need to acheve that body.</h5>

            </div>
            <div className="col-6">
              
              <div className="after-signup-reviews-slider">
                <div className="after-signup-reviews-slider__item">
                  <div className="after-signup-reviews-slider__item--img"></div>
                  <p className="after-signup-reviews-slider__item--descr">I’m realised with my Fitlope transformation. I lost 30kgin 3 month just by changing my eating habbits.</p>
                  <h6 className="after-signup-reviews-slider__item--author">Janet K., Fitlope user</h6>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section className="after-signup-faq-sect">
        <div className="container">
          <div className="row">
            <div className="col-6">
              
              <div className="after-signup-faq-reviews-slider">
                <div className="after-signup-faq-reviews-slider__controls">
                  <span className="after-signup-faq-reviews-slider__controls--nav">prev</span>
                  <span className="after-signup-faq-reviews-slider__controls--nav">next</span>
                </div>

                <div className="after-signup-faq-reviews-slider__item">
                  <div className="after-signup-faq-reviews-slider__item--img"></div>
                  <p className="after-signup-faq-reviews-slider__item--descr"></p>
                  <h6 className="after-signup-faq-reviews-slider__item--author"></h6>
                </div>
              </div>

            </div>
            <div className="col-6">
              
              <h4>Programs vetted by word’s top nutricionists & medical experts</h4>

              <div className="accordion-container">
                <div className="accordion-item">
                  <div className="accordion-item-head">Frequantly asked question 1</div>
                  <div className="accordion-item-content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum eum, velit nesciunt assumenda, soluta enim, tempore, quae veniam ipsum et a excepturi laboriosam. Veritatis molestiae tenetur soluta quos ipsum necessitatibus!</div>
                </div>

                <div className="accordion-item">
                  <div className="accordion-item-head">Frequantly asked question 1</div>
                  <div className="accordion-item-content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum eum, velit nesciunt assumenda, soluta enim, tempore, quae veniam ipsum et a excepturi laboriosam. Veritatis molestiae tenetur soluta quos ipsum necessitatibus!</div>
                </div>

                <div className="accordion-item">
                  <div className="accordion-item-head">Frequantly asked question 1</div>
                  <div className="accordion-item-content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum eum, velit nesciunt assumenda, soluta enim, tempore, quae veniam ipsum et a excepturi laboriosam. Veritatis molestiae tenetur soluta quos ipsum necessitatibus!</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section className="after-signup-expect-sect">
        <div className="container">
          <div className="row">
            <div className="col-6">
              
              <h4>Transform your body with little to no work at all</h4>

              <div className="advantages-list">
                <div className="advantages-list-item">Discover your personal Fitlope nutritional  program</div>
                <div className="advantages-list-item">Follow your personalprogram and track progress with the mobile app</div>
                <div className="advantages-list-item">Sustain weight by maintaining your new healthy eating habits</div>
              </div>

            </div>
            <div className="col-6"></div>
          </div>
        </div>
      </section>  

      <section className="after-signup-start-today-sect">
        <div className="container">
          <div className="row">
            <div className="col-12">
              
              <h4 className="sect-title">Start building your dream body today! </h4>

              <p><b>only 1$ for 14 days!</b></p>

              <Button color="primary">Reveal my plan now!</Button>

            </div>
          </div>
        </div>
      </section>  
    </>
  );
};

export default AfterSignupPage;
