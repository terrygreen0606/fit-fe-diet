import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { toast } from 'react-toastify';

import { getTranslate } from 'utils';
import { userUpdateMealSettings, getActivityLevels } from 'api';

// Components
import ContentLoading from 'components/hoc/ContentLoading';
import WithTranslate from 'components/hoc/WithTranslate';
import Button from 'components/common/Forms/Button';

import '../SettingsChangeMealPlanView.sass';

type WorkoutStepProps = {
  localePhrases: any;
  updateActLevel: any;
  userActLevel: number;
};

const WorkoutStep = ({
  localePhrases,
  updateActLevel,
  userActLevel,
}: WorkoutStepProps) => {
  const t = (code: string, placeholders?: any) =>
    getTranslate(localePhrases, code, placeholders);

  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true);
  const [activityLevels, setActivityLevels] = useState<any[]>([]);
  const [userActivityLevel, setUserActivityLevel] = useState<number>();

  useEffect(() => {
    getActivityLevels().then((response) => {
      if (response.data.success && response.data.data) {
        setActivityLevels([...response.data.data]);

        setUserActivityLevel(userActLevel);
      }
    }).catch(() => toast.error(t('mp.form.error')))
      .finally(() => setIsLoadingPage(false));
  }, []);

  const updateUserActLevel = () => {
    userUpdateMealSettings({
      act_level: userActivityLevel,
    }).then((response) => {
      if (response.data.success && response.data.data) {
        updateActLevel(userActivityLevel);
        toast.success(t('mp.form.success'));
      }
    }).catch(() => toast.error(t('mp.form.error')));
  };

  return (
    <ContentLoading
      isLoading={isLoadingPage}
      isError={false}
      spinSize='lg'
    >
      <div>
        <div className='change-meal-plan__title'>
          {t('mp.workout.title')}
        </div>
        <div className='change-meal-plan__workout-list'>
          {activityLevels.map((item) => (
            <button
              type='button'
              key={item.value}
              className={classnames('change-meal-plan__workout-btn', {
                active: userActivityLevel === item.value,
              })}
              onClick={() => setUserActivityLevel(item.value)}
            >
              <div className='change-meal-plan__workout-btn-desc'>
                {t(item.i18n_code)}
              </div>
            </button>
          ))}
        </div>
        <div className='change-meal-plan__btn-wrap'>
          <Button
            type='button'
            color='primary'
            onClick={() => updateUserActLevel()}
            className='change-meal-plan__btn'
          >
            {t('mp.save')}
          </Button>
        </div>
      </div>
    </ContentLoading>
  );
};

export default WithTranslate(WorkoutStep);
