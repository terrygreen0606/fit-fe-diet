import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
  getTranslate,
} from 'utils';

// Components
import CustomRadio from 'components/common/Forms/CustomRadio';
import CustomSwitch from 'components/common/Forms/CustomSwitch';
import FormGroup from 'components/common/Forms/FormGroup';
import FormLabel from 'components/common/Forms/FormLabel';
import InputField from 'components/common/Forms/InputField';
import Button from 'components/common/Forms/Button';
import FormValidator from 'utils/FormValidator';
import FormInvalidMessage from 'components/common/Forms/FormInvalidMessage';

import '../RegisterModal.sass';

import { ReactComponent as MaleIcon } from 'assets/img/icons/male-icon.svg';
import { ReactComponent as FemaleIcon } from 'assets/img/icons/female-icon.svg';
import { ReactComponent as AngleLeftIcon } from 'assets/img/icons/angle-left-icon.svg';

const InfoStep = (props: any) => {
  const { registerData } = props;
  const [registerInfoErrors, setRegisterInfoErrors] = useState([]);
  const [weightPredictionLoading, setWeightPredictionLoading] = useState(false);

  const t = (code: string) => getTranslate(props.localePhrases, code);

  useEffect(() => {
    let currStepTitles = [...props.stepTitlesDefault];
    currStepTitles[2] = t('register.not_eating_step');

    props.setStepTitles([...currStepTitles]);

    return () => {
      props.setStepTitles([...props.stepTitlesDefault]);
    };
  }, []);

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
      setWeightPredictionLoading(true);

      setTimeout(() => {
        setWeightPredictionLoading(false);
        props.setRegisterView('PLAN_PROGRESS');
      }, 500);
    }
  };

  return (
    <div className="register_info">
      <h6 className="register_title mb-xl-5 mb-45">
        <AngleLeftIcon 
          className="register-back-icon mr-3" 
          onClick={e => props.setRegisterView('GOAL')}
        /> 
        {t('register.fill_details_text')}
      </h6>

      <div className="text-center">
        <CustomSwitch 
          label1={t('common.us_metric')}
          label2={t('common.metric')} 
          checked={props.registerData.measurement === 'si'} 
          onChange={e => props.setRegisterData({
            ...props.registerData,
            measurement: e.target.checked ? 'si' : 'us'
          })}
        />
      </div>

      <form className="register_info_form mt-5" onSubmit={(e) => registerInfoSubmit(e)}>
        <FormGroup inline className="mb-5">
          <FormLabel>{t('register.form_sex')}</FormLabel>

          <CustomRadio
            name='register_sex'
            label={
              <>
                <MaleIcon
                  className={classNames('genderIcon', {
                    genderIcon_active: props.registerData.gender === 'm',
                  })}
                />

                {t('register.form_male')}
              </>
            }
            value='m'
            checked={registerData.gender === 'm'}
            inline
            onChange={(e) =>
              props.setRegisterData({
                ...registerData,
                gender: e.target.value,
              })
            }
          />

          <CustomRadio
            name='register_sex'
            label={
              <>
                <FemaleIcon
                  className={classNames('genderIcon', {
                    genderIcon_active: props.registerData.gender === 'f',
                  })}
                />

                {t('register.form_female')}
              </>
            }
            value='f'
            checked={registerData.gender === 'f'}
            inline
            onChange={(e) =>
              props.setRegisterData({
                ...registerData,
                gender: e.target.value,
              })
            }
          />
        </FormGroup>

        <div className="row">
          <div className="col-sm-6 mb-45">
            
            <FormGroup className="register_info_fg_age mb-0" inline>
              <FormLabel>{t('register.form_age')}</FormLabel>
              <InputField
                block
                height="md"
                type="number"
                min={1}
                name="age"
                value={registerData.age}
                data-validate='["required"]'
                onChange={(e) => validateOnChange('age', e.target.value, e)}
                invalid={getFieldErrors('age').length > 0}
                placeholder=""
              />
              <FormLabel>{t('common.age_yo')}</FormLabel>
            </FormGroup>

            {getFieldErrors('age').slice(0, 1).map((error, i) => (
              <FormInvalidMessage key={i} className="text-center">{error.message}</FormInvalidMessage>
            ))}

          </div>
          <div className="col-sm-6 mb-45">
            
            <FormGroup className="register_info_fg_height mb-0" inline>
              <FormLabel>{t('register.form_height')}</FormLabel>
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
          <div className={classNames({
            "col-sm-6 offset-sm-3 mb-45": registerData.goal === 0,
            "col-sm-6 mb-45": registerData.goal !== 0,
          })}>
            
            <FormGroup className="register_info_fg_weight mb-0" inline>
              <FormLabel>{t('register.form_weight_now')}</FormLabel>
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
          {registerData.goal !== 0 && (
            <div className="col-sm-6 mb-45">
              
              <FormGroup className="register_info_fg_weight mb-0" inline>
                <FormLabel>{t('register.form_weight_want')}</FormLabel>
                <InputField
                  block
                  height="md"
                  type="number"
                  value={registerData.weight_goal}
                  data-param="30,400"
                  data-validate='["required", "min-max"]'
                  name="weight_goal"
                  onChange={(e) => validateOnChange('weight_goal', e.target.value, e)}
                  invalid={getFieldErrors('weight_goal').length > 0}
                  placeholder=""
                />
                <FormLabel>{t('common.kg')}</FormLabel>
              </FormGroup>

              {getFieldErrors('weight_goal').slice(0, 1).map((error, i) => (
                <FormInvalidMessage key={i}>{error.message}</FormInvalidMessage>
              ))}

            </div>
          )}
        </div>

        <div className="text-center mt-xl-4 mt-3">
          <Button
            style={{ width: '217px' }}
            color="primary"
            type="submit"
            size="lg"
            isLoading={weightPredictionLoading}
          >
            {t('register.form_next')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default InfoStep;
