import React, { useEffect } from 'react';
import { getTranslate } from 'utils';
import { toast } from 'react-toastify';
import { getUserWeightPrediction } from 'api';

// Components
import LinearPreloader from 'components/common/LinearPreloader';

const PlanProgressStep = (props: any) => {

  useEffect(() => {
    let currStepTitles = [...props.stepTitlesDefault];
    currStepTitles[1] = 'Generating your meal plan...';

    props.setStepTitles([...currStepTitles]);

    if (props.registerData.goal === 0) {
      setTimeout(() => {
        props.setRegisterView('READY');        
      }, 2000);
    } else {
      getUserWeightPrediction({
        measurement: props.registerData.measurement,
        height: props.registerData.height,
        weight: props.registerData.weight,
        weight_goal: props.registerData.weight_goal,
        goal: props.registerData.goal
      }).then(response => {
        if (response.data && response.data.data) {
          props.setRegisterData({
            ...props.registerData,
            predicted_date: response.data.data.predicted_date
          });

          setTimeout(() => {
            props.setRegisterView('EXPECTATIONS');
          }, 1000);
        } else {
          toast.error('Error when loading weight expectations');  
        }
      }).catch(error => {
        toast.error('Error when loading weight expectations');
      });
    }

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
