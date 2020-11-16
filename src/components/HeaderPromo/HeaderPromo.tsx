import React from 'react';
import { getTranslate } from 'utils';
import { Link } from 'react-router-dom';
import useWindowSize from 'components/hooks/useWindowSize';

// Components
import WithTranslate from 'components/hoc/WithTranslate';
import Button from 'components/common/Forms/Button';

import './HeaderPromo.sass';

const HeaderPromo = (props: any) => {
  const { width: windowWidth } = useWindowSize();

  const t = (code: string, placeholders?: any) =>
    getTranslate(props.localePhrases, code, placeholders);

  const scrollToCheckoutForm = (e) => {
    const afterSignupTariffs = document.getElementById('afterSignupTariffs');

    if (afterSignupTariffs) {
      e.preventDefault();
      afterSignupTariffs.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
    }
  };

  return (
    <header className='main-promo-header'>
      <div className='container'>
        <div className='row'>
          <div className='col-5 col-xs-4'>

            <Link to='/' className='mainHeader_logo' />

          </div>
          <div className='col-7 col-xs-8 text-right'>

            <Link to='/checkout' className='link-raw' onClick={(e) => scrollToCheckoutForm(e)}>
              <Button className='main-promo-header__btn' pulse color='primary-shadow'>
                {windowWidth > 480 ? t('button.reveal_plan') : t('button.reveal_plan.short')}
              </Button>
            </Link>

          </div>
        </div>
      </div>
    </header>
  );
};

export default WithTranslate(HeaderPromo);
