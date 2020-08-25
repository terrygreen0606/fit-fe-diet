import React, { useEffect } from 'react';
import { getTranslate } from 'utils';
import { toast } from 'react-toastify';
import { getUserWeightPrediction } from 'api';

// Components
import LinearPreloader from 'components/common/LinearPreloader';

const PlanProgressStep = (props: any) => {

  const t = (code: string) => getTranslate(props.localePhrases, code);

  useEffect(() => {
    let currStepTitles = [...props.stepTitlesDefault];
    currStepTitles[0] = t('register.not_eating_step');
    currStepTitles[1] = t('register.plan_create_step');
    currStepTitles[2] = t('register.expect_step');

    props.setStepTitles([...currStepTitles]);

    if (props.registerData.goal === 0) {
      setTimeout(() => {
        props.setRegisterView('HEALTH_PROBLEMS');
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
            props.setRegisterView('HEALTH_PROBLEMS');
          }, 1000);
        } else {
          toast.error(t('register.weight_predict_error_msg'));
        }
      }).catch(error => {
        toast.error(t('register.weight_predict_error_msg'));
      });
    }

    return () => {
      props.setStepTitles([...props.stepTitlesDefault]);
    };
  }, []);

  return (
    <div className="pt-5 text-center">
      <h5 className="mb-5 fw-regular">{t('register.plan_progress_title')}</h5>

      <span className="site-logo mb-4" />
      
      <LinearPreloader />
      
      <br/>

      <p>{t('register.plan_progress_descr1')}</p>
      <p>{t('register.plan_progress_descr2')}</p>
    </div>
  );
};

export default PlanProgressStep;
