import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid';
import { getTranslate } from 'utils';

// Components
import Button from 'components/common/Forms/Button';

import { ReactComponent as CrossIcon } from 'assets/img/icons/cross-icon-black.svg';
import { ReactComponent as AngleLeftIcon } from 'assets/img/icons/angle-left-icon.svg';

import { getMealItem } from './getMealItem';

const NotEatingStep = (props: any) => {

  const [ignoreCuisineIds, setIgnoreCuisineIds] = useState([]);

  useEffect(() => {
    let currStepTitles = [...props.stepTitlesDefault];
    currStepTitles[0] = 'Foods you don’t like';

    props.setStepTitles([...currStepTitles]);

    return () => {
      props.setStepTitles([...props.stepTitlesDefault]);
    };
  }, []);

  useEffect(() => {
    if (props.registerData && props.registerData.ignore_cuisine_ids) {
      setIgnoreCuisineIds(props.registerData.ignore_cuisine_ids.map((mealKey) => ({
        id: uuid(),
        key: mealKey,
        ...getMealItem(mealKey),
      })));
    }
  }, [props.registerData]);

  const t = (code: string) => getTranslate(props.localePhrases, code);

  const removeMealItem = (mealId: string) => {
    const mealItem = ignoreCuisineIds.find((meal) => meal.id === mealId);

    if (mealItem) {
      props.setRegisterData({
        ...props.registerData,
        ignore_cuisine_ids: props.registerData.ignore_cuisine_ids.filter(
          (mealKey) => mealKey !== mealItem.key,
        ),
      });

      setIgnoreCuisineIds(ignoreCuisineIds.filter((meal) => meal.key !== mealItem.key));
    }
  };

  return (
    <>
      <h6 className="register_title mb-5">
        <AngleLeftIcon 
          className="register-back-icon mr-5" 
          onClick={e => props.setRegisterView('GOAL')}
        />
        {t('register.not_eating')}
      </h6>

     <div className="register_eating_list">
        {ignoreCuisineIds.map(({ id, title, icon: Icon }) => (
          <div key={id} className="register_eating_item">
            <span>
              <Icon className="register_eating_item_icon" />
              <span className="register_eating_item_label">{title}</span>
            </span>

            <CrossIcon onClick={() => removeMealItem(id)} className="register_eating_item_cross" />
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <Button
          style={{ width: '217px' }}
          color="primary"
          type="submit"
          size="lg"
          onClick={() => props.setRegisterView('INFO')}
        >
          {t('register.form_next')}
        </Button>
      </div>
    </>
  );
};

export default NotEatingStep;
