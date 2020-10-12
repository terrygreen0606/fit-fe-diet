import React from 'react';
import { getImagePath, getTranslate } from 'utils';
import { connect } from 'react-redux';
import { userLogin } from 'store/actions';

// Components
import Button from 'components/common/Forms/Button';

import '../RegisterV2Tpl.sass';

import { ReactComponent as MealIcon } from 'assets/img/icons/meal-icon.svg';

const FinalWelcome = ({
  registerData,
  userLogin: userAuthLogin,
  localePhrases,
}: any) => {
  const t = (code: string, placeholders?: any) =>
    getTranslate(localePhrases, code, placeholders);

  return (
    <div className='row'>
      <div className='col-8 offset-2'>
        <span
          className='diet-plan-feature-icon mb-5 d-none d-md-inline-block'
          style={{ backgroundImage: `url(${getImagePath('features/list-feature.png')})` }}
        />

        <h5 className='register_title mt-md-2'>
          {t('register.plan_ready_title', { NAME: registerData.name })}
          {', '}
          {t('register.plan_ready_subtitle')}
        </h5>

        <div className='text-center mt-md-5 mt-4'>
          <Button
            style={{ maxWidth: '355px' }}
            color='primary'
            type='submit'
            size='lg'
            block
            onClick={() => userAuthLogin(registerData.token)}
          >
            <MealIcon className='mr-3' />
            {' '}
            {t('register.check_btn')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { userLogin })(FinalWelcome);
