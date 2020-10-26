import React, { useEffect } from 'react';
import { getTranslate } from 'utils';
import { connect } from 'react-redux';
import { userLogin } from 'store/actions';

// Components
import Button from 'components/common/Forms/Button';

import { ReactComponent as MealIcon } from 'assets/img/icons/meal-icon.svg';

const listFeatureImg = require('assets/img/features/list-feature.png');

const PlanReadyStep = ({
  registerData,
  stepTitlesDefault,
  setStepTitles,
  userLogin: userAuthLogin,
  history,
  localePhrases,
}: any) => {
  const t = (code: string, placeholders?: any) => getTranslate(localePhrases, code, placeholders);

  useEffect(() => {
    const currStepTitles = [...stepTitlesDefault];
    currStepTitles[0] = t('register.expect_step');
    currStepTitles[1] = t('register.step_confirm');
    currStepTitles[2] = t('register.ready_step');

    setStepTitles([...currStepTitles]);

    return () => {
      setStepTitles([...stepTitlesDefault]);
    };
  }, []);

  return (
    <div className='mt-xl-5 pt-xl-5 text-center'>
      <span
        className='diet-plan-feature-icon mb-5 d-none d-md-inline-block'
        style={{ backgroundImage: `url(${listFeatureImg})` }}
      />

      <h4 id='register_title_final_welcome' className='register_title mb-xl-4'>
        {t('register.plan_ready_title', { NAME: registerData.name })}
        `,`
      </h4>
      <h5 className='register_title mt-md-2'>{t('register.plan_ready_subtitle')}</h5>

      <div className='text-center mt-md-5 mt-4'>
        <Button
          style={{ maxWidth: '355px' }}
          color='primary'
          type='submit'
          size='lg'
          block
          onClick={() => {
            userAuthLogin(registerData.token);
            history.push('/after-signup');
          }}
        >
          <MealIcon className='mr-3' />
          {' '}
          {t('register.check_btn')}
        </Button>
      </div>
    </div>
  );
};

export default connect(null, { userLogin })(PlanReadyStep);
