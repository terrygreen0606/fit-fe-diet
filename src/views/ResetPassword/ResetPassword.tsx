import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
  getTranslate,
} from 'utils';
import { toast } from 'react-toastify';
import { resetPassword } from 'api';
import { InputError } from 'types';
import Helmet from 'react-helmet';

// Components
import ResetForm from './ResetForm';
import ResetInfo from './ResetInfo';

import FormValidator from 'utils/FormValidator';
import WithTranslate from 'components/hoc/WithTranslate';

import '../LoginView/LoginView.sass';

const ResetPassword = (props: any) => {
  const [resetPassForm, setResetPassForm] = useState({
    email: ''
  });

  const [resetPassErrors, setResetPassErrors] = useState<InputError[]>([]);

  const [resetPassLoading, setResetPassLoading] = useState<boolean>(false);

  const [resetEmailSuccess, setResetEmailSuccess] = useState<boolean>(false);

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

      resetPassword(resetPassForm.email)
        .then(response => {
          setResetPassLoading(false);

          if (response.data.success) {
            setResetEmailSuccess(true);
            toast.success(t('reset_password.email.success'));
          } else {
            toast.error(t('reset_password.email.error'));
          }
        })
        .catch(error => {
          setResetPassLoading(false);
          toast.error(t('reset_password.email.error'));
        });
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

        {resetEmailSuccess ? (
          <ResetInfo localePhrases={props.localePhrases || {}} />
        ) : (
          <ResetForm
            formSubmit={resetPassSubmit}
            form={resetPassForm}
            setForm={setResetPassForm}
            submitLoading={resetPassLoading}
            errors={resetPassErrors}
            setErrors={setResetPassErrors}
            localePhrases={props.localePhrases || {}}
          />
        )}
      </div>
    </>
  );
};

export default WithTranslate(ResetPassword);
