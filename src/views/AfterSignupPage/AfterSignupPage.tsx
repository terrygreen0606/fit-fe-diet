import React from 'react';

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
            <div className="col-6"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AfterSignupPage;
