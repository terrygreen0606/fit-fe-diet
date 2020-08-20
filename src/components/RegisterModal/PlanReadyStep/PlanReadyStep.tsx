import React, { useEffect } from 'react';
import { getTranslate } from 'utils';

// Components
import Button from 'components/common/Forms/Button';

import { ReactComponent as MealIcon } from 'assets/img/icons/meal-icon.svg';

const PlanReadyStep = (props: any) => {

  useEffect(() => {
    let currStepTitles = [...props.stepTitlesDefault];
    currStepTitles[1] = 'Ready to started';

    props.setStepTitles([...currStepTitles]);

    return () => {
      props.setStepTitles([...props.stepTitlesDefault]);
    };
  }, []);

  const t = (code: string) => getTranslate(props.localePhrases, code);

  return (
    <div className="mt-5 pt-5 text-center">
      <span className="diet-plan-feature-icon mb-5" style={{ backgroundImage: 'url(https://fitdev.s3.amazonaws.com/assets/pub/images/list-feature.png)' }} />

      <h4 className="mb-4 text-steel-blue">Your personalized meal plan is now ready!</h4>

      <div className="text-center mt-5">
        <Button
          style={{ width: '355px' }}
          color="secondary"
          type="submit"
          size="lg"
          onClick={() => props.setRegisterView('JOIN')}
        >
          <MealIcon className="mr-3" /> Check it
        </Button>
      </div>
    </div>
  );
};

export default PlanReadyStep;
