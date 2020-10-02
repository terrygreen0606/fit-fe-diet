import React from 'react';
import { Link } from 'react-router-dom';
import { getTranslate } from 'utils';

import Button from 'components/common/Forms/Button';

type ResetInfoProps = {
  localePhrases: any;
};

const SaveInfo = (props: ResetInfoProps) => {
  const t = (code: string, placeholders?: any) =>
    getTranslate(props.localePhrases, code, placeholders);

  return (
    <div className="loginScreen_form">
      <p className="loginScreen_descr">{t('reset_password.pass_updated')}</p>

      <Link to="/login" className="link-raw">
        <Button
          className='loginScreen_btn mt-4'
          type='submit'
          color='secondary'
          size='lg'
          block
        >
          {t('login.submit')}
        </Button>
      </Link>
    </div>
  );
};

export default SaveInfo;
