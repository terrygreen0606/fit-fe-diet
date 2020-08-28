import React from 'react';
import { getTranslate } from 'utils';

import '../RegisterV2Tpl.sass';

const HealthProblems = (props: any) => {

  const t = (code: string) => getTranslate(props.localePhrases, code);

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
      <h3 className="register_v2tpl_title">I have following problems with health:</h3>

      <div className="row">
        <div className="col-6 offset-3">
          
          <div className="register_v2tpl_check_list">
            {props.registerData.diseases.map(({ code, checked, i18n_code }) => (
              <label className="register_v2tpl_check_label">
                <input 
                  name="register_health_problem" 
                  type="checkbox" 
                  checked={checked}
                  onChange={e => changeDiseaseState(code, e.target.checked)}
                />
                <div className="register_v2tpl_check_item">{t(i18n_code)}</div>
              </label>
            ))}
          </div>

        </div>
      </div>
    </>
  );
};

export default HealthProblems;
