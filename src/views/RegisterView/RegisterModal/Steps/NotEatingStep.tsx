import React, { useEffect } from 'react';
import { getTranslate } from 'utils';

// Components
import Button from 'components/common/Forms/Button';

import { ReactComponent as AngleLeftIcon } from 'assets/img/icons/angle-left-icon.svg';

const NotEatingStep = ({
  registerData,
  setRegisterData,
  setRegisterView,
  stepTitlesDefault,
  setStepTitles,
  localePhrases,
}: any) => {
  const t = (code: string) => getTranslate(localePhrases, code);

  useEffect(() => {
    const currStepTitles = [...stepTitlesDefault];
    currStepTitles[0] = t('register.weight_goal_step');
    currStepTitles[1] = t('register.not_eating_step');
    currStepTitles[2] = t('register.plan_create_step');

    setStepTitles([...currStepTitles]);

    return () => {
      setStepTitles([...stepTitlesDefault]);
    };
  }, []);

  const removeMealItem = (cuisineId: string) => {
    setRegisterData({
      ...registerData,
      ignore_cuisine_ids: registerData.ignore_cuisine_ids.filter(
        (cuisine) => cuisine.id !== cuisineId,
      ),
    });
  };

  const changeCuisineState = (id: string, checked: boolean) => {
    const index = registerData.ignore_cuisine_ids.findIndex((cuisine) => cuisine.id === id);

    if (index >= 0) {
      const ignore_cuisine_ids = registerData.ignore_cuisine_ids;

      if (ignore_cuisine_ids[index]) {
        ignore_cuisine_ids[index] = {
          ...ignore_cuisine_ids[index],
          checked,
        };

        setRegisterData({
          ...registerData,
          ignore_cuisine_ids,
        });
      }
    }
  };

  return (
    <>
      <h6 className='register_title mb-xl-5 mb-45'>
        <AngleLeftIcon
          className='register-back-icon mr-5'
          onClick={() => setRegisterView('INFO_WEIGHT_GOAL')}
        />
        {t('register.not_eating')}
      </h6>

      <div className='register_eating_list'>
        {registerData.ignore_cuisine_ids.map(({
          id,
          name,
          checked,
          image,
        }) => (
          <label key={id} className='register_eating_label'>
            <input
              name='register_eating_item'
              type='checkbox'
              checked={checked}
              onChange={(e) => changeCuisineState(id, e.target.checked)}
            />

            <div key={id} className='register_eating_item'>
              {image && <img src={image} className='register_eating_item_icon' alt='' />}
              <span className='register_eating_item_label'>{name}</span>
            </div>
          </label>
        ))}
      </div>

      <div className='text-center mt-xl-5 mt-45'>
        <Button
          style={{ width: '217px' }}
          color='primary'
          type='submit'
          size='lg'
          onClick={() => setRegisterView('PLAN_PROGRESS')}
        >
          {t('register.form_next')}
        </Button>
      </div>
    </>
  );
};

export default NotEatingStep;
