import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { routes } from 'constants/routes';
import { getTranslate, generatePublicUrl } from 'utils';

// Components
import WithTranslate from 'components/hoc/WithTranslate';

import './FooterShort.sass';

const FooterShort = (props: any) => {
  const t = (code: string) => getTranslate(props.localePhrases, code);

  const { paidUntil, footerShortGray } = props;

  return (
    <footer className={classNames('mainFooter_short', {
      mainFooter_short_gray: footerShortGray,
    })}
    >
      <div className='container'>
        <div className='row'>
          <div className='col-12'>

            <ul className='mainFooter_short_menuList'>
              {paidUntil > 0 && (
                <li>
                  <Link
                    to={routes.main}
                    className='mainFooter_short_menuList_item'
                  >
                    {t('footer.menu_home')}
                  </Link>
                </li>
              )}

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

export default WithTranslate(
  connect(
    (state: any) => ({
      paidUntil: state.settings.paid_until,
    }),
  )(FooterShort),
);
