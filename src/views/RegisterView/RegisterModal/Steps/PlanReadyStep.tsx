import React, { useEffect } from 'react';
import { getTranslate } from 'utils';
import { connect } from 'react-redux';
import { userLogin } from 'store/actions';

// Components
import Button from 'components/common/Forms/Button';

import { ReactComponent as MealIcon } from 'assets/img/icons/meal-icon.svg';

const PlanReadyStep = (props: any) => {

  const t = (code: string, placeholders?: any) => getTranslate(props.localePhrases, code, placeholders);

  useEffect(() => {
    let currStepTitles = [...props.stepTitlesDefault];
    currStepTitles[0] = t('register.expect_step');
    currStepTitles[1] = t('register.step_confirm');
    currStepTitles[2] = t('register.ready_step');

    props.setStepTitles([...currStepTitles]);

    return () => {
      props.setStepTitles([...props.stepTitlesDefault]);
    };
  }, []);

  return (
    <div className="mt-xl-5 pt-xl-5 text-center">
      <span className="diet-plan-feature-icon mb-5 d-none d-md-inline-block" style={{ backgroundImage: 'url(https://fitdev.s3.amazonaws.com/assets/pub/images/list-feature.png)' }} />

      <h4 id="register_title_final_welcome" className="register_title mb-xl-4">{t('register.plan_ready_title', { first_name: props.registerData.name })},</h4>
      <h5 className="register_title mt-md-2">{t('register.plan_ready_subtitle')}</h5>

      <div className="text-center mt-md-5 mt-4">
        <Button
          style={{ maxWidth: '355px' }}
          color="primary"
          type="submit"
          size="lg"
          block
          onClick={e => props.userLogin(props.registerData.token)}
        >
          <MealIcon className="mr-3" /> {t('register.check_btn')}
        </Button>
      </div>
    </div>
  );
};

export default connect(null, { userLogin })(PlanReadyStep);
