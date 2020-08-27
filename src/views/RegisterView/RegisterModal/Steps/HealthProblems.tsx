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

  return (
    <>
      <h6 className="register_title mb-5">
        <AngleLeftIcon 
          className="register-back-icon mr-5" 
          onClick={e => props.setRegisterView('NOT_EATING')}
        />
        I have following problems with health:
      </h6>

      <div className="register_health_problem_list">
        <label className="register_health_problem_item">
          <input 
            name="register_health_problem" 
            type="checkbox" 
          />

          <Button className="register_health_problem_btn" block spanBtn>
            Heart desiase
          </Button>
        </label>

        <label className="register_health_problem_item">
          <input 
            name="register_health_problem" 
            type="checkbox" 
          />

          <Button className="register_health_problem_btn" block spanBtn>
            Diabets
          </Button>
        </label>

        <label className="register_health_problem_item">
          <input 
            name="register_health_problem" 
            type="checkbox" 
          />

          <Button className="register_health_problem_btn" block spanBtn>
            Kidney desiase
          </Button>
        </label>

        <label className="register_health_problem_item">
          <input 
            name="register_health_problem" 
            type="checkbox" 
          />

          <Button className="register_health_problem_btn" block spanBtn>
            Osteoartritis
          </Button>
        </label>

        <label className="register_health_problem_item">
          <input 
            name="register_health_problem" 
            type="checkbox" 
          />

          <Button className="register_health_problem_btn" block spanBtn>
            NASH
          </Button>
        </label>

        <label className="register_health_problem_item">
          <input 
            name="register_health_problem" 
            type="checkbox" 
          />

          <Button className="register_health_problem_btn" block spanBtn>
            None
          </Button>
        </label>

      </div>

      <div className="text-center">
        <Button
          className="mt-5"
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
