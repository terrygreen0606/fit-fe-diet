import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import moment from 'moment';

import { getTranslate, getImagePath, convertTime } from 'utils';
import { fetchUserStatus } from 'api';
import { routes } from 'constants/routes';
import { bmiStatus } from 'constants/bmiStatus';

import WithTranslate from 'components/hoc/WithTranslate';
import Button from 'components/common/Forms/Button';
import DietExpectationsChart from 'components/DietExpectationsChart';
import ContentLoading from 'components/hoc/ContentLoading';
import Logo from 'components/Logo';
import WeightCard from './WeightCard';

import './StatusStep.sass';

const StatusStep = ({
  isAfterSignup,
  afterSignupName,
  afterSignupWeight,
  afterSignupWeightGoal,
  afterSignupPredictDate,
  measurement,
  localePhrases,
  language,
  history,
}: any) => {
  // States
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [bmiValue, setBmiValue] = useState<number>(0);
  const [minCalorie, setMinCalorie] = useState<number>(0);
  const [maxCalorie, setMaxCalorie] = useState<number>(0);

  const t = (code: string, placeholders?: any) =>
    getTranslate(localePhrases, code, placeholders);

  const getPredictedDate = () => {
    let monthLocale = convertTime(afterSignupPredictDate, language, { month: 'long' });
    monthLocale = monthLocale.charAt(0).toUpperCase() + monthLocale.slice(1);

    let predictedDate = null;

    if (moment(new Date(afterSignupPredictDate * 1000)).format('YYYY') === moment().format('YYYY')) {
      predictedDate = moment(new Date(afterSignupPredictDate * 1000)).format('DD');
    } else {
      predictedDate = moment(new Date(afterSignupPredictDate * 1000)).format('DD YYYY');
    }

    return `${monthLocale} ${predictedDate}`;
  };

  const navigateToWelcome = () => history.push(routes.registerWelcome);

  useEffect(() => {
    if (isAfterSignup) {
      fetchUserStatus().then((response) => {
        if (response.data.success && response.data.data) {
          setBmiValue(response.data.data.bmi.value);
          setMinCalorie(response.data.data.calorie.min);
          setMaxCalorie(response.data.data.calorie.max);
        }
      }).catch(() => {
        setIsError(true);
        toast.error(t('common.error'));
      }).finally(() => setIsLoading(false));
    } else {
      history.push(routes.login);
    }
  }, []);

  return (
    <ContentLoading
      isLoading={isLoading}
      isError={isError}
      spinSize='lg'
    >
      <div className='status-step text-left'>
        <div className='logo-in-status text-center'>
          <Logo />
        </div>
        <h3 className='status-title mb-3'>
          {t('status.currently.title')}
          <p>{t('status.current.title', { VALUE: bmiStatus(bmiValue) })}</p>
        </h3>
        <h4 className='current-bmi'>{t('status.bmi.subtitle', { NAME: afterSignupName, VALUE: bmiValue })}</h4>
        <p className='healthy-bmi m-0'>{t('status.bmi.desc')}</p>
        <p className='healthy-bmi m-0 mb-5'>{t('status.help.desc')}</p>

        <div className='text-center mb-5'>
          <h2 className='prediction-text'>{t('status.will.desc')}</h2>
          <div className='row no-gutters calendar-card justify-content-around align-items-center'>
            <span>{ parseFloat(afterSignupWeightGoal) - 2 }</span>
            <span>{ parseFloat(afterSignupWeightGoal) - 1 }</span>
            <span className='target-weight'>{ parseFloat(afterSignupWeightGoal)}</span>
            <span>{ parseFloat(afterSignupWeightGoal) + 1 }</span>
            <span>{ parseFloat(afterSignupWeightGoal) + 2 }</span>
          </div>
          <h3 className='measurement'>kg</h3>
          <h3 className='prediction-date'>
            {t('status.by.desc')}
            &nbsp;
            {getPredictedDate()}
          </h3>
        </div>

        <DietExpectationsChart
          weight={afterSignupWeight}
          weightGoal={afterSignupWeightGoal}
          predictedDate={afterSignupPredictDate}
          measurement={measurement}
          localePhrases={localePhrases}
        />

        <div className='row my-5 no-gutters'>
          <div className='col-md-6'>
            <div className='status-card d-flex flex-column text-center align-items-center justify-content-center mt-1 mb-1 mr-2'>
              <h1>
                <span className='average-value'>87</span>
                <span className='average-unit'>%</span>
              </h1>
              <h3 className='average-title px-4' dangerouslySetInnerHTML={{ __html: t('status.lost.desc') }}></h3>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='status-card d-flex flex-column text-center align-items-center justify-content-center mt-1 mb-1 ml-2'>
              <h1>
                <span className='average-value'>
                  { parseFloat(afterSignupWeight) > parseFloat(afterSignupWeightGoal) ? '-' : '' }
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

          <h3 className='status-summary my-5'>
            {t('status.summary.title')}
          </h3>
        </div>

        <div className='row my-5 no-gutters'>
          <div className='col-md-6'>
            <WeightCard bmiValue={bmiValue} />
          </div>
          <div className='col-md-6'>
            <div className='status-card text-center d-flex flex-column justify-content-between align-items-center mt-2 ml-2 mb-3'>
              <div className='mt-4'>
                <div className='calorie-sub'>{t('status.calorie.subtitle')}</div>
                <h3 className='calorie-value'>
                  {minCalorie}
                  -
                  {maxCalorie}
                </h3>
                <h3 className='calorie-unit'>{t('status.calorie.unit')}</h3>
              </div>
              <img className='calorie-img' src={getImagePath('calorie.png')} alt='' />
            </div>
          </div>
          <div className='col-md-6'>
            <div className='status-card d-flex justify-content-between flex-column align-items-center mt-3 mr-2'>
              <div className='body-exchange-txt mt-4'>{t('status.body.subtitle')}</div>
              <img className='body-exchange-img' src={getImagePath('bodyexchange.png')} alt='' />
            </div>
          </div>
          <div className='col-md-6'>
            <div className='status-card d-flex flex-column justify-content-center align-items-center mt-3 ml-2'>
              <h1 className='unique-food-title'>1000+</h1>
              <img className='unique-food-img' src={getImagePath('uniquefood.png')} alt='' />
              <p className='unique-food-text'>{t('status.food.subtitle')}</p>
            </div>
          </div>
        </div>

        <div className='supporters row justify-content-center align-items-center py-5'>
          <h3 className='col-12 text-center mb-5'>{t('status.diet.title')}</h3>
          <div className='col-md-3 col-sm-6'>
            <img className='supporter-img' src={t('lp.partners.img1')} alt='' />
          </div>
          <div className='col-md-3 col-sm-6'>
            <img className='supporter-img' src={t('lp.partners.img2')} alt='' />
          </div>
          <div className='col-md-3 col-sm-6'>
            <img className='supporter-img' src={t('lp.partners.img3')} alt='' />
          </div>
          <div className='col-md-3 col-sm-6'>
            <img className='supporter-img' src={t('lp.partners.img4')} alt='' />
          </div>
        </div>

        <h3 className='promise-title my-5'>{t('status.promise.title')}</h3>
        <p className='promise-title mt-0 mb-3'>{t('status.promise.desc')}</p>
        <h4 className='promise-name m-0'>
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
    </ContentLoading>
  );
};

export default WithTranslate(
  connect(
    (state: any) => ({
      isAfterSignup: state.storage.isAfterSignup,
      afterSignupName: state.storage.afterSignupName,
      afterSignupWeight: state.storage.afterSignupWeight,
      afterSignupWeightGoal: state.storage.afterSignupWeightGoal,
      afterSignupPredictDate: state.storage.afterSignupPredictDate,
      measurement: state.storage.measurement,
      language: state.settings.language,
    }),
    null,
  )(StatusStep),
);
