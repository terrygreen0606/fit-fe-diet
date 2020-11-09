import React, { useEffect } from 'react';
import { getTranslate } from 'utils';
import moment from 'moment';

// Components
import DietExpectationsChart from 'components/DietExpectationsChart';
import Button from 'components/common/Forms/Button';

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

    return `${monthLocale} ${moment(new Date(predicted_date * 1000)).format('DD')}`;
  };

  return (
    <div className='register_v1_steps_content'>
      <h5 className='mb-xl-4 mb-2 fw-regular'>{t('register.expect_title')}</h5>

      <h4 className='mb-xl-5 mb-3 text-steel-blue'>
        {t(I18N_MEASUREMENT, { COUNT: weight_goal })}
        {' '}
        {t('register.expect_date_by')}
        {' '}
        {getPredictedDate()}
      </h4>

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
          onClick={() => setRegisterView('JOIN')}
        >
          {t('button.continue')}
        </Button>
      </div>
    </div>
  );
};

export default ExpectationsStep;
