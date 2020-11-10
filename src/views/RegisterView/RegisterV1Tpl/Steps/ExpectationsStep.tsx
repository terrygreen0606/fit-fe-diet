import React, { useEffect } from 'react';
import { getTranslate } from 'utils';
import moment from 'moment';

// Components
import DietExpectationsChart from 'components/DietExpectationsChart';
import Button from 'components/common/Forms/Button';

import { ReactComponent as AngleLeftIcon } from 'assets/img/icons/angle-left-icon.svg';

const ExpectationsStep = ({
  registerData,
  setRegisterView,
  localePhrases,
}: any) => {
  const { weight, weight_goal, predicted_date } = registerData;
  const I18N_MEASUREMENT = registerData.measurement === 'si' ? 'common.kg' : 'common.lbs';

  const t = (code: string, placeholders?: any) =>
    getTranslate(localePhrases, code, placeholders);

  const getPredictedDate = () => {
    let monthLocale = new Date(predicted_date * 1000).toLocaleString(window.navigator.language, { month: 'long' });
    monthLocale = monthLocale.charAt(0).toUpperCase() + monthLocale.slice(1);

    let predictedDate = null;

    if (moment(new Date(predicted_date * 1000)).format('YYYY') === moment().format('YYYY')) {
      predictedDate = moment(new Date(predicted_date * 1000)).format('DD');
    } else {
      predictedDate = moment(new Date(predicted_date * 1000)).format('DD YYYY');
    }

    return `${monthLocale} ${predictedDate}`;
  };

  return (
    <div className='register_v1_steps_content'>
      <AngleLeftIcon
        className='register_v1_back_icon'
        onClick={() => setRegisterView('NOT_EATING')}
      />

      <h3 className='mb-3 fw-regular'>{t('register.expect_title')}</h3>

      <h2 className='mb-xl-5 mb-3 fw-bold text-steel-blue'>
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
      />

      <div className='register_v1_submit'>
        <Button
          style={{ maxWidth: '355px' }}
          color='primary'
          type='submit'
          size='lg'
          block
          onClick={() => setRegisterView('JOIN_EMAIL')}
        >
          {t('button.continue')}
        </Button>
      </div>

      <p className='text-center mt-3'>{t('register.expectations.redirect_text')}</p>
    </div>
  );
};

export default ExpectationsStep;
