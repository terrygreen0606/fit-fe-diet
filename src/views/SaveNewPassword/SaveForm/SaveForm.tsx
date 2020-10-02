import React from 'react';
import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
  getTranslate
} from 'utils';
import { InputError } from 'types';

// Components
import FormGroup from 'components/common/Forms/FormGroup';
import InputField from 'components/common/Forms/InputField';
import Button from 'components/common/Forms/Button';

type SaveFormProps = {
  formSubmit: (e: React.SyntheticEvent) => void;
  form: any;
  setForm: (any) => void;
  submitLoading: boolean;
  errors: InputError[];
  setErrors: (any) => void;
  localePhrases: any;
};

const SaveForm = (props: SaveFormProps) => {

  const validateOnChange = (name: string, value: any, event, element?) => {
    validateFieldOnChange(
      name,
      value,
      event,
      props.form,
      props.setForm,
      props.errors,
      props.setErrors,
      element
    );
  };

  const getFieldErrors = (field: string) =>
    getFieldErrorsUtil(field, props.errors)
      .map(msg => ({
        ...msg,
        message: t('api.ecode.invalid_value')
      }));

  const t = (code: string, placeholders?: any) =>
    getTranslate(props.localePhrases, code, placeholders);
  
  return (
    <form className='loginScreen_form' onSubmit={(e) => props.formSubmit(e)}>
      <FormGroup>
        <InputField
          name='password'
          type="password"
          id="resetPassword"
          label={t('login.form_password')}
          data-validate='["required"]'
          errors={getFieldErrors('password')}
          autoComplete="new-password"
          autoFocus
          value={props.form.password}
          onChange={(e) => validateOnChange('password', e.target.value, e)}
          placeholder={t('login.password_placeholder')}
          block
        />
      </FormGroup>

      <FormGroup>
        <InputField
          name='password2'
          type="password"
          data-param="resetPassword"
          label={t('login.form_password.confirm')}
          data-validate='["required", "equalto"]'
          errors={getFieldErrors('password2')}
          autoComplete="new-password2"
          value={props.form.password2}
          onChange={(e) => validateOnChange('password2', e.target.value, e)}
          placeholder={t('login.password_placeholder')}
          block
        />
      </FormGroup>

      <input type="text" name="email" className="d-none" />
      <input type="password" name="pass" className="d-none" />

      <Button
        className='loginScreen_btn'
        type='submit'
        color='secondary'
        size='lg'
        block
        isLoading={props.submitLoading}
      >
        {t('reset_password.new.submit')}
      </Button>
    </form>
  );
};

export default SaveForm;
