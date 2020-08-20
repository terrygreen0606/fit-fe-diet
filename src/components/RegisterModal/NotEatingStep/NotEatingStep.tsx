import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid';
import { getTranslate } from 'utils';

// Components
import Button from 'components/common/Forms/Button';
import ContentLoading from 'components/hoc/ContentLoading';

import { ReactComponent as CrossIcon } from 'assets/img/icons/cross-icon-black.svg';
import { ReactComponent as AngleLeftIcon } from 'assets/img/icons/angle-left-icon.svg';

import { getMealItem } from './getMealItem';

const NotEatingStep = (props: any) => {

  const t = (code: string) => getTranslate(props.localePhrases, code);

  useEffect(() => {
    let currStepTitles = [...props.stepTitlesDefault];
    currStepTitles[0] = t('register.not_eating_step');

    props.setStepTitles([...currStepTitles]);

    return () => {
      props.setStepTitles([...props.stepTitlesDefault]);
    };
  }, []);

  const removeMealItem = (cuisineId: string) => {
    props.setRegisterData({
      ...props.registerData,
      ignore_cuisine_ids: props.registerData.ignore_cuisine_ids.filter(
        cuisine => cuisine.id !== cuisineId,
      ),
    });
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

      <ContentLoading
        isLoading={props.cuisinesLoading}
        isError={props.cuisinesLoadingError}
        fetchData={props.fetchRecipeCuisines}
      >
       <div className="register_eating_list">
          {props.registerData.ignore_cuisine_ids.map(({ id, name, image }) => (
            <div key={id} className="register_eating_item">
              <span>
                <img src={image} className="register_eating_item_icon" />
                <span className="register_eating_item_label">{name}</span>
              </span>

              <CrossIcon onClick={() => removeMealItem(id)} className="register_eating_item_cross" />
            </div>
          ))}
        </div>
      </ContentLoading>

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
