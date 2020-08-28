import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
  getTranslate,
} from 'utils';

// Components
import CustomSwitch from 'components/common/Forms/CustomSwitch';
import FormGroup from 'components/common/Forms/FormGroup';
import FormLabel from 'components/common/Forms/FormLabel';
import InputField from 'components/common/Forms/InputField';
import Button from 'components/common/Forms/Button';
import FormValidator from 'utils/FormValidator';
import FormInvalidMessage from 'components/common/Forms/FormInvalidMessage';

import '../RegisterV2Tpl.sass';

const HeightWeight = (props: any) => {

  const { registerData } = props;
  const [registerInfoErrors, setRegisterInfoErrors] = useState([]);

  const t = (code: string) => getTranslate(props.localePhrases, code);

  const validateOnChange = (name: string, value: any, event, element?) => {
    validateFieldOnChange(
      name,
      value,
      event,
      registerData,
      props.setRegisterData,
      registerInfoErrors,
      setRegisterInfoErrors,
      element
    );
  };

  const getFieldErrors = (field: string) =>
    getFieldErrorsUtil(field, registerInfoErrors);

  const registerInfoSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const inputs = [...form.elements].filter((i) =>
      ['INPUT', 'SELECT', 'TEXTAREA'].includes(i.nodeName)
    );

    const { errors, hasError } = FormValidator.bulkValidate(inputs);

    setRegisterInfoErrors([...errors]);

    if (!hasError) {
      props.setRegisterView('NOT_EATING');
    }
  };

  return (
    <>
      <h3 className="register_v2tpl_title mb-5">What's your height and weight?</h3>

      <CustomSwitch 
        label1={t('common.us_metric')}
        label2={t('common.metric')} 
        checked={props.registerData.measurement === 'si'} 
        onChange={e => props.setRegisterData({
          ...props.registerData,
          measurement: e.target.checked ? 'si' : 'us'
        })}
      />

      <form className="mt-5 pt-2" onSubmit={(e) => registerInfoSubmit(e)}>
        <div className="row">
          <div className="col-4 offset-5 pr-5">
            
            <div className="mb-4">
              <FormGroup className="register_v2tpl_fg_inline mb-0" inline>
                <InputField
                  block
                  height="md"
                  type="number"
                  value={registerData.height}
                  name="height"
                  data-param="50,250"
                  data-validate='["required", "min-max"]'
                  onChange={(e) => validateOnChange('height', e.target.value, e)}
                  invalid={getFieldErrors('height').length > 0}
                  placeholder=""
                />
                <FormLabel>{t('common.cm')}</FormLabel>
              </FormGroup>

              {getFieldErrors('height').slice(0, 1).map((error, i) => (
                <FormInvalidMessage key={i} className="text-center">{error.message}</FormInvalidMessage>
              ))}
            </div>

            <div>
              <FormGroup className="register_v2tpl_fg_inline mb-0" inline>
                <InputField
                  block
                  height="md"
                  type="number"
                  value={registerData.weight}
                  data-param="30,400"
                  data-validate='["required", "min-max"]'
                  name="weight"
                  onChange={(e) => validateOnChange('weight', e.target.value, e)}
                  invalid={getFieldErrors('weight').length > 0}
                  placeholder=""
                />
                <FormLabel>{t('common.kg')}</FormLabel>
              </FormGroup>

              {getFieldErrors('weight').slice(0, 1).map((error, i) => (
                <FormInvalidMessage key={i}>{error.message}</FormInvalidMessage>
              ))}
            </div>
          </div>
        </div>

        <Button className="register_v2tpl_btn" color="primary" size="lg">Next</Button>
      </form>
    </>
  );
};

export default HeightWeight;
