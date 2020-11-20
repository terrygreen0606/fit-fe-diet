import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTranslate, generatePublicUrl } from 'utils';

import useWindowSize from 'components/hooks/useWindowSize';
import useDebounce from 'components/hooks/useDebounce';

import MobileFooter from 'components/MobileFooter';
import WithTranslate from 'components/hoc/WithTranslate';

import './Footer.sass';

import { ReactComponent as YoutubeIcon } from '../../assets/img/icons/youtube-icon.svg';
import { ReactComponent as FacebookIcon } from '../../assets/img/icons/facebook-icon.svg';
import { ReactComponent as InstaIcon } from '../../assets/img/icons/insta-icon.svg';
import { ReactComponent as PinterestIcon } from '../../assets/img/icons/pinterest-icon.svg';
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
          <div className='col-6 col-md-4'>
            <h6 className='mainFooter_menuList_title'>
              {t('footer.menu_title_project')}
            </h6>

            <ul className='mainFooter_menuList'>
              <li>
                <a
                  href={generatePublicUrl('about')}
                  className='mainFooter_menuList_item'
                >
                  {t('footer.menu_about')}
                </a>
              </li>
              <li>
                <a
                  href={generatePublicUrl('contacts')}
                  className='mainFooter_menuList_item'
                >
                  {t('footer.menu_contact')}
                </a>
              </li>
              <li>
                <a
                  href={generatePublicUrl('privacy')}
                  className='mainFooter_menuList_item'
                >
                  {t('footer.menu_privacy')}
                </a>
              </li>
              <li>
                <a
                  href={generatePublicUrl('terms')}
                  className='mainFooter_menuList_item'
                >
                  {t('footer.menu_terms')}
                </a>
              </li>
              <li>
                <a
                  href={generatePublicUrl('media')}
                  className='mainFooter_menuList_item'
                >
                  {t('footer.menu_media_inquiries')}
                </a>
              </li>
              <li>
                <a
                  href={generatePublicUrl('trees')}
                  className='mainFooter_menuList_item'
                >
                  {t('footer.menu_trees')}
                </a>
              </li>
            </ul>
          </div>
          <div className='col-6 col-md-4'>
            <h6 className='mainFooter_menuList_title'>
              {t('footer.menu_title_support')}
            </h6>

            <ul className='mainFooter_menuList'>
              <li>
                <a
                  href={generatePublicUrl('blogs')}
                  className='mainFooter_menuList_item'
                >
                  {t('footer.menu_blog')}
                </a>
              </li>
              <li>
                <a
                  href={generatePublicUrl('recipes')}
                  className='mainFooter_menuList_item'
                >
                  {t('footer.menu_recipes')}
                </a>
              </li>
            </ul>
          </div>
          <div className='col-6 col-md-4 text-right'>
            <div className='mainFooter_logo_wrap'>
              <Link to='/' className='mainFooter_logo' />
              <div className='mainFooter_company d-md-block d-none'>
                {t('common.social_networks')}
              </div>

              <ul className='socials-list mt-2'>
                <li>
                  <a href='https://www.instagram.com/fitlopecom/' className='social-link'>
                    <InstaIcon className='social-icon' />
                  </a>
                </li>
                <li>
                  <a href='https://www.facebook.com/fitlopecom' className='social-link'>
                    <FacebookIcon className='social-icon' />
                  </a>
                </li>
                <li>
                  <a href='https://www.youtube.com/channel/UC4LGxoe4iAIc9M-PXcH274Q/' className='social-link'>
                    <YoutubeIcon className='social-icon' />
                  </a>
                </li>
                <li>
                  <a href='https://www.pinterest.com/fitlope/' className='social-link'>
                    <PinterestIcon className='social-icon' />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className='col-md-3 offset-md-9 text-center text-md-right'>
            <div className='mainFooter_info'>{t('footer.copyright')}</div>
            <div className='mainFooter_info'>{t('footer.disclaimer')}</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default WithTranslate(
  connect((state: any) => ({
    isAuthenticated: state.auth.isAuthenticated,
  }))(Footer),
);
