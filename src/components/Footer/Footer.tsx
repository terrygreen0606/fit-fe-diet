import React from 'react';

import styles from './Footer.module.sass';

import { ReactComponent as YoutubeIcon } from '../../assets/img/icons/youtube-icon.svg';
import { ReactComponent as FacebookIcon } from '../../assets/img/icons/facebook-icon.svg';
import { ReactComponent as InstaIcon } from '../../assets/img/icons/insta-icon.svg';

const Footer = () => {
  return (
    <footer className={styles.mainFooter}>
      <div className="container">
        <div className="row">
          <div className="col-3">
            
            <h6 className={styles.mainFooter_menuList_title}>Clients support</h6>

            <nav className={styles.mainFooter_menuList}>
              <a href="#" className={styles.mainFooter_menuList_item}>Contact</a>
              <a href="#" className={styles.mainFooter_menuList_item}>FAQ</a>
              <a href="#" className={styles.mainFooter_menuList_item}>Use cookies</a>
              <a href="#" className={styles.mainFooter_menuList_item}>Terms of sale and use</a>
              <a href="#" className={styles.mainFooter_menuList_item}>Privacy Policy</a>
            </nav>

          </div>
          <div className="col-3">

            <h6 className={styles.mainFooter_menuList_title}>Fitlap</h6>

            <nav className={styles.mainFooter_menuList}>
              <a href="#" className={styles.mainFooter_menuList_item}>Blog</a>
              <a href="#" className={styles.mainFooter_menuList_item}>Contact</a>
              <a href="mailto:info@fitlap.com" className={styles.mainFooter_menuList_item}>info@fitlap.com</a>
            </nav>
          
          </div>
          <div className="col-3">
          
            <h6 className={styles.mainFooter_menuList_title}>Klienditugi</h6>

            <nav className={styles.mainFooter_menuList}>
              <a href="#" className={styles.mainFooter_menuList_item}>Kontakt</a>
              <a href="#" className={styles.mainFooter_menuList_item}>Korduma kippuvad küsimused</a>
            </nav>
          
          </div>
          <div className="col-3 text-right">
          
            <span className={styles.mainFooter_logo}></span>
            <span className={styles.mainFooter_company}>Sotsiaalmeedia</span>

          </div>       
        </div>

        <div className={styles.mainFooter_bottomLine}>
          <div className="row">
            <div className="col-6">
              
              <span className={styles.mainFooter_copyright}>Copyright © 2020 Fitlap</span>

            </div>
            <div className="col-6 text-right">
              
              <ul className="socials-list">
                <li><a href="#" className="social-link"><InstaIcon className="social-icon" /></a></li>
                <li><a href="#" className="social-link"><FacebookIcon className="social-icon" /></a></li>
                <li><a href="#" className="social-link"><YoutubeIcon className="social-icon" /></a></li>
              </ul>

            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
