import React, { useState } from 'react';
import classNames from 'classnames';
import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
  hasFieldError
} from 'utils';

// Components 
import CustomRadio from 'components/common/Forms/CustomRadio';
import FormGroup from 'components/common/Forms/FormGroup';
import FormLabel from 'components/common/Forms/FormLabel';
import InputField from 'components/common/Forms/InputField';
import Button from 'components/common/Forms/Button';
import FormValidator from 'components/common/Forms/FormValidator';

import styles from '../RegisterModal.module.sass';

import { ReactComponent as MaleIcon } from 'assets/img/icons/male-icon.svg';
import { ReactComponent as FemaleIcon } from 'assets/img/icons/female-icon.svg';

const InfoStep = (props: any) => {

  const [registerInfoForm, setRegisterInfoForm] = useState({
    weight: '',
    height: '',
    age: '',
    sex: 'MALE'
  });

  const [registerInfoErrors, setRegisterInfoErrors] = useState([]);

  const [registerInfoLoading, setRegisterInfoLoading] = useState(false);

  const validateOnChange = (name: string, value: any, event, element?) => {
    validateFieldOnChange(
      name,
      value,
      event,
      registerInfoForm,
      setRegisterInfoForm,
      registerInfoErrors,
      setRegisterInfoErrors,
      element
    );
  };

  const hasError = (field: string, code?: string) => hasFieldError(registerInfoErrors, field, code);

  const getFieldErrors = (field: string) => getFieldErrorsUtil(field, registerInfoErrors);

  const registerInfoSubmit = e => {
    e.preventDefault();

    const form = e.target;
    const inputs = [...form.elements].filter(i => ['INPUT', 'SELECT', 'TEXTAREA'].includes(i.nodeName));

    const { errors, hasError } = FormValidator.bulkValidate(inputs);

    setRegisterInfoErrors([...errors]);

    if (!hasError) {
      setRegisterInfoLoading(true);

      setTimeout(() => {
        setRegisterInfoLoading(false);
        props.setRegisterStep('JOIN')
      }, 400);
    }
  };

  return (
    <div className={styles.register_info}>
      <h6 className={`${styles.register_title} mb-5`}>Please fill in your details to get an exact plan</h6>

      <div style={{ height: '50px' }}></div>

      <form className={styles.register_info_form} onSubmit={e => registerInfoSubmit(e)}>
        <FormGroup inline>
          <FormLabel>Sex</FormLabel>

          <CustomRadio 
            name="register_sex" 
            label={
              <>
                <MaleIcon 
                  className={classNames(styles.registerSexIcon, {
                    [styles.registerSexIcon_active]: registerInfoForm.sex === 'MALE'
                  })}
                />

                Male
              </>
            }
            value="MALE"
            checked={registerInfoForm.sex === 'MALE'}
            inline
            onChange={e => setRegisterInfoForm({
                ...registerInfoForm,
                sex: e.target.value
              })
            }
          />

          <CustomRadio 
            name="register_sex" 
            label={
              <>
                <FemaleIcon 
                  className={classNames(styles.registerSexIcon, {
                    [styles.registerSexIcon_active]: registerInfoForm.sex === 'FEMALE'
                  })}
                />

                Female
              </>
            }
            value="FEMALE"
            checked={registerInfoForm.sex === 'FEMALE'}
            inline
            onChange={e => setRegisterInfoForm({
                ...registerInfoForm,
                sex: e.target.value
              })
            }
          />
        </FormGroup>

        <FormGroup inline>
          <FormLabel>Age</FormLabel>
          <InputField
            block
            type="number"
            name="age"
            value={registerInfoForm.age}
            data-validate='["required"]'
            onChange={e => validateOnChange('age', e.target.value, e)}
            errors={getFieldErrors('age')}
            placeholder=""
          />
        </FormGroup>

        <FormGroup inline>
          <FormLabel>Height, cm</FormLabel>
          <InputField
            block
            type="number"
            value={registerInfoForm.height}
            name="height"
            data-validate='["required"]'
            onChange={e => validateOnChange('height', e.target.value, e)}
            errors={getFieldErrors('height')}
            placeholder=""
          />
        </FormGroup>

        <FormGroup inline>
          <FormLabel>Weight, kg</FormLabel>
          <InputField
            block
            type="number"
            value={registerInfoForm.weight}
            data-validate='["required"]'
            name="weight"
            onChange={e => validateOnChange('weight', e.target.value, e)}
            errors={getFieldErrors('weight')}
            placeholder=""
          />
        </FormGroup>

        <div className="text-center mt-5">
          <Button 
            style={{ width: '217px' }} 
            outline 
            color="secondary" 
            size="lg"
            onClick={() => props.setRegisterStep('GOAL')}
          >
            Back
          </Button>

          <Button 
            style={{ width: '217px' }} 
            color="primary" 
            type="submit"
            className="ml-3"
            size="lg"
            isLoading={registerInfoLoading}
          >
            Next
          </Button>
        </div>
      </form>
    </div>
  );
};

export default InfoStep;
