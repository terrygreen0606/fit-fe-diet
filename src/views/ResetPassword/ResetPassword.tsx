import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
  getTranslate,
} from 'utils';
import { toast } from 'react-toastify';
import Helmet from 'react-helmet';

// Components
import FormGroup from 'components/common/Forms/FormGroup';
import InputField from 'components/common/Forms/InputField';
import Button from 'components/common/Forms/Button';
import FormValidator from 'utils/FormValidator';
import WithTranslate from 'components/hoc/WithTranslate';

import '../LoginView/LoginView.sass';

const ResetPassword = (props: any) => {
  const [resetPassForm, setResetPassForm] = useState({
    email: ''
  });

  const [resetPassErrors, setResetPassErrors] = useState([]);

  const [resetPassLoading, setResetPassLoading] = useState(false);

  const validateOnChange = (name: string, value: any, event, element?) => {
    validateFieldOnChange(
      name,
      value,
      event,
      resetPassForm,
      setResetPassForm,
      resetPassErrors,
      setResetPassErrors,
      element
    );
  };

  const getFieldErrors = (field: string) =>
    getFieldErrorsUtil(field, resetPassErrors);

  const t = (code: string, placeholders?: any) =>
    getTranslate(props.localePhrases, code, placeholders);

  const resetPassSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const inputs = [...form.elements].filter((i) =>
      ['INPUT', 'SELECT', 'TEXTAREA'].includes(i.nodeName)
    );

    const { errors, hasError } = FormValidator.bulkValidate(inputs);

    setResetPassErrors([...errors]);

    if (!hasError) {
      setResetPassLoading(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('app.title.reset_password')}</title>
      </Helmet>

      <div className='loginScreen mt-3 mt-md-5'>
        <h3 className='loginScreen_title d-none d-lg-inline-block'>
          {t('reset_password.title')}
        </h3>

        <span className='mainHeader_logo d-lg-none-i' />

        <form className='loginScreen_form' onSubmit={(e) => resetPassSubmit(e)}>
          <FormGroup>
            <InputField
              name='email'
              label={t('login.form_email')}
              data-validate='["required", "email"]'
              errors={getFieldErrors('email')}
              value={resetPassForm.email}
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
            isLoading={resetPassLoading}
          >
            {t('reset_password.submit')}
          </Button>
        </form>
      </div>
    </>
  );
};

export default WithTranslate(ResetPassword);
