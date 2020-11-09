import React from 'react';
import { getTranslate } from 'utils';

type ResetInfoProps = {
  localePhrases: any;
};

const ResetInfo = ({
  localePhrases,
}: ResetInfoProps) => {
  const t = (code: string, placeholders?: any) =>
    getTranslate(localePhrases, code, placeholders);

  return (
    <div className='loginScreen_form'>
      <p className='loginScreen_descr'>{t('reset_password.email_sent')}</p>
    </div>
  );
};

export default ResetInfo;
