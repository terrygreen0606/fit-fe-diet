import React, { useEffect } from 'react';
import { getTranslate } from 'utils';

// Components
import LinearPreloader from 'components/common/LinearPreloader';

const PlanProgressStep = (props: any) => {

  useEffect(() => {
    let currStepTitles = [...props.stepTitlesDefault];
    currStepTitles[1] = 'Generating your meal plan...';

    props.setStepTitles([...currStepTitles]);

    setTimeout(() => {
      props.setRegisterView('EXPECTATIONS');
    }, 3000);

    return () => {
      props.setStepTitles([...props.stepTitlesDefault]);
    };
  }, []);

  const t = (code: string) => getTranslate(props.localePhrases, code);

  return (
    <div className="pt-5 text-center">
      <h5 className="mb-5 fw-regular">Based on your answer...</h5>

      <span className="site-logo mb-4" />
      
      <LinearPreloader />
      
      <br/>

      <p>Sit tight!</p>
      <p>We are building your perfect plan based on ansers.</p>
    </div>
  );
};

export default PlanProgressStep;
