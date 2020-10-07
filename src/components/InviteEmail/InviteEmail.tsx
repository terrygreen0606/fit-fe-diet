import React, { useState, useEffect } from 'react';
import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
  getTranslate,
  copyTextInBuffer,
} from 'utils';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import { userInviteFriendByEmail } from 'api';

// Components
import WithTranslate from 'components/hoc/WithTranslate';
import Button from 'components/common/Forms/Button';
import FormValidator from 'utils/FormValidator';
import InputField from 'components/common/Forms/InputField';

import './InviteEmail.sass';

import { ReactComponent as ArrowRight } from 'assets/img/icons/arrow-right-gray-icon.svg';

type InviteEmailProps = {
  className?: string;
  localePhrases: any;
};

const InviteEmail = (props: InviteEmailProps) => {

  const t = (code: string, placeholders?: any) => 
    getTranslate(props.localePhrases, code, placeholders);

  const [inviteFriendsForm, setInviteFriendsForm] = useState({
    email: '',
  });

  const [inviteFriendsErrors, setInviteFriendsErrors] = useState([]);

  const [isActiveCopiedBlock, setActiveCopiedBlock] = useState(false);

  const validateOnChange = (name: string, value: any, event) => {
    validateFieldOnChange(
      name,
      value,
      event,
      inviteFriendsForm,
      setInviteFriendsForm,
      inviteFriendsErrors,
      setInviteFriendsErrors,
    );
  };

  const getFieldErrors = (field: string) =>
    getFieldErrorsUtil(field, inviteFriendsErrors);

  const inviteFriendsSubmit = e => {
    e.preventDefault();

    const form = e.target;

    const inputs = [...form.elements].filter((i) => ['INPUT', 'SELECT', 'TEXTAREA'].includes(i.nodeName));

    const { errors, hasError } = FormValidator.bulkValidate(inputs);

    setInviteFriendsErrors([...errors]);

    if (!hasError) {
      userInviteFriendByEmail(inviteFriendsForm.email)
        .then((response) => {
          setInviteFriendsForm({ ...inviteFriendsForm, email: '' });
          toast.success(t('referral.email_sent'));
          return response.data.data;
        })
        .catch(() => {
          toast.error(t('referral.error'));
        });
    }
  };

  return (
    <form
      onSubmit={e => inviteFriendsSubmit(e)}
      className={classNames('referral__container-input', {
        [props.className]: props.className
      })}
    >
      <InputField
        name='email'
        data-validate='["email", "required"]'
        errors={getFieldErrors('email')}
        value={inviteFriendsForm.email}
        onChange={(e) => validateOnChange('email', e.target.value, e)}
        block
        placeholder={t('referral.enter_email')}
        height='lg'
        className='referral__input card-bg'
      />

      <button type='submit' className='referral__invite-button'>
        <span className='referral__invite-button-text'>
          {t('referral.invite')}
        </span>

        <div className='referral__invite-button-container-icon'>
          <ArrowRight className='referral__invite-button-icon' />
        </div>
      </button>
    </form>
  );
};

export default WithTranslate(InviteEmail);
