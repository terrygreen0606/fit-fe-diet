import React from 'react';
import { getTranslate } from 'utils';

// Components
import Button from 'components/common/Forms/Button';

import '../RegisterV2Tpl.sass';

const NotEating = ({
  registerData,
  setRegisterData,
  setRegisterView,
  localePhrases,
}: any) => {
  const t = (code: string) => getTranslate(localePhrases, code);

  const changeCuisineState = (id: string, checked: boolean) => {
    const index = registerData.ignore_cuisine_ids.findIndex((cuisine) => cuisine.id === id);

    if (index >= 0) {
      const { ignore_cuisine_ids } = registerData;

      if (ignore_cuisine_ids[index]) {
        ignore_cuisine_ids[index] = {
          ...ignore_cuisine_ids[index],
          checked,
        };

        setRegisterData({
          ...registerData,
          ignore_cuisine_ids,
        });
      }
    }
  };

  return (
    <>
      <h3 className='register_v2tpl_title'>{t('register.v2.not_eating_title')}</h3>

      <div className='row'>
        <div className='col-10 offset-1'>

          <div className='register_v2tpl_eating_list'>
            {registerData.ignore_cuisine_ids.map(({ id, name, image }) => (
              <label className='register_v2tpl_eating_label register_v2tpl_check_label'>
                <input
                  name='register_not_eating'
                  type='checkbox'
                  onChange={(e) => changeCuisineState(id, e.target.checked)}
                />

                <div key={id} className='register_v2tpl_check_item register_v2tpl_eating_item'>
                  <img src={image} className='register_v2tpl_eating_item_icon' alt='' />
                  <span>{name}</span>
                </div>
              </label>
            ))}
          </div>

        </div>
      </div>

      <Button
        className='register_v2tpl_btn'
        color='primary'
        size='lg'
        onClick={() => setRegisterView('GENDER')}
      >
        Next
      </Button>
    </>
  );
};

export default NotEating;
