import React, { useEffect } from 'react';
import { getTranslate } from 'utils';

// Components
import Button from 'components/common/Forms/Button';

import { ReactComponent as MealIcon } from 'assets/img/icons/meal-icon.svg';

const PlanReadyStep = (props: any) => {

  const t = (code: string) => getTranslate(props.localePhrases, code);

  useEffect(() => {
    let currStepTitles = [...props.stepTitlesDefault];
    currStepTitles[1] = t('register.ready_step');

    props.setStepTitles([...currStepTitles]);

    return () => {
      props.setStepTitles([...props.stepTitlesDefault]);
    };
  }, []);

  return (
    <div className="mt-5 pt-5 text-center">
      <span className="diet-plan-feature-icon mb-5" style={{ backgroundImage: 'url(https://fitdev.s3.amazonaws.com/assets/pub/images/list-feature.png)' }} />

      <h4 className="mb-4 text-steel-blue">{t('register.plan_ready_title')}</h4>

      <div className="text-center mt-5">
        <Button
          style={{ width: '355px' }}
          color="secondary"
          type="submit"
          size="lg"
          onClick={() => props.setRegisterView('JOIN')}
        >
          <MealIcon className="mr-3" /> {t('register.check_btn')}
        </Button>
      </div>
    </div>
  );
};

export default PlanReadyStep;
