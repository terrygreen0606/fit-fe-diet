import React, { useState, useEffect } from 'react';
import { getTranslate } from 'utils';
import { toast } from 'react-toastify';
import { getUserWeightPrediction } from 'api';

// Components
import LinearProgress from 'components/common/LinearProgress';

import '../RegisterV2Tpl.sass';

const PlanProgress = (props: any) => {
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
        goal: props.registerData.goal,
      }).then((response) => {
        if (response.data && response.data.data) {
          props.setRegisterData({
            ...props.registerData,
            predicted_date: response.data.data.predicted_date,
          });

          setTimeout(() => {
            props.setRegisterView('HEALTH_PROBLEMS');
          }, 9000);
        } else {
          toast.error(t('register.weight_predict_error_msg'));
        }
      }).catch((error) => {
        toast.error(t('register.weight_predict_error_msg'));
      });
    }

    return () => {
      props.setStepTitles([...props.stepTitlesDefault]);
    };
  }, []);

  return (
    <div className='px-5'>
      <h5 className='mb-2 mb-xl-5 fw-regular'>{t('register.plan_progress_title')}</h5>
      <span className='site-logo mb-2 mb-xl-4' />
      <h3 className='register_v2tpl_title'>{progressTitle}</h3>
      <LinearProgress color="green" />
    </div>
  );
};

export default PlanProgress;
