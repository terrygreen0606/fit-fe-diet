import React from 'react';
import { getTranslate } from 'utils';

// Components
import Button from 'components/common/Forms/Button';

import '../RegisterV2Tpl.sass';

const HealthProblems = ({
  registerData,
  setRegisterData,
  setRegisterView,
  localePhrases,
}: any) => {
  const t = (code: string) => getTranslate(localePhrases, code);

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
    <>
      <h1 className='register_v2_title'>{t('register.diseases_title')}</h1>

      <div className='row'>
        <div className='col-8 offset-2'>

          <div className='register_v2_check_list'>
            {registerData.diseases.map(({ code, checked, i18n_code }) => (
              <label className='register_v2_check_label'>
                <input
                  name='register_health_problem'
                  type='checkbox'
                  checked={checked}
                  onChange={(e) => changeDiseaseState(code, e.target.checked)}
                />
                <div className='register_v2_check_item'>{t(i18n_code)}</div>
              </label>
            ))}
          </div>

          <Button
            className='register_v2_btn mt-5'
            color='primary'
            size='lg'
            onClick={() => setRegisterView('DAY_MEALPLAN')}
          >
            {t('register.form_next')}
          </Button>

        </div>
      </div>
    </>
  );
};

export default HealthProblems;
