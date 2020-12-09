import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import queryString from 'query-string';
import { toast } from 'react-toastify';

import { getTranslate, getImagePath, getLocaleByLang } from 'utils';
import { fetchUserStatus } from 'api';
import { routes } from 'constants/routes';
import { bmiStatus } from 'constants/bmiStatus';

import WithTranslate from 'components/hoc/WithTranslate';
import Button from 'components/common/Forms/Button';
import DietExpectationsChart from 'components/DietExpectationsChart';
import ContentLoading from 'components/hoc/ContentLoading';
import WeightCard from './WeightCard';

import './StatusStep.sass';

const StatusStep = ({
  afterSignupName,
  afterSignupWeight,
  afterSignupWeightGoal,
  afterSignupPredictDate,
  measurement,
  localePhrases,
}: any) => {
  // States
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [bmiValue, setBmiValue] = useState<number>(0);
  const [minCalorie, setMinCalorie] = useState<number>(0);
  const [maxCalorie, setMaxCalorie] = useState<number>(0);

  const t = (code: string, placeholders?: any) =>
    getTranslate(localePhrases, code, placeholders);

  useEffect(() => {
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
  }, []);

  return (
    <ContentLoading
      isLoading={isLoading}
      isError={isError}
      spinSize='lg'
    >
      <div className='status-step text-left'>
        <h3 className='status-title mb-3'>
          {t('status.currently.title')}
          <p>{t('status.current.title', { VALUE: bmiStatus(bmiValue) })}</p>
        </h3>
        <h4 className='current-bmi'>{t('status.bmi.subtitle', { NAME: afterSignupName, VALUE: bmiValue })}</h4>
        <p className='healthy-bmi m-0'>{t('status.bmi.desc')}</p>
        <p className='healthy-bmi m-0'>{t('status.help.desc')}</p>

        <DietExpectationsChart
          weight={afterSignupWeight}
          weightGoal={afterSignupWeightGoal}
          predictedDate={afterSignupPredictDate}
          measurement={measurement}
          localePhrases={localePhrases}
        />

        {/* <h3 className='mb-3 fw-regular'>{t('register.expect_title')}</h3> */}

        {/* <h2 className='mb-xl-5 mb-3 fw-bold text-steel-blue'>
          {t(I18N_MEASUREMENT, { COUNT: weight_goal })}
          {' '}
          {t('register.expect_date_by')}
          {' '}
          {getPredictedDate()}
        </h2>

        <DietExpectationsChart
          weight={weight}
          weightGoal={weight_goal}
          predictedDate={predicted_date}
          measurement={registerData.measurement}
          localePhrases={localePhrases}
        /> */}

        <div className='row my-5 no-gutters'>
          <div className='col-md-6 status-card d-flex flex-column text-center align-items-center justify-content-center'>
            <h1>
              <span className='average-value'>87</span>
              <span className='average-unit'>%</span>
            </h1>
            <h3 className='average-title px-4' dangerouslySetInnerHTML={{ __html: t('status.lost.desc') }}></h3>
          </div>
          <div className='col-md-6 status-card d-flex flex-column text-center align-items-center justify-content-center'>
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

        <div className='text-center mt-5'>
          <Button
            color='primary-shadow'
            className='get-access-btn'
          >
            {t('status.access.button')}
          </Button>

          <h3 className='status-summary my-5'>
            {t('status.summary.title')}
          </h3>
        </div>

        <div className='row my-5 no-gutters'>
          <div className='col-md-6 status-card p-0 text-right'>
            <WeightCard bmiValue={bmiValue} />
          </div>
          <div className='col-md-6 status-card p-0 text-center d-flex flex-column justify-content-between align-items-center'>
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
          <div className='col-md-6 status-card p-0 d-flex justify-content-between flex-column align-items-center'>
            <div className='body-exchange-txt mt-4'>{t('status.body.subtitle')}</div>
            <img className='body-exchange-img' src={getImagePath('bodyexchange.png')} alt='' />
          </div>
          <div className='col-md-6 status-card p-0 d-flex flex-column justify-content-center align-items-center'>
            <h1 className='unique-food-title'>1000+</h1>
            <img className='unique-food-img' src={getImagePath('uniquefood.png')} alt='' />
            <p className='unique-food-text'>{t('status.food.subtitle')}</p>
          </div>
        </div>

        <div className='supporters row justify-content-center align-items-center'>
          <h3 className='col-12 text-center my-5'>{t('status.diet.title')}</h3>
          <div className='col-4'>
            <img className='supporter-img' src={t('lp.supporters.img1')} alt='' />
          </div>
          <div className='col-4'>
            <img className='supporter-img' src={t('lp.supporters.img2')} alt='' />
          </div>
          <div className='col-4'>
            <img className='supporter-img' src={t('lp.supporters.img3')} alt='' />
          </div>
          <div className='col-4'>
            <img className='supporter-img' src={t('lp.supporters.img4')} alt='' />
          </div>
          <div className='col-4'>
            <img className='supporter-img' src={t('lp.supporters.img5')} alt='' />
          </div>
          <div className='col-4'>
            <img className='supporter-img' src={t('lp.supporters.img6')} alt='' />
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
    }),
    null,
  )(StatusStep),
);
