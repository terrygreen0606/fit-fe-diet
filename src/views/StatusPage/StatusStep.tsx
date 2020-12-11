import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import moment from 'moment';

import { getTranslate, getImagePath, convertTime, getLocaleByLang } from 'utils';
import { fetchUserStatus } from 'api';
import { routes } from 'constants/routes';
import { bmiStatus } from 'constants/bmiStatus';

import WithTranslate from 'components/hoc/WithTranslate';
import Button from 'components/common/Forms/Button';
import DietExpectationsChart from 'components/DietExpectationsChart';
import ContentLoading from 'components/hoc/ContentLoading';
import ProgressLine from 'components/common/ProgressLine';
import Logo from 'components/Logo';
import WeightCard from './WeightCard';

import './StatusStep.sass';

const StatusStep = ({
  localePhrases,
  afterSignupName,
  measurement,
  language,
  history,
}: any) => {
  // States
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>(null);

  const t = (code: string, placeholders?: any) =>
    getTranslate(localePhrases, code, placeholders);

  const getPredictedDate = () => {
    let monthLocale = convertTime(userData.predicted_date, language, { month: 'long' });
    monthLocale = monthLocale.charAt(0).toUpperCase() + monthLocale.slice(1);

    let predictedDate = null;

    if (moment(new Date(userData.predicted_date * 1000)).format('YYYY') === moment().format('YYYY')) {
      predictedDate = moment(new Date(userData.predicted_date * 1000)).format('DD');
    } else {
      predictedDate = moment(new Date(userData.predicted_date * 1000)).format('DD YYYY');
    }

    return `${monthLocale} ${predictedDate}`;
  };

  const getWeekdays = () => {
    const weekdays = [];
    for (let i = 0; i < 7; i++) {
      const today = new Date();
      today.setDate(today.getDate() + i);
      weekdays.push(today.toLocaleDateString(getLocaleByLang(language), { weekday: 'long' }));
    }
    return weekdays;
  };

  const navigateToWelcome = () => history.push(routes.registerWelcome);

  useEffect(() => {
    const footer = document.querySelector('.mainFooter_short');
    footer.classList.add('status-footer');
    fetchUserStatus().then((response) => {
      if (response.data.success && response.data.data) {
        setUserData(response.data.data);
      }
    }).catch(() => {
      setIsError(true);
      toast.error(t('common.error'));
    }).finally(() => setIsLoading(false));

    return () => {
      footer.classList.remove('status-footer');
    };
  }, []);

  return (
    <ContentLoading
      isLoading={isLoading}
      isError={isError}
      spinSize='lg'
    >
      {
        userData && (
          <div className='status-step text-left'>
            <div className='logo-in-status text-center mb-5 mt-4'>
              <Logo />
            </div>
            <ProgressLine
              className='register_v1_progress'
              width={98}
            />
            <h3 className='status-title mb-3 mt-5'>
              {t('status.currently.title')}
              <p>{t('status.current.title', { VALUE: bmiStatus(userData.bmi.type) })}</p>
            </h3>
            <h4 className='current-bmi'>
              {t('status.bmi.subtitle', { NAME: afterSignupName || '', VALUE: userData.bmi.value })}
              &nbsp;
              <span className='healthy-bmi m-0'>{t('status.bmi.desc')}</span>
            </h4>
            <p className='healthy-bmi m-0 mt-3 mb-5'>{t('status.help.desc')}</p>

            {
            userData.weight_goal && userData.weight &&
              (
                <div className='diet-chart-wrapper text-center mb-5 pt-4'>
                  <h2 className='prediction-text'>{t('status.will.desc')}</h2>
                  <div className='row no-gutters calendar-card justify-content-around align-items-center'>
                    <span>{ parseFloat(userData.weight_goal) - 2 }</span>
                    <span>{ parseFloat(userData.weight_goal) - 1 }</span>
                    <span className='target-weight'>{ parseFloat(userData.weight_goal)}</span>
                    <span>{ parseFloat(userData.weight_goal) + 1 }</span>
                    <span>{ parseFloat(userData.weight_goal) + 2 }</span>
                  </div>
                  <div className='measurement-date'>
                    <h3 className='measurement'>kg</h3>
                    <h3 className='prediction-date'>
                      {/* {t('status.by.desc')}
                      &nbsp; */}
                      {getPredictedDate()}
                    </h3>
                  </div>
                  <DietExpectationsChart
                    weight={userData.weight}
                    weightGoal={userData.weight_goal}
                    predictedDate={userData.predicted_date}
                    measurement={measurement}
                    localePhrases={localePhrases}
                  />
                </div>
              )
            }

            <div className='row my-5 no-gutters'>
              <div className='col-6'>
                <div className='status-card d-flex flex-column text-center align-items-center justify-content-center mt-1 mb-1 mr-2'>
                  <h1 className='m-0'>
                    <span className='average-value'>87</span>
                    <span className='average-unit'>%</span>
                  </h1>
                  <h3 className='average-title px-4 mt-0' dangerouslySetInnerHTML={{ __html: t('status.lost.desc') }}></h3>
                </div>
              </div>
              <div className='col-6'>
                <div className='status-card d-flex flex-column text-center align-items-center justify-content-center mt-1 mb-1 ml-2'>
                  <div className='week-calendar d-flex justify-content-between align-items-center'>
                    <span>{t('status.monday.subtitle')}</span>
                    <span>{t('status.tuesday.subtitle')}</span>
                    <span>{t('status.wednesday.subtitle')}</span>
                    <span>{t('status.thursday.subtitle')}</span>
                    <span>{t('status.friday.subtitle')}</span>
                    <span>{t('status.saturday.subtitle')}</span>
                    <span className='active-weekday'>{t('status.sunday.subtitle')}</span>
                  </div>
                  <h1 className='m-0'>
                    <span className='average-value'>
                      { userData.bmi.type > 0 ? '-' : '+' }
                      3
                    </span>
                    <span className='average-unit'>kg</span>
                  </h1>
                  <p className='after-week'>{t('status.after.desc')}</p>
                </div>
              </div>
            </div>

            <div className='text-center mt-4'>
              <Button
                color='primary-shadow'
                className='get-access-btn'
                onClick={() => navigateToWelcome()}
              >
                {t('status.access.button')}
              </Button>

              <h3 className='status-summary mt-5'>
                {t('status.summary.title')}
              </h3>
            </div>

            <div className='row mb-5 mt-3 no-gutters'>
              <div className='col-6'>
                <WeightCard bmiValue={userData.bmi.value} bmiType={userData.bmi.type} />
              </div>
              <div className='col-6'>
                <div className='status-card text-center d-flex flex-column justify-content-between align-items-center mt-1 ml-2 mb-3'>
                  <div className='mt-4'>
                    <div className='calorie-sub'>{t('status.calorie.subtitle')}</div>
                    <h3 className='calorie-value'>
                      {userData.calorie.min}
                      -
                      {userData.calorie.max}
                    </h3>
                    <h3 className='calorie-unit'>{t('status.calorie.unit')}</h3>
                  </div>
                  <img className='calorie-img' src={getImagePath('calorie.png')} alt='' />
                </div>
              </div>
              <div className='col-6 body-exchange-wrapper'>
                <div className='status-card d-flex justify-content-between flex-column align-items-center mt-3 mr-2 pt-4'>
                  <div className='body-exchange-txt'>{t('status.body.subtitle')}</div>
                  <img className='body-exchange-img' src={getImagePath('bodyexchange.png')} alt='' />
                  <div className='border-line first-line'></div>
                  <div className='border-line second-line'></div>
                  <div className='border-line third-line'></div>
                  <div className='d-block body-exchange-value'>
                    <p>-11%</p>
                    <p>-8%</p>
                    <p>-20%</p>
                    <p>-16%</p>
                  </div>
                </div>
              </div>
              <div className='col-6'>
                <div className='status-card d-flex flex-column justify-content-center align-items-center mt-3 ml-2'>
                  <h1 className='unique-food-title'>1000+</h1>
                  <img className='unique-food-img' src={getImagePath('uniquefood.png')} alt='' />
                  <p className='unique-food-text'>{t('status.food.subtitle')}</p>
                </div>
              </div>
            </div>

            <div className='supporters app-partners-list__wrap py-3'>
              <h5 className='app-partners-list__title text-center'>{t('status.diet.title')}</h5>

              <div className='app-partners-list'>
                <span
                  className='app-partners-list__item'
                  style={{ backgroundImage: `url(${t('lp.partners.img1')})` }}
                />
                <span
                  className='app-partners-list__item'
                  style={{ backgroundImage: `url(${t('lp.partners.img2')})` }}
                />
                <span
                  className='app-partners-list__item'
                  style={{ backgroundImage: `url(${t('lp.partners.img3')})` }}
                />
                <span
                  className='app-partners-list__item'
                  style={{ backgroundImage: `url(${t('lp.partners.img4')})` }}
                />
              </div>
            </div>

            <h3 className='promise-title my-5'>{t('status.promise.title')}</h3>
            <p className='promise-content mt-0 mb-5'>{t('status.promise.desc')}</p>
            <h4 className='promise-head m-0'>
              {t('status.head.title')}
              ,
            </h4>
            <h4 className='promise-name m-0'>{t('status.headname.title')}</h4>

            <div className='text-center mt-5'>
              <Button
                color='primary-shadow'
                className='get-access-btn'
                onClick={() => navigateToWelcome()}
              >
                {t('status.access.button')}
              </Button>
            </div>
          </div>
        )
      }
    </ContentLoading>
  );
};

export default WithTranslate(
  connect(
    (state: any) => ({
      afterSignupName: state.storage.afterSignupName,
      language: state.settings.language,
      measurement: state.settings.measurement,
    }),
    null,
  )(StatusStep),
);
