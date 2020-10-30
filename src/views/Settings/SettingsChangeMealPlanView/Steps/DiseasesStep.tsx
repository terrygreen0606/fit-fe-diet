import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { toast } from 'react-toastify';

import { getTranslate } from 'utils';
import { userUpdateMealSettings, getDiseases } from 'api';

// Components
import ContentLoading from 'components/hoc/ContentLoading';
import WithTranslate from 'components/hoc/WithTranslate';
import Button from 'components/common/Forms/Button';

import '../SettingsChangeMealPlanView.sass';

import { steps } from '../steps';

type DiseasesStepProps = {
  userDesiases: number[];
  localePhrases: any;
  updateActiveStep: any;
  userUpdateDesiases: any,
};

const DiseasesStep = ({
  userDesiases,
  localePhrases,
  updateActiveStep,
  userUpdateDesiases,
}: DiseasesStepProps) => {
  const t = (code: string, placeholders?: any) =>
    getTranslate(localePhrases, code, placeholders);

  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true);
  const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false);
  const [diseasesList, setDiseasesList] = useState([]);

  useEffect(() => {
    getDiseases().then((response) => {
      if (response.data.success && response.data.data) {
        const diseasesFullList = [...response.data.data];

        userDesiases.forEach((item) => {
          diseasesFullList.find((findItem) => {
            if (item === findItem.code) {
              findItem.isActive = true;
            }
          });
        });

        setDiseasesList([...diseasesFullList]);

        setIsLoadingPage(false);
      }
    }).catch(() => toast.error(t('common.error')))
      .finally(() => setIsLoadingPage(false));
  }, []);

  const updateUserDesiases = () => {
    setIsLoadingButton(true);

    const updatedDesiasesList = [];

    diseasesList.forEach((item) => {
      if (item.isActive) updatedDesiasesList.push(item.code);
    });

    userUpdateMealSettings({
      diseases: updatedDesiasesList,
    })
      .then((response) => {
        if (response.data.success && response.data.data) {
          updateActiveStep(steps.meals);
          userUpdateDesiases(updatedDesiasesList);
        }
      })
      .catch(() => { })
      .finally(() => setIsLoadingButton(false));
  };

  return (
    <ContentLoading
      isLoading={isLoadingPage}
      isError={false}
      spinSize='lg'
    >
      <div>
        <h1 className='change-meal-plan__title'>
          {t('mp.diseases.title')}
        </h1>
        <div className='change-meal-plan__diseases'>
          {diseasesList.map((item, itemIndex) => (
            <button
              key={item.code}
              type='button'
              onClick={() => {
                const updatedDiseasesList = [...diseasesList];
                updatedDiseasesList[itemIndex].isActive = !updatedDiseasesList[itemIndex].isActive;
                setDiseasesList([...updatedDiseasesList]);
              }}
              className={classnames('change-meal-plan__diseases-item', {
                active: item.isActive,
              })}
            >
              {t(item.i18n_code)}
            </button>
          ))}
        </div>
        <div className='change-meal-plan__btn-wrap'>
          <Button
            type='button'
            color='primary'
            className='change-meal-plan__btn'
            onClick={() => updateUserDesiases()}
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

export default WithTranslate(DiseasesStep);
