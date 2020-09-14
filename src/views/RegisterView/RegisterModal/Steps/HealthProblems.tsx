import React, { useEffect } from 'react';
import { getTranslate } from 'utils';

// Components
import Button from 'components/common/Forms/Button';

import '../RegisterModal.sass';

import { ReactComponent as AngleLeftIcon } from 'assets/img/icons/angle-left-icon.svg';

const HealthProblems = (props: any) => {

  const t = (code: string) => getTranslate(props.localePhrases, code);

  useEffect(() => {
    let currStepTitles = [...props.stepTitlesDefault];
    currStepTitles[0] = t('register.plan_create_step');
    currStepTitles[1] = t('register.step_health');
    currStepTitles[2] = t('register.expect_step');

    props.setStepTitles([...currStepTitles]);

    return () => {
      props.setStepTitles([...props.stepTitlesDefault]);
    };
  }, []);

  const nextStep = () => {
    if (props.registerData.goal === 0) {
      props.setRegisterView('JOIN');
    } else {
      props.setRegisterView('EXPECTATIONS');
    }
  };

  const changeDiseaseState = (code: string, checked: boolean) => {
    const index = props.registerData.diseases.findIndex(disease => disease.code === code);

    if (index >= 0) {
      let diseases = props.registerData.diseases;

      if (diseases[index]) {
        diseases[index] = {
          ...diseases[index],
          checked
        };

        props.setRegisterData({
          ...props.registerData,
          diseases
        });
      }
    }
  };

  return (
    <>
      <h6 className="register_title mb-xl-5 mb-45">
        <AngleLeftIcon 
          className="register-back-icon mr-5" 
          onClick={e => props.setRegisterView('NOT_EATING')}
        />
        {t('register.diseases_title')}:
      </h6>

      <div className="register_health_problem_list">
        {props.registerData.diseases.map(({ code, checked, i18n_code }) => (
          <label className="register_health_problem_item">
            <input 
              name="register_health_problem" 
              type="checkbox" 
              checked={checked}
              onChange={e => changeDiseaseState(code, e.target.checked)}
            />

            <Button className="register_health_problem_btn" block spanBtn>
              {t(i18n_code)}
            </Button>
          </label>
        ))}
      </div>

      <div className="text-center">
        <Button
          className="mt-xl-5 mt-45"
          style={{ width: '220px' }}
          color="primary"
          size="lg"
          onClick={() => nextStep()}
        >
          {t('register.form_next')}
        </Button>
      </div>
    </>
  );
};

export default HealthProblems;
