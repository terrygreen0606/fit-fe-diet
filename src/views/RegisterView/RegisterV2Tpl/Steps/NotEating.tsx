import React from 'react';

// Components
import Button from 'components/common/Forms/Button';

import '../RegisterV2Tpl.sass';

const NotEating = (props: any) => {
  return (
    <>
      <h3 className="register_v2tpl_title">I don’t eat:</h3>

      <div className="row">
        <div className="col-10 offset-1">
          
          <div className="register_v2tpl_eating_list">
            {props.registerData.ignore_cuisine_ids.map(({ id, name, image }) => (
              <label className="register_v2tpl_eating_label register_v2tpl_check_label">
                <input name="register_not_eating" type="checkbox" />

                <div key={id} className="register_v2tpl_check_item register_v2tpl_eating_item">
                  <img src={image} className="register_v2tpl_eating_item_icon" />
                  <span>{name}</span>
                </div>
              </label>
            ))}
          </div>

        </div>
      </div>

      <Button className="register_v2tpl_btn" color="primary" size="lg">Next</Button>
    </>
  );
};

export default NotEating;
