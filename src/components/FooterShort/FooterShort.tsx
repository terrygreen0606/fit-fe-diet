import React from 'react';
import { Link } from 'react-router-dom';
import { getTranslate, generatePublicUrl } from 'utils';

// Components
import WithTranslate from 'components/hoc/WithTranslate';

import './FooterShort.sass';

const FooterShort = (props: any) => {

  const t = (code: string) => getTranslate(props.localePhrases, code);

  return (
    <footer className="mainFooter_short">
      <div className="container">
        <div className="row">
          <div className="col-12">
            
            <ul className='mainFooter_short_menuList'>
              <li>
                <a
                  href={generatePublicUrl('')}
                  className='mainFooter_short_menuList_item'
                >
                  {t('footer.menu_home')} 
                </a>
              </li>

              <li>
                <a
                  href={generatePublicUrl('trees')}
                  className='mainFooter_short_menuList_item'
                >
                  {t('footer.menu_about')} 
                </a>
              </li>
              
              <li>
                <a
                  href={generatePublicUrl('contacts')}
                  className='mainFooter_short_menuList_item'
                >
                  {t('footer.menu_contact')}
                </a>
              </li>
              
              <li>
                <a
                  href={generatePublicUrl('terms')}
                  className='mainFooter_short_menuList_item'
                >
                  {t('footer.menu_terms')}
                </a>
              </li>

              <li>
                <a
                  href={generatePublicUrl('privacy')}
                  className='mainFooter_short_menuList_item'
                >
                  {t('footer.menu_privacy')}
                </a>
              </li>
            </ul>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default WithTranslate(FooterShort);
