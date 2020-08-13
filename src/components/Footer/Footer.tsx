import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTranslate } from 'utils';

import useWindowSize from 'components/hooks/useWindowSize';
import useDebounce from 'components/hooks/useDebounce';

import MobileFooter from 'components/MobileFooter';
import WithTranslate from 'components/hoc/WithTranslate';

import './Footer.sass';

import { ReactComponent as YoutubeIcon } from '../../assets/img/icons/youtube-icon.svg';
import { ReactComponent as FacebookIcon } from '../../assets/img/icons/facebook-icon.svg';
import { ReactComponent as InstaIcon } from '../../assets/img/icons/insta-icon.svg';
// import { ReactComponent as Logo } from '../../assets/img/logo-footer.svg';

const Footer = (props: any) => {
  const { isAuthenticated } = props;
  const t = (code: string) => getTranslate(props.localePhrases, code);
  const { width } = useWindowSize();
  const debouncedWidth = useDebounce(width, 500);
  if (debouncedWidth < 768 && isAuthenticated) return <MobileFooter />;

  return (
    <footer className='mainFooter'>
      <div className='container'>
        <div className='row'>
          <div className='col-6 col-md-3'>
            <h6 className='mainFooter_menuList_title'>
              {t('footer.menu_title_support')}
            </h6>

            <ul className='mainFooter_menuList'>
              <li>
                <a
                  href='https://stgby.fitlope.com/contacts'
                  className='mainFooter_menuList_item'
                >
                  {t('contacts.header')}
                </a>
              </li>
              <li>
                <a
                  href='https://stgby.fitlope.com/faq'
                  className='mainFooter_menuList_item'
                >
                  {t('footer.menu_faq')}
                </a>
              </li>
              <li>
                <a
                  href='https://stgby.fitlope.com/terms'
                  className='mainFooter_menuList_item'
                >
                  {t('footer.menu_terms')}
                </a>
              </li>
              <li>
                <a
                  href='https://stgby.fitlope.com/privacy'
                  className='mainFooter_menuList_item'
                >
                  {t('footer.menu_privacy')}
                </a>
              </li>
            </ul>
          </div>
          <div className='col-6 col-md-3'>
            <h6 className='mainFooter_menuList_title'>
              {t('footer.menu_title_project')}
            </h6>

            <ul className='mainFooter_menuList'>
              <li>
                <a
                  href='https://stgby.fitlope.com/blogs'
                  className='mainFooter_menuList_item'
                >
                  {t('footer.menu_blog')}
                </a>
              </li>
              <li>
                <a
                  href='https://stgby.fitlope.com/recipes'
                  className='mainFooter_menuList_item'
                >
                  {t('footer.menu_recipes')}
                </a>
              </li>
              <li>
                <a
                  href='https://stgby.fitlope.com/about'
                  className='mainFooter_menuList_item'
                >
                  {t('footer.menu_about')}
                </a>
              </li>
            </ul>
          </div>
          <div className='col-6 col-md-3'>
            <h6 className='mainFooter_menuList_title'>
              {t('footer.menu_nutrition')}
            </h6>

            <ul className='mainFooter_menuList'>
              <li>
                <Link to='/nutrition/plan' className='mainFooter_menuList_item'>
                  {t('footer.menu_nutrition_plan')}
                </Link>
              </li>
              <li>
                <Link
                  to='/nutrition/plan/weights'
                  className='mainFooter_menuList_item'
                >
                  {t('footer.menu_nutrition_plan_weights')}
                </Link>
              </li>
            </ul>
          </div>
          <div className='col-6 col-md-3 text-right'>
            <div className='mainFooter_logo_wrap'>
              <Link to='/' className='mainFooter_logo' />
              <div className='mainFooter_company d-md-block d-none'>
                {t('common.social_networks')}
              </div>

              <ul className='socials-list mt-2'>
                <li>
                  <a href='https://www.instagram.com/' className='social-link'>
                    <InstaIcon className='social-icon' />
                  </a>
                </li>
                <li>
                  <a href='https://www.facebook.com/' className='social-link'>
                    <FacebookIcon className='social-icon' />
                  </a>
                </li>
                <li>
                  <a href='https://www.youtube.com/' className='social-link'>
                    <YoutubeIcon className='social-icon' />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className='col-md-3 offset-md-9 text-center text-md-right'>
            <div className='mainFooter_copyright'>{t('footer.copyright')}</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default WithTranslate(
  connect((state: any) => ({
    isAuthenticated: state.auth.isAuthenticated,
  }))(Footer)
);
