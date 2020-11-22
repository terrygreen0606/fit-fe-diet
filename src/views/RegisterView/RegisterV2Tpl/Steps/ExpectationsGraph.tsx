import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getTranslate, getLocaleByLang } from 'utils';
import moment from 'moment';

// Components
import DietExpectationsChart from 'components/DietExpectationsChart';
import Button from 'components/common/Forms/Button';

import '../RegisterV2Tpl.sass';

const ExpectationsGraph = ({
  registerData,
  setRegisterView,
  localePhrases,
  language,
}: any) => {
  const { weight, weight_goal, predicted_date } = registerData;
  const I18N_MEASUREMENT = registerData.measurement === 'si' ? 'common.kg' : 'common.lbs';

  const t = (code: string, placeholders?: any) =>
    getTranslate(localePhrases, code, placeholders);

  const getPredictedDate = () => {
    let monthLocale = new Date(predicted_date * 1000).toLocaleString(getLocaleByLang(language), { month: 'long' });
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
    <div className='text-center'>
      <h1 className='mb-xl-4 mb-2 fw-regular'>{t('register.expect_title')}</h1>

      <h2 className='mb-45 text-steel-blue fw-bold'>
        {t(I18N_MEASUREMENT, { COUNT: weight_goal })}
        {' '}
        {t('register.expect_date_by')}
        {' '}
        {getPredictedDate()}
      </h2>

      <DietExpectationsChart
        color='blue'
        weight={weight}
        weightGoal={weight_goal}
        predictedDate={predicted_date}
        measurement={registerData.measurement}
        localePhrases={localePhrases}
      />

      <div className='text-center mt-4'>
        <Button
          className='register_v2_btn'
          style={{ maxWidth: '355px' }}
          color='primary'
          type='submit'
          size='lg'
          block
          onClick={() => setRegisterView('CONFIRM_EMAIL')}
        >
          {t('button.continue')}
        </Button>
      </div>
    </div>
  );
};

export default connect(
  (state: any) => ({
    language: state.settings.language,
  }),
)(ExpectationsGraph);
