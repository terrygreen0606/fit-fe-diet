import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { toast } from 'react-toastify';

import { getTranslate } from 'utils';
import { userUpdateMealSettings } from 'api';

// Components
import ContentLoading from 'components/hoc/ContentLoading';
import WithTranslate from 'components/hoc/WithTranslate';
import Button from 'components/common/Forms/Button';

import '../SettingsChangeMealPlanView.sass';

import { ReactComponent as BreakfastIcon } from 'assets/img/icons/breakfast-icon.svg';
import { ReactComponent as LunchIcon } from 'assets/img/icons/lunch-icon.svg';
import { ReactComponent as DinnerIcon } from 'assets/img/icons/dinner-icon.svg';
import { ReactComponent as SnackIcon } from 'assets/img/icons/snack-icon.svg';

import { steps } from '../steps';

type MealsStepProps = {
  userMealsCnt: number;
  updateMealsCnt: any;
  localePhrases: any;
  updateActiveStep: any;
};

const MealsStep = ({
  userMealsCnt,
  updateMealsCnt,
  localePhrases,
  updateActiveStep,
}: MealsStepProps) => {
  const t = (code: string, placeholders?: any) =>
    getTranslate(localePhrases, code, placeholders);

  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true);
  const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false);
  const [mealsCnt, setMealsCnt] = useState<number>(null);

  useEffect(() => {
    setMealsCnt(userMealsCnt);
    setIsLoadingPage(false);
  }, []);

  const updateMealsQuantity = () => {
    setIsLoadingButton(true);
    userUpdateMealSettings({
      meals_cnt: mealsCnt,
    })
      .then((response) => {
        if (response.data.success && response.data.data) {
          updateActiveStep(steps.workout);
          updateMealsCnt(mealsCnt);
        }
      })
      .catch(() => toast.error(t('mp.form.error')))
      .finally(() => setIsLoadingButton(false));
  };

  return (
    <ContentLoading
      isLoading={isLoadingPage}
      isError={false}
      spinSize='lg'
    >
      <div>
        <h3 className='change-meal-plan__title'>{t('mp.meals.title')}</h3>
        <div className='change-meal-plan__meals'>
          <div className={classnames('change-meal-plan__meals-item', 'card-bg', {
            active: mealsCnt === 3,
          })}
          >
            <div className='change-meal-plan__meals-item-count'>3</div>
            <div className='change-meal-plan__meals-item-desc'>
              {t('mp.meals.desc')}
            </div>
            <div className='change-meal-plan__meals-item-content'>
              <div className='change-meal-plan__meals-item-content-block'>
                <div className='change-meal-plan__meals-item-content-block-media'>
                  <BreakfastIcon />
                </div>
                {t('meal.breakfast')}
              </div>
              <div className='change-meal-plan__meals-item-content-block'>
                <div className='change-meal-plan__meals-item-content-block-media'>
                  <LunchIcon />
                </div>
                {t('meal.lunch')}
              </div>
              <div className='change-meal-plan__meals-item-content-block'>
                <div className='change-meal-plan__meals-item-content-block-media'>
                  <DinnerIcon />
                </div>
                {t('meal.dinner')}
              </div>
            </div>
            <Button
              type='button'
              onClick={() => setMealsCnt(3)}
              className='change-meal-plan__meals-item-btn'
            >
              {t('mp.meals.choose')}
            </Button>
          </div>
          <div className={classnames('change-meal-plan__meals-item', 'card-bg', {
            active: mealsCnt === 4,
          })}
          >
            <div className='change-meal-plan__meals-item-count'>4</div>
            <div className='change-meal-plan__meals-item-desc'>
              {t('mp.meals.desc')}
            </div>
            <div className='change-meal-plan__meals-item-content'>
              <div className='change-meal-plan__meals-item-content-block'>
                <div className='change-meal-plan__meals-item-content-block-media'>
                  <BreakfastIcon />
                </div>
                {t('meal.breakfast')}
              </div>
              <div className='change-meal-plan__meals-item-content-block'>
                <div className='change-meal-plan__meals-item-content-block-media'>
                  <LunchIcon />
                </div>
                {t('meal.lunch')}
              </div>
              <div className='change-meal-plan__meals-item-content-block'>
                <div className='change-meal-plan__meals-item-content-block-media'>
                  <SnackIcon />
                </div>
                {t('meal.snack')}
              </div>
              <div className='change-meal-plan__meals-item-content-block'>
                <div className='change-meal-plan__meals-item-content-block-media'>
                  <DinnerIcon />
                </div>
                {t('meal.dinner')}
              </div>
            </div>
            <Button
              type='button'
              onClick={() => setMealsCnt(4)}
              className='change-meal-plan__meals-item-btn'
            >
              {t('mp.meals.choose')}
            </Button>
          </div>
          <div className={classnames('change-meal-plan__meals-item', 'card-bg', {
            active: mealsCnt === 5,
          })}
          >
            <div className='change-meal-plan__meals-item-count'>5</div>
            <div className='change-meal-plan__meals-item-desc'>
              {t('mp.meals.desc')}
            </div>
            <div className='change-meal-plan__meals-item-content'>
              <div className='change-meal-plan__meals-item-content-block'>
                <div className='change-meal-plan__meals-item-content-block-media'>
                  <BreakfastIcon />
                </div>
                {t('meal.breakfast')}
              </div>
              <div className='change-meal-plan__meals-item-content-block'>
                <div className='change-meal-plan__meals-item-content-block-media'>
                  <SnackIcon />
                </div>
                {t('meal.snack')}
              </div>
              <div className='change-meal-plan__meals-item-content-block'>
                <div className='change-meal-plan__meals-item-content-block-media'>
                  <LunchIcon />
                </div>
                {t('meal.lunch')}
              </div>
              <div className='change-meal-plan__meals-item-content-block'>
                <div className='change-meal-plan__meals-item-content-block-media'>
                  <SnackIcon />
                </div>
                {t('meal.snack')}
              </div>
              <div className='change-meal-plan__meals-item-content-block'>
                <div className='change-meal-plan__meals-item-content-block-media'>
                  <DinnerIcon />
                </div>
                {t('meal.dinner')}
              </div>
            </div>
            <Button
              type='button'
              onClick={() => setMealsCnt(5)}
              className='change-meal-plan__meals-item-btn'
            >
              {t('mp.meals.choose')}
            </Button>
          </div>
        </div>
        <div className='change-meal-plan__btn-wrap'>
          <Button
            type='button'
            color='primary'
            onClick={() => updateMealsQuantity()}
            className='change-meal-plan__btn'
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

export default WithTranslate(MealsStep);
