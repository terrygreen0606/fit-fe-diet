import React from 'react';
import { getImagePath, getTranslate } from 'utils';
import { connect } from 'react-redux';
import { userLogin } from 'store/actions';

// Components
import Button from 'components/common/Forms/Button';

import '../RegisterV2Tpl.sass';

import { ReactComponent as MealIcon } from 'assets/img/icons/meal-icon.svg';

const FinalWelcome = (props: any) => {

  const t = (code: string, placeholders?: any) => 
    getTranslate(props.localePhrases, code, placeholders);

  return (
    <>
      <span className="diet-plan-feature-icon mb-5 d-none d-md-inline-block" style={{ backgroundImage: `url(${getImagePath('features/list-feature.png')})` }} />

      <h4 id="register_title_final_welcome" className="register_title mb-xl-4">{t('register.plan_ready_title', { first_name: props.registerData.name })},</h4>
      <h5 className="register_title mt-md-2">{t('register.plan_ready_subtitle')}</h5>

      <div className="text-center mt-md-5 mt-4">
        <Button
          style={{ maxWidth: '355px' }}
          color="primary"
          type="submit"
          size="lg"
          block
          onClick={e => props.userLogin(props.registerData.token)}
        >
          <MealIcon className="mr-3" /> {t('register.check_btn')}
        </Button>
      </div>
    </>
  );
};

export default connect(null, { userLogin })(FinalWelcome);
