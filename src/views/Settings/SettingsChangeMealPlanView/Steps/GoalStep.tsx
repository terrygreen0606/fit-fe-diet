import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { toast } from 'react-toastify';

import { getTranslate } from 'utils';
import { userUpdateMealSettings } from 'api';

// Components
import Button from 'components/common/Forms/Button';
import ContentLoading from 'components/hoc/ContentLoading';
import WithTranslate from 'components/hoc/WithTranslate';

import '../SettingsChangeMealPlanView.sass';

// Icon
import { ReactComponent as LoseWeightIcon } from 'assets/img/icons/lose-weight-icon.svg';
import { ReactComponent as KeepWeightIcon } from 'assets/img/icons/keep-weight-icon.svg';
import { ReactComponent as LiftWeightIcon } from 'assets/img/icons/lift-weight-icon.svg';

import { steps } from '../steps';

type GoalStepProps = {
  localePhrases: any,
  userGoal: number,
  updateActiveStep: any,
  updateUserGoal: any,
};

const GoalStep = ({
  localePhrases,
  userGoal,
  updateActiveStep,
  updateUserGoal,
}: GoalStepProps) => {
  const t = (code: string, placeholders?: any) =>
    getTranslate(localePhrases, code, placeholders);

  const [goal, setGoal] = useState(null);

  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true);
  const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false);

  useEffect(() => {
    setGoal(userGoal);
    setIsLoadingPage(false);
  }, [userGoal]);

  const updateGoal = () => {
    setIsLoadingButton(true);
    userUpdateMealSettings({
      goal,
    }).then((response) => {
      if (response.data.success && response.data.data) {
        updateActiveStep(steps.metrics);
        updateUserGoal(response.data.data.goal);
      }
    }).catch(() => toast.error(t('mp.form.error')))
      .finally(() => setIsLoadingButton(false));
  };

  return (
    <ContentLoading
      isLoading={isLoadingPage}
      isError={false}
      spinSize='lg'
    >
      <div>
        <h3 className='change-meal-plan__title'>{t('mp.goal.title')}</h3>
        <div className='change-meal-plan__goals'>
          <Button
            type='button'
            onClick={() => setGoal(-1)}
            className={classnames('change-meal-plan__goals-item', {
              active: goal === -1,
            })}
          >
            <div className='change-meal-plan__goals-item-media'>
              <LoseWeightIcon />
            </div>
            <span>{t('mp.goal.lose')}</span>
          </Button>
          <Button
            type='button'
            onClick={() => setGoal(0)}
            className={classnames('change-meal-plan__goals-item', {
              active: goal === 0,
            })}
          >
            <div className='change-meal-plan__goals-item-media'>
              <KeepWeightIcon />
            </div>
            <span>{t('mp.goal.keep')}</span>
          </Button>
          <Button
            type='button'
            onClick={() => setGoal(1)}
            className={classnames('change-meal-plan__goals-item', {
              active: goal === 1,
            })}
          >
            <div className='change-meal-plan__goals-item-media'>
              <LiftWeightIcon />
            </div>
            <span>{t('mp.goal.lift')}</span>
          </Button>
        </div>
        <div className='change-meal-plan__btn-wrap'>
          <Button
            type='button'
            color='primary'
            className='change-meal-plan__btn'
            onClick={() => updateGoal()}
          >
            {t('mp.save_next')}
            <ContentLoading
              isLoading={isLoadingButton}
              isError={false}
              spinSize='sm'
            />
          </Button>
        </div>
      </div>
    </ContentLoading>
  );
};

export default WithTranslate(GoalStep);
