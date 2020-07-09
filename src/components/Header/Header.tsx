import React from 'react';

// Components
import Button from 'components/common/Forms/Button';

import styles from './Header.module.sass';

const Header = () => {
  return (
    <header className={styles.mainHeader}>
      <div className="container">
        <div className="row">
          <div className="col-4">
            
            <span className={styles.mainHeader_logo}></span>

          </div>
          <div className="col-8 text-right">
            
            <nav className={styles.mainHeader_menuList}>
              <a href="#" className={styles.mainHeader_menuList_item}>Retseptid</a>
              <a href="#" className={styles.mainHeader_menuList_item}>Edulood</a>
              <a href="#" className={styles.mainHeader_menuList_item}>Blogi</a>
              <a href="#" className={styles.mainHeader_menuList_item}>E-Pood</a>
              <a href="#" className={styles.mainHeader_menuList_item}>Login</a>
            </nav>

            <Button className="ml-5" color="primary">Register</Button>

          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
