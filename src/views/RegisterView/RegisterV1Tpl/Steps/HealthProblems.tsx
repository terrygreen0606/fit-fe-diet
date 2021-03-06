import React, { useState, useEffect, useRef } from 'react';
import { getTranslate } from 'utils';

// Components
import Button from 'components/common/Forms/Button';

import '../RegisterV1Tpl.sass';

import { ReactComponent as AngleLeftIcon } from 'assets/img/icons/angle-left-icon.svg';

const HealthProblems = ({
  registerData,
  setRegisterData,
  setRegisterView,
  localePhrases,
}: any) => {
  const t = (code: string) => getTranslate(localePhrases, code);

  const isInitialMount = useRef(true);

  const [isAskDiseasesView, setAskDiseasesView] = useState<boolean>(true);
  const [haveDiseases, setHaveDiseases] = useState<boolean>(null);

  useEffect(() => {
    if (isInitialMount && registerData.diseases.length > 0) {
      isInitialMount.current = false;

      if (registerData.diseases.find((disease) => disease.checked)) {
        setHaveDiseases(true);
        setAskDiseasesView(false);
      } else if (registerData.diseases.every((disease) => disease.checked === false)) {
        setHaveDiseases(false);
        setAskDiseasesView(true);
      }
    }
  }, [registerData]);

  const prevStep = () => {
    if (isAskDiseasesView) {
      setRegisterView('NOT_EATING');
    } else {
      setAskDiseasesView(true);

      if (!registerData.diseases.find((disease) => disease.checked)) {
        setHaveDiseases(null);
      }
    }
  };

  const nextStep = () => {
    setRegisterView('WORKOUT');
  };

  const haveDiseaseChange = (value: string) => {
    if (value === 'yes') {
      setAskDiseasesView(false);
      setHaveDiseases(true);
    } else {
      setRegisterData({
        ...registerData,
        diseases: registerData.diseases.map((disease) => ({
          ...disease,
          checked: false,
        })),
      });

      setHaveDiseases(false);
      nextStep();
    }
  };

  const changeDiseaseState = (code: string, checked: boolean) => {
    const index = registerData.diseases.findIndex((disease) => disease.code === code);

    if (index >= 0) {
      const { diseases } = registerData;

      if (diseases[index]) {
        diseases[index] = {
          ...diseases[index],
          checked,
        };

        setRegisterData({
          ...registerData,
          diseases,
        });
      }
    }
  };

  return (
    <div className='register_v1_steps_content'>
      <AngleLeftIcon
        className='register_v1_back_icon'
        onClick={() => prevStep()}
      />

      <h3 className='register_v1_title'>
        {isAskDiseasesView ? t('register.diseases_ask_title') : t('register.diseases_title')}
      </h3>

      {isAskDiseasesView ? (
        <div className='register_check_list'>
          <label className='register_check_item'>
            <input
              name='register_ask_health_problem'
              value='yes'
              type='radio'
              checked={haveDiseases === true}
              onChange={() => {}}
            />
            <Button
              className='register_check_btn'
              block
              spanBtn
              onClick={() => haveDiseaseChange('yes')}
            >
              {t('common.yes')}
            </Button>
          </label>

          <label className='register_check_item'>
            <input
              name='register_ask_health_problem'
              value='no'
              type='radio'
              checked={haveDiseases === false}
              onChange={() => {}}
            />
            <Button
              className='register_check_btn'
              block
              spanBtn
              onClick={() => haveDiseaseChange('no')}
            >
              {t('common.no')}
            </Button>
          </label>
        </div>
      ) : (
        <div className='register_check_list'>
          {registerData.diseases.map(({ code, checked, i18n_code }) => (
            <label key={code} className='register_check_item'>
              <input
                name='register_health_problem'
                type='checkbox'
                value={code}
                checked={!!checked}
                onChange={(e) => changeDiseaseState(code, e.target.checked)}
              />

              <Button className='register_check_btn' block spanBtn>
                {t(i18n_code)}
              </Button>
            </label>
          ))}
        </div>
      )}

      <div className='register_v1_submit'>
        <Button
          style={{ minWidth: '220px' }}
          color='primary'
          size='lg'
          onClick={() => nextStep()}
        >
          {registerData.diseases.find((disease) => disease.checked)
            ? t('register.form_next')
            : t('register.no_diseases_label')}
        </Button>
      </div>
    </div>
  );
};

export default HealthProblems;
