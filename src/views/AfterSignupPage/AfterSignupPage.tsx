import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { getTranslate } from 'utils';
import { getImagePath } from 'utils';

// Components
import WithTranslate from 'components/hoc/WithTranslate';
import Button from 'components/common/Forms/Button';
import CountDown from 'components/common/CountDown';
import RawCountDown from 'components/common/RawCountDown';
import SliderSimple from 'components/common/SliderSimple';
import Accordeon from 'components/common/Accordeon';
import LineChart from 'components/common/charts/LineChart';

import { data as chartData, options as chartOptions } from './expectationsChartConfig';

import './AfterSignupPage.sass';

import { ReactComponent as StarFillIcon } from 'assets/img/icons/star-fill-icon.svg';

const AfterSignupPage = (props: any) => {

  const { afterSignupWeight, afterSignupWeightGoal, afterSignupPredictDate } = props;

  const t = (code: string) => getTranslate(props.localePhrases, code);

  const getChartLabels = () => {
    return [
      moment(new Date()).format('MM.DD.YYYY'), 
      moment(new Date()).format('MM.DD.YYYY'),
      moment(new Date(afterSignupPredictDate * 1000)).format('MM.DD.YYYY'),
      moment(new Date(afterSignupPredictDate * 1000)).format('MM.DD.YYYY'),
      moment(new Date(afterSignupPredictDate * 1000)).format('MM.DD.YYYY')
    ];
  };

  const getChartData = () => {
    return [
      Number(afterSignupWeight), 
      Number(afterSignupWeight), 
      Number(afterSignupWeightGoal) / 2.2, 
      Number(afterSignupWeightGoal) / 2.2, 
      Number(afterSignupWeightGoal) / 2.2, 
      Number(afterSignupWeightGoal) / 2.2, 
      Math.max(Number(afterSignupWeightGoal), Number(afterSignupWeight)) * 1.7
    ];
  };

  const getChartCommonData = () => {
    return {
      ...chartData,
      labels: getChartLabels(),
      datasets: [{
        ...chartData.datasets[0],
        data: getChartData()
      }, {
        borderColor: '#CDCDCD',
        borderWidth: 2,
        backgroundColor: 'transparent',
        data: [
          Number(afterSignupWeight) * 1.05,
          Number(afterSignupWeight) * 1.1,
          Number(afterSignupWeight) * 0.8,
          Number(afterSignupWeight) * 0.99,
          Number(afterSignupWeight) * 0.8,
        ]
      }]
    };
  };

  const getChartCommonOptions = () => {
    return {
      ...chartOptions,
      tooltips: {
        ...chartOptions.tooltips,
        callbacks: {
          title: function(tooltipItem, data) {
            if (tooltipItem.length > 0) {
              if (tooltipItem[0].datasetIndex > 0) {
                return null;
              }

              if (tooltipItem[0].index === 1) {
                return 'Today';
              } else if (tooltipItem[0].index === 3) {
                return getShortDate(tooltipItem[0].label);
              } else {
                return null;
              }
            } else {
              return null;
            }
          },
          label: function(tooltipItem, data) {
            return null;
          }
        }
      }
    };
  };

  const getShortDate = (dateStr: string) => {
    let monthLocale = new Date(dateStr).toLocaleString(window.navigator.language, { month: 'short' });
    monthLocale = monthLocale.charAt(0).toUpperCase() + monthLocale.slice(1);

    return `${moment(new Date(dateStr)).format('DD')} ${monthLocale}`;
  };

  return (
    <>
      <section className="after-signup-header-sect">
        <div className="container">
          <div className="row">
            <div className="col-6 after-signup-header-content-col">
              
              <h3>Good news #Name#!</h3>
              <h4 className="mt-5">We have created a custom diet plan to help you <span className="text-malachite-green">lose up to 25kg, with no effort at all. It has been reserved for</span></h4>

              <div className="text-center mt-5">
                <CountDown seconds={900} />
                <h4 className="fw-regular mt-5">Discover your personaliezed Fitlope plan for <del>$29/mon</del> <b>only 1$ for 14 days!</b></h4>
                <Button color="primary-shadow" className="mt-3">Reveal my plan now!</Button>
                <img className="after-signup-header-arrow" src={getImagePath('point-arrow-yellow.png')} alt="" />
              </div>

            </div>
            <div className="col-6 after-signup-header-chart-col">

              <div>
                <div className="after-signup__expectations_chart-wrap">
                  <span className="after-signup__expectations_chart-standart-plan-label">Standart diet plan</span>
                  <span className="after-signup__expectations_chart-fitlope-plan-label">Your custom <span className="text-steel-blue">Fitlope</span> plan</span>

                  <LineChart 
                    className="after-signup__expectations_chart"
                    data={getChartCommonData()} 
                    options={getChartCommonOptions()}
                  />
                </div>
                
                <div className="app-review-single-item">
                  <div className="app-review-single-item_img_wrap">
                    <span className="app-review-single-item_img" style={{ backgroundImage: `url(${getImagePath('review-author-img.png')})` }} />
                  </div>
                  
                  <div className="app-review-single-item_content">
                    <p className="app-review-single-item_descr">“Fitlope is the best way to gat in shape without disturbing your natural metabolic processes.”</p>
                    <div className="app-review-single-item_footer">
                      <div className="rate-stars_list">
                        <StarFillIcon className="rate-stars_item" />
                        <StarFillIcon className="rate-stars_item" />
                        <StarFillIcon className="rate-stars_item" />
                        <StarFillIcon className="rate-stars_item" />
                        <StarFillIcon className="rate-stars_item" />
                      </div>
                      <h6 className="app-review-single-item_author"><b>- Jenna Wlkins</b>, Fitlope user</h6>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section className="after-signup-intro-sect">
        <div className="container">
          <div className="row">
            <div className="col-6 text-right">
              
              <img src={getImagePath('register/expectations_step.png')} alt="" className="img-fluid flip-x" />

            </div>
            <div className="col-6 after-signup-intro-content-col">

              <h5>As seen on</h5>

              <div className="app-partners-list">
                <span className="app-partners-list__item" style={{ backgroundImage: `url(${getImagePath('partners/daily-mirror.png')})` }} />
                <span className="app-partners-list__item" style={{ backgroundImage: `url(${getImagePath('partners/forbes.png')})` }} />
                <span className="app-partners-list__item" style={{ backgroundImage: `url(${getImagePath('partners/modesto.png')})` }} />
              </div>
              
              <h4>What if you could drop excess kilos without difficult exercises or rigorous diets?</h4>
              <p className="mt-3">Exercising takes so much energy. And expensive gym equipment.</p>
              <p className="mt-3">The other way to lose afterSignupWeight is with rigorous diets, that often give you on results all. Plus, not everyone can afford to the time it takes to train or plan what to eat next.</p>

              <img className="after-signup-intro-arrow" src={getImagePath('point-arrow-black.png')} alt="" />

              <h4 className="mt-5">With Fitlope, there’s no training, no dieting, no planning.</h4>
              <p className="mt-3">Just easy improvement in your lifestyle that’ll help you get <b>fitter and healthier.</b></p>
              <p className="mt-3">Your <b>personalized</b> fitness program was designed by an Artifical Intelligence software, with years of natrional and medical experience built into it.</p>
              <p className="mt-3">That means you can <b>achieve the same (if not better) results with Fitlope</b> that you’d achieve training and dieting combined.</p>

            </div>
          </div>
        </div>
      </section>

      <section className="after-signup-reviews-sect">
        <div className="container">
          <div className="row">
            <div className="col-4 offset-2 py-5">
              
              <h4>Build your dream body-Without getting off your couch</h4>

              <h5 className="fw-regular mt-5">If you could carve out body, what would it like?</h5>
              <h5 className="fw-regular mt-4">Would you be the guy catching attention of all the women in th room?</h5>
              <h5 className="fw-regular mt-4">Would you be the girl all guys turn around for?</h5>

              <h5 className="mt-4">Fitlope gives you nutritional habits you need to acheve that body.</h5>

            </div>
            <div className="col-5 offset-1">

              <SliderSimple
                className="app-reviews-slider app-reviews-slider--1"
                dots
                autoplay
                slides={[
                  (
                    <div className="app-reviews-slider__item">
                      <div className="app-reviews-slider__item_img" style={{ backgroundImage: `url(${getImagePath('review-img.png')})` }} />
                      <div className="app-reviews-slider__item_content">
                        <p className="app-reviews-slider__item_descr">1 I’m realised with my Fitlope transformation. I lost 30kgin 3 month just by changing my eating habbits.</p>
                        <h6 className="app-reviews-slider__item_author">Janet K., Fitlope user</h6>
                      </div>
                    </div>
                  ),
                  (
                    <div className="app-reviews-slider__item">
                      <div className="app-reviews-slider__item_img" style={{ backgroundImage: `url(${getImagePath('review-img.png')})` }} />
                      <div className="app-reviews-slider__item_content">
                        <p className="app-reviews-slider__item_descr">2 I’m realised with my Fitlope transformation. I lost 30kgin 3 month just by changing my eating habbits.</p>
                        <h6 className="app-reviews-slider__item_author">Janet K., Fitlope user</h6>
                      </div>
                    </div>
                  ),
                  (
                    <div className="app-reviews-slider__item">
                      <div className="app-reviews-slider__item_img" style={{ backgroundImage: `url(${getImagePath('review-img.png')})` }} />
                      <div className="app-reviews-slider__item_content">
                        <p className="app-reviews-slider__item_descr">3 I’m realised with my Fitlope transformation. I lost 30kgin 3 month just by changing my eating habbits.</p>
                        <h6 className="app-reviews-slider__item_author">Janet K., Fitlope user</h6>
                      </div>
                    </div>
                  )
                ]}
              />  

            </div>
          </div>
        </div>
      </section>

      <section className="after-signup-faq-sect">
        <div className="container">
          <div className="row">
            <div className="col-5">

              <SliderSimple
                className="app-reviews-slider app-reviews-slider--2"
                nav
                autoplay
                slides={[
                  (
                    <div className="app-reviews-slider__item">
                      <div className="app-reviews-slider__item_img" style={{ backgroundImage: `url(${getImagePath('review-author-img.png')})` }} />
                      <p className="app-reviews-slider__item_descr">1 Fitlope is the best way to gat in shape without disturbing your natural metabolic processes.</p>
                      <h6 className="app-reviews-slider__item_author">Janet K., Fitlope user</h6>
                    </div>
                  ),
                  (
                    <div className="app-reviews-slider__item">
                      <div className="app-reviews-slider__item_img" style={{ backgroundImage: `url(${getImagePath('review-author-img.png')})` }} />
                      <p className="app-reviews-slider__item_descr">2 Fitlope is the best way to gat in shape without disturbing your natural metabolic processes.</p>
                      <h6 className="app-reviews-slider__item_author">Janet K., Fitlope user</h6>
                    </div>
                  ),
                  (
                    <div className="app-reviews-slider__item">
                      <div className="app-reviews-slider__item_img" style={{ backgroundImage: `url(${getImagePath('review-author-img.png')})` }} />
                      <p className="app-reviews-slider__item_descr">3 Fitlope is the best way to gat in shape without disturbing your natural metabolic processes.</p>
                      <h6 className="app-reviews-slider__item_author">Janet K., Fitlope user</h6>
                    </div>
                  )
                ]}
              />

            </div>
            <div className="col-6 offset-1">
              
              <h4 className="mb-45">Programs vetted by word’s top nutricionists & medical experts</h4>

              <Accordeon
                items={[
                  {
                    title: 'Frequantly asked question 1',
                    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum eum, velit nesciunt assumenda, soluta enim, tempore, quae veniam ipsum et a excepturi laboriosam. Veritatis molestiae tenetur soluta quos ipsum necessitatibus!'
                  },
                  {
                    title: 'Frequantly asked question 2',
                    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum eum, velit nesciunt assumenda, soluta enim, tempore, quae veniam ipsum et a excepturi laboriosam. Veritatis molestiae tenetur soluta quos ipsum necessitatibus!'
                  },
                  {
                    title: 'Frequantly asked question 3',
                    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum eum, velit nesciunt assumenda, soluta enim, tempore, quae veniam ipsum et a excepturi laboriosam. Veritatis molestiae tenetur soluta quos ipsum necessitatibus!'
                  },
                ]}
              />

            </div>
          </div>
        </div>
      </section>

      <section className="after-signup-expect-sect">
        <div className="container">
          <div className="row">
            <div className="col-6">
              
              <h4 className="mb-5">Transform your body with little to no work at all</h4>

              <div className="app-advantages-list">
                <div className="app-advantages-list__item">Discover your personal Fitlope nutritional  program</div>
                <div className="app-advantages-list__item">Follow your personalprogram and track progress with the mobile app</div>
                <div className="app-advantages-list__item">Sustain afterSignupWeight by maintaining your new healthy eating habits</div>
              </div>

            </div>
            <div className="col-6">
              
              <div className="after-signup__expectations_chart-wrap">
                <span className="after-signup__expectations_chart-standart-plan-label">Standart diet plan</span>
                <span className="after-signup__expectations_chart-fitlope-plan-label">Your custom <span className="text-steel-blue">Fitlope</span> plan</span>

                <LineChart 
                  className="after-signup__expectations_chart"
                  data={getChartCommonData()} 
                  options={getChartCommonOptions()}
                />
              </div>

            </div>
            <div className="col-12 mt-5 pt-5">
              
              <div className="row">
                <div className="col-6">
                  
                  <div className="money-back-guarantee-block">
                    <h5 className="money-back-guarantee-block__title">You are safe: 100% Money Back guarantee</h5>
                    <p className="money-back-guarantee-block__descr">You're about to order something on the Internet, so, let us put you at ease. We've put an incredible amount of time and effort into ensuring the safest and most effective way to help you change their</p>
                  </div>

                </div>
                <div className="col-6">
                  
                  <img src={getImagePath('safe-checkout-img.png')} className="img-fluid" alt="" />

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>  

      <section className="after-signup-start-today-sect">
        <div className="container pb-5">
          <div className="row">
            <div className="col-6 offset-3 after-signup-start-today-col text-center">
              
              <h4 className="sect-title title-center">Start building your dream body today! </h4>

              <h4 className="fw-regular mt-5">Discover your personalized Fitlope plan for <del>$29/mon</del><b>only 1$ for 14 days!</b></h4>

              <Button color="primary-shadow" className="mt-5">Reveal my plan now!</Button>

              <img className="after-signup-start-today-arrow" src={getImagePath('point-arrow-yellow.png')} alt="" />

              <div className="product-plants-one-tree-block mt-5">
                <p>With te purchaise of this product we will plant one thee to secure the future. <b>One month- One more tree</b></p>
              </div>

            </div>
          </div>
        </div>

        <section className="after-signup-reserved-block">
          <div className="container">
            <div className="row">
              <div className="col-12">
                
                <h4 className="after-signup-reserved-block__title">Custom plan reserved for <span className="after-signup__bottom_countdown"><RawCountDown seconds={900} /></span></h4>

              </div>
            </div>
          </div>
        </section>
      </section>  
    </>
  );
};

export default WithTranslate(
  connect(
    (state: any) => ({
      afterSignupWeight: state.auth.userData.afterSignupWeight,
      afterSignupWeightGoal: state.auth.userData.afterSignupWeightGoal,
      afterSignupPredictDate: state.auth.userData.afterSignupPredictDate
    }), 
    null
  )(AfterSignupPage)
);
