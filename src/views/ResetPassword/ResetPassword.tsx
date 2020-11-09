import React, { useState, useEffect } from 'react';
import { getTranslate } from 'utils';
import { toast } from 'react-toastify';
import { resetPassword } from 'api';
import { InputError } from 'types';
import Helmet from 'react-helmet';

// Components
import FormValidator from 'utils/FormValidator';
import WithTranslate from 'components/hoc/WithTranslate';
import ResetForm from './ResetForm';
import ResetInfo from './ResetInfo';

import '../LoginView/LoginView.sass';

const ResetPassword = ({
  localePhrases,
}: any) => {
  const [resetPassForm, setResetPassForm] = useState({
    email: '',
  });
  const [resetPassErrors, setResetPassErrors] = useState<InputError[]>([]);
  const [resetPassLoading, setResetPassLoading] = useState<boolean>(false);
  const [resetEmailSuccess, setResetEmailSuccess] = useState<boolean>(false);

  useEffect(() => {
    document.querySelector('.basePageLayoutWrapper').classList.add('auth_layout');

    return () => {
      document.querySelector('.basePageLayoutWrapper').classList.remove('auth_layout');
    };
  }, []);

  const t = (code: string, placeholders?: any) =>
    getTranslate(localePhrases, code, placeholders);

  const resetPassSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const inputs = [...form.elements].filter((i) =>
      ['INPUT', 'SELECT', 'TEXTAREA'].includes(i.nodeName));

    const { errors, hasError } = FormValidator.bulkValidate(inputs);

    setResetPassErrors([...errors]);

    if (!hasError) {
      setResetPassLoading(true);

      resetPassword(resetPassForm.email)
        .then(({ data }) => {
          setResetPassLoading(false);

          if (data.success) {
            setResetEmailSuccess(true);
            toast.success(t('reset_password.email.success'));
          } else {
            toast.error(t('reset_password.email.error'));
          }
        })
        .catch(() => {
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
          <ResetInfo localePhrases={localePhrases || {}} />
        ) : (
          <ResetForm
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

export default WithTranslate(ResetPassword);
