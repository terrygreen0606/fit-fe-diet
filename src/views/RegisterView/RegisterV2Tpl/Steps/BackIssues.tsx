import React from 'react';
import { getTranslate } from 'utils';

// Components
import Button from 'components/common/Forms/Button';

import '../RegisterV2Tpl.sass';

const BackIssues = ({ setRegisterView, localePhrases }: any) => {
  const t = (code: string) => getTranslate(localePhrases, code);

  return (
    <>
      <h3 className='register_v2tpl_title'>Do you have any significant back issues?</h3>

      <div className='row'>
        <div className='col-8 offset-2'>

          <div className='register_v2tpl_check_list'>
            <label className='register_v2tpl_check_label'>
              <input name='register_back_issues' type='radio' />
              <div className='register_v2tpl_check_item'>No</div>
            </label>

            <label className='register_v2tpl_check_label'>
              <input name='register_back_issues' type='radio' />
              <div className='register_v2tpl_check_item'>Yes</div>
            </label>
          </div>

        </div>
      </div>

      <Button
        className='register_v2tpl_btn mt-5' 
        color='primary' 
        size='lg'
        onClick={() => setRegisterView('HEALTH_PROBLEMS')}
      >
        Next
      </Button>
    </>
  );
};

export default BackIssues;
