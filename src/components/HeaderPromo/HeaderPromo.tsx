import React from 'react';
import { getTranslate } from 'utils';
import { Link } from 'react-router-dom';

// Components
import WithTranslate from 'components/hoc/WithTranslate';
import Button from 'components/common/Forms/Button';

import './HeaderPromo.sass';

const HeaderPromo = (props: any) => {

  const t = (code: string, placeholders?: any) => 
    getTranslate(props.localePhrases, code, placeholders);

  return (
    <header className="main-promo-header">
      <div className='container'>
        <div className='row'>
          <div className='col-xs-4'>
            
            <Link to='/' className='mainHeader_logo' />

          </div>
          <div className='col-xs-8 mt-2 mt-xs-0 text-xs-right'>
            
            <Link to="/checkout" className="link-raw"><Button className="main-promo-header__btn" color="primary-shadow">{t('button.reveal_plan')}</Button></Link>

          </div>
        </div>  
      </div>  
    </header>
  );
};

export default WithTranslate(HeaderPromo);
