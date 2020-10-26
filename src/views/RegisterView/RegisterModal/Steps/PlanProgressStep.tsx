import React, { useState, useEffect } from 'react';
import { getTranslate } from 'utils';
import { toast } from 'react-toastify';
import { getUserWeightPrediction } from 'api';

// Components
import LinearPreloader from 'components/common/LinearPreloader';
import LinearProgress from 'components/common/LinearProgress';

const PlanProgressStep = (props: any) => {

  const t = (code: string) => getTranslate(props.localePhrases, code);

  const [progressTitle, setProgressTitle] = useState(t('register.plan_progress_descr1'));

  const getProgressTitlte = () => {
    setTimeout(() => {
      setProgressTitle(t('register.plan_progress_descr2'));
    }, 2500);

    setTimeout(() => {
      setProgressTitle(t('register.plan_progress_descr3'));
    }, 6000);
  };

  useEffect(() => {
    let currStepTitles = [...props.stepTitlesDefault];
    currStepTitles[0] = t('register.not_eating_step');
    currStepTitles[1] = t('register.plan_create_step');
    currStepTitles[2] = t('register.step_health');

    props.setStepTitles([...currStepTitles]);

    getProgressTitlte();

    if (props.registerData.goal === 0) {
      setTimeout(() => {
        props.setRegisterView('HEALTH_PROBLEMS');
      }, 10000);
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
          }, 9000);
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
    <div className="pt-xl-5 text-center">
      <h1 className="mb-2 mb-xl-5 fw-regular">{t('register.plan_progress_title')}</h1>

      <span className="site-logo mb-2 mb-xl-4" />

      <LinearProgress />
      
      {/*<LinearPreloader />*/}
      
      <br/>

      <p>{progressTitle}</p>
    </div>
  );
};

export default PlanProgressStep;
