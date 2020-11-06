import React, { useState } from 'react';
import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
  getTranslate,
} from 'utils';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import { userInviteFriendByEmail } from 'api';

// Components
import WithTranslate from 'components/hoc/WithTranslate';
import FormValidator from 'utils/FormValidator';
import InputField from 'components/common/Forms/InputField';
import ContentLoading from 'components/hoc/ContentLoading';

import './InviteEmail.sass';

import { ReactComponent as ArrowRight } from 'assets/img/icons/arrow-right-gray-icon.svg';

type InviteEmailProps = {
  className?: string;
  onCompleted?: () => void;
  localePhrases: any;
};

const InviteEmailDefaultProps = {
  className: '',
  onCompleted: () => {},
};

const InviteEmail = ({
  className,
  onCompleted,
  localePhrases,
}: InviteEmailProps) => {
  const t = (code: string, placeholders?: any) =>
    getTranslate(localePhrases, code, placeholders);

  const [inviteFriendsForm, setInviteFriendsForm] = useState({
    email: '',
  });

  const [inviteFriendsErrors, setInviteFriendsErrors] = useState([]);

  const [isRequestSent, setIsRequestSent] = useState<boolean>(false);

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

  const inviteFriendsSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const inputs = [...form.elements].filter((i) => ['INPUT', 'SELECT', 'TEXTAREA'].includes(i.nodeName));

    const { errors, hasError } = FormValidator.bulkValidate(inputs);

    setInviteFriendsErrors([...errors]);

    if (!hasError) {
      setIsRequestSent(true);
      userInviteFriendByEmail(inviteFriendsForm.email)
        .then((response) => {
          if (response.data.success) {
            setInviteFriendsForm({ ...inviteFriendsForm, email: '' });
            toast.success(t('referral.email_sent'));
            onCompleted();
          }
        })
        .catch(() => {
          toast.error(t('referral.error'));
        })
        .finally(() => {
          setIsRequestSent(false);
        });
    }
  };

  return (
    <form
      onSubmit={(e) => inviteFriendsSubmit(e)}
      className={classNames('referral__container-input', {
        [className]: className,
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

      <ContentLoading
        isLoading={isRequestSent}
        isError={false}
        spinSize='sm'
        color='#106EE8'
      >
        <button type='submit' className='referral__invite-button'>
          <span className='referral__invite-button-text'>
            {t('referral.invite')}
          </span>
          <div className='referral__invite-button-container-icon'>
            <ArrowRight className='referral__invite-button-icon' />
          </div>
        </button>
      </ContentLoading>
    </form>
  );
};

InviteEmail.defaultProps = InviteEmailDefaultProps;

export default WithTranslate(InviteEmail);
