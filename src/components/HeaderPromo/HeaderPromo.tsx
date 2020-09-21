import React from 'react';
import { Link } from 'react-router-dom';

// Components
import Button from 'components/common/Forms/Button';

import './HeaderPromo.sass';

const HeaderPromo = () => {
  return (
    <header className="main-promo-header">
      <div className='container'>
        <div className='row'>
          <div className='col-6'>
            
            <Link to='/' className='mainHeader_logo' />

          </div>
          <div className='col-6 text-right'>
            
            <Button color="primary-shadow">Reveal my plan now!</Button>

          </div>
        </div>  
      </div>  
    </header>
  );
};

export default HeaderPromo;
