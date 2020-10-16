import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { toast } from 'react-toastify';

import { getTranslate } from 'utils';
import { userUpdateMealSettings, getRecipeCuisines } from 'api';

// Components
import ContentLoading from 'components/hoc/ContentLoading';
import WithTranslate from 'components/hoc/WithTranslate';
import Button from 'components/common/Forms/Button';

import { steps } from '../steps';

type NotEatingStepProps = {
  userIgnoreCuisineList: string[],
  localePhrases: any,
  updateActiveStep: any,
  userUpdateCuisineList: any,
};

const NotEatingStep = ({
  userIgnoreCuisineList = [],
  localePhrases,
  updateActiveStep,
  userUpdateCuisineList,
}: NotEatingStepProps) => {
  const t = (code: string, placeholders?: any) =>
    getTranslate(localePhrases, code, placeholders);

  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true);
  const [ignoreCuisinesList, setIgnoreCuisinesList] = useState([]);

  useEffect(() => {
    getRecipeCuisines().then((response) => {
      if (response.data.success && response.data.data) {
        const ignoreList = [...response.data.data];
        userIgnoreCuisineList.forEach((item) => {
          ignoreList.find((findItem) => {
            if (item === findItem.id) {
              findItem.isActive = true;
            }
          });
        });

        setIgnoreCuisinesList([...ignoreList]);

        setIsLoadingPage(false);
      }
    }).catch(() => toast.error(t('mp.form.error')))
      .finally(() => setIsLoadingPage(false));
  }, []);

  const updateCuisineList = () => {
    const updatedCuisineList = [];

    ignoreCuisinesList.forEach((item) => {
      if (item.isActive) updatedCuisineList.push(item.id);
    });

    userUpdateMealSettings({
      ignore_cuisine_ids: updatedCuisineList,
    }).then((response) => {
      if (response.data.success && response.data.data) {
        updateActiveStep(steps.diseases);
        userUpdateCuisineList(updatedCuisineList);
      }
    });
  };

  return (
    <ContentLoading
      isLoading={isLoadingPage}
      isError={false}
      spinSize='lg'
    >
      <div>
        <div className='change-meal-plan__title'>
          {t('mp.not_eating.title')}
        </div>
        <div className='change-meal-plan__not-eating'>
          {ignoreCuisinesList.map((item, itemIndex) => (
            <button
              key={item.id}
              type='button'
              onClick={() => {
                const updatedIgnoreCuisinesList = [...ignoreCuisinesList];
                updatedIgnoreCuisinesList[itemIndex].isActive = !updatedIgnoreCuisinesList[itemIndex].isActive;
                setIgnoreCuisinesList([...updatedIgnoreCuisinesList]);
              }}
              className={classnames('change-meal-plan__not-eating-item', {
                active: item.isActive,
              })}
            >
              <div className='change-meal-plan__not-eating-item-media'>
                <img src={item.image} alt='icon' />
              </div>
              <div className='change-meal-plan__not-eating-item-desc'>
                {item.name}
              </div>
            </button>
          ))}
        </div>
        <div className='change-meal-plan__btn-wrap'>
          <Button
            type='button'
            color='primary'
            className='change-meal-plan__btn'
            onClick={() => updateCuisineList()}
          >
            {t('mp.save_next')}
          </Button>
        </div>
      </div>
    </ContentLoading>
  );
};

export default WithTranslate(NotEatingStep);
