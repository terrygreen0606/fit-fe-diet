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
  stepTitlesDefault,
  setStepTitles,
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
    const currStepTitles = [...stepTitlesDefault];
    currStepTitles[0] = t('register.not_eating_step');
    currStepTitles[1] = t('register.plan_create_step');
    currStepTitles[2] = t('register.step_health');

    setStepTitles([...currStepTitles]);

    getProgressTitlte();

    if (registerData.goal === 0) {
      setTimeout(() => {
        setRegisterView('HEALTH_PROBLEMS');
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
            setRegisterView('HEALTH_PROBLEMS');
          }, 9000);
        } else {
          toast.error(t('register.weight_predict_error_msg'));
        }
      }).catch(() => {
        toast.error(t('register.weight_predict_error_msg'));
      });
    }

    return () => {
      setStepTitles([...stepTitlesDefault]);
    };
  }, []);

  return (
    <div className='pt-xl-5 text-center'>
      <h5 className='mb-2 mb-xl-5 fw-regular'>{t('register.plan_progress_title')}</h5>

      <span className='site-logo mb-2 mb-xl-4' />

      <LinearProgress />

      <br />

      <p>{progressTitle}</p>
    </div>
  );
};

export default PlanProgressStep;
