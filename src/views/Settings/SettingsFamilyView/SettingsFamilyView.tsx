import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import Helmet from 'react-helmet';

import { routes } from 'constants/routes';
import {
  validateFieldOnChange,
  getFieldErrors as getFieldErrorsUtil,
  getTranslate,
} from 'utils';
import FormValidator from 'utils/FormValidator';
import {
  userInviteFamilyByEmail,
  fetchUserProfile,
  getUserFamily,
  deleteFamilyMembers,
} from 'api';

// Components
import InputField from 'components/common/Forms/InputField';
import ProfileLayout from 'components/hoc/ProfileLayout';
import Button from 'components/common/Forms/Button';
import WithTranslate from 'components/hoc/WithTranslate';
import ContentLoading from 'components/hoc/ContentLoading';
import Breadcrumb from 'components/Breadcrumb';

import './SettingsFamilyView.sass';

// Icons
import { ReactComponent as CloseIcon } from 'assets/img/icons/close-icon.svg';
import { ReactComponent as ManPlugIcon } from 'assets/img/icons/man-plug-icon.svg';

const SettingsFamilyView = (props: any) => {
  const t = (code: string, placeholders?: any) =>
    getTranslate(props.localePhrases, code, placeholders);

  const [inviteEmailForm, setInviteEmailForm] = useState<{
    email: string,
  }>({
    email: '',
  });

  const [userInfo, setUserInfo] = useState<{
    name: string,
    surname: string,
  }>({
    name: '',
    surname: '',
  });

  const [userFamily, setUserFamily] = useState<any[]>([]);

  const [isOwnerFamily, setIsOwnerFamily] = useState<boolean>(false);

  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true);

  const [isRequestSent, setIsRequestSent] = useState<boolean>(false);

  const deleteFromFamily = (email: string, index: number) => {
    deleteFamilyMembers(email).then(() => {
      const updatedFamily = [...userFamily];
      updatedFamily.splice(index, 1);
      setUserFamily(updatedFamily);
    }).catch(() => toast.error(t('common.error')));
  };

  const getFamily = () => {
    getUserFamily().then((response) => {
      if (response.data.success && response.data.data) {
        setUserFamily(response.data.data.list);
        setIsOwnerFamily(response.data.data.is_owner);
      }
    }).catch(() => toast.error(t('common.error')))
      .finally(() => setIsLoadingPage(false));
  };

  useEffect(() => {
    getFamily();

    fetchUserProfile().then((response) => {
      if (response.data.success && response.data.data) {
        const { name, surname } = response.data.data;
        setUserInfo({
          ...userInfo,
          name,
          surname,
        });
      }
    }).catch(() => toast.error(t('common.error')));
  }, []);

  const [inviteEmailErrors, setInviteEmailErrors] = useState([]);

  const validateOnChange = (name: string, value: any, event) => {
    validateFieldOnChange(
      name,
      value,
      event,
      inviteEmailForm,
      setInviteEmailForm,
      inviteEmailErrors,
      setInviteEmailErrors,
    );
  };

  const getFieldErrors = (field: string) =>
    getFieldErrorsUtil(field, inviteEmailErrors);

  const inviteEmailSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const inputs = [...form.elements].filter((i) => ['INPUT', 'SELECT', 'TEXTAREA'].includes(i.nodeName));

    const { errors, hasError } = FormValidator.bulkValidate(inputs);

    setInviteEmailErrors([...errors]);

    if (!hasError) {
      setIsRequestSent(true);
      userInviteFamilyByEmail(inviteEmailForm.email)
        .then((response) => {
          if (response.data.success) {
            setInviteEmailForm({ ...inviteEmailForm, email: '' });
            getFamily();
          }
        })
        .catch(() => {
          toast.error(t('common.error'));
        })
        .finally(() => setIsRequestSent(false));
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('app.title.family')}</title>
      </Helmet>
      <div className='container'>
        <Breadcrumb
          routes={[
            {
              url: routes.main,
              name: t('breadcrumb.main'),
            },
          ]}
          currentPage={t('app.title.family')}
        />
      </div>
      <ProfileLayout>
        <div className='family card-bg'>
          <ContentLoading
            isLoading={isLoadingPage}
            isError={false}
            spinSize='lg'
          >
            {userFamily.length !== 3 && (
              <>
                <h2 className='family__title'>
                  {t('family.invite_link.title')}
                </h2>
                {/* <div className='family__invite-link'>
              <p className='family__invite-link-desc'>
                {t('family.invite_link.desc')}
              </p>
              <CopyLinkButton text={inviteLink} />
            </div>
            <div className='family__separator'>
              <span className='family__separator-text'>{t('common.or')}</span>
            </div> */}
                <form
                  onSubmit={(e) => inviteEmailSubmit(e)}
                  className='family__invite-email'
                >
                  <div className='family__invite-email-input-wrap'>
                    <InputField
                      name='email'
                      data-validate='["email", "required"]'
                      errors={getFieldErrors('email')}
                      value={inviteEmailForm.email}
                      onChange={(e) => validateOnChange('email', e.target.value, e)}
                      label={t('family.invite_email.desc')}
                      className='family__invite-email-input'
                    />
                  </div>
                  <div className='family__invite-email-button-wrap'>
                    <Button
                      type='submit'
                      color='secondary'
                      size='lg'
                      className='family__invite-email-button'
                      isLoading={isRequestSent}
                    >
                      {!isRequestSent && t('family.invite_email.button')}
                    </Button>
                  </div>
                </form>
              </>
            )}
            <div>
              <h2 className='family__title'>
                {t('family.invite.title')}
              </h2>
              <div className='family__user'>
                <span className='family__user-name'>
                  {`${userInfo.name} ${userInfo.surname || ''}`}
                </span>
                {t('common.you')}
              </div>
              <div className='family__list'>
                {userFamily.map((member, memberIndex) => (
                  <div key={member.email} className='family__list-item'>
                    <div className='family__list-item-media'>
                      {member.image
                        ? <img src={member.image} alt='' />
                        : <ManPlugIcon />}
                    </div>
                    <div className='family__list-item-desc'>
                      <div className='family__list-item-desc-name'>
                        {member.name}
                      </div>
                      <a
                        href={`mailto:${member.email}`}
                        className='family__list-item-desc-email'
                      >
                        {member.email}
                      </a>
                      {!member.is_joined && (
                        <div className='family__list-item-desc-way'>
                          {t('family.link_sent')}
                        </div>
                      )}
                    </div>
                    {isOwnerFamily && (
                      <button
                        onClick={() => deleteFromFamily(member.email, memberIndex)}
                        type='button'
                        className='family__list-item-close'
                      >
                        <CloseIcon />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </ContentLoading>
        </div>
      </ProfileLayout>
    </>
  );
};

export default WithTranslate(connect(null)(SettingsFamilyView));
