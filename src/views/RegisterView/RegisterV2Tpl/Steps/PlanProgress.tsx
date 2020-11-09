import React, { useState, useEffect } from 'react';
import { getTranslate } from 'utils';
import { toast } from 'react-toastify';
import { getUserWeightPrediction } from 'api';

// Components
import LinearProgress from 'components/common/LinearProgress';

import '../RegisterV2Tpl.sass';

const PlanProgress = ({
  registerData,
  setRegisterData,
  setRegisterView,
  localePhrases,
}: any) => {
  const t = (code: string) => getTranslate(localePhrases, code);

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

    if (registerData.goal === 0) {
      setTimeout(() => {
        setRegisterView('CONFIRM');
      }, 10000);
    } else {
      getUserWeightPrediction({
        measurement: registerData.measurement,
        height: registerData.height,
        weight: registerData.weight,
        weight_goal: registerData.weight_goal,
        goal: registerData.goal,
      }).then((response) => {
        if (response.data && response.data.data) {
          setRegisterData({
            ...registerData,
            predicted_date: response.data.data.predicted_date,
          });

          setTimeout(() => {
            setRegisterView('EXPECTATIONS');
          }, 9000);
        } else {
          toast.error(t('register.weight_predict_error_msg'));
        }
      }).catch((error) => {
        toast.error(t('register.weight_predict_error_msg'));
      });
    }
  }, []);

  return (
    <div className='px-5'>
      <h1 className='mb-2 mb-xl-5 fw-regular'>{t('register.plan_progress_title')}</h1>
      <span className='site-logo mb-2 mb-xl-4' />
      <h3 className='register_v2_title'>{progressTitle}</h3>
      <LinearProgress color='green' />
    </div>
  );
};

export default PlanProgress;
