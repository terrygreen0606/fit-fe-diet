import React from 'react';

// Components
import Button from 'components/common/Forms/Button';

import '../RegisterV2Tpl.sass';

const BackIssues = (props: any) => {
  return (
    <>
      <h3 className="register_v2tpl_title">Do you have any significant back issues?</h3>

      <div className="row">
        <div className="col-6 offset-3">
          
          <div className="register_v2tpl_check_list">
            <label className="register_v2tpl_check_label">
              <input name="register_back_issues" type="checkbox" />
              <div className="register_v2tpl_check_item">No</div>
            </label>

            <label className="register_v2tpl_check_label">
              <input name="register_back_issues" type="checkbox" />
              <div className="register_v2tpl_check_item">Yes</div>
            </label>
          </div>

        </div>
      </div>

      <Button className="register_v2tpl_btn" color="primary" size="lg">Next</Button>
    </>
  );
};

export default BackIssues;
