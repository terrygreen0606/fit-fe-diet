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

type ResetFormProps = {
  formSubmit: (e: React.SyntheticEvent) => void;
  form: any;
  setForm: (any) => void;
  submitLoading: boolean;
  errors: InputError[];
  setErrors: (any) => void;
  localePhrases: any;
};

const ResetForm = (props: ResetFormProps) => {

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
          name='email'
          label={t('login.form_email')}
          data-validate='["required", "email"]'
          errors={getFieldErrors('email')}
          value={props.form.email}
          autoComplete="email"
          autoFocus={1}
          onChange={(e) => validateOnChange('email', e.target.value, e)}
          placeholder={t('login.email_placeholder')}
          block
        />
      </FormGroup>

      <Button
        className='loginScreen_btn'
        type='submit'
        color='secondary'
        size='lg'
        block
        isLoading={props.submitLoading}
      >
        {t('reset_password.submit')}
      </Button>
    </form>
  );
};

export default ResetForm;
