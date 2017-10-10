import React from 'react';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './Footer.css';

export function Footer() {
  return (
    <div className={styles.footer}>
      <p>&copy; 2017 &middot; Team Law &middot; MSOE</p>
       <p>Github: <a href="https://github.com/msoeSE/legalAidFinder" target="_Blank">Legal Aid Finder</a></p>
    </div>
  );
}

export default Footer;
