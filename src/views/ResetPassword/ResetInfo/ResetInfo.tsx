import React from 'react';
import { getTranslate } from 'utils';

type ResetInfoProps = {
  localePhrases: any;
};

const ResetInfo = (props: ResetInfoProps) => {

  console.log(props.localePhrases)

  const t = (code: string, placeholders?: any) =>
    getTranslate(props.localePhrases, code, placeholders);

  return (
    <div className="loginScreen_form">
      <p className="loginScreen_descr">{t('reset_password.email_sent')}</p>
    </div>
  );
};

export default ResetInfo;
