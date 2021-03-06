import React, { useState, useEffect } from 'react';
import { InputError } from 'types';
import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
  getTranslate,
} from 'utils';
import { saveResetPassword } from 'api';
import { toast } from 'react-toastify';
import Helmet from 'react-helmet';

// Components
import FormValidatorUtil from 'utils/FormValidator';
import WithTranslate from 'components/hoc/WithTranslate';
import SaveForm from './SaveForm';
import SaveInfo from './SaveInfo';

import '../LoginView/LoginView.sass';

const SaveNewPassword = ({
  match,
  localePhrases,
}: any) => {
  const t = (code: string, placeholders?: any) =>
    getTranslate(localePhrases, code, placeholders);

  const [resetPassForm, setResetPassForm] = useState({
    password: null,
    password2: null,
  });

  const [resetPassErrors, setResetPassErrors] = useState<InputError[]>([]);

  const [resetPassLoading, setResetPassLoading] = useState<boolean>(false);

  const [resetPasswordSuccess, setResetPasswordSuccess] = useState<boolean>(false);

  useEffect(() => {
    document.querySelector('.basePageLayoutWrapper').classList.add('auth_layout');

    return () => {
      document.querySelector('.basePageLayoutWrapper').classList.remove('auth_layout');
    };
  }, []);

  const FormValidator = FormValidatorUtil(localePhrases);

  const validateOnChange = (name: string, value: any, event, element?) => {
    validateFieldOnChange(
      name,
      value,
      event,
      resetPassForm,
      setResetPassForm,
      resetPassErrors,
      setResetPassErrors,
      localePhrases,
      element,
    );
  };

  const getFieldErrors = (field: string) =>
    getFieldErrorsUtil(field, resetPassErrors)
      .map((msg) => ({
        ...msg,
        message: t('api.ecode.invalid_value'),
      }));

  const resetPassSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const inputs = [...form.elements].filter((i) =>
      ['INPUT', 'SELECT', 'TEXTAREA'].includes(i.nodeName));

    const { errors, hasError } = FormValidator.bulkValidate(inputs);

    setResetPassErrors([...errors]);

    if (!hasError) {
      setResetPassLoading(true);

      saveResetPassword(resetPassForm.password, match.params.token)
        .then((response) => {
          setResetPassLoading(false);

          if (response.data.success) {
            setResetPasswordSuccess(true);
            toast.success(t('reset_password.pass.success'));
          } else {
            toast.error(t('reset_password.pass.error'));
          }
        })
        .catch((error) => {
          setResetPassLoading(false);
          toast.error(t('reset_password.pass.error'));
        });
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('app.title.reset_password.new')}</title>
      </Helmet>

      <div className='loginScreen mt-3 mt-md-5'>
        <h3 className='loginScreen_title d-none d-lg-inline-block'>
          {t('reset_password.new.title')}
        </h3>

        <span className='mainHeader_logo d-lg-none-i' />

        {resetPasswordSuccess ? (
          <SaveInfo localePhrases={localePhrases || {}} />
        ) : (
          <SaveForm
            formSubmit={resetPassSubmit}
            form={resetPassForm}
            setForm={setResetPassForm}
            submitLoading={resetPassLoading}
            errors={resetPassErrors}
            setErrors={setResetPassErrors}
            localePhrases={localePhrases || {}}
          />
        )}
      </div>
    </>
  );
};

export default WithTranslate(SaveNewPassword);
