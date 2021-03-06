import React, { useState, useEffect } from 'react';
import { getTranslate } from 'utils';
import { toast } from 'react-toastify';
import { getUserWeightPrediction } from 'api';

// Components
import LinearProgress from 'components/common/LinearProgress';

const PlanProgressStep = ({
  registerData,
  setRegisterData,
  setRegisterView,
  localePhrases,
}: any) => {
  const t = (code: string) =>
    getTranslate(localePhrases, code);

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
        setRegisterView('EXPECTATIONS');
      }, 10000);
    } else {
      const {
        measurement,
        height,
        weight,
        weight_goal,
        goal,
      } = registerData;

      getUserWeightPrediction({
        measurement,
        height,
        weight,
        weight_goal,
        goal,
      }).then(({ data }) => {
        if (data.success && data.data) {
          setRegisterData({
            ...registerData,
            predicted_date: data.data.predicted_date,
          });

          setTimeout(() => {
            setRegisterView('EXPECTATIONS');
          }, 9000);
        } else {
          toast.error(t('register.weight_predict_error_msg'));
        }
      }).catch(() => {
        toast.error(t('register.weight_predict_error_msg'));
      });
    }
  }, []);

  return (
    <div className='register_v1_steps_content'>
      <h4 className='mb-2 mb-xl-5 fw-bold'>{t('register.plan_progress_title')}</h4>

      <span className='site-logo mb-2 mb-xl-4' />

      <LinearProgress />

      <br />

      <p>{progressTitle}</p>
    </div>
  );
};

export default PlanProgressStep;
