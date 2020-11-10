import React from 'react';
import { getTranslate } from 'utils';

// Components
import Button from 'components/common/Forms/Button';

import '../RegisterV2Tpl.sass';

const BackIssues = ({ setRegisterView, localePhrases }: any) => {
  const t = (code: string) => getTranslate(localePhrases, code);

  return (
    <>
      <h1 className='register_v2_title'>{t('register.v2.back_issues.title')}</h1>

      <div className='row'>
        <div className='col-8 offset-2'>

          <div className='register_v2_check_list'>
            <label className='register_v2_check_label'>
              <input name='register_back_issues' type='radio' />
              <div className='register_v2_check_item'>{t('common.no')}</div>
            </label>

            <label className='register_v2_check_label'>
              <input name='register_back_issues' type='radio' />
              <div className='register_v2_check_item'>{t('common.yes')}</div>
            </label>
          </div>

        </div>
      </div>

      <Button
        className='register_v2_btn mt-5'
        color='primary'
        size='lg'
        onClick={() => setRegisterView('DAY_MEALPLAN')}
      >
        {t('register.form_next')}
      </Button>
    </>
  );
};

export default BackIssues;
